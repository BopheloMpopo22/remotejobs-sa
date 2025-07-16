// PayFast Configuration
export const PAYFAST_CONFIG = {
  // Job Assistant Subscription
  JOB_ASSISTANT_SETUP_PRICE: 149.0, // R149.00
  JOB_ASSISTANT_MONTHLY_PRICE: 49.0, // R49.00

  // Currency
  CURRENCY: "ZAR", // South African Rand

  // PayFast URLs
  SANDBOX_URL: "https://sandbox.payfast.co.za/eng/process",
  LIVE_URL: "https://www.payfast.co.za/eng/process",

  // Success and cancel URLs
  SUCCESS_URL: `${window.location.origin}/payment-success`,
  CANCEL_URL: `${window.location.origin}/job-assistant`,
  NOTIFY_URL: `${window.location.origin}/api/payfast-webhook`,

  // Payment methods
  PAYMENT_METHODS: ["cc", "eft", "mpesa", "snapscan"],

  // Item details
  ITEM_NAME: "Job Assistant Setup",
  ITEM_DESCRIPTION: "One-time setup fee for Job Assistant service",
};

// Helper function to format prices
export const formatPrice = (amount: number): string => {
  return `R${amount.toFixed(2)}`;
};

// Helper function to generate PayFast signature
export const generatePayFastSignature = (
  data: Record<string, string>,
  passphrase: string
): string => {
  const crypto = require("crypto");

  // Create signature string
  let signatureString = "";
  Object.keys(data)
    .sort()
    .forEach((key) => {
      if (key !== "signature" && data[key] !== "") {
        signatureString += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          "+"
        )}&`;
      }
    });

  // Remove trailing &
  signatureString = signatureString.slice(0, -1);

  // Add passphrase if provided
  if (passphrase) {
    signatureString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }

  // Generate MD5 hash
  return crypto.createHash("md5").update(signatureString).digest("hex");
};

// Helper function to validate PayFast signature
export const validatePayFastSignature = (
  data: Record<string, string>,
  signature: string,
  passphrase: string
): boolean => {
  const expectedSignature = generatePayFastSignature(data, passphrase);
  return expectedSignature === signature;
};
