import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== PAYPAL SUBSCRIPTION PLAN CREATION ===");

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const baseUrl =
      process.env.PAYPAL_MODE === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Get access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Failed to get PayPal access token:", tokenData);
      return res
        .status(500)
        .json({ error: "Failed to authenticate with PayPal" });
    }

    // Create subscription plan
    const planData = {
      product_id: "PROD-REMOTEJOBS-SA", // You'll need to create this product first
      name: "Job Assistant Monthly Subscription",
      description: "Monthly subscription for Job Assistant service",
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1,
          },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // Unlimited
          pricing_scheme: {
            fixed_price: {
              value: "5.00",
              currency_code: "USD",
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: "10.00",
          currency_code: "USD",
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    };

    const planResponse = await fetch(`${baseUrl}/v1/billing/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planData),
    });

    const planResult = await planResponse.json();

    if (planResponse.ok) {
      console.log("Subscription plan created:", planResult);
      return res.status(200).json({
        success: true,
        planId: planResult.id,
        plan: planResult,
      });
    } else {
      console.error("Failed to create subscription plan:", planResult);
      return res.status(500).json({
        error: "Failed to create subscription plan",
        details: planResult,
      });
    }
  } catch (error) {
    console.error("PayPal subscription plan creation error:", error);
    return res.status(500).json({
      error: "Failed to create subscription plan",
      details: error.message,
    });
  }
}
