import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("🧪 Testing daily digest email system...");

    // Get test date (today)
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    console.log("📅 Test date:", todayString);

    // Get all paid job assistant applications
    const { data: paidApplications, error: paidError } = await supabase
      .from("job_assistant_applications")
      .select("*")
      .eq("status", "paid");

    if (paidError) {
      console.error("❌ Error fetching paid applications:", paidError);
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`✅ Found ${paidApplications.length} paid applications`);

    if (paidApplications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No paid applications found to test with",
        date: todayString,
      });
    }

    // Test with the first paid application
    const testUser = paidApplications[0];
    const userEmail = testUser.email;
    const userName = testUser.full_name || userEmail.split("@")[0];

    console.log(`🧪 Testing with user: ${userEmail}`);

    // Get user's job applications for today
    const { data: todaysApplications, error: appError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_email", userEmail)
      .eq("application_date", todayString);

    if (appError) {
      console.error(
        `❌ Error fetching applications for ${userEmail}:`,
        appError
      );
      return res.status(500).json({ error: "Database error" });
    }

    // Get user's total applications and responses
    const { data: allApplications, error: totalError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_email", userEmail);

    if (totalError) {
      console.error(
        `❌ Error fetching total applications for ${userEmail}:`,
        totalError
      );
      return res.status(500).json({ error: "Database error" });
    }

    // Calculate statistics
    const totalApplications = allApplications.length;
    const totalResponses = allApplications.filter(
      (app) => app.status === "responded"
    ).length;
    const todaysCount = todaysApplications.length;

    console.log(`📊 Test statistics:`);
    console.log(`- Today's applications: ${todaysCount}`);
    console.log(`- Total applications: ${totalApplications}`);
    console.log(`- Total responses: ${totalResponses}`);

    // Generate test email content
    const emailContent = generateTestEmail({
      userName,
      todaysApplications,
      totalApplications,
      totalResponses,
      todaysCount,
      testMode: true,
    });

    // Send test email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "RemoteJobs SA <noreply@remotejobs-sa.com>",
      to: [userEmail],
      subject: `🧪 TEST: Daily Job Application Report - ${todayString}`,
      html: emailContent,
    });

    if (emailError) {
      console.error(`❌ Error sending test email to ${userEmail}:`, emailError);
      return res
        .status(500)
        .json({ error: "Email sending failed", details: emailError });
    }

    console.log(`✅ Test email sent successfully to ${userEmail}`);

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully",
      testUser: {
        email: userEmail,
        name: userName,
      },
      statistics: {
        todaysApplications: todaysCount,
        totalApplications,
        totalResponses,
      },
      date: todayString,
    });
  } catch (error) {
    console.error("❌ Test daily digest error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function generateTestEmail({
  userName,
  todaysApplications,
  totalApplications,
  totalResponses,
  todaysCount,
  testMode,
}) {
  const applicationsList =
    todaysApplications.length > 0
      ? todaysApplications
          .map(
            (app) =>
              `<li><strong>${app.job_title}</strong> at <strong>${app.company}</strong> - ${app.location}</li>`
          )
          .join("")
      : "<li><em>No applications recorded for today (this is normal for testing)</em></li>";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TEST: Daily Job Application Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .stats { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .applications { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .highlight { color: #059669; font-weight: bold; }
        .test-banner { background: #fbbf24; color: #92400e; padding: 10px; text-align: center; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="test-banner">
          🧪 TEST EMAIL - Daily Digest System
        </div>
        
        <div class="header">
          <h1>📊 Daily Job Application Report</h1>
          <p>Your automated job search update</p>
        </div>
        
        <div class="content">
          <p>Hi <strong>${userName}</strong>,</p>
          
          <p><strong>🧪 This is a test email</strong> to verify the daily digest system is working correctly.</p>
          
          <p>Here's your daily job application report:</p>
          
          <div class="stats">
            <h3>📈 Today's Summary</h3>
            <p><span class="highlight">${todaysCount}</span> new applications sent today</p>
            <p><span class="highlight">${totalApplications}</span> total applications sent</p>
            <p><span class="highlight">${totalResponses}</span> responses received</p>
          </div>
          
          <div class="applications">
            <h3>📋 Today's Applications (${todaysCount} jobs):</h3>
            <ul>
              ${applicationsList}
            </ul>
          </div>
          
          <div class="stats">
            <h3>🎯 Your Progress</h3>
            <p>We're actively searching for remote opportunities that match your criteria:</p>
            <ul>
              <li>✅ Daily job applications: <strong>${todaysCount}/5</strong></li>
              <li>📊 Total applications sent: <strong>${totalApplications}</strong></li>
              <li>📨 Responses received: <strong>${totalResponses}</strong></li>
              <li>📈 Success rate: <strong>${totalApplications > 0 ? Math.round((totalResponses / totalApplications) * 100) : 0}%</strong></li>
            </ul>
          </div>
          
          <p><strong>💡 Tip:</strong> Keep your preferences updated to get the most relevant job matches!</p>
          
          <p>We'll continue working to find you the best remote opportunities. If you have any questions or want to update your preferences, just reply to this email.</p>
          
          <p>Best regards,<br>
          <strong>The RemoteJobs SA Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>🧪 TEST EMAIL</strong> - This is an automated test report from your Job Assistant service.</p>
          <p>Email: support@remotejobs-sa.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
