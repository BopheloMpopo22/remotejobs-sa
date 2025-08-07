import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== YOCO WEBHOOK ===");
    const { type, payload } = req.body;

    console.log("Webhook type:", type);
    console.log("Webhook payload:", payload);
    console.log("Full webhook body:", JSON.stringify(req.body, null, 2));

    if (type === "payment.succeeded") {
      const { id, amount, currency, metadata } = payload;

      // Update application status
      console.log(
        "Attempting to update database for email:",
        metadata.userEmail
      );

      const { data: updateData, error: updateError } = await supabase
        .from("job_assistant_applications")
        .update({
          status: "paid",
          payment_confirmed_at: new Date().toISOString(),
          yoco_payment_id: id,
        })
        .eq("email", metadata.userEmail)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .select();

      if (updateError) {
        console.error("Database update error:", updateError);
        return res
          .status(500)
          .json({ error: "Failed to update payment status" });
      }

      console.log("Database update result:", updateData);
      console.log("Rows updated:", updateData?.length || 0);

      // Send confirmation email
      try {
        const { data: emailData, error: emailError } = await resend.emails.send(
          {
            from: "RemoteJobs SA <onboarding@resend.dev>",
            to: [metadata.userEmail],
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
                  Your payment of R${(amount / 100).toFixed(2)} has been processed successfully. 
                  Your Job Assistant service is now active!
                </p>
                <p style="color: #374151; line-height: 1.6;">
                  <strong>Payment Reference:</strong> ${metadata.paymentReference}
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
          }
        );

        if (emailError) {
          console.error("Email sending error:", emailError);
        } else {
          console.log("Payment success email sent to:", metadata.userEmail);
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      console.log("Payment processed successfully:", id);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Yoco webhook error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
