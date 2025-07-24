// CV Generator: Optional sections and visual enhancements are present. Triggering deployment.
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { supabase } from "../lib/supabase";
//Hello World
interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    photo?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  }>;
  skills: string[];
  languages: string[];
  references: Array<{
    name: string;
    relationship: string;
    company?: string;
    email: string;
    phone: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  awards: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  volunteer: Array<{
    organization: string;
    role: string;
    dates: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
}

interface CVGeneratorProps {
  onAuthRequired: () => void;
  user: any;
}

const CVGenerator: React.FC<CVGeneratorProps> = ({ onAuthRequired, user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      photo: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
    references: [],
    certifications: [],
    awards: [],
    volunteer: [],
    projects: [],
  });

  const [tempExperience, setTempExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const [tempEducation, setTempEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    graduationYear: "",
  });

  const [tempSkills, setTempSkills] = useState("");
  const [tempLanguages, setTempLanguages] = useState("");

  const addExperience = () => {
    if (tempExperience.company && tempExperience.position) {
      setCvData((prev) => ({
        ...prev,
        experience: [...prev.experience, { ...tempExperience }],
      }));
      setTempExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
  };

  const addEducation = () => {
    if (tempEducation.institution && tempEducation.degree) {
      setCvData((prev) => ({
        ...prev,
        education: [...prev.education, { ...tempEducation }],
      }));
      setTempEducation({
        institution: "",
        degree: "",
        field: "",
        graduationYear: "",
      });
    }
  };

  const addSkills = () => {
    if (tempSkills.trim()) {
      const skillsArray = tempSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...skillsArray],
      }));
      setTempSkills("");
    }
  };

  const addLanguages = () => {
    if (tempLanguages.trim()) {
      const languagesArray = tempLanguages
        .split(",")
        .map((lang) => lang.trim())
        .filter((lang) => lang);
      setCvData((prev) => ({
        ...prev,
        languages: [...prev.languages, ...languagesArray],
      }));
      setTempLanguages("");
    }
  };

  const removeExperience = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeSkill = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const removeLanguage = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const generatePDF = async () => {
    // Check if user is authenticated for saving/downloading
    if (!user) {
      onAuthRequired();
      return;
    }

    try {
      // Save CV data to backend (PDF will be generated on server)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const saveResponse = await fetch("/api/cv-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          cvData: cvData,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save CV data");
      }

      const saveResult = await saveResponse.json();
      console.log("CV saved with ID:", saveResult.cvId);

      const cvHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${cvData.personalInfo.fullName} - CV</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .header-content { display: flex; align-items: center; gap: 30px; }
            .photo { flex-shrink: 0; }
            .info { flex-grow: 1; }
            .name { font-size: 2.5em; font-weight: bold; margin-bottom: 10px; }
            .contact { font-size: 1.1em; color: #666; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 1.5em; font-weight: bold; margin-bottom: 15px; color: #333; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .job-title { font-weight: bold; font-size: 1.2em; }
            .company { color: #666; font-style: italic; }
            .date { color: #888; font-size: 0.9em; }
            .skills-list, .languages-list { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill, .language { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-content">
              ${
                cvData.personalInfo.photo
                  ? `<div class="photo"><img src="${cvData.personalInfo.photo}" alt="Profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" /></div>`
                  : ""
              }
              <div class="info">
                <div class="name">${cvData.personalInfo.fullName}</div>
                <div class="contact">
                  ${cvData.personalInfo.email} | ${
        cvData.personalInfo.phone
      }<br>
                  ${cvData.personalInfo.location}
                  ${
                    cvData.personalInfo.linkedin
                      ? `<br>LinkedIn: ${cvData.personalInfo.linkedin}`
                      : ""
                  }
                  ${
                    cvData.personalInfo.portfolio
                      ? `<br>Portfolio: ${cvData.personalInfo.portfolio}`
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>

          ${
            cvData.summary
              ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p>${cvData.summary}</p>
          </div>
          `
              : ""
          }

          ${
            cvData.experience.length > 0
              ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${cvData.experience
              .map(
                (exp) => `
              <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="date">${exp.startDate} - ${
                  exp.current ? "Present" : exp.endDate
                }</div>
                <p>${exp.description}</p>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          ${
            cvData.education.length > 0
              ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${cvData.education
              .map(
                (edu) => `
              <div class="education-item">
                <div class="job-title">${edu.degree} in ${edu.field}</div>
                <div class="company">${edu.institution}</div>
                <div class="date">${edu.graduationYear}</div>
              </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          ${
            cvData.skills.length > 0
              ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${cvData.skills
                .map((skill) => `<span class="skill">${skill}</span>`)
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            cvData.languages.length > 0
              ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <div class="languages-list">
              ${cvData.languages
                .map((lang) => `<span class="language">${lang}</span>`)
                .join("")}
            </div>
          </div>
          `
              : ""
          }
        </body>
        </html>
      `;

      // Create a temporary div to render the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cvHTML;
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "800px"; // Set fixed width for consistent sizing
      tempDiv.style.backgroundColor = "white";
      tempDiv.style.padding = "40px";
      document.body.appendChild(tempDiv);

      // Convert to canvas with proper dimensions
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: tempDiv.scrollHeight,
        backgroundColor: "#ffffff",
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Convert to PDF with proper A4 sizing
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 20; // 20mm margins
      const contentWidth = pageWidth - 2 * margin;
      const contentHeight = pageHeight - 2 * margin;

      // Calculate image dimensions to fit A4 properly
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      heightLeft -= contentHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin + position,
          imgWidth,
          imgHeight
        );
        heightLeft -= contentHeight;
      }

      // Download the PDF
      pdf.save(`${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf`);

      if (isMobile()) {
        alert(
          "Your CV PDF has been downloaded. Please check your device's Downloads folder."
        );
      } else {
        alert("CV generated and saved successfully!");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const generateHTML = () => {
    const cvHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${cvData.personalInfo.fullName} - CV</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .header-content { display: flex; align-items: center; gap: 30px; }
          .photo { flex-shrink: 0; }
          .info { flex-grow: 1; }
          .name { font-size: 2.5em; font-weight: bold; margin-bottom: 10px; }
          .contact { font-size: 1.1em; color: #666; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 1.5em; font-weight: bold; border-bottom: 1px solid #ccc; margin-bottom: 15px; padding-bottom: 5px; }
          .experience-item, .education-item { margin-bottom: 20px; }
          .job-title { font-weight: bold; font-size: 1.1em; }
          .company { font-weight: bold; color: #333; }
          .date { color: #666; font-style: italic; }
          .description { margin-top: 10px; }
          .skills-list, .languages-list { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill, .language { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; }
          @media print {
            body { margin: 20px; }
            .header-content { flex-direction: column; text-align: center; }
            .photo { margin-bottom: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-content">
            ${
              cvData.personalInfo.photo
                ? `<div class="photo"><img src="${cvData.personalInfo.photo}" alt="Profile Photo" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 3px solid #333;" /></div>`
                : ""
            }
            <div class="info">
              <div class="name">${cvData.personalInfo.fullName}</div>
              <div class="contact">
                ${cvData.personalInfo.email} | ${cvData.personalInfo.phone}<br>
                ${cvData.personalInfo.location}
                ${
                  cvData.personalInfo.linkedin
                    ? `<br>LinkedIn: ${cvData.personalInfo.linkedin}`
                    : ""
                }
                ${
                  cvData.personalInfo.portfolio
                    ? `<br>Portfolio: ${cvData.personalInfo.portfolio}`
                    : ""
                }
              </div>
            </div>
          </div>
        </div>

        ${
          cvData.summary
            ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p>${cvData.summary}</p>
        </div>
        `
            : ""
        }

        ${
          cvData.experience.length > 0
            ? `
        <div class="section">
          <div class="section-title">Work Experience</div>
          ${cvData.experience
            .map(
              (exp) => `
            <div class="experience-item">
              <div class="job-title">${exp.position}</div>
              <div class="company">${exp.company}</div>
              <div class="date">${exp.startDate} - ${
                exp.current ? "Present" : exp.endDate
              }</div>
              <div class="description">${exp.description}</div>
            </div>
          `
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          cvData.education.length > 0
            ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${cvData.education
            .map(
              (edu) => `
            <div class="education-item">
              <div class="job-title">${edu.degree} in ${edu.field}</div>
              <div class="company">${edu.institution}</div>
              <div class="date">${edu.graduationYear}</div>
            </div>
          `
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          cvData.skills.length > 0
            ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-list">
            ${cvData.skills
              .map((skill) => `<span class="skill">${skill}</span>`)
              .join("")}
          </div>
        </div>
        `
            : ""
        }

        ${
          cvData.languages.length > 0
            ? `
        <div class="section">
          <div class="section-title">Languages</div>
          <div class="languages-list">
            ${cvData.languages
              .map((lang) => `<span class="language">${lang}</span>`)
              .join("")}
          </div>
        </div>
        `
            : ""
        }
      </body>
      </html>
    `;

    const blob = new Blob([cvHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_CV.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateCV = () => {
    generatePDF();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="cv-step">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={cvData.personalInfo.fullName}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      fullName: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      email: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      phone: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                value={cvData.personalInfo.location}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      location: e.target.value,
                    },
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label>LinkedIn (optional)</label>
              <input
                type="url"
                value={cvData.personalInfo.linkedin}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      linkedin: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label>Portfolio/Website (optional)</label>
              <input
                type="url"
                value={cvData.personalInfo.portfolio}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      portfolio: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label>Profile Photo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setCvData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          photo: event.target?.result as string,
                        },
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {cvData.personalInfo.photo && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={cvData.personalInfo.photo}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #ddd",
                    }}
                  />
                  <button
                    onClick={() =>
                      setCvData((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          photo: "",
                        },
                      }))
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="cv-step">
            <h3>Professional Summary</h3>
            <div className="form-group">
              <label>Brief professional summary (2-3 sentences)</label>
              <textarea
                value={cvData.summary}
                onChange={(e) =>
                  setCvData((prev) => ({ ...prev, summary: e.target.value }))
                }
                rows={4}
                placeholder="e.g., Experienced software developer with 5+ years in web development..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="cv-step">
            <h3>Work Experience</h3>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <strong>
                    {exp.position} at {exp.company}
                  </strong>
                  <button
                    onClick={() => removeExperience(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </div>
                <div>{exp.description}</div>
              </div>
            ))}

            <div className="add-experience">
              <h4>Add New Experience</h4>
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={tempExperience.position}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={tempExperience.company}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={tempExperience.startDate}
                    onChange={(e) =>
                      setTempExperience((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={tempExperience.endDate}
                    onChange={(e) =>
                      setTempExperience((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    disabled={tempExperience.current}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={tempExperience.current}
                    onChange={(e) =>
                      setTempExperience((prev) => ({
                        ...prev,
                        current: e.target.checked,
                      }))
                    }
                  />
                  Currently working here
                </label>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={tempExperience.description}
                  onChange={(e) =>
                    setTempExperience((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
              <button onClick={addExperience} className="add-btn">
                Add Experience
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="cv-step">
            <h3>Education</h3>
            {cvData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <strong>
                    {edu.degree} in {edu.field}
                  </strong>
                  <button
                    onClick={() => removeEducation(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  {edu.institution} - {edu.graduationYear}
                </div>
              </div>
            ))}

            <div className="add-education">
              <h4>Add New Education</h4>
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={tempEducation.degree}
                  onChange={(e) =>
                    setTempEducation((prev) => ({
                      ...prev,
                      degree: e.target.value,
                    }))
                  }
                  placeholder="e.g., Bachelor of Science"
                />
              </div>
              <div className="form-group">
                <label>Field of Study *</label>
                <input
                  type="text"
                  value={tempEducation.field}
                  onChange={(e) =>
                    setTempEducation((prev) => ({
                      ...prev,
                      field: e.target.value,
                    }))
                  }
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  value={tempEducation.institution}
                  onChange={(e) =>
                    setTempEducation((prev) => ({
                      ...prev,
                      institution: e.target.value,
                    }))
                  }
                  placeholder="e.g., University of Cape Town"
                />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="number"
                  value={tempEducation.graduationYear}
                  onChange={(e) =>
                    setTempEducation((prev) => ({
                      ...prev,
                      graduationYear: e.target.value,
                    }))
                  }
                  placeholder="e.g., 2023"
                />
              </div>
              <button onClick={addEducation} className="add-btn">
                Add Education
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="cv-step">
            <h3>Skills & Languages</h3>

            <div className="skills-section">
              <h4>Skills</h4>
              {cvData.skills.length > 0 && (
                <div className="skills-list">
                  {cvData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="remove-skill"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="form-group">
                <label>Add Skills (comma-separated)</label>
                <input
                  type="text"
                  value={tempSkills}
                  onChange={(e) => setTempSkills(e.target.value)}
                  placeholder="e.g., JavaScript, React, Python, Project Management"
                />
                <button onClick={addSkills} className="add-btn">
                  Add Skills
                </button>
              </div>
            </div>

            <div className="languages-section">
              <h4>Languages</h4>
              {cvData.languages.length > 0 && (
                <div className="languages-list">
                  {cvData.languages.map((lang, index) => (
                    <span key={index} className="language-tag">
                      {lang}
                      <button
                        onClick={() => removeLanguage(index)}
                        className="remove-language"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="form-group">
                <label>Add Languages (comma-separated)</label>
                <input
                  type="text"
                  value={tempLanguages}
                  onChange={(e) => setTempLanguages(e.target.value)}
                  placeholder="e.g., English (Native), Afrikaans (Fluent), French (Basic)"
                />
                <button onClick={addLanguages} className="add-btn">
                  Add Languages
                </button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="cv-step">
            <h3>Review & Generate CV</h3>
            <div className="cv-preview">
              <h4>Preview</h4>
              <div className="preview-section">
                <strong>Personal Info:</strong> {cvData.personalInfo.fullName} -{" "}
                {cvData.personalInfo.email}
              </div>
              <div className="preview-section">
                <strong>Experience:</strong> {cvData.experience.length}{" "}
                positions
              </div>
              <div className="preview-section">
                <strong>Education:</strong> {cvData.education.length} entries
              </div>
              <div className="preview-section">
                <strong>Skills:</strong> {cvData.skills.length} skills
              </div>
              <div className="preview-section">
                <strong>Languages:</strong> {cvData.languages.length} languages
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!user && (
                <div
                  style={{
                    background: "#fef3c7",
                    border: "1px solid #f59e0b",
                    borderRadius: "8px",
                    padding: "1rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                    maxWidth: "400px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontWeight: "600",
                      color: "#92400e",
                    }}
                  >
                    🔐 Sign up to save and download your CV
                  </p>
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontSize: "0.9rem",
                      color: "#92400e",
                    }}
                  >
                    Create a free account to save your CV and download it as a
                    professional PDF
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "#92400e",
                      fontStyle: "italic",
                    }}
                  >
                    ✨ Free forever • No spam emails • No payment required •
                    Secure & private
                  </p>
                </div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={generateCV} className="generate-btn">
                  {user
                    ? "Generate & Download PDF"
                    : "Preview CV (Sign up to download)"}
                </button>
                <button
                  onClick={generateHTML}
                  className="generate-btn"
                  style={{ backgroundColor: "#6b7280" }}
                >
                  Download HTML
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cv-generator">
      <style>{`
      @media (max-width: 600px) {
        .cv-generator, .cv-content, .cv-step, .form-group, .add-experience, .add-education, .skills-section, .languages-section {
          width: 100% !important;
          max-width: 100vw !important;
          box-sizing: border-box;
        }
        .cv-header, .cv-progress, .cv-navigation {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .form-group input, .form-group textarea, .form-group select {
          width: 100% !important;
          font-size: 1rem !important;
        }
        .add-btn, .remove-btn, .generate-btn, .nav-btn {
          width: 100%;
          margin-top: 8px;
          font-size: 1.1rem;
        }
        .cv-step h3, .cv-step h4 {
          font-size: 1.2rem;
        }
        .cv-preview, .preview-section {
          font-size: 1rem;
        }
      }
    `}</style>
      <div className="cv-header">
        <h2>CV Generator</h2>
        <p>Create a professional CV in minutes</p>
      </div>

      <div className="cv-progress">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? "active" : ""}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="cv-content">{renderStep()}</div>

      <div className="cv-navigation">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="nav-btn prev"
          >
            Previous
          </button>
        )}
        {currentStep < 6 && (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="nav-btn next"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// Add a helper to detect mobile
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export default CVGenerator;
