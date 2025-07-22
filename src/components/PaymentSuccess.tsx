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
          color: "#2563eb",
          textDecoration: "underline",
        }}
      >
        Go to Home
      </a>
    </div>
  );
};

export default PaymentSuccess;
