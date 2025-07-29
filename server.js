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
