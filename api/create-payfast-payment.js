import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// PayFast Configuration
const PAYFAST_CONFIG = {
  MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
  MERCHANT_KEY: process.env.PAYFAST_MERCHANT_KEY,
  PASS_PHRASE: process.env.PAYFAST_PASS_PHRASE,
  SANDBOX_MODE: true, // Force sandbox mode for testing
  SANDBOX_URL: "https://sandbox.payfast.co.za/eng/process",
  LIVE_URL: "https://www.payfast.co.za/eng/process",
};

// Helper function to generate PayFast signature
const generatePayFastSignature = (data, passphrase) => {
  // Create signature string
  let signatureString = "";
  Object.keys(data)
    .sort()
    .forEach((key) => {
      if (key !== "signature" && data[key] !== "") {
        signatureString += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          "+"
        )}&`;
      }
    });

  // Remove trailing &
  signatureString = signatureString.slice(0, -1);

  // Add passphrase if provided
  if (passphrase) {
    signatureString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }

  // Generate MD5 hash
  return crypto.createHash("md5").update(signatureString).digest("hex");
};

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

    // Generate unique payment reference
    const paymentReference = `JA_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

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
          payment_reference: paymentReference,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Failed to save application" });
    }

    // Prepare PayFast payment data
    const payfastData = {
      merchant_id: PAYFAST_CONFIG.MERCHANT_ID,
      merchant_key: PAYFAST_CONFIG.MERCHANT_KEY,
      return_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/payment-success`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/job-assistant`,
      notify_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/payfast-webhook`,
      name_first:
        applicationData.fullName.split(" ")[0] || applicationData.fullName,
      name_last: applicationData.fullName.split(" ").slice(1).join(" ") || "",
      email_address: user.email,
      m_payment_id: paymentReference,
      amount: "149.00",
      item_name: "Job Assistant Setup Fee",
      item_description: "One-time setup fee for Job Assistant service",
      custom_str1: user.id,
      custom_str2: application.id,
      custom_str3: "job_assistant_setup",
    };

    // Generate signature
    const signature = generatePayFastSignature(
      payfastData,
      PAYFAST_CONFIG.PASS_PHRASE
    );
    payfastData.signature = signature;

    // Add test mode for sandbox
    if (PAYFAST_CONFIG.SANDBOX_MODE) {
      payfastData.test_mode = "1";
    }

    console.log("PayFast payment data prepared:", paymentReference);
    console.log("Application saved:", application.id);

    return res.status(200).json({
      paymentReference,
      applicationId: application.id,
      payfastData,
      paymentUrl: PAYFAST_CONFIG.SANDBOX_MODE
        ? PAYFAST_CONFIG.SANDBOX_URL
        : PAYFAST_CONFIG.LIVE_URL,
    });
  } catch (error) {
    console.error("PayFast payment creation error:", error);
    return res.status(500).json({
      error: "Failed to create PayFast payment",
      details: error.message,
    });
  }
}
