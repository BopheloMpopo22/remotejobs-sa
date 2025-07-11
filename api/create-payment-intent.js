import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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
    // Get user from auth token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const { applicationData } = req.body;

    if (!applicationData) {
      return res.status(400).json({ error: "Missing application data" });
    }

    // Create or get Stripe customer
    let customer;
    const { data: existingCustomer } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("email", user.email)
      .single();

    if (existingCustomer?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(
        existingCustomer.stripe_customer_id
      );
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: applicationData.fullName,
        metadata: {
          user_id: user.id,
          email: user.email,
        },
      });

      // Save Stripe customer ID to database
      await supabase.from("users").upsert({
        email: user.email,
        full_name: applicationData.fullName,
        stripe_customer_id: customer.id,
        updated_at: new Date().toISOString(),
      });
    }

    // Create payment intent for setup fee (R149)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 14900, // R149.00 in cents
      currency: "zar",
      customer: customer.id,
      metadata: {
        user_id: user.id,
        user_email: user.email,
        application_type: "job_assistant_setup",
        full_name: applicationData.fullName,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save application data to database (pending payment)
    const { data: application, error: dbError } = await supabase
      .from("job_assistant_applications")
      .insert([
        {
          full_name: applicationData.fullName,
          email: user.email,
          phone: applicationData.phone,
          location: applicationData.location,
          desired_position: applicationData.desiredPosition,
          experience_level: applicationData.experience,
          salary_expectation: applicationData.salary,
          remote_preference: applicationData.remotePreference,
          industries: applicationData.industries,
          additional_notes: applicationData.additionalNotes,
          cv_file_name: applicationData.cvFileName,
          cv_file_url: applicationData.cvFileUrl,
          status: "pending_payment",
          stripe_payment_intent_id: paymentIntent.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Failed to save application" });
    }

    console.log("Payment intent created:", paymentIntent.id);
    console.log("Application saved:", application.id);

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      applicationId: application.id,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    return res.status(500).json({
      error: "Failed to create payment intent",
      details: error.message,
    });
  }
}
