import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Webhook event received:", event.type);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailure(event.data.object);
        break;

      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}

async function handlePaymentSuccess(paymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);

  const { user_email, application_type } = paymentIntent.metadata;

  if (application_type === "job_assistant_setup") {
    // Update application status to active
    const { error } = await supabase
      .from("job_assistant_applications")
      .update({
        status: "active",
        payment_status: "paid",
        payment_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_payment_intent_id", paymentIntent.id);

    if (error) {
      console.error("Failed to update application status:", error);
    } else {
      console.log("Application activated for:", user_email);
    }

    // Create subscription for monthly billing
    try {
      const customer = await stripe.customers.retrieve(paymentIntent.customer);

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_MONTHLY_PRICE_ID }], // We'll create this price in Stripe dashboard
        metadata: {
          user_email: user_email,
          application_type: "job_assistant_monthly",
        },
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      console.log("Monthly subscription created:", subscription.id);
    } catch (error) {
      console.error("Failed to create subscription:", error);
    }
  }
}

async function handlePaymentFailure(paymentIntent) {
  console.log("Payment failed:", paymentIntent.id);

  const { error } = await supabase
    .from("job_assistant_applications")
    .update({
      status: "payment_failed",
      payment_status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_payment_intent_id", paymentIntent.id);

  if (error) {
    console.error("Failed to update application status:", error);
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log("Subscription created:", subscription.id);

  const { user_email } = subscription.metadata;

  // Update user subscription status
  const { error } = await supabase
    .from("users")
    .update({
      subscription_status: "active",
      subscription_plan: "job_assistant",
      stripe_subscription_id: subscription.id,
      subscription_start_date: new Date(
        subscription.current_period_start * 1000
      ).toISOString(),
      subscription_end_date: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("email", user_email);

  if (error) {
    console.error("Failed to update user subscription:", error);
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log("Subscription updated:", subscription.id);

  const { user_email } = subscription.metadata;

  const { error } = await supabase
    .from("users")
    .update({
      subscription_status: subscription.status,
      subscription_end_date: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("email", user_email);

  if (error) {
    console.error("Failed to update subscription status:", error);
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log("Subscription deleted:", subscription.id);

  const { user_email } = subscription.metadata;

  const { error } = await supabase
    .from("users")
    .update({
      subscription_status: "cancelled",
      subscription_end_date: new Date(
        subscription.canceled_at * 1000
      ).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("email", user_email);

  if (error) {
    console.error("Failed to update subscription status:", error);
  }
}
