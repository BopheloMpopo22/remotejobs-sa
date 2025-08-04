import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface AssistantForm {
  fullName: string;
  phone: string;
  location: string;
  desiredPosition: string;
  experience: string;
  salary: string;
  remotePreference: string;
  industries: string[];
  additionalNotes: string;
  cvFile?: File;
  cvFileName?: string;
}

interface JobAssistantProps {
  onAuthRequired: () => void;
  user: any;
}

const JobAssistant: React.FC<JobAssistantProps> = ({
  onAuthRequired,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [paymentType, setPaymentType] = useState<"one-time" | "subscription">(
    "one-time"
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const [formData, setFormData] = useState<AssistantForm>({
    fullName: "",
    phone: "",
    location: "",
    desiredPosition: "",
    experience: "",
    salary: "",
    remotePreference: "",
    industries: [],
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Remove the subscriptionAcknowledged state and checkbox logic

  useEffect(() => {
    if (user && user.email && user.email_confirmed_at === null) {
      setEmailConfirmed(false);
    } else {
      setEmailConfirmed(true);
    }
  }, [user]);

  const [paymentData, setPaymentData] = useState<any>(null);
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const industryOptions = [
    "Technology/IT",
    "Finance",
    "Healthcare",
    "Education",
    "Marketing",
    "Sales",
    "Customer Service",
    "Design",
    "Writing/Content",
    "Project Management",
    "Data Analysis",
    "Other",
  ];

  const handleIndustryChange = (industry: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter((i) => i !== industry)
        : [...prev.industries, industry],
    }));
  };

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
      setUploadedFileNames((prev) => [
        ...prev,
        ...files.map((file) => file.name),
      ]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSavedData = () => {
    localStorage.removeItem("jobAssistantFormData");
    console.log("🗑️ Cleared Job Assistant saved data");
    alert("Saved data cleared. Form will reset.");
  };

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    // Don't save on initial mount
    if (!isInitialized) {
      console.log("⏳ Component not yet initialized, skipping save");
      return;
    }

    const dataToSave = {
      ...formData,
      uploadedFileNames,
    };

    // Only save if we have actual data (not just empty strings)
    const hasData =
      Object.values(formData).some(
        (value) =>
          value &&
          (typeof value === "string"
            ? value.trim() !== ""
            : Array.isArray(value)
              ? value.length > 0
              : true)
      ) || uploadedFileNames.length > 0;

    if (hasData) {
      localStorage.setItem("jobAssistantFormData", JSON.stringify(dataToSave));
      console.log("💾 Saved Job Assistant data to localStorage:", dataToSave);
    } else {
      console.log("⚠️ Not saving empty data to localStorage");
    }
  }, [formData, uploadedFileNames, isInitialized]);

  // Load form data from localStorage on component mount
  useEffect(() => {
    console.log("🔄 JobAssistant component mounted");
    const savedData = localStorage.getItem("jobAssistantFormData");
    console.log("📂 Loading Job Assistant data from localStorage:", savedData);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("✅ Successfully parsed saved data:", parsedData);

        // Check if the parsed data has actual content
        const hasContent = Object.values(parsedData).some(
          (value) =>
            value &&
            (typeof value === "string"
              ? value.trim() !== ""
              : Array.isArray(value)
                ? value.length > 0
                : true)
        );

        if (hasContent) {
          setFormData((prev) => ({
            ...prev,
            ...parsedData,
          }));
          if (parsedData.uploadedFileNames) {
            setUploadedFileNames(parsedData.uploadedFileNames);
            console.log(
              "📄 Restored uploaded file names:",
              parsedData.uploadedFileNames
            );
          }
          console.log("✅ Restored form data successfully");
        } else {
          console.log("⚠️ Parsed data is empty, not restoring");
        }
      } catch (error) {
        console.error("❌ Error loading saved form data:", error);
      }
    } else {
      console.log("📭 No saved data found in localStorage");
    }

    // Mark as initialized after loading attempt
    setIsInitialized(true);
    console.log("✅ Component initialized");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated for job assistant service
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!emailConfirmed) {
      alert(
        "Please confirm your email address before submitting the Job Assistant form. Check your inbox for a confirmation link."
      );
      return;
    }

    // Remove the subscriptionAcknowledged check
    // if (!subscriptionAcknowledged) {
    //   alert("Please acknowledge the subscription terms before submitting.");
    //   return;
    // }

    setLoading(true);

    try {
      // Prepare form data
      const formDataToSend: any = {
        fullName: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        desiredPosition: formData.desiredPosition,
        experience: formData.experience,
        salary: formData.salary,
        remotePreference: formData.remotePreference,
        industries: formData.industries,
        additionalNotes: formData.additionalNotes,
        uploadedFiles: uploadedFileNames,
      };

      // If files are uploaded, convert them to base64
      if (uploadedFiles.length > 0) {
        console.log("Files found:", uploadedFiles.length, "files uploaded");

        const processFiles = async () => {
          const fileDataArray: any[] = [];

          for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const base64Data = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                resolve(event.target?.result as string);
              };
              reader.readAsDataURL(file);
            });

            fileDataArray.push({
              fileName: file.name,
              fileType: file.type,
              fileData: base64Data,
              fileSize: file.size,
            });
          }

          formDataToSend.files = fileDataArray;
          console.log("Sending form data with", fileDataArray.length, "files");
          await sendFormData(formDataToSend);
        };

        await processFiles();
      } else {
        console.log("No files uploaded");
        // No files uploaded, send data directly
        await sendFormData(formDataToSend);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendFormData = async (data: any) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Supabase session:", session);
      console.log("Access token:", session?.access_token);

      console.log("Sending payment request...");
      const apiEndpoint =
        paymentType === "subscription"
          ? "/api/create-paypal-subscription"
          : "/api/create-paypal-payment";
      console.log("API URL:", apiEndpoint);

      const timestamp = Date.now();
      const response = await fetch(`${apiEndpoint}?t=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify({ applicationData: data, user }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `Failed to create payment: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      console.log("=== FRONTEND DEBUG ===");
      console.log("Full API response:", result);
      console.log(
        "Payment data:",
        paymentType === "subscription"
          ? result.subscription
          : result.paypalPaymentData
      );
      console.log("=== END FRONTEND DEBUG ===");

      if (paymentType === "subscription") {
        // For subscriptions, redirect to PayPal approval URL
        if (result.approvalUrl) {
          window.location.href = result.approvalUrl;
        } else {
          setPaymentData(result.subscription);
          setShowPayPalButton(true);
        }
      } else {
        // For one-time payments, show PayPal button
        console.log(
          "Setting payment data for one-time payment:",
          result.paypalPaymentData
        );
        setPaymentData(result.paypalPaymentData);
        setShowPayPalButton(true);
        console.log("showPayPalButton set to true");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(`Payment error: ${error.message}`);
    }
  };

  if (submitted) {
    return (
      <div className="job-assistant">
        <div className="success-message">
          <div className="success-icon">💳</div>
          <h2>Payment Completed!</h2>
          <p>
            Your application has been saved and payment has been processed
            through PayPal.
          </p>
          <div className="next-steps">
            <h3>What happens next?</h3>
            <ul>
              <li>We'll review your application within 24 hours</li>
              <li>You'll receive a welcome email with service details</li>
              <li>Our team will start applying to 5 jobs daily for you</li>
              <li>Weekly email updates on application progress</li>
            </ul>
          </div>
          <div className="service-details">
            <h3>Service Details</h3>
            <div className="service-card">
              <h4>📧 Daily Job Applications</h4>
              <p>We apply to 5 relevant jobs daily based on your preferences</p>
            </div>
            <div className="service-card">
              <h4>📊 Weekly Progress Reports</h4>
              <p>
                Detailed email updates on applications, responses, and next
                steps
              </p>
            </div>
            <div className="service-card">
              <h4>🎯 Personalized Matching</h4>
              <p>
                Jobs matched to your experience, location, and salary
                requirements
              </p>
            </div>
            <div className="service-card">
              <h4>💰 Affordable Pricing</h4>
              <p>R179 setup + R59/month - Cancel anytime</p>
            </div>
          </div>
          <button onClick={() => setSubmitted(false)} className="back-btn">
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  // Scroll to form handler
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="job-assistant">
      <div className="assistant-header">
        <div className="hero-section">
          <h1>🚀 Stop Applying to Jobs - Let Us Do It For You!</h1>
          <p className="hero-subtitle">
            Tired of spending hours applying to jobs with no response? Our
            AI-powered Job Application Assistant applies to{" "}
            <strong>5 jobs daily</strong> on your behalf - saving you time and
            increasing your chances of landing interviews.
          </p>
          <div
            className="pricing-highlight"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              margin: "24px 0",
            }}
          >
            <button
              className="price-tag"
              style={{
                cursor: "pointer",
                border: "none",
                background: "#f3f4f6",
                borderRadius: 12,
                padding: "18px 32px",
                fontSize: 22,
                fontWeight: 700,
                color: "#10b981",
                boxShadow: "0 2px 8px rgba(16,185,129,0.08)",
                transition: "background 0.2s",
              }}
              onClick={scrollToForm}
            >
              <span className="price">R179</span>
              <span
                className="period"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                one-time setup
              </span>
            </button>
            <button
              className="price-tag"
              style={{
                cursor: "pointer",
                border: "none",
                background: "#f3f4f6",
                borderRadius: 12,
                padding: "18px 32px",
                fontSize: 22,
                fontWeight: 700,
                color: "#3b82f6",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                transition: "background 0.2s",
              }}
              onClick={scrollToForm}
            >
              <span className="price">R59</span>
              <span
                className="period"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                /month
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="assistant-benefits">
        <div className="benefit-card featured">
          <div className="benefit-icon">🎯</div>
          <h3>Smart Job Matching</h3>
          <p>
            We apply to ANY jobs (remote, hybrid, or office-based) that match
            your experience, location, and salary requirements
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">⚡</div>
          <h3>Daily Applications</h3>
          <p>
            5 fresh job applications sent daily - no more missed opportunities
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">📊</div>
          <h3>Weekly Progress Reports</h3>
          <p>
            Detailed email updates on applications, responses, and interview
            opportunities
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">💼</div>
          <h3>Professional Applications</h3>
          <p>
            Customized cover letters and optimized applications for each
            position
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🔄</div>
          <h3>Follow-up Management</h3>
          <p>
            We follow up on your applications and track responses automatically
          </p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3>Affordable Investment</h3>
          <p>
            R100 setup + R50/month - less than R2 per day for professional job
            hunting
          </p>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Tell Us About You</h3>
            <p>Share your experience, preferences, and upload your CV</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>We Find Jobs</h3>
            <p>Our system searches thousands of job sites daily</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>We Apply For You</h3>
            <p>5 customized applications sent daily to relevant positions</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>You Get Interviews</h3>
            <p>Weekly reports on responses and interview opportunities</p>
          </div>
        </div>
      </div>

      {!emailConfirmed && (
        <div className="email-warning">
          <p>
            Please confirm your email address before submitting the Job
            Assistant form. Check your inbox for a confirmation link.
          </p>
        </div>
      )}

      <div
        className="subscription-info"
        style={{
          background: "#f1f5f9",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          border: "1px solid #cbd5e1",
        }}
      >
        <h3 style={{ margin: 0 }}>Payment & Subscription</h3>
        <p style={{ margin: 0 }}>
          <strong>Setup Fee:</strong> R179 (once-off)
          <br />
          <strong>Subscription:</strong> R59/month for continued access to the
          Job Assistant service.
          <br />
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="assistant-form">
        <h3>Tell us about your job preferences</h3>

        <div className="form-section">
          <h4>Personal Information</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Cape Town, South Africa"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4>📄 Upload Required Documents</h4>
            <button
              type="button"
              onClick={clearSavedData}
              style={{
                background: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "0.25rem",
                padding: "0.5rem 1rem",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              🗑️ Clear Saved Data
            </button>
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              padding: "1rem",
              backgroundColor: "#f0f9ff",
              border: "1px solid #0ea5e9",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
          >
            <strong>Please upload the following documents:</strong>
            <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Senior Certificate (Matric)</strong> - Required for all
                applications
              </li>
              <li>
                <strong>Matric Results/Statement</strong> - Shows your final
                grades
              </li>
              <li>
                <strong>University/College Transcripts</strong> - If you have
                tertiary education
              </li>
              <li>
                <strong>CV/Resume</strong> - Your professional summary
              </li>
              <li>
                <strong>Any other relevant certificates</strong> - Professional
                certifications, courses, etc.
              </li>
            </ul>
            <p
              style={{
                margin: "0.5rem 0",
                fontSize: "0.8rem",
                color: "#64748b",
              }}
            >
              💡 <strong>Tip:</strong> You can select multiple files at once by
              holding Ctrl (or Cmd on Mac) while selecting files.
            </p>
          </div>

          <div className="cv-upload-section">
            <div className="cv-upload-area">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                id="cv-upload"
                style={{ display: "none" }}
              />
              <label htmlFor="cv-upload" className="cv-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  <strong>Click to upload your documents</strong>
                  <p>PDF, DOC, DOCX, JPG, PNG files accepted</p>
                </div>
              </label>
            </div>
            {uploadedFileNames.length > 0 && (
              <div className="cv-preview">
                <strong>Uploaded Files:</strong>
                <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                  {uploadedFileNames.map((fileName, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>📄 {fileName}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        style={{
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "0.25rem",
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h4>Job Preferences</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Desired Position *</label>
              <input
                type="text"
                value={formData.desiredPosition}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    desiredPosition: e.target.value,
                  }))
                }
                placeholder="e.g., Software Developer, Marketing Manager"
                required
              />
            </div>
            <div className="form-group">
              <label>Years of Experience *</label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                required
                className="form-select"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years (Entry level)</option>
                <option value="1-3">1-3 years (Junior)</option>
                <option value="3-5">3-5 years (Mid-level)</option>
                <option value="5-10">5-10 years (Senior)</option>
                <option value="10+">10+ years (Expert)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Salary Range (ZAR)</label>
              <select
                value={formData.salary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, salary: e.target.value }))
                }
                className="form-select"
              >
                <option value="">Select salary range</option>
                <option value="15000-25000">R15,000 - R25,000</option>
                <option value="25000-40000">R25,000 - R40,000</option>
                <option value="40000-60000">R40,000 - R60,000</option>
                <option value="60000-80000">R60,000 - R80,000</option>
                <option value="80000+">R80,000+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Remote Preference</label>
              <select
                value={formData.remotePreference}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    remotePreference: e.target.value,
                  }))
                }
                className="form-select"
              >
                <option value="">Select preference</option>
                <option value="fully-remote">Fully Remote</option>
                <option value="hybrid">Hybrid (Some office time)</option>
                <option value="flexible">Flexible (Open to both)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Industries of Interest</h4>
          <div className="industries-grid">
            {industryOptions.map((industry) => (
              <label key={industry} className="industry-checkbox">
                <input
                  type="checkbox"
                  checked={formData.industries.includes(industry)}
                  onChange={() => handleIndustryChange(industry)}
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h4>Additional Information</h4>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData({ ...formData, additionalNotes: e.target.value })
              }
              placeholder="Any additional information about your job preferences..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Payment Type</label>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="one-time"
                  checked={paymentType === "one-time"}
                  onChange={(e) =>
                    setPaymentType(
                      e.target.value as "one-time" | "subscription"
                    )
                  }
                />
                <span>One-time Setup (R179)</span>
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="subscription"
                  checked={paymentType === "subscription"}
                  onChange={(e) =>
                    setPaymentType(
                      e.target.value as "one-time" | "subscription"
                    )
                  }
                />
                <span>Monthly Subscription (R179 setup + R59/month)</span>
              </label>
            </div>

            {/* Payment Type Explanations */}
            {paymentType === "one-time" && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.75rem",
                  backgroundColor: "#fef3c7",
                  border: "1px solid #f59e0b",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              >
                <strong>One-time Setup:</strong> Pay R179 for immediate access.
                This is a one-time fee - if you want to continue using the
                service next month, you'll need to pay R179 again. Consider the
                subscription for ongoing access.
              </div>
            )}

            {paymentType === "subscription" && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.75rem",
                  backgroundColor: "#dbeafe",
                  border: "1px solid #3b82f6",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              >
                <strong>💡 Best Value - Monthly Subscription:</strong> Pay R179
                setup + R59/month. After the first month, you save R120 compared
                to paying one-time fees repeatedly.
                <br />
                <br />
                <strong>💳 Payment Tip:</strong> Don't have a PayPal account? No
                problem! You can pay with any credit/debit card. Just uncheck
                "Create PayPal account" during checkout and use guest payment.
              </div>
            )}
          </div>
        </div>

        <div className="form-submit">
          {!user && (
            <div
              style={{
                background: "#fef3c7",
                border: "1px solid #f59e0b",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: "0 0 0.5rem 0",
                  fontWeight: "600",
                  color: "#92400e",
                }}
              >
                🔐 Sign up to use our Job Assistant service
              </p>
              <p
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "0.9rem",
                  color: "#92400e",
                }}
              >
                Create a free account to submit your application and start
                receiving daily job applications
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "#92400e",
                  fontStyle: "italic",
                }}
              >
                ✨ Free signup • No spam emails • Secure & private • Smooth
                experience guaranteed
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={!emailConfirmed || loading}
            className="submit-btn"
          >
            {user ? "Submit Application" : "Sign up to Submit Application"}
          </button>

          {showPayPalButton && paymentData && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <h4>Complete Payment</h4>
              <p>Click below to pay R179 for Job Assistant setup</p>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>
                Debug: showPayPalButton={showPayPalButton.toString()},
                paymentData exists={!!paymentData}
              </p>
              <PayPalButtons
                createOrder={(_, actions) => {
                  return actions.order.create(paymentData);
                }}
                onApprove={(_, actions) => {
                  if (actions.order) {
                    return actions.order.capture().then((details) => {
                      console.log("Payment completed:", details);
                      setSubmitted(true);
                      setShowPayPalButton(false);
                    });
                  }
                  return Promise.resolve();
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("Payment failed. Please try again.");
                }}
                onCancel={() => {
                  console.log("Payment cancelled");
                  setShowPayPalButton(false);
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobAssistant;
