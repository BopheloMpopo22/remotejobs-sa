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

    // Get all users from users table (daily digest recipients)
    const { data: dailyDigestUsers, error: usersError } = await supabase
      .from("users")
      .select("email, full_name, email_preferences")
      .eq("is_active", true)
      .eq("email_preferences->daily_digest", true);

    if (usersError) {
      console.error("❌ Error fetching daily digest users:", usersError);
      return res.status(500).json({ error: "Database error" });
    }

    // Filter users who want daily digest emails
    const allUsers = dailyDigestUsers
      .filter((user) => user.email_preferences?.daily_digest)
      .map((user) => ({
        email: user.email,
        full_name: user.full_name || user.email.split("@")[0],
      }));

    console.log(
      `✅ Found ${allUsers.length} users from users table for daily digest`
    );

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

    // Process users in batches to avoid timeout and respect Resend rate limits
    const batchSize = 2; // Reduced to respect Resend's 2 requests per second limit
    const batches = [];
    for (let i = 0; i < allUsers.length; i += batchSize) {
      batches.push(allUsers.slice(i, i + batchSize));
    }

    console.log(
      `📦 Processing ${allUsers.length} users in ${batches.length} batches of ${batchSize}`
    );

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(
        `🔄 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} users)`
      );

      // Process batch in parallel (but only 2 at a time to respect rate limits)
      const batchPromises = batch.map(async (user) => {
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
          console.log(`📧 Attempting to send email to: ${userEmail}`);
          const { data: emailData, error: emailError } =
            await resend.emails.send({
              from: "RemoteJobs SA <onboarding@resend.dev>",
              to: [userEmail],
              subject: `🚀 Top Remote Jobs Today - ${todayString}`,
              html: emailContent,
            });

          if (emailError) {
            console.error(
              `❌ Error sending email to ${userEmail}:`,
              JSON.stringify(emailError, null, 2)
            );
            return {
              email: userEmail,
              success: false,
              error:
                emailError.message ||
                `Email sending failed: ${JSON.stringify(emailError)}`,
            };
          }

          console.log(
            `✅ Email sent successfully to ${userEmail}, ID: ${emailData?.id}`
          );

          console.log(
            `✅ Email sent successfully to ${userEmail} (${isPaidUser ? "Paid" : "Free"})`
          );
          emailsSent++;

          return {
            email: userEmail,
            success: true,
            userType: isPaidUser ? "paid" : "free",
          };
        } catch (userError) {
          console.error(`❌ Error processing user ${user.email}:`, userError);
          return {
            email: user.email,
            success: false,
            error: userError.message || "Unknown error occurred",
          };
        }
      });

      // Wait for batch to complete
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Delay between batches to respect Resend rate limits (2 requests per second)
      if (batchIndex < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay between batches
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
    // Define job categories and their Adzuna category mappings (using actual Adzuna category values)
    const categoryMappings = {
      "Software Development": [
        "it-jobs",
        "engineering-jobs",
        "scientific-qa-jobs",
      ],
      "Data & Analytics": ["it-jobs", "scientific-qa-jobs", "consultancy-jobs"],
      "Design & Creative": [
        "creative-design-jobs",
        "it-jobs",
        "pr-advertising-marketing-jobs",
      ],
      "Marketing & Sales": [
        "pr-advertising-marketing-jobs",
        "sales-jobs",
        "consultancy-jobs",
      ],
      "Customer Support": [
        "customer-services-jobs",
        "admin-jobs",
        "retail-jobs",
      ],
      "Project Management": ["admin-jobs", "consultancy-jobs", "hr-jobs"],
      "Writing & Content": [
        "creative-design-jobs",
        "pr-advertising-marketing-jobs",
        "other-general-jobs",
      ],
      "Finance & Accounting": [
        "accounting-finance-jobs",
        "admin-jobs",
        "consultancy-jobs",
      ],
    };

    const topJobs = {};

    for (const [category, searchTerms] of Object.entries(categoryMappings)) {
      try {
        // Fetch jobs from Adzuna API for this category
        const jobs = await fetchJobsFromAdzuna(searchTerms);

        // Get top 2 jobs (highest salary or most recent)
        const top2Jobs = jobs
          .sort((a, b) => {
            // Sort by salary first, then by date
            const salaryA = extractSalary(a.salary_max || a.salary_min || 0);
            const salaryB = extractSalary(b.salary_max || b.salary_min || 0);
            if (salaryA !== salaryB) return salaryB - salaryA;
            return new Date(b.created) - new Date(a.created);
          })
          .slice(0, 2)
          .map((job) => ({
            title: job.title,
            company: job.company.display_name,
            salary: formatSalary(job.salary_min, job.salary_max),
            location: job.location.display_name,
            description: job.description.substring(0, 100) + "...",
            url: job.redirect_url,
          }));

        topJobs[category] = top2Jobs;
      } catch (error) {
        console.error(`❌ Error fetching jobs for ${category}:`, error);
        // Fallback to placeholder jobs
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
    }

    return topJobs;
  } catch (error) {
    console.error("❌ Error fetching top jobs:", error);
    return {};
  }
}

async function fetchJobsFromAdzuna(searchTerms) {
  try {
    const allJobs = [];

    // Use the same Adzuna credentials as the frontend
    const APP_ID = "6d779b8f";
    const API_KEY = "9854bcbf1e37c466be4206d7a2114d8a";

    for (const term of searchTerms) {
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=10&category=${term}&what=remote&content-type=application/json`
        );

        if (!response.ok) {
          console.error(`❌ Adzuna API error for ${term}:`, response.status);
          continue;
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          console.log(`✅ Found ${data.results.length} jobs for ${term}`);
          allJobs.push(...data.results);
        } else {
          console.log(`⚠️ No jobs found for ${term}`);
        }
      } catch (termError) {
        console.error(`❌ Error fetching jobs for ${term}:`, termError);
      }
    }

    console.log(`📊 Total jobs fetched: ${allJobs.length}`);
    return allJobs;
  } catch (error) {
    console.error("❌ Error fetching from Adzuna:", error);
    return [];
  }
}

function extractSalary(salary) {
  if (typeof salary === "number") return salary;
  if (typeof salary === "string") {
    const match = salary.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  }
  return 0;
}

function formatSalary(min, max) {
  if (!min && !max) return "Salary not specified";
  if (min && max) {
    return `R${(min / 1000).toFixed(0)}k - R${(max / 1000).toFixed(0)}k/month`;
  }
  const salary = min || max;
  return `R${(salary / 1000).toFixed(0)}k/month`;
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
       <small>${job.description}</small><br>
       <a href="${job.url}" style="color: #059669; font-size: 12px;">View Job →</a></li>`
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
         .community { background: #f3e8ff; padding: 15px; margin: 15px 0; border-radius: 5px; }
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
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfY2EwF975bdXzKYYCLRUNK4fH5UJt73eT92X0kIgRYLji6xg/viewform?usp=header" class="cta-button">Update Preferences</a>
            </div>
            
            <div class="community">
              <h3>👥 Join Our Remote Jobs Community</h3>
              <p>Connect with other remote job seekers, share opportunities, and get support:</p>
              <a href="https://www.facebook.com/share/g/1C2gFwgVRH/" class="cta-button" style="background: #1877f2;">Join Facebook Group</a>
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
