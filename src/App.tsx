import { useState, useEffect } from "react";

import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import JobSearch from "./components/JobSearch";
import JobList from "./components/JobList";
import CVGenerator from "./components/CVGenerator";
import JobAssistant from "./components/JobAssistant";
import PaymentSuccess from "./components/PaymentSuccess";
import "./App.css";

interface Job {
  id: string;
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  salary_min?: number;
  salary_max?: number;
  created: string;
  description: string;
  redirect_url: string;
  category: {
    label: string;
  };
}

function App() {
  // Yoco payment system ready for testing
  // Triggering deployment for Yoco integration fixes
  // Force deployment for debugging Yoco credentials
  // Deployment trigger: 2024-12-30 15:30
  // Force deployment for Yoco API endpoint fix
  // Testing checkout endpoint
  // Using correct Yoco payments API
  // Fix checkoutUrl field mapping
  // Add webhook registration endpoint
  // Allow GET requests for webhook registration
  // Add webhook name field
  // Trigger deployment after 19-hour cooldown
  // Add webhook test endpoint
  // Add payment listing endpoint
  // Update test webhook with correct payment reference
  // Add detailed webhook logging
  // Fix webhook format to match Yoco's actual data structure
  // Fix email sender to use verified domain
  // Add detailed database update logging
  // Use application ID instead of payment reference for database update
  // Use email address to match database records
  // Email-triggered database update approach
  // Add email logging to database
  // Remove unused API files to stay under Vercel limit
  // Update daily digest to use payment email logs
  // Update email system guide with new workflow
  // Clean up UI and improve payment flow
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    "jobs" | "cv" | "assistant" | "help-feedback"
  >("jobs");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [staticPage, setStaticPage] = useState<
    | null
    | "about"
    | "contact"
    | "privacy"
    | "terms"
    | "payment-success"
    | "payment-cancel"
    | "help-feedback"
  >(null);

  // Add social proof state
  const [showSocialProof, setShowSocialProof] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setShowAuthModal(false); // Close auth modal when user signs in
        setCurrentView("jobs"); // Redirect to homepage
        setToast({ message: "Login successful!", type: "success" });
      } else {
        setShowAuthModal(true); // Show login modal
        setToast({ message: "Logged out successfully!", type: "success" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle URL parameters for Yoco redirects
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (page === "payment-success") {
      setStaticPage("payment-success");
    } else if (page === "payment-cancel") {
      setStaticPage("payment-cancel");
    }
  }, []);

  const handleAuthChange = (user: any) => {
    setUser(user);
    setShowAuthModal(false);
    setCurrentView("jobs"); // Redirect to homepage
    setToast({ message: "Login successful!", type: "success" });
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuthModal(true); // Show login modal
    setToast({ message: "Logged out successfully!", type: "success" });
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (window.location.pathname === "/payment-success") {
    return <PaymentSuccess />;
  }

  // Add social proof banner component
  const SocialProofBanner = () => (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "12px 20px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "500",
        position: "relative",
      }}
    >
      <span>
        🎉 <strong>60+ professionals</strong> have already joined! Join them in
        finding remote work opportunities.
      </span>
      <button
        onClick={() => setShowSocialProof(false)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ×
      </button>
    </div>
  );

  // Add value proposition section
  const ValueProposition = () => (
    <div
      style={{
        background: "#f8fafc",
        padding: "40px 20px",
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{ color: "#1e293b", marginBottom: "20px", fontSize: "2.5rem" }}
      >
        Find Your Dream Remote Job in South Africa
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>💼</div>
          <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>
            Professional CV Builder
          </h3>
          <p style={{ color: "#64748b" }}>
            Create stunning CVs with 4 professional templates. Stand out from
            the crowd.
          </p>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🎯</div>
          <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>
            Job Application Assistant
          </h3>
          <p style={{ color: "#64748b" }}>
            Get personalized help with applications. Only R179 for professional
            guidance.
          </p>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📧</div>
          <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>
            Daily Job Alerts
          </h3>
          <p style={{ color: "#64748b" }}>
            Receive curated remote job opportunities directly to your inbox.
          </p>
        </div>
      </div>
    </div>
  );

  // Simple Feedback Options Component
  const FeedbackOptions = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          left: window.innerWidth <= 768 ? "20px" : "auto",
          zIndex: 1000,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          padding: "20px",
          maxWidth: window.innerWidth <= 768 ? "none" : "350px",
          width: window.innerWidth <= 768 ? "auto" : "350px",
          display: showFeedbackModal ? "block" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0, color: "#1e293b" }}>💬 Help Us Improve</h3>
          <button
            onClick={() => setShowFeedbackModal(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            ×
          </button>
        </div>

        <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
          We'd love to hear your thoughts! Choose how you'd like to share your
          feedback:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Email Option */}
          <a
            href="mailto:bophelompopo22@gmail.com?subject=Remote Jobs SA Feedback&body=Hi Remote Jobs SA team,%0D%0A%0D%0AI'd like to share some feedback about your service:%0D%0A%0D%0A[Please share your thoughts, suggestions, or report any issues here]%0D%0A%0D%0AThanks!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            📧 Send Email Feedback
          </a>

          {/* Google Forms Option */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdDKoLkTMdBCkOuxrbfmGl8nvLBP5jZ5O4FvTghPXz36HOkSA/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e0f2fe";
              e.currentTarget.style.borderColor = "#7dd3fc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f0f9ff";
              e.currentTarget.style.borderColor = "#bae6fd";
            }}
          >
            📝 Fill Feedback Form
          </a>

          {/* WhatsApp Option */}
          <a
            href="https://wa.me/272725289455?text=Hi Remote Jobs SA team! I'd like to share some feedback about your service."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 16px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#1e293b",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dcfce7";
              e.currentTarget.style.borderColor = "#86efac";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f0fdf4";
              e.currentTarget.style.borderColor = "#bbf7d0";
            }}
          >
            💬 WhatsApp Feedback
          </a>
        </div>

        <div
          style={{
            marginTop: "15px",
            fontSize: "12px",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          Choose the option that works best for you!
        </div>
      </div>
    );
  };

  // Feedback Button (always visible)
  const FeedbackButton = () => (
    <button
      onClick={() => setShowFeedbackModal(true)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
        background: "#059669",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "10px 15px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
        display: showFeedbackModal ? "none" : "block",
      }}
    >
      💬 Feedback
    </button>
  );

  // Help & Feedback Page Component
  const HelpFeedbackPage = () => (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#1e293b", marginBottom: "30px" }}>
        ❓ Help & Feedback
      </h1>

      {/* FAQ Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#374151", marginBottom: "20px" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            How does the Job Assistant work?
          </h3>
          <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Our Job Assistant applies to 5 relevant jobs daily on your behalf.
            We match jobs to your experience, location, and salary requirements,
            then send customized applications with professional cover letters.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            How much does it cost?
          </h3>
          <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
            One-time setup: R179, or Monthly subscription: R179 setup +
            R59/month. Cancel anytime.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            Is the CV builder free?
          </h3>
          <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Yes! Our CV builder with 4 professional templates is completely free
            to use.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            How long until I get job responses?
          </h3>
          <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
            Most users start receiving responses within 1-2 weeks. We provide
            weekly progress reports so you can track your applications.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#374151", marginBottom: "20px" }}>Get in Touch</h2>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            📧 Email Support
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "10px" }}>
            For immediate assistance, email us at:{" "}
            <strong>bophelompopo22@gmail.com</strong>
          </p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            We typically respond within 24 hours during business days.
          </p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#4b5563", marginBottom: "10px" }}>
            📱 WhatsApp Support
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "10px" }}>
            For quick questions: <strong>+27 72 528 9455</strong>
          </p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Available Monday-Friday, 9 AM - 5 PM SAST.
          </p>
        </div>
      </div>

      {/* Feedback Section */}
      <div>
        <h2 style={{ color: "#374151", marginBottom: "20px" }}>
          Share Your Feedback
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Your feedback helps us improve our service for everyone. We'd love to
          hear your thoughts!
        </p>

        <button
          onClick={() => setShowFeedbackModal(true)}
          style={{
            background: "#059669",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          💬 Open Feedback Form
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-root">
      {/* Social Proof Banner */}
      {showSocialProof && <SocialProofBanner />}

      <style>{`
        @media (max-width: 600px) {
          .app-root, .main-content, .nav-bar, .progress-bar, .job-list, .job-card, .cv-generator, .job-assistant {
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box;
          }
          .nav-bar, .progress-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 8px !important;
          }
          .progress-step {
            font-size: 1rem !important;
            min-width: 32px !important;
            min-height: 32px !important;
          }
          .main-content, .job-list, .job-card {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
          .job-card, .cv-generator, .job-assistant {
            margin-bottom: 16px !important;
          }
          .nav-btn, .submit-btn, .generate-btn {
            width: 100%;
            margin-top: 8px;
            font-size: 1.1rem;
          }
          h1, h2, h3, h4 {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background: toast.type === "success" ? "#10b981" : "#dc2626",
            color: "white",
            padding: "12px 24px",
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Value Proposition Section - Show only for non-authenticated users */}
      {!user && <ValueProposition />}

      {/* Header */}
      <header>
        <div>
          <h1>Remote Jobs SA</h1>
          <p>
            Find your next remote opportunity in South Africa and around the
            world
          </p>

          {/* User Profile or Sign In Button */}
          <div className="auth-section">
            {user ? (
              <UserProfile user={user} onLogout={handleLogout} />
            ) : (
              <button
                className="sign-in-btn"
                onClick={() => setShowAuthModal(true)}
              >
                🔐 Sign In
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="main-nav">
            <button
              className={`nav-tab ${currentView === "jobs" ? "active" : ""}`}
              onClick={() => {
                setStaticPage(null);
                setCurrentView("jobs");
              }}
            >
              🔍 Job Search
            </button>
            <button
              className={`nav-tab ${currentView === "cv" ? "active" : ""}`}
              onClick={() => {
                setStaticPage(null);
                setCurrentView("cv");
              }}
            >
              📄 CV Generator
            </button>
            <button
              className={`nav-tab ${
                currentView === "assistant" ? "active" : ""
              }`}
              onClick={() => {
                setStaticPage(null);
                setCurrentView("assistant");
              }}
            >
              🤖 Job Assistant
            </button>
            <button
              className={`nav-tab ${
                currentView === "help-feedback" ? "active" : ""
              }`}
              onClick={() => {
                setStaticPage(null);
                setCurrentView("help-feedback");
              }}
            >
              ❓ Help & Feedback
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div>
          {staticPage === "about" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>About Remote Jobs SA</h2>
              <p>
                <b>Mission:</b> To make the process of finding jobs easy and
                affordable for everyone in South Africa and beyond.
              </p>
              <p>
                Remote Jobs SA is dedicated to connecting job seekers with
                remote opportunities both locally and globally. Our platform
                offers:
              </p>
              <ul>
                <li>
                  <b>Job Search:</b> Find remote jobs from top companies,
                  filtered by your preferences.
                </li>
                <li>
                  <b>CV Generator:</b> Create a professional CV in minutes with
                  customizable sections.
                </li>
                <li>
                  <b>Job Assistant:</b> Get AI-powered help with applications,
                  job matching, and more.
                </li>
                <li>
                  <b>Easy Payments:</b> Secure, affordable access to premium
                  features.
                </li>
              </ul>
              <p>
                We believe in empowering job seekers with the tools they need to
                succeed in the modern workforce.
              </p>
            </section>
          ) : staticPage === "contact" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>Contact Us</h2>
              <p>Have questions, feedback, or need support? Reach out to us:</p>
              <ul>
                <li>
                  <b>Email:</b>{" "}
                  <a href="mailto:bophelompopo22@gmail.com">
                    bophelompopo22@gmail.com
                  </a>
                </li>
                <li>
                  <b>Cellphone:</b>{" "}
                  <a href="tel:+27711083613">+27 71 108 3613</a>
                </li>
              </ul>
              <p>We aim to respond to all queries within 24 hours.</p>
            </section>
          ) : staticPage === "privacy" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. This policy explains how we
                collect, use, and protect your information:
              </p>
              <ul>
                <li>
                  We only collect personal information necessary to provide our
                  services (e.g., account creation, job applications, CV
                  generation).
                </li>
                <li>Your data is never sold to third parties.</li>
                <li>We use secure technologies to protect your information.</li>
                <li>
                  You can request deletion of your data at any time by
                  contacting us.
                </li>
              </ul>
              <p>
                By using Remote Jobs SA, you agree to this policy. For
                questions, contact us at{" "}
                <a href="mailto:bophelompopo22@gmail.com">
                  bophelompopo22@gmail.com
                </a>
                .
              </p>
            </section>
          ) : staticPage === "terms" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>Terms of Service</h2>
              <p>By using RemoteJobs SA, you agree to these terms:</p>
              <ul>
                <li>
                  <b>Service Usage:</b> Our platform provides job search, CV
                  generation, and job assistance services. Use these services
                  responsibly and in accordance with applicable laws.
                </li>
                <li>
                  <b>Account Responsibility:</b> You are responsible for
                  maintaining the confidentiality of your account and for all
                  activities that occur under your account.
                </li>
                <li>
                  <b>Payment Terms:</b> Premium features require payment. All
                  payments are processed securely through Yoco. Refunds are
                  handled according to our refund policy.
                </li>
                <li>
                  <b>Content Accuracy:</b> While we strive for accuracy, we
                  cannot guarantee the completeness or reliability of job
                  listings or CV generation results.
                </li>
                <li>
                  <b>Prohibited Use:</b> You may not use our services for any
                  illegal or unauthorized purpose, including but not limited to
                  fraud, harassment, or copyright infringement.
                </li>
                <li>
                  <b>Service Availability:</b> We aim to provide reliable
                  service but cannot guarantee uninterrupted access. We may
                  modify or discontinue services with notice.
                </li>
                <li>
                  <b>Limitation of Liability:</b> RemoteJobs SA is not liable
                  for any damages arising from the use of our services,
                  including but not limited to lost data, missed opportunities,
                  or financial losses.
                </li>
              </ul>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use of our services constitutes acceptance of any
                changes. For questions about these terms, contact us at{" "}
                <a href="mailto:bophelompopo22@gmail.com">
                  bophelompopo22@gmail.com
                </a>
                .
              </p>
            </section>
          ) : staticPage === "payment-success" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>🎉 Payment Successful!</h2>
              <p>
                Thank you for your payment! Your Job Assistant subscription has
                been activated.
              </p>
              <div
                style={{
                  background: "#f0f9ff",
                  padding: 20,
                  borderRadius: 8,
                  margin: "20px 0",
                }}
              >
                <h3>What happens next?</h3>
                <ul>
                  <li>✅ Your application has been saved</li>
                  <li>📧 You'll receive a confirmation email shortly</li>
                  <li>🤖 We'll start applying to 5 jobs daily for you</li>
                  <li>📊 Weekly progress reports will be sent to your email</li>
                  <li>
                    💳 R59/month will be charged automatically starting next
                    month
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setStaticPage(null);
                  setCurrentView("jobs");
                }}
                className="btn-primary"
              >
                Back to Job Search
              </button>
            </section>
          ) : staticPage === "payment-cancel" ? (
            <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
              <h2>Payment Cancelled</h2>
              <p>
                Your payment was cancelled. No charges have been made to your
                account.
              </p>
              <p>
                You can try again anytime by going to the Job Assistant section.
              </p>
              <button
                onClick={() => {
                  setStaticPage(null);
                  setCurrentView("assistant");
                }}
                className="btn-primary"
              >
                Try Again
              </button>
            </section>
          ) : (
            <>
              {currentView === "jobs" ? (
                <>
                  <JobSearch
                    onJobsChange={setJobs}
                    onLoadingChange={setJobLoading}
                    onErrorChange={setError}
                  />
                  <JobList jobs={jobs} loading={jobLoading} error={error} />
                </>
              ) : currentView === "cv" ? (
                <CVGenerator onAuthRequired={handleAuthRequired} user={user} />
              ) : currentView === "assistant" ? (
                <JobAssistant onAuthRequired={handleAuthRequired} user={user} />
              ) : currentView === "help-feedback" ? (
                <HelpFeedbackPage />
              ) : (
                <JobAssistant onAuthRequired={handleAuthRequired} user={user} />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <div className="footer-brand">
            <h3>Remote Jobs SA</h3>
            <p>Connecting South Africans with global remote opportunities</p>
          </div>
          <div className="footer-links">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setStaticPage("about");
              }}
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setStaticPage("contact");
              }}
            >
              Contact
            </a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                setStaticPage("privacy");
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                setStaticPage("terms");
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <button
              className="auth-modal-close"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <Auth onAuthChange={handleAuthChange} />
          </div>
        </div>
      )}
      {/* Feedback Options */}
      <FeedbackOptions />
      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
}

export default App;
