import React, { useState } from "react";
import { supabase } from "../lib/supabase";

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
    cvFile: undefined,
    cvFileName: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cvFile: file,
        cvFileName: file.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated for job assistant service
    if (!user) {
      onAuthRequired();
      return;
    }

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
        cvFileName: formData.cvFileName,
      };

      // If CV file is uploaded, convert it to base64
      if (formData.cvFile) {
        console.log(
          "CV file found:",
          formData.cvFile.name,
          formData.cvFile.size,
          formData.cvFile.type
        );
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = event.target?.result as string;
          console.log("File converted to base64, length:", base64Data.length);

          // Add file data to form data
          formDataToSend.cvFileData = base64Data;
          formDataToSend.cvFileType =
            formData.cvFile?.type || "application/pdf";

          console.log("Sending form data with file:", {
            cvFileName: formDataToSend.cvFileName,
            cvFileType: formDataToSend.cvFileType,
            hasFileData: !!formDataToSend.cvFileData,
          });

          // Send the complete data
          await sendFormData(formDataToSend);
        };
        reader.readAsDataURL(formData.cvFile);
      } else {
        console.log("No CV file uploaded");
        // No file uploaded, send data directly
        await sendFormData(formDataToSend);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  const sendFormData = async (data: any) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch("/api/job-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    const result = await response.json();
    console.log("Application submitted with ID:", result.applicationId);
    console.log("CV file URL:", result.cvFileUrl);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="job-assistant">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Application Submitted!</h2>
          <p>
            Thank you for your interest in our Job Application Assistant
            service.
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
              <p>R100 setup + R50/month - Cancel anytime</p>
            </div>
          </div>
          <button onClick={() => setSubmitted(false)} className="back-btn">
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

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
          <div className="pricing-highlight">
            <div className="price-tag">
              <span className="price">R100</span>
              <span className="period">one-time setup</span>
            </div>
            <div className="price-tag">
              <span className="price">R50</span>
              <span className="period">per month</span>
            </div>
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

      <form onSubmit={handleSubmit} className="assistant-form">
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
          <h4>Upload Your CV</h4>
          <div className="cv-upload-section">
            <div className="cv-upload-area">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCVUpload}
                id="cv-upload"
                style={{ display: "none" }}
              />
              <label htmlFor="cv-upload" className="cv-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  <strong>Click to upload your CV</strong>
                  <p>PDF, DOC, or DOCX files accepted</p>
                </div>
              </label>
            </div>
            {formData.cvFileName && (
              <div className="cv-preview">
                <span className="file-name">✅ {formData.cvFileName}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      cvFile: undefined,
                      cvFileName: "",
                    }))
                  }
                  className="remove-cv"
                >
                  Remove
                </button>
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
            <label>Additional Notes (Optional)</label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalNotes: e.target.value,
                }))
              }
              rows={4}
              placeholder="Tell us about your specific requirements, preferred companies, or any other details..."
            />
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
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#92400e" }}>
                Create an account to submit your application and start receiving
                daily job applications
              </p>
            </div>
          )}
          <button type="submit" className="submit-btn">
            {user ? "Submit Application" : "Sign up to Submit Application"}
          </button>
          <p className="form-note">
            * This is a demo. In a real implementation, this would connect to a
            backend service.
          </p>
        </div>
      </form>
    </div>
  );
};

export default JobAssistant;
