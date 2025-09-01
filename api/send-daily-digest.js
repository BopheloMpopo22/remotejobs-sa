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

    // Get all users from job_assistant_applications table
    const { data: allUsers, error: usersError } = await supabase
      .from("job_assistant_applications")
      .select("email, full_name")
      .not("email", "is", null);

    if (usersError) {
      console.error("❌ Error fetching users:", usersError);
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`✅ Found ${allUsers.length} users to send emails to`);

    if (allUsers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        date: todayString,
        emailsSent: 0,
      });
    }

    // Get top jobs from each category
    const topJobs = await getTopJobsByCategory();

    let emailsSent = 0;
    const results = [];

    // Process each user
    for (const user of allUsers) {
      try {
        const userEmail = user.email;
        const userName = user.full_name || userEmail.split("@")[0];

        console.log(`📧 Processing user: ${userEmail}`);

        // Check if user is paid (has payment confirmation)
        const { data: paymentLog } = await supabase
          .from("payment_email_logs")
          .select("user_email")
          .eq("user_email", userEmail)
          .eq("email_status", "sent")
          .gte(
            "sent_at",
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          )
          .single();

        const isPaidUser = !!paymentLog;

        // Generate email content based on user type
        const emailContent = generateDailyDigestEmail({
          userName,
          topJobs,
          isPaidUser,
          todayString,
        });

        // Send email
        const { data: emailData, error: emailError } = await resend.emails.send(
          {
            from: "RemoteJobs SA <onboarding@resend.dev>",
            to: [userEmail],
            subject: `🚀 Top Remote Jobs Today - ${todayString}`,
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

        console.log(
          `✅ Email sent successfully to ${userEmail} (${isPaidUser ? "Paid" : "Free"})`
        );
        emailsSent++;

        results.push({
          email: userEmail,
          success: true,
          userType: isPaidUser ? "paid" : "free",
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

async function getTopJobsByCategory() {
  try {
    // Define job categories
    const categories = [
      "Software Development",
      "Data & Analytics",
      "Design & Creative",
      "Marketing & Sales",
      "Customer Support",
      "Project Management",
      "Writing & Content",
      "Finance & Accounting",
    ];

    const topJobs = {};

    for (const category of categories) {
      // Get top 2 jobs for this category (you'll need to implement this based on your job data structure)
      // For now, we'll create placeholder jobs
      topJobs[category] = [
        {
          title: `Senior ${category.split(" ")[0]} Specialist`,
          company: `${category.split(" ")[0]}Corp`,
          salary: "R35,000 - R45,000/month",
          location: "Remote",
          description: `Exciting opportunity for a ${category} professional`,
        },
        {
          title: `${category.split(" ")[0]} Manager`,
          company: `${category.split(" ")[0]}Tech`,
          salary: "R40,000 - R50,000/month",
          location: "Remote",
          description: `Lead ${category} initiatives in a growing company`,
        },
      ];
    }

    return topJobs;
  } catch (error) {
    console.error("❌ Error fetching top jobs:", error);
    return {};
  }
}

function generateDailyDigestEmail({
  userName,
  topJobs,
  isPaidUser,
  todayString,
}) {
  const jobCategories = Object.keys(topJobs);
  const jobsHtml = jobCategories
    .map((category) => {
      const jobs = topJobs[category];
      const jobsList = jobs
        .map(
          (job) =>
            `<li><strong>${job.title}</strong> at <strong>${job.company}</strong><br>
       💰 ${job.salary} | 📍 ${job.location}<br>
       <small>${job.description}</small></li>`
        )
        .join("");

      return `
      <div class="category">
        <h3>${getCategoryIcon(category)} ${category}:</h3>
        <ul>${jobsList}</ul>
      </div>
    `;
    })
    .join("");

  const ctaSection = isPaidUser
    ? `
      <div class="cta-section">
        <h3>🎯 Your Job Assistant is Active!</h3>
        <p>We're actively applying to jobs on your behalf. Check your dashboard for updates.</p>
      </div>
    `
    : `
      <div class="cta-section">
        <h3>💡 Need Help with Applications?</h3>
        <p>Get professional assistance for just <strong>R179</strong> and let us handle your job applications!</p>
        <a href="https://remotejobs-sa-i11c.vercel.app/?page=job-assistant" class="cta-button">Get Job Assistant</a>
      </div>
    `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Top Remote Jobs Today</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .category { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #059669; }
        .category h3 { margin: 0 0 10px 0; color: #059669; }
        .category ul { margin: 0; padding-left: 20px; }
        .category li { margin-bottom: 10px; }
        .cta-section { background: #fef3c7; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center; }
        .cta-button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .preferences { background: #e0f2fe; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Top Remote Jobs Today</h1>
          <p>${todayString} - Curated just for you</p>
        </div>
        
        <div class="content">
          <p>Hi <strong>${userName}</strong>,</p>
          
          <p>Here are today's best remote job opportunities, handpicked from each category:</p>
          
          ${jobsHtml}
          
          ${ctaSection}
          
          <div class="preferences">
            <h3>📋 Help Us Send Better Jobs</h3>
            <p>Tell us which job categories interest you most:</p>
            <a href="https://forms.gle/your-google-form-link" class="cta-button">Update Preferences</a>
          </div>
          
          <p>See all available jobs: <a href="https://remotejobs-sa-i11c.vercel.app/?page=job-search">Browse All Jobs</a></p>
          
          <p>Best regards,<br>
          <strong>The RemoteJobs SA Team</strong></p>
        </div>
        
        <div class="footer">
          <p>You're receiving this because you signed up for RemoteJobs SA.</p>
          <p>Email: support@remotejobs-sa.com | WhatsApp: +27 72 528 9455</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getCategoryIcon(category) {
  const icons = {
    "Software Development": "💻",
    "Data & Analytics": "📊",
    "Design & Creative": "🎨",
    "Marketing & Sales": "📈",
    "Customer Support": "💬",
    "Project Management": "📋",
    "Writing & Content": "✍️",
    "Finance & Accounting": "💰",
  };
  return icons[category] || "💼";
}
