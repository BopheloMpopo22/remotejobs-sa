import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import JobSearch from "./components/JobSearch";
import JobList from "./components/JobList";
import CVGenerator from "./components/CVGenerator";
import JobAssistant from "./components/JobAssistant";
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
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthChange = (user: any) => {
    setUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div id="root">
      {/* Test Banner */}
      <div
        style={{
          backgroundColor: "#10b981",
          color: "white",
          textAlign: "center",
          padding: "0.5rem",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        ✅ NEW: CV Generator & Job Assistant - Zero cost AI implementations!
      </div>

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
              onClick={() => setCurrentView("jobs")}
            >
              🔍 Job Search
            </button>
            <button
              className={`nav-tab ${currentView === "cv" ? "active" : ""}`}
              onClick={() => setCurrentView("cv")}
            >
              📄 CV Generator
            </button>
            <button
              className={`nav-tab ${
                currentView === "assistant" ? "active" : ""
              }`}
              onClick={() => setCurrentView("assistant")}
            >
              🤖 Job Assistant
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div>
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
          ) : (
            <JobAssistant onAuthRequired={handleAuthRequired} user={user} />
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
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
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
  );
}

export default App;
