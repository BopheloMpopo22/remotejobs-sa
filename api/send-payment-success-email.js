import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user, applicationData, paymentReference } = req.body;

    if (!user || !user.email) {
      return res.status(400).json({ error: "Missing user email" });
    }

    const { data, error } = await resend.emails.send({
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
              <strong>Salary Expectation:</strong> ${applicationData.salary}<br>
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

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    console.log("Payment success email sent successfully to:", user.email);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
