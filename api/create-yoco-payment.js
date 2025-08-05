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
        payment_provider: "yoco",
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
      metadata: {
        paymentReference,
        applicationId: application.id,
        userEmail: user.email,
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-cancel`,
    };

    console.log("Yoco payment data prepared:", paymentReference);
    console.log("Application saved:", application.id);

    return res.status(200).json({
      paymentReference,
      applicationId: application.id,
      yocoPaymentData,
      checkoutUrl: `https://online.yoco.com/v2/checkout/${process.env.YOCO_PUBLIC_KEY}`,
    });
  } catch (error) {
    console.error("Yoco payment creation error:", error);
    return res.status(500).json({
      error: "Failed to create Yoco payment",
      details: error.message,
    });
  }
}
