import React from "react";

const PaymentSuccess: React.FC = () => {
  return (
    <div
      className="payment-success"
      style={{ textAlign: "center", marginTop: "4rem" }}
    >
      <h1>🎉 Payment Successful!</h1>
      <p>
        Thank you for your payment. Your Job Assistant setup is now complete.
      </p>
      <p>We will contact you soon with the next steps.</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "0.375rem",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default PaymentSuccess;
