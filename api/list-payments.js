import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== LISTING PAYMENT REFERENCES ===");

    // Get all payment references from the database
    const { data: payments, error } = await supabase
      .from("job_assistant_applications")
      .select("id, payment_reference, status, created_at, email")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({
        error: "Failed to fetch payments",
        details: error.message,
      });
    }

    console.log("Found payments:", payments);

    return res.status(200).json({
      success: true,
      message: "Payment references retrieved",
      payments: payments,
      count: payments.length,
    });
  } catch (error) {
    console.error("List payments error:", error);
    return res.status(500).json({
      error: "Failed to list payments",
      details: error.message,
    });
  }
}
