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
    const { userEmail, yocoPaymentId, amount } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    console.log("=== MANUAL PAYMENT CONFIRMATION ===");
    console.log("Email:", userEmail);
    console.log("Yoco Payment ID:", yocoPaymentId);
    console.log("Amount:", amount);

    // Find the most recent pending record for this email
    const { data: records, error: findError } = await supabase
      .from("job_assistant_applications")
      .select("*")
      .eq("email", userEmail)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1);

    if (findError) {
      console.error("Error finding records:", findError);
      return res
        .status(500)
        .json({ error: "Database error", details: findError.message });
    }

    if (!records || records.length === 0) {
      console.log("No pending records found for email:", userEmail);
      return res
        .status(404)
        .json({ error: "No pending records found for this email" });
    }

    const record = records[0];
    console.log("Found record to update:", record.id);

    // Update the record
    const { data: updateData, error: updateError } = await supabase
      .from("job_assistant_applications")
      .update({
        status: "paid",
        payment_confirmed_at: new Date().toISOString(),
        yoco_payment_id: yocoPaymentId || record.yoco_payment_id,
      })
      .eq("id", record.id)
      .select();

    if (updateError) {
      console.error("Update error:", updateError);
      return res
        .status(500)
        .json({
          error: "Failed to update record",
          details: updateError.message,
        });
    }

    console.log("Record updated successfully:", updateData);

    // Also log to payment_email_logs if not already there
    const { data: existingLogs, error: logCheckError } = await supabase
      .from("payment_email_logs")
      .select("*")
      .eq("user_email", userEmail)
      .eq("yoco_payment_id", yocoPaymentId || record.yoco_payment_id);

    if (!logCheckError && (!existingLogs || existingLogs.length === 0)) {
      const { error: logError } = await supabase
        .from("payment_email_logs")
        .insert({
          user_email: userEmail,
          yoco_payment_id: yocoPaymentId || record.yoco_payment_id,
          amount: amount || 17900,
          payment_reference: record.payment_reference,
          email_status: "sent",
        });

      if (logError) {
        console.error("Error logging to payment_email_logs:", logError);
      } else {
        console.log("Payment logged to email logs");
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment manually confirmed",
      record: updateData[0],
    });
  } catch (error) {
    console.error("Manual payment confirmation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
