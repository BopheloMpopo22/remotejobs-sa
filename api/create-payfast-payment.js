import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { sendEmail } from "./lib/email.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// PayFast Configuration
const PAYFAST_CONFIG = {
  MERCHANT_ID:
    process.env.PAYFAST_TEST_MODE === "true"
      ? process.env.PAYFAST_SANDBOX_MERCHANT_ID
      : process.env.PAYFAST_MERCHANT_ID,
  MERCHANT_KEY:
    process.env.PAYFAST_TEST_MODE === "true"
      ? process.env.PAYFAST_SANDBOX_MERCHANT_KEY
      : process.env.PAYFAST_MERCHANT_KEY,
  SANDBOX_MODE: process.env.PAYFAST_TEST_MODE === "true",
  SANDBOX_URL: "https://sandbox.payfast.co.za/eng/process",
  LIVE_URL: "https://www.payfast.co.za/eng/process",
  PASS_PHRASE: process.env.PAYFAST_TEST_PHRASE, // use the working variable
};

// Helper function to generate PayFast signature
const generatePayFastSignature = (data, passphrase) => {
  let signatureString = "";
  Object.keys(data)
    .sort()
    .forEach((key) => {
      if (key !== "signature") {
        const value = String(data[key] ?? "").trim();
        const encoded = encodeURIComponent(value)
          .replace(/%20/g, "+")
          .replace(/%[a-f0-9]{2}/gi, (m) => m.toUpperCase());
        signatureString += `${key}=${encoded}&`;
      }
    });

  // Remove trailing &
  signatureString = signatureString.slice(0, -1);

  // Add passphrase if provided
  if (passphrase) {
    const encodedPass = encodeURIComponent(passphrase.trim())
      .replace(/%20/g, "+")
      .replace(/%[a-f0-9]{2}/gi, (m) => m.toUpperCase());
    signatureString += `&passphrase=${encodedPass}`;
  }

  console.log("PayFast signature string:", signatureString);

  const signature = crypto
    .createHash("md5")
    .update(signatureString)
    .digest("hex");
  console.log("PayFast signature (MD5):", signature);
  return signature;
};

export default async function handler(req, res) {
  console.log("Incoming headers:", req.headers);
  console.log("Authorization header:", req.headers.authorization);
  console.log("DEBUG_TEST:", process.env.DEBUG_TEST);
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
    const baseUrl = (
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ).replace(/\/$/, "");
    const today = new Date();
    const billingDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ); // first recurring billing next month
    const payfastData = {
      merchant_id: PAYFAST_CONFIG.MERCHANT_ID,
      merchant_key: PAYFAST_CONFIG.MERCHANT_KEY,
      return_url: `${baseUrl}/payment-success`,
      cancel_url: `${baseUrl}/job-assistant`,
      notify_url: `${baseUrl}/api/payfast-webhook`,
      name_first:
        applicationData.fullName.split(" ")[0] || applicationData.fullName,
      name_last: applicationData.fullName.split(" ").slice(1).join(" ") || "",
      email_address: user.email,
      m_payment_id: paymentReference,
      amount: "149.00",
      item_name: "Job Assistant Setup Fee",
      item_description: "One-time setup fee for Job Assistant service",
      // Subscription fields
      subscription_type: 1, // 1 = recurring
      billing_date: billingDate.toISOString().slice(0, 10), // YYYY-MM-DD
      recurring_amount: "49.00",
      frequency: 3, // 3 = monthly
      cycles: 0, // 0 = indefinite
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
    console.log("PayFast payfastData:", payfastData);
    console.log(
      "PAYFAST_CONFIG.PASS_PHRASE (masked):",
      PAYFAST_CONFIG.PASS_PHRASE
        ? PAYFAST_CONFIG.PASS_PHRASE.slice(0, 2) + "***"
        : "<undefined>"
    );
    console.log(
      "PAYFAST_TEST_PHRASE (masked):",
      process.env.PAYFAST_TEST_PHRASE
        ? process.env.PAYFAST_TEST_PHRASE.slice(0, 2) + "***"
        : "<undefined>"
    );

    // After saving application and preparing payfastData, send payment success email
    await sendEmail({
      to: user.email,
      subject: "Payment Received! Here’s What Happens Next",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f0f4f8; padding: 2rem; border-radius: 1rem; color: #222;">
          <h1 style="color: #10b981;">Thank you for your payment! 🎉</h1>
          <p style="font-size: 1.1rem;">Hi <b>${
            applicationData.fullName || "there"
          }</b>,</p>
          <p>We’ve received your payment and are excited to help you land your next remote job!</p>
          <ul style="margin: 1rem 0;">
            <li>✨ <b>Job Assistant</b>: We’ll start applying to jobs for you every day.</li>
            <li>📬 You’ll receive updates and summaries of your applications.</li>
          </ul>
          <p>If you have any questions or want to update your preferences, just reply to this email—I’m here to help!</p>
          <p style="margin-top:2rem; color:#2563eb; font-weight:bold;">To your success,<br/>Bophelo<br/>RemoteJobsSA</p>
        </div>
      `,
    });

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
