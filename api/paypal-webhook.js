import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("PayPal webhook received:", req.body);

    // Basic webhook handling for PayPal
    const { payment_status, payment_id, custom_id } = req.body;

    if (payment_status === "COMPLETED") {
      // Update application status to paid
      const { error } = await supabase
        .from("job_assistant_applications")
        .update({
          status: "paid",
          paypal_payment_id: payment_id,
          updated_at: new Date().toISOString(),
        })
        .eq("payment_reference", custom_id);

      if (error) {
        console.error("Database update error:", error);
      } else {
        console.log("Payment status updated successfully");
      }
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
