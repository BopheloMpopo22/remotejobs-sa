import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { sendEmail } from "../lib/email";

interface AuthProps {
  onAuthChange: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Login successful!");
        onAuthChange(data.user);
      } else {
        // Register
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        setMessage(
          "Registration successful! Please check your email to verify your account."
        );
        onAuthChange(data.user);
        setShowConfirmMessage(true);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string
  ) => {
    // ... existing signup logic ...
    // After successful signup:
    await sendEmail({
      to: email,
      subject: "Welcome to RemoteJobsSA! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f0f4f8; padding: 2rem; border-radius: 1rem; color: #222;">
          <h1 style="color: #2563eb;">🎉 Welcome to <span style='color:#10b981;'>RemoteJobsSA</span>!</h1>
          <p style="font-size: 1.1rem;">Hi <b>${name || "there"}</b>,</p>
          <p>We’re <b>so excited</b> to have you join our community of remote job seekers! 🚀</p>
          <ul style="margin: 1rem 0;">
            <li>✨ <b>Job Assistant</b>: We’ll apply to jobs for you every day!</li>
            <li>📝 <b>CV Generator</b>: Create a standout CV in minutes.</li>
          </ul>
          <p>Log in and try these features now. If you have any questions, just reply to this email—I’m here to help!</p>
          <p style="margin-top:2rem; color:#10b981; font-weight:bold;">To your success,<br/>Bophelo<br/>RemoteJobsSA</p>
        </div>
      `,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin ? "Sign in to your account" : "Join Remote Jobs SA"}
        </p>

        <form onSubmit={handleAuth} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          {showConfirmMessage && (
            <div className="confirm-email-message">
              <p>
                Please check your email and confirm your account before logging
                in. You will not be able to submit forms until your email is
                confirmed.
              </p>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button onClick={handleGoogleAuth} className="google-auth-button">
          <svg viewBox="0 0 24 24" className="google-icon">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="switch-button"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
