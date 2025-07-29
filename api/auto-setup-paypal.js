export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== AUTOMATIC PAYPAL SETUP ===");

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const baseUrl = "https://api-m.sandbox.paypal.com"; // Force sandbox for now

    console.log("Using sandbox URL:", baseUrl);
    console.log("Client ID available:", !!clientId);
    console.log("Client Secret available:", !!clientSecret);

    if (!clientId || !clientSecret) {
      return res.status(400).json({
        error: "Missing PayPal credentials",
        message:
          "Please add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to your environment variables",
      });
    }

    // Step 1: Get access token
    console.log("Getting access token...");
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
      return res.status(500).json({
        error: "Failed to authenticate with PayPal",
        details: tokenData,
      });
    }

    console.log("✅ Access token obtained successfully");

    // Step 2: Create Product
    console.log("Creating product...");
    const productData = {
      name: "RemoteJobs SA Job Assistant",
      description: "Job Assistant service for automated job applications",
      type: "SERVICE",
      category: "SOFTWARE",
      image_url: "https://remotejobs-sa-i11c.vercel.app/favicon2-32x32.png",
      home_url: "https://remotejobs-sa-i11c.vercel.app",
    };

    const productResponse = await fetch(`${baseUrl}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(productData),
    });

    const productResult = await productResponse.json();

    if (!productResponse.ok) {
      console.error("Failed to create product:", productResult);
      return res.status(500).json({
        error: "Failed to create product",
        details: productResult,
      });
    }

    console.log("✅ Product created:", productResult.id);

    // Step 3: Create Subscription Plan
    console.log("Creating subscription plan...");
    const planData = {
      product_id: productResult.id,
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
        Prefer: "return=representation",
      },
      body: JSON.stringify(planData),
    });

    const planResult = await planResponse.json();

    if (planResponse.ok) {
      console.log("✅ Subscription plan created:", planResult.id);

      return res.status(200).json({
        success: true,
        message: "PayPal setup completed successfully!",
        credentials: {
          clientId: clientId,
          clientSecret: "***hidden***",
          mode: "sandbox",
        },
        product: {
          id: productResult.id,
          name: productResult.name,
        },
        plan: {
          id: planResult.id,
          name: planResult.name,
        },
        environmentVariables: {
          PAYPAL_CLIENT_ID: clientId,
          PAYPAL_CLIENT_SECRET: "***add your client secret***",
          PAYPAL_MODE: "sandbox",
          PAYPAL_SUBSCRIPTION_PLAN_ID: planResult.id,
        },
      });
    } else {
      console.error("Failed to create subscription plan:", planResult);
      return res.status(500).json({
        error: "Failed to create subscription plan",
        details: planResult,
      });
    }
  } catch (error) {
    console.error("PayPal setup error:", error);
    return res.status(500).json({
      error: "Failed to setup PayPal",
      details: error.message,
    });
  }
}
