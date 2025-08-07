import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter required" });
  }

  try {
    console.log("=== CHECKING PAYMENT STATUS ===");
    console.log("Email:", email);

    // Check application status
    const { data: applications, error: appError } = await supabase
      .from("job_assistant_applications")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    // Check email logs
    const { data: emailLogs, error: emailError } = await supabase
      .from("payment_email_logs")
      .select("*")
      .eq("user_email", email)
      .order("sent_at", { ascending: false });

    if (appError) {
      console.error("Application query error:", appError);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }

    if (emailError) {
      console.error("Email logs query error:", emailError);
      return res.status(500).json({ error: "Failed to fetch email logs" });
    }

    console.log("Applications found:", applications?.length || 0);
    console.log("Email logs found:", emailLogs?.length || 0);

    return res.status(200).json({
      success: true,
      email: email,
      applications: applications || [],
      emailLogs: emailLogs || [],
      summary: {
        totalApplications: applications?.length || 0,
        paidApplications:
          applications?.filter((app) => app.status === "paid").length || 0,
        pendingApplications:
          applications?.filter((app) => app.status === "pending").length || 0,
        totalEmailsSent:
          emailLogs?.filter((log) => log.email_status === "sent").length || 0,
        totalEmailsFailed:
          emailLogs?.filter((log) => log.email_status === "failed").length || 0,
      },
    });
  } catch (error) {
    console.error("Payment status check error:", error);
    return res.status(500).json({ error: "Failed to check payment status" });
  }
}
