import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { supabase } from "../lib/supabase";
import { STRIPE_CONFIG, formatPrice } from "../lib/stripe";

interface PaymentFormProps {
  applicationData: any;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  applicationData,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("No active session");
      }

      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          applicationData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment");
      }

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: applicationData.fullName,
              email: session.user.email,
            },
          },
        });

      if (paymentError) {
        throw new Error(paymentError.message || "Payment failed");
      }

      if (paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (err: any) {
      setError(err.message);
      onPaymentError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="payment-form">
      <div className="payment-header">
        <h2>Complete Your Job Assistant Setup</h2>
        <p>One-time setup fee to start your job application service</p>
      </div>

      <div className="payment-summary">
        <div className="summary-item">
          <span>Setup Fee:</span>
          <span className="price">
            {formatPrice(STRIPE_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}
          </span>
        </div>
        <div className="summary-item">
          <span>Monthly Subscription:</span>
          <span className="price">
            {formatPrice(STRIPE_CONFIG.JOB_ASSISTANT_MONTHLY_PRICE)}/month
          </span>
        </div>
        <div className="summary-item total">
          <span>Total Today:</span>
          <span className="price">
            {formatPrice(STRIPE_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form-content">
        <div className="form-section">
          <label>Card Information</label>
          <div className="card-element-container">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="payment-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="pay-btn"
            disabled={!stripe || loading}
          >
            {loading
              ? "Processing..."
              : `Pay ${formatPrice(STRIPE_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}`}
          </button>
        </div>
      </form>

      <div className="payment-security">
        <p>🔒 Your payment is secure and encrypted</p>
        <p>💳 We accept all major credit and debit cards</p>
      </div>
    </div>
  );
};

export default PaymentForm;
