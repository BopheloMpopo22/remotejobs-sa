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
    console.log("=== PAYPAL API DEBUG ===");
    console.log("PayPal API called with body:", req.body);
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    const { applicationData, user } = req.body;

    if (!applicationData || !user) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Generate unique payment reference
    const paymentReference = `JA_${Date.now()}_${Math.random()
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

    // Create PayPal payment data
    const paypalPaymentData = {
      intent: "capture",
      purchase_units: [
        {
          amount: {
            currency_code: "ZAR",
            value: "10.00", // R10 ZAR for testing
          },
          description: "RemoteJobs SA Job Assistant - One-time Setup",
          custom_id: paymentReference,
        },
      ],
      application_context: {
        brand_name: "RemoteJobs SA",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://remotejobs-sa-i11c.vercel.app"}/?page=payment-cancel`,
      },
    };

    console.log("PayPal payment data prepared:", paymentReference);
    console.log("Application saved:", application.id);
    console.log("Returning PayPal data:", {
      paymentReference,
      applicationId: application.id,
      paypalPaymentData,
    });
    console.log("=== END PAYPAL API DEBUG ===");

    // Send payment success email
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "RemoteJobs SA <noreply@remotejobs-sa.com>",
        to: [user.email],
        subject: "Payment Successful - Job Assistant Activated! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #059669; margin: 0;">Payment Successful!</h1>
              <p style="color: #6b7280; margin: 10px 0;">Your Job Assistant service is now active</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #166534; margin-top: 0;">✅ Payment Confirmed</h2>
              <p style="color: #374151; line-height: 1.6;">
                Hi ${user.user_metadata?.full_name || user.email},
              </p>
              <p style="color: #374151; line-height: 1.6;">
                Your payment of $10.00 USD has been processed successfully. Your Job Assistant service is now active!
              </p>
              <p style="color: #374151; line-height: 1.6;">
                <strong>Payment Reference:</strong> ${paymentReference}
              </p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1e40af; margin-top: 0;">🚀 What happens next:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li><strong>Within 24 hours:</strong> We'll review your application and preferences</li>
                <li><strong>Daily applications:</strong> We'll apply to 5 relevant jobs on your behalf</li>
                <li><strong>Weekly updates:</strong> You'll receive progress reports via email</li>
                <li><strong>Direct responses:</strong> We'll forward any job responses to you</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #92400e; margin-top: 0;">📋 Your Application Details:</h3>
              <p style="color: #92400e; line-height: 1.6;">
                <strong>Desired Position:</strong> ${
                  applicationData.desiredPosition
                }<br>
                <strong>Experience Level:</strong> ${
                  applicationData.experience
                }<br>
                <strong>Salary Expectation:</strong> ${
                  applicationData.salary
                }<br>
                <strong>Remote Preference:</strong> ${
                  applicationData.remotePreference
                }
              </p>
            </div>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #991b1b; margin-top: 0;">📞 Need to make changes?</h3>
              <p style="color: #374151; line-height: 1.6;">
                If you need to update your preferences or have any questions, please contact us at:
                <br><strong>Email:</strong> support@remotejobs-sa.com
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://remotejobs-sa-i11c.vercel.app" 
                 style="display: inline-block; background: #059669; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; font-weight: 600;">
                View Your Dashboard
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; font-size: 14px;">
                Thank you for choosing RemoteJobs SA!
              </p>
              <p style="color: #6b7280; font-size: 12px;">
                © 2024 RemoteJobs SA. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
      } else {
        console.log("Payment success email sent to:", user.email);
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return res.status(200).json({
      paymentReference,
      applicationId: application.id,
      paypalPaymentData,
    });
  } catch (error) {
    console.error("PayPal payment creation error:", error);
    return res.status(500).json({
      error: "Failed to create PayPal payment",
      details: error.message,
    });
  }
}
