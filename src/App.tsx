import React, { useState } from "react";
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"jobs" | "cv" | "assistant">(
    "jobs"
  );

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
                onLoadingChange={setLoading}
                onErrorChange={setError}
              />
              <JobList jobs={jobs} loading={loading} error={error} />
            </>
          ) : currentView === "cv" ? (
            <CVGenerator />
          ) : (
            <JobAssistant />
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
    </div>
  );
}

export default App;
