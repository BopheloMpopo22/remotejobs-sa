// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static("public"));

// API Routes
app.get("/api/test-paypal-auth", async (req, res) => {
  try {
    console.log("=== PAYPAL AUTH TEST ===");

    // Check environment variables
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const mode = process.env.PAYPAL_MODE || "sandbox";

    console.log("Environment check:");
    console.log("- PAYPAL_CLIENT_ID:", clientId ? "SET" : "MISSING");
    console.log("- PAYPAL_CLIENT_SECRET:", clientSecret ? "SET" : "MISSING");
    console.log("- PAYPAL_MODE:", mode);

    if (!clientId || !clientSecret) {
      return res.status(400).json({
        error: "Missing PayPal credentials",
        message:
          "Please add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to your environment variables",
        environment: {
          clientId: clientId ? "SET" : "MISSING",
          clientSecret: clientSecret ? "SET" : "MISSING",
          mode: mode,
        },
      });
    }

    // Test authentication
    const baseUrl =
      mode === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    console.log("Testing authentication with:", baseUrl);

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
      console.error("Authentication failed:", tokenData);
      return res.status(500).json({
        error: "PayPal authentication failed",
        details: tokenData,
        environment: {
          clientId: clientId ? "SET" : "MISSING",
          clientSecret: clientSecret ? "SET" : "MISSING",
          mode: mode,
        },
      });
    }

    console.log("✅ Authentication successful!");

    return res.status(200).json({
      success: true,
      message: "PayPal authentication successful!",
      environment: {
        clientId: "SET",
        clientSecret: "SET",
        mode: mode,
      },
      tokenInfo: {
        expiresIn: tokenData.expires_in,
        tokenType: tokenData.token_type,
      },
    });
  } catch (error) {
    console.error("PayPal auth test error:", error);
    return res.status(500).json({
      error: "PayPal authentication test failed",
      details: error.message,
    });
  }
});

// PayPal setup API
app.post("/api/auto-setup-paypal", async (req, res) => {
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
});

// PayPal subscription creation API
app.post("/api/create-paypal-subscription", async (req, res) => {
  try {
    console.log("=== PAYPAL SUBSCRIPTION CREATION ===");
    const { applicationData, user } = req.body;

    if (!applicationData || !user) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Generate unique subscription reference
    const subscriptionReference = `SUB_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const baseUrl = "https://api-m.sandbox.paypal.com";

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

    // Create subscription
    const subscriptionData = {
      plan_id: process.env.PAYPAL_SUBSCRIPTION_PLAN_ID || "P-REMOTEJOBS-SA", // You'll need to create this plan
      start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Start tomorrow
      subscriber: {
        name: {
          given_name: applicationData.fullName.split(" ")[0] || "User",
          surname:
            applicationData.fullName.split(" ").slice(1).join(" ") || "Name",
        },
        email_address: user.email,
      },
      application_context: {
        brand_name: "RemoteJobs SA",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5174"}/?page=subscription-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5174"}/?page=subscription-cancel`,
      },
      custom_id: subscriptionReference,
    };

    const subscriptionResponse = await fetch(
      `${baseUrl}/v1/billing/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(subscriptionData),
      }
    );

    const subscriptionResult = await subscriptionResponse.json();

    if (subscriptionResponse.ok) {
      console.log("PayPal subscription created:", subscriptionResult);

      return res.status(200).json({
        success: true,
        subscriptionId: subscriptionResult.id,
        subscriptionReference,
        applicationId: "test-application-id",
        approvalUrl: subscriptionResult.links.find(
          (link) => link.rel === "approve"
        )?.href,
        subscription: subscriptionResult,
      });
    } else {
      console.error(
        "Failed to create PayPal subscription:",
        subscriptionResult
      );
      return res.status(500).json({
        error: "Failed to create subscription",
        details: subscriptionResult,
      });
    }
  } catch (error) {
    console.error("PayPal subscription creation error:", error);
    return res.status(500).json({
      error: "Failed to create subscription",
      details: error.message,
    });
  }
});

// Simple route for testing
app.get("/", (req, res) => {
  res.send(
    "Server is running! Visit /test-paypal-auth.html to test PayPal credentials."
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Test PayPal auth: http://localhost:${PORT}/api/test-paypal-auth`
  );
  console.log(`Test page: http://localhost:${PORT}/test-paypal-auth.html`);
});
