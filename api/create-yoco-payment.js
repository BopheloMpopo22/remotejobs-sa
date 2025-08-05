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
    console.log("=== YOCO PAYMENT API ===");
    const { applicationData, user } = req.body;

    if (!applicationData || !user) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Generate unique payment reference
    const paymentReference = `JA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        payment_reference: paymentReference,
        status: "pending",
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

    // Create Yoco payment data
    const yocoPaymentData = {
      amount: 17900, // R179.00 in cents
      currency: "ZAR",
      source: "card",
      chargeURL: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/api/yoco-webhook`,
      metadata: {
        paymentReference,
        applicationId: application.id,
        userEmail: user.email,
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-cancel`,
    };

    // Create Yoco payment session
    const yocoResponse = await fetch("https://online.yoco.com/v2/checkout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Secret-Key": process.env.YOCO_SECRET_KEY || "",
      },
      body: JSON.stringify(yocoPaymentData),
    });

    if (!yocoResponse.ok) {
      const errorData = await yocoResponse.text();
      console.error("Yoco API error:", errorData);
      return res.status(500).json({
        error: "Failed to create Yoco payment session",
        details: errorData,
      });
    }

    const yocoSession = await yocoResponse.json();
    console.log("Yoco session created:", yocoSession);

    console.log("Yoco payment data prepared:", paymentReference);
    console.log("Application saved:", application.id);

    // Debug Yoco credentials
    console.log("=== YOCO CREDENTIALS DEBUG ===");
    console.log("YOCO_SECRET_KEY available:", !!process.env.YOCO_SECRET_KEY);
    console.log("YOCO_SECRET_KEY length:", process.env.YOCO_SECRET_KEY?.length);
    console.log(
      "YOCO_SECRET_KEY starts with:",
      process.env.YOCO_SECRET_KEY?.substring(0, 10)
    );
    console.log(
      "All environment variables:",
      Object.keys(process.env).filter((key) => key.includes("YOCO"))
    );
    console.log("=== END YOCO CREDENTIALS DEBUG ===");

    const responseData = {
      paymentReference,
      applicationId: application.id,
      yocoPaymentData,
      checkoutUrl: yocoSession.checkout_url,
    };

    console.log("Returning response data:", responseData);

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Yoco payment creation error:", error);
    return res.status(500).json({
      error: "Failed to create Yoco payment",
      details: error.message,
    });
  }
}
