import { useState, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobLoading, setJobLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"jobs" | "cv" | "assistant">(
    "jobs"
  );
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
  >(null);

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

  // Handle URL parameters for PayFast redirects
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

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || "YOUR_CLIENT_ID",
        currency: "ZAR",
        intent: "capture",
      }}
    >
      <div className="app-root">
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

        {/* Test Banner */}
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
                    <b>CV Generator:</b> Create a professional CV in minutes
                    with customizable sections.
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
                  We believe in empowering job seekers with the tools they need
                  to succeed in the modern workforce.
                </p>
              </section>
            ) : staticPage === "contact" ? (
              <section style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
                <h2>Contact Us</h2>
                <p>
                  Have questions, feedback, or need support? Reach out to us:
                </p>
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
                    We only collect personal information necessary to provide
                    our services (e.g., account creation, job applications, CV
                    generation).
                  </li>
                  <li>Your data is never sold to third parties.</li>
                  <li>
                    We use secure technologies to protect your information.
                  </li>
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
                    payments are processed securely through PayFast. Refunds are
                    handled according to our refund policy.
                  </li>
                  <li>
                    <b>Content Accuracy:</b> While we strive for accuracy, we
                    cannot guarantee the completeness or reliability of job
                    listings or CV generation results.
                  </li>
                  <li>
                    <b>Prohibited Use:</b> You may not use our services for any
                    illegal or unauthorized purpose, including but not limited
                    to fraud, harassment, or copyright infringement.
                  </li>
                  <li>
                    <b>Service Availability:</b> We aim to provide reliable
                    service but cannot guarantee uninterrupted access. We may
                    modify or discontinue services with notice.
                  </li>
                  <li>
                    <b>Limitation of Liability:</b> RemoteJobs SA is not liable
                    for any damages arising from the use of our services,
                    including but not limited to lost data, missed
                    opportunities, or financial losses.
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
                  Thank you for your payment! Your Job Assistant subscription
                  has been activated.
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
                    <li>
                      📊 Weekly progress reports will be sent to your email
                    </li>
                    <li>
                      💳 R49/month will be charged automatically starting next
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
                  You can try again anytime by going to the Job Assistant
                  section.
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
                  <CVGenerator
                    onAuthRequired={handleAuthRequired}
                    user={user}
                  />
                ) : (
                  <JobAssistant
                    onAuthRequired={handleAuthRequired}
                    user={user}
                  />
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
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
