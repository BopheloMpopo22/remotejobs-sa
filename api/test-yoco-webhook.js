import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== TESTING YOCO WEBHOOK ===");
    
    // Test webhook data
    const testWebhookData = {
      event: "payment.succeeded",
      data: {
        id: "test_payment_123",
        amount: 17900,
        currency: "ZAR",
        metadata: {
          paymentReference: "JA_1754500535535_hlq7gvxvg", // Use the actual payment reference from your test
          userEmail: "bophelompopo22@gmail.com"
        }
      }
    };

    console.log("Test webhook data:", testWebhookData);

    // Call the webhook handler directly
    const webhookResponse = await fetch("https://remotejobs-sa-i11c.vercel.app/api/yoco-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testWebhookData),
    });

    const webhookResult = await webhookResponse.text();
    console.log("Webhook response:", webhookResult);

    return res.status(200).json({
      success: true,
      message: "Test webhook triggered",
      webhookResponse: webhookResult,
      testData: testWebhookData
    });

  } catch (error) {
    console.error("Test webhook error:", error);
    return res.status(500).json({
      error: "Test webhook failed",
      details: error.message,
    });
  }
} 