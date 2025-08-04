import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== PAYPAL SUBSCRIPTION CREATION ===");
    const { applicationData, user } = req.body;

    if (!applicationData || !user) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Generate unique subscription reference
    const subscriptionReference = `SUB_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Save application to database
    const { data: application, error } = await supabase
      .from("job_assistant_applications")
      .insert({
        email: user.email,
        full_name: applicationData.fullName,
        desired_position: applicationData.desiredPosition,
        experience_level: applicationData.experience,
        industries: applicationData.industries,
        salary_expectation: applicationData.salary,
        remote_preference: applicationData.remotePreference,
        additional_notes: applicationData.additionalNotes,
        payment_reference: subscriptionReference,
        status: "pending",
        subscription_status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({
        error: "Failed to save application",
        details: error.message,
      });
    }

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const baseUrl = "https://api-m.paypal.com";

    // Get access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Failed to get PayPal access token:", tokenData);
      return res
        .status(500)
        .json({ error: "Failed to authenticate with PayPal" });
    }

    // Create subscription
    const subscriptionData = {
      plan_id: process.env.PAYPAL_SUBSCRIPTION_PLAN_ID || "P-REMOTEJOBS-SA", // You'll need to create this plan
      start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Start tomorrow
      subscriber: {
        name: {
          given_name: applicationData.fullName.split(" ")[0] || "User",
          surname:
            applicationData.fullName.split(" ").slice(1).join(" ") || "Name",
        },
        email_address: user.email,
      },
      application_context: {
        brand_name: "RemoteJobs SA",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=subscription-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=subscription-cancel`,
      },
      custom_id: subscriptionReference,
    };

    const subscriptionResponse = await fetch(
      `${baseUrl}/v1/billing/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(subscriptionData),
      }
    );

    const subscriptionResult = await subscriptionResponse.json();

    if (subscriptionResponse.ok) {
      console.log("PayPal subscription created:", subscriptionResult);

      // Update database with subscription ID
      await supabase
        .from("job_assistant_applications")
        .update({
          paypal_subscription_id: subscriptionResult.id,
          subscription_status: "active",
        })
        .eq("id", application.id);

      return res.status(200).json({
        success: true,
        subscriptionId: subscriptionResult.id,
        subscriptionReference,
        applicationId: application.id,
        approvalUrl: subscriptionResult.links.find(
          (link) => link.rel === "approve"
        )?.href,
        subscription: subscriptionResult,
      });
    } else {
      console.error(
        "Failed to create PayPal subscription:",
        subscriptionResult
      );
      return res.status(500).json({
        error: "Failed to create subscription",
        details: subscriptionResult,
      });
    }
  } catch (error) {
    console.error("PayPal subscription creation error:", error);
    return res.status(500).json({
      error: "Failed to create subscription",
      details: error.message,
    });
  }
}
