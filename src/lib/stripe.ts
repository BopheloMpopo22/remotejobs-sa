import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe on the client side
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

// Stripe configuration
export const STRIPE_CONFIG = {
  // Job Assistant Subscription
  JOB_ASSISTANT_SETUP_PRICE: 14900, // R149.00 in cents
  JOB_ASSISTANT_MONTHLY_PRICE: 4900, // R49.00 in cents

  // Currency
  CURRENCY: "zar", // South African Rand

  // Payment methods
  PAYMENT_METHODS: ["card"],

  // Success and cancel URLs
  SUCCESS_URL: `${window.location.origin}/payment-success`,
  CANCEL_URL: `${window.location.origin}/job-assistant`,
};

// Helper function to format prices
export const formatPrice = (amountInCents: number): string => {
  return `R${(amountInCents / 100).toFixed(2)}`;
};

// Helper function to convert price to cents
export const priceToCents = (price: number): number => {
  return Math.round(price * 100);
};
