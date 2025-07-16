import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { PAYFAST_CONFIG, formatPrice } from "../lib/payfast";

interface PaymentFormProps {
  applicationData: any;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  applicationData,
  onPaymentError,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    try {
      // Get user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("No active session");
      }

      // Create payment record in database
      const response = await fetch("/api/create-payfast-payment", {
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
        throw new Error(errorData.error || "Failed to initialize payment");
      }

      const paymentInfo = await response.json();
      setPaymentData(paymentInfo);
    } catch (err: any) {
      setError(err.message);
      onPaymentError(err.message);
    }
  };

  const handlePaymentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!paymentData) {
        throw new Error("Payment data not initialized");
      }

      // Create form data for PayFast
      const formData = new FormData();

      // Add all PayFast required fields
      Object.keys(paymentData.payfastData).forEach((key) => {
        formData.append(key, paymentData.payfastData[key]);
      });

      // Create a hidden form and submit it to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = PAYFAST_CONFIG.SANDBOX_URL; // Use LIVE_URL for production
      form.style.display = "none";

      Object.keys(paymentData.payfastData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentData.payfastData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      setError(err.message);
      onPaymentError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="payment-form">
        <div className="payment-header">
          <h2>Initializing Payment...</h2>
          <p>Please wait while we set up your payment</p>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }

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
            {formatPrice(PAYFAST_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}
          </span>
        </div>
        <div className="summary-item">
          <span>Monthly Subscription:</span>
          <span className="price">
            {formatPrice(PAYFAST_CONFIG.JOB_ASSISTANT_MONTHLY_PRICE)}/month
          </span>
        </div>
        <div className="summary-item total">
          <span>Total Today:</span>
          <span className="price">
            {formatPrice(PAYFAST_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}
          </span>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form-content">
        <div className="form-section">
          <label>Payment Method</label>
          <div className="payment-methods">
            <div className="payment-method">
              <input
                type="radio"
                name="payment_method"
                value="cc"
                defaultChecked
              />
              <label>Credit Card</label>
            </div>
            <div className="payment-method">
              <input type="radio" name="payment_method" value="eft" />
              <label>EFT (Electronic Funds Transfer)</label>
            </div>
            <div className="payment-method">
              <input type="radio" name="payment_method" value="mpesa" />
              <label>M-Pesa</label>
            </div>
            <div className="payment-method">
              <input type="radio" name="payment_method" value="snapscan" />
              <label>SnapScan</label>
            </div>
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
          <button type="submit" className="pay-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : `Pay ${formatPrice(PAYFAST_CONFIG.JOB_ASSISTANT_SETUP_PRICE)}`}
          </button>
        </div>
      </form>

      <div className="payment-security">
        <p>🔒 Your payment is secure and encrypted</p>
        <p>💳 We accept credit cards, EFT, M-Pesa, and SnapScan</p>
        <p>🇿🇦 Powered by PayFast - South Africa's trusted payment gateway</p>
      </div>
    </div>
  );
};

export default PaymentForm;
