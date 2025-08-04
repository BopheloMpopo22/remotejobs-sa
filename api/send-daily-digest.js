import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow both GET (for manual triggers) and POST (for automated calls)
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("📧 Starting daily digest email system...");

    // Get today's date
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    console.log("📅 Processing for date:", todayString);

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
        message: "No paid applications found",
        date: todayString,
        emailsSent: 0,
      });
    }

    let emailsSent = 0;
    const results = [];

    // Process each paid user
    for (const user of paidApplications) {
      try {
        const userEmail = user.email;
        const userName = user.full_name || userEmail.split("@")[0];

        console.log(`📧 Processing user: ${userEmail}`);

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
          continue;
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
          continue;
        }

        // Calculate statistics
        const totalApplications = allApplications.length;
        const totalResponses = allApplications.filter(
          (app) => app.status === "responded"
        ).length;
        const todaysCount = todaysApplications.length;

        console.log(`📊 Statistics for ${userEmail}:`);
        console.log(`- Today's applications: ${todaysCount}`);
        console.log(`- Total applications: ${totalApplications}`);
        console.log(`- Total responses: ${totalResponses}`);

        // Generate email content
        const emailContent = generateDailyDigestEmail({
          userName,
          todaysApplications,
          totalApplications,
          totalResponses,
          todaysCount,
        });

        // Send email
        const { data: emailData, error: emailError } = await resend.emails.send(
          {
            from: "RemoteJobs SA <noreply@remotejobs-sa.com>",
            to: [userEmail],
            subject: `📊 Daily Job Application Report - ${todayString}`,
            html: emailContent,
          }
        );

        if (emailError) {
          console.error(`❌ Error sending email to ${userEmail}:`, emailError);
          results.push({
            email: userEmail,
            success: false,
            error: emailError.message,
          });
          continue;
        }

        console.log(`✅ Email sent successfully to ${userEmail}`);
        emailsSent++;

        // Update user's application statistics
        await supabase
          .from("job_assistant_applications")
          .update({
            applications_sent: totalApplications,
            responses_received: totalResponses,
            last_application_date: todayString,
          })
          .eq("id", user.id);

        results.push({
          email: userEmail,
          success: true,
          statistics: {
            todaysApplications: todaysCount,
            totalApplications,
            totalResponses,
          },
        });
      } catch (userError) {
        console.error(`❌ Error processing user ${user.email}:`, userError);
        results.push({
          email: user.email,
          success: false,
          error: userError.message,
        });
      }
    }

    console.log(`🎉 Daily digest completed. ${emailsSent} emails sent.`);

    return res.status(200).json({
      success: true,
      message: "Daily digest completed",
      date: todayString,
      emailsSent,
      results,
    });
  } catch (error) {
    console.error("❌ Daily digest error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function generateDailyDigestEmail({
  userName,
  todaysApplications,
  totalApplications,
  totalResponses,
  todaysCount,
}) {
  const applicationsList =
    todaysApplications.length > 0
      ? todaysApplications
          .map(
            (app) =>
              `<li><strong>${app.job_title}</strong> at <strong>${app.company}</strong> - ${app.location}</li>`
          )
          .join("")
      : "<li><em>No new applications recorded for today</em></li>";

  const successRate =
    totalApplications > 0
      ? Math.round((totalResponses / totalApplications) * 100)
      : 0;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Daily Job Application Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .stats { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .applications { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .highlight { color: #059669; font-weight: bold; }
        .success-rate { color: #059669; font-size: 18px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Daily Job Application Report</h1>
          <p>Your automated job search update</p>
        </div>
        
        <div class="content">
          <p>Hi <strong>${userName}</strong>,</p>
          
          <p>Here's your daily job application report:</p>
          
          <div class="stats">
            <h3>📈 Today's Summary</h3>
            <p><span class="highlight">${todaysCount}</span> new applications sent today</p>
            <p><span class="highlight">${totalApplications}</span> total applications sent</p>
            <p><span class="highlight">${totalResponses}</span> responses received</p>
            <p class="success-rate">Success Rate: ${successRate}%</p>
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
              <li>📈 Success rate: <strong>${successRate}%</strong></li>
            </ul>
          </div>
          
          <p><strong>💡 Tip:</strong> Keep your preferences updated to get the most relevant job matches!</p>
          
          <p>We'll continue working to find you the best remote opportunities. If you have any questions or want to update your preferences, just reply to this email.</p>
          
          <p>Best regards,<br>
          <strong>The RemoteJobs SA Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This is an automated report from your Job Assistant service.</p>
          <p>Email: support@remotejobs-sa.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
