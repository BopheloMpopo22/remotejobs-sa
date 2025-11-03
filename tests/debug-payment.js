import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    console.log("=== DEBUG PAYMENT ===");
    console.log("Looking for records for email:", userEmail);

    // Get all records for this email
    const { data: records, error } = await supabase
      .from("job_assistant_applications")
      .select("*")
      .eq("email", userEmail)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return res
        .status(500)
        .json({ error: "Database error", details: error.message });
    }

    console.log("Found records:", records);

    // Check payment email logs
    const { data: emailLogs, error: emailError } = await supabase
      .from("payment_email_logs")
      .select("*")
      .eq("user_email", userEmail)
      .order("sent_at", { ascending: false });

    if (emailError) {
      console.error("Email logs error:", emailError);
    } else {
      console.log("Payment email logs:", emailLogs);
    }

    return res.status(200).json({
      records,
      emailLogs,
      summary: {
        totalRecords: records?.length || 0,
        pendingRecords:
          records?.filter((r) => r.status === "pending").length || 0,
        paidRecords: records?.filter((r) => r.status === "paid").length || 0,
        emailLogsCount: emailLogs?.length || 0,
      },
    });
  } catch (error) {
    console.error("Debug payment error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
