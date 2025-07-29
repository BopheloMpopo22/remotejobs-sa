import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== PAYPAL SUBSCRIPTION WEBHOOK ===");
    console.log("Webhook received:", req.body);

    const { event_type, resource } = req.body;

    // Verify webhook signature (you should implement this)
    // const isValid = verifyWebhookSignature(req.headers, req.body);
    // if (!isValid) {
    //   return res.status(401).json({ error: "Invalid webhook signature" });
    // }

    switch (event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        await handleSubscriptionActivated(resource);
        break;

      case "BILLING.SUBSCRIPTION.CANCELLED":
        await handleSubscriptionCancelled(resource);
        break;

      case "BILLING.SUBSCRIPTION.SUSPENDED":
        await handleSubscriptionSuspended(resource);
        break;

      case "PAYMENT.SALE.COMPLETED":
        await handlePaymentCompleted(resource);
        break;

      case "PAYMENT.SALE.DENIED":
        await handlePaymentDenied(resource);
        break;

      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleSubscriptionActivated(subscription) {
  console.log("Subscription activated:", subscription.id);

  // Update database
  const { error } = await supabase
    .from("job_assistant_applications")
    .update({
      subscription_status: "active",
      subscription_start_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("paypal_subscription_id", subscription.id);

  if (error) {
    console.error("Database update error:", error);
  } else {
    console.log("Subscription status updated to active");
  }
}

async function handleSubscriptionCancelled(subscription) {
  console.log("Subscription cancelled:", subscription.id);

  // Update database
  const { error } = await supabase
    .from("job_assistant_applications")
    .update({
      subscription_status: "cancelled",
      subscription_end_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("paypal_subscription_id", subscription.id);

  if (error) {
    console.error("Database update error:", error);
  } else {
    console.log("Subscription status updated to cancelled");
  }
}

async function handleSubscriptionSuspended(subscription) {
  console.log("Subscription suspended:", subscription.id);

  // Update database
  const { error } = await supabase
    .from("job_assistant_applications")
    .update({
      subscription_status: "suspended",
      updated_at: new Date().toISOString(),
    })
    .eq("paypal_subscription_id", subscription.id);

  if (error) {
    console.error("Database update error:", error);
  } else {
    console.log("Subscription status updated to suspended");
  }
}

async function handlePaymentCompleted(payment) {
  console.log("Payment completed:", payment.id);

  // You can add additional logic here for payment tracking
  // For example, sending confirmation emails, updating payment history, etc.
}

async function handlePaymentDenied(payment) {
  console.log("Payment denied:", payment.id);

  // Handle failed payment
  // You might want to suspend the subscription or send notification
}
