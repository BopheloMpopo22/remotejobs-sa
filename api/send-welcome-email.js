import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user } = req.body;

    if (!user || !user.email) {
      return res.status(400).json({ error: "Missing user email" });
    }

    const { data, error } = await resend.emails.send({
      from: "RemoteJobs SA <noreply@remotejobs-sa.com>",
      to: [user.email],
      subject: "Welcome to RemoteJobs SA! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Welcome to RemoteJobs SA!</h1>
            <p style="color: #6b7280; margin: 10px 0;">Your account has been created successfully</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">🎉 Welcome aboard!</h2>
            <p style="color: #374151; line-height: 1.6;">
              Hi ${user.user_metadata?.full_name || user.email},
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining RemoteJobs SA! We're excited to help you find your next remote opportunity.
            </p>
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-top: 0;">What you can do now:</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>🔍 Search and browse remote job opportunities</li>
              <li>📄 Create professional CVs with our CV Generator</li>
              <li>🤖 Use our Job Assistant service for automated applications</li>
              <li>📊 Track your application progress</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">💡 Pro Tip:</h3>
            <p style="color: #92400e; line-height: 1.6;">
              Try our Job Assistant service to let us apply to 5 jobs daily on your behalf! 
              Save time and increase your chances of landing interviews.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://remotejobs-sa-i11c.vercel.app" 
               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: 600;">
              Start Exploring Jobs
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              If you have any questions, feel free to reach out to us.
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

    console.log("Welcome email sent successfully to:", user.email);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
