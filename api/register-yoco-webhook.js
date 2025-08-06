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
    console.log("=== REGISTERING YOCO WEBHOOK ===");

    const webhookUrl = "https://remotejobs-sa-i11c.vercel.app/api/yoco-webhook";

    console.log("Registering webhook URL:", webhookUrl);
    console.log(
      "Using YOCO_SECRET_KEY:",
      process.env.YOCO_SECRET_KEY?.substring(0, 20) + "..."
    );

    const response = await fetch("https://payments.yoco.com/api/webhooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ["payment.succeeded", "payment.failed"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Webhook registration error:", errorData);
      return res.status(500).json({
        error: "Failed to register webhook",
        details: errorData,
      });
    }

    const result = await response.json();
    console.log("Webhook registered successfully:", result);

    return res.status(200).json({
      success: true,
      message: "Webhook registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Webhook registration error:", error);
    return res.status(500).json({
      error: "Failed to register webhook",
      details: error.message,
    });
  }
}
