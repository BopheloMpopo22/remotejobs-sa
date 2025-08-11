// CV Generator: Optional sections and visual enhancements are present. Triggering deployment.
import React, { useState, useEffect } from "react";
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
  const [selectedTemplate, setSelectedTemplate] = useState<
    "normal" | "modern" | "creative" | "classic"
  >("normal");
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

  const [isInitialized, setIsInitialized] = useState(false);

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
  const [tempReference, setTempReference] = useState({
    name: "",
    relationship: "",
    company: "",
    email: "",
    phone: "",
  });
  const [tempCertification, setTempCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    description: "",
  });
  const [tempAward, setTempAward] = useState({
    name: "",
    issuer: "",
    date: "",
    description: "",
  });
  const [tempVolunteer, setTempVolunteer] = useState({
    organization: "",
    role: "",
    dates: "",
    description: "",
  });
  const [tempProject, setTempProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
  });

  // Save CV data to localStorage whenever it changes
  useEffect(() => {
    // Don't save on initial mount
    if (!isInitialized) {
      console.log(
        "⏳ CV Generator component not yet initialized, skipping save"
      );
      return;
    }

    // Only save if we have actual data (not just empty values)
    const hasData = Object.values(cvData).some((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((v) =>
          typeof v === "string"
            ? v.trim() !== ""
            : Array.isArray(v)
              ? v.length > 0
              : v
        );
      }
      return false;
    });

    if (hasData) {
      localStorage.setItem("cvGeneratorData", JSON.stringify(cvData));
      console.log("💾 Saved CV Generator data to localStorage:", cvData);
    } else {
      console.log("⚠️ Not saving empty CV data to localStorage");
    }
  }, [cvData, isInitialized]);

  // Load CV data from localStorage on component mount
  useEffect(() => {
    console.log("🔄 CV Generator component mounted");
    const savedData = localStorage.getItem("cvGeneratorData");
    console.log("📂 Loading CV Generator data from localStorage:", savedData);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("✅ Successfully parsed saved CV data:", parsedData);

        // Check if the parsed data has actual content
        const hasContent = Object.values(parsedData).some((value) => {
          if (typeof value === "string") {
            return value.trim() !== "";
          } else if (Array.isArray(value)) {
            return value.length > 0;
          } else if (typeof value === "object" && value !== null) {
            return Object.values(value).some((v) =>
              typeof v === "string"
                ? v.trim() !== ""
                : Array.isArray(v)
                  ? v.length > 0
                  : v
            );
          }
          return false;
        });

        if (hasContent) {
          setCvData(parsedData);
          console.log("✅ Restored CV data successfully");
        } else {
          console.log("⚠️ Parsed CV data is empty, not restoring");
        }
      } catch (error) {
        console.error("❌ Error loading saved CV data:", error);
      }
    } else {
      console.log("📭 No saved CV data found in localStorage");
    }

    // Mark as initialized after loading attempt
    setIsInitialized(true);
    console.log("✅ CV Generator component initialized");
  }, []);

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
          cvData: {
            ...cvData,
            template: selectedTemplate,
          },
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save CV data");
      }

      const saveResult = await saveResponse.json();
      console.log("CV saved with ID:", saveResult.cvId);

      // Use the template system for PDF generation
      const cvHTML = generateHTML();

      // Create a temporary div to render the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = cvHTML;
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "210mm"; // A4 width
      tempDiv.style.backgroundColor = "white";
      tempDiv.style.padding = "0";
      tempDiv.style.margin = "0";
      document.body.appendChild(tempDiv);

      // Convert to canvas with proper A4 dimensions - let content determine height
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 794, // 210mm in pixels at 96 DPI
        height: tempDiv.scrollHeight, // Let content determine height
        backgroundColor: "#ffffff",
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Convert to PDF with proper A4 sizing
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Simple and reliable multi-page approach
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm

      // Calculate dimensions to fit width
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If content fits on one page
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // Content needs multiple pages
        const totalPages = Math.ceil(imgHeight / pageHeight);

        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
          }

          // Calculate the Y position for this page
          const yPosition = -(page * pageHeight);

          // Add the full image with offset to show the correct portion
          pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
        }
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

  const generateHTML = (
    template: "normal" | "modern" | "creative" | "classic" = selectedTemplate
  ) => {
    const getTemplateStyles = () => {
      switch (template) {
        case "normal":
          return `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; line-height: 1.4; color: #333; }
            .cv-container { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; padding: 0; }
            .header { background: #f8f9fa; border-bottom: 2px solid #dee2e6; padding: 15px 20px; }
            .header-content { display: flex; align-items: center; justify-content: space-between; }
            .header-left { display: flex; align-items: center; }
            .profile-photo { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #dee2e6; margin-right: 20px; }
            .header-text h1 { font-size: 2.2em; font-weight: 700; margin-bottom: 6px; color: #2c3e50; }
            .header-text h2 { font-size: 1.1em; font-weight: 400; color: #6c757d; margin-bottom: 8px; }
            .contact-info { display: flex; flex-direction: column; gap: 3px; }
            .contact-item { display: flex; align-items: center; font-size: 0.95em; }
            .contact-icon { width: 14px; margin-right: 6px; color: #6c757d; }
            .content { display: block; padding: 15px 20px; }
            .section { margin-bottom: 15px; }
            .section h3 { font-size: 1.2em; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; color: #2c3e50; background: #f8f9fa; padding: 6px 12px; border-left: 3px solid #007bff; }
            .skills-list { list-style: none; }
            .skills-list li { margin-bottom: 3px; padding-left: 12px; position: relative; font-size: 0.95em; }
            .skills-list li:before { content: "•"; color: #6c757d; position: absolute; left: 0; }
            .languages-list { list-style: none; }
            .languages-list li { margin-bottom: 3px; padding-left: 12px; position: relative; font-size: 0.95em; }
            .languages-list li:before { content: "•"; color: #6c757d; position: absolute; left: 0; }
            .experience-item { margin-bottom: 12px; }
            .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
            .job-title { font-weight: 600; font-size: 1.05em; color: #2c3e50; }
            .company { font-weight: 500; color: #6c757d; font-size: 1em; }
            .dates { color: #6c757d; font-size: 0.9em; }
            .responsibilities { list-style: none; padding-left: 12px; }
            .responsibilities li { margin-bottom: 2px; position: relative; font-size: 0.95em; }
            .responsibilities li:before { content: "•"; color: #6c757d; position: absolute; left: -8px; }
            .education-item { margin-bottom: 10px; }
            .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
            .degree { font-weight: 600; color: #2c3e50; font-size: 1.05em; }
            .institution { color: #6c757d; font-size: 1em; }
            .summary { text-align: justify; line-height: 1.4; font-size: 0.95em; }
            .references-item, .certification-item, .award-item, .volunteer-item, .project-item { margin-bottom: 6px; }
            .references-item strong, .certification-item strong, .award-item strong, .volunteer-item strong, .project-item strong { color: #2c3e50; font-size: 1em; }
            .references-item div, .certification-item div, .award-item div, .volunteer-item div, .project-item div { font-size: 0.9em; color: #6c757d; margin-top: 1px; }
            .project-link { color: #007bff; text-decoration: none; font-size: 0.9em; }
            @media print { body { margin: 0; } .cv-container { box-shadow: none; } }
          `;
        case "modern":
          return `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Poppins', sans-serif; line-height: 1.5; color: #333; }
            .cv-container { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; }
            .header { background: #2c3e50; color: white; padding: 15px 20px; text-align: center; }
            .header h1 { font-size: 2.2em; font-weight: 700; margin-bottom: 6px; }
            .header h2 { font-size: 1.1em; font-weight: 400; color: #3498db; }
            .content { display: flex; min-height: calc(297mm - 60px); align-items: stretch; }
            .sidebar { width: 40%; background: #34495e; color: white; padding: 15px; overflow: visible; word-wrap: break-word; }
            .main-content { width: 60%; padding: 12px; }
            .section { margin-bottom: 15px; }
            .section h3 { font-size: 1.2em; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 3px; }
            .contact-item { display: flex; align-items: center; margin-bottom: 4px; font-size: 0.95em; word-wrap: break-word; }
            .contact-icon { width: 14px; margin-right: 8px; color: #3498db; flex-shrink: 0; }
            .skills-list { list-style: none; }
            .skills-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; word-wrap: break-word; }
            .skills-list li:before { content: "•"; color: #3498db; position: absolute; left: 0; }
            .languages-list { list-style: none; }
            .languages-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; word-wrap: break-word; }
            .languages-list li:before { content: "•"; color: #3498db; position: absolute; left: 0; }
            .profile-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 12px; display: block; border: 3px solid #3498db; }
            .experience-item { margin-bottom: 12px; }
            .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
            .job-title { font-weight: 600; font-size: 1.05em; color: #2c3e50; }
            .company { font-weight: 500; color: #7f8c8d; font-size: 1em; }
            .dates { color: #95a5a6; font-size: 0.9em; }
            .responsibilities { list-style: none; padding-left: 15px; }
            .responsibilities li { margin-bottom: 2px; position: relative; font-size: 0.95em; }
            .responsibilities li:before { content: "•"; color: #3498db; position: absolute; left: -12px; }
            .education-item { margin-bottom: 10px; }
            .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; flex-wrap: wrap; }
            .degree { font-weight: 600; color: #2c3e50; font-size: 1.05em; }
            .institution { color: #7f8c8d; font-size: 1em; }
            .summary { text-align: justify; line-height: 1.4; font-size: 0.95em; }
            .references-item, .certification-item, .award-item, .volunteer-item, .project-item { margin-bottom: 6px; }
            .references-item strong, .certification-item strong, .award-item strong, .volunteer-item strong, .project-item strong { color: #2c3e50; font-size: 1em; }
            .references-item div, .certification-item div, .award-item div, .volunteer-item div, .project-item div { font-size: 0.9em; color: #7f8c8d; margin-top: 1px; }
            .project-link { color: #3498db; text-decoration: none; font-size: 0.9em; }
            @media print { body { margin: 0; } .cv-container { box-shadow: none; } }
          `;
        case "creative":
          return `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Poppins', sans-serif; line-height: 1.5; color: #333; }
            .cv-container { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white; padding: 15px 20px; text-align: center; }
            .header h1 { font-size: 2.2em; font-weight: 700; margin-bottom: 6px; }
            .header h2 { font-size: 1.1em; font-weight: 400; color: #e8f4fd; }
            .content { display: flex; min-height: calc(297mm - 60px); align-items: stretch; }
            .sidebar { width: 40%; background: #f8f9fa; padding: 15px; border-right: 2px solid #4a90e2; overflow: visible; word-wrap: break-word; }
            .main-content { width: 60%; padding: 12px; }
            .section { margin-bottom: 15px; }
            .section h3 { font-size: 1.2em; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; color: #4a90e2; border-bottom: 2px solid #4a90e2; padding-bottom: 3px; }
            .contact-item { display: flex; align-items: center; margin-bottom: 4px; font-size: 0.95em; word-wrap: break-word; }
            .contact-icon { width: 14px; margin-right: 8px; color: #4a90e2; flex-shrink: 0; }
            .skills-list { list-style: none; }
            .skills-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; word-wrap: break-word; }
            .skills-list li:before { content: "▸"; color: #4a90e2; position: absolute; left: 0; font-weight: bold; }
            .languages-list { list-style: none; }
            .languages-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; word-wrap: break-word; }
            .languages-list li:before { content: "▸"; color: #4a90e2; position: absolute; left: 0; font-weight: bold; }
            .profile-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 12px; display: block; border: 3px solid #4a90e2; }
            .experience-item { margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #4a90e2; }
            .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
            .job-title { font-weight: 600; font-size: 1.05em; color: #2c3e50; }
            .company { font-weight: 500; color: #4a90e2; font-size: 1em; }
            .dates { color: #95a5a6; font-size: 0.9em; }
            .responsibilities { list-style: none; padding-left: 15px; }
            .responsibilities li { margin-bottom: 2px; position: relative; font-size: 0.95em; }
            .responsibilities li:before { content: "•"; color: #4a90e2; position: absolute; left: -12px; font-weight: bold; }
            .education-item { margin-bottom: 10px; padding: 8px; background: #f8f9fa; border-radius: 4px; }
            .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
            .degree { font-weight: 600; color: #2c3e50; font-size: 1.05em; }
            .institution { color: #4a90e2; font-size: 1em; }
            .summary { text-align: justify; line-height: 1.4; padding: 8px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #4a90e2; font-size: 0.95em; }
            .references-item, .certification-item, .award-item, .volunteer-item, .project-item { margin-bottom: 6px; padding: 6px; background: #f8f9fa; border-radius: 4px; }
            .references-item strong, .certification-item strong, .award-item strong, .volunteer-item strong, .project-item strong { color: #2c3e50; font-size: 1em; }
            .references-item div, .certification-item div, .award-item div, .volunteer-item div, .project-item div { font-size: 0.9em; color: #7f8c8d; margin-top: 1px; }
            .project-link { color: #4a90e2; text-decoration: none; font-size: 0.9em; }
            @media print { body { margin: 0; } .cv-container { box-shadow: none; } }
          `;
        case "classic":
          return `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Georgia', serif; line-height: 1.5; color: #2c3e50; }
            .cv-container { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; }
            .header { background: #f8f9fa; border-bottom: 3px solid #2c3e50; padding: 15px 20px; text-align: center; }
            .header h1 { font-size: 2.2em; font-weight: 700; margin-bottom: 6px; color: #2c3e50; }
            .header h2 { font-size: 1.1em; font-weight: 400; color: #7f8c8d; font-style: italic; }
            .content { display: flex; min-height: calc(297mm - 60px); align-items: stretch; }
            .sidebar { width: 40%; background: #f8f9fa; padding: 15px; border-right: 2px solid #ecf0f1; }
            .main-content { width: 60%; padding: 12px; }
            .section { margin-bottom: 15px; }
            .section h3 { font-size: 1.2em; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; color: #2c3e50; border-bottom: 1px solid #bdc3c7; padding-bottom: 3px; }
            .contact-item { display: flex; align-items: center; margin-bottom: 4px; font-size: 0.95em; }
            .contact-icon { width: 14px; margin-right: 8px; color: #7f8c8d; }
            .skills-list { list-style: none; }
            .skills-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; }
            .skills-list li:before { content: "▪"; color: #2c3e50; position: absolute; left: 0; }
            .languages-list { list-style: none; }
            .languages-list li { margin-bottom: 3px; padding-left: 15px; position: relative; font-size: 0.95em; }
            .languages-list li:before { content: "▪"; color: #2c3e50; position: absolute; left: 0; }
            .profile-photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; display: block; border: 2px solid #bdc3c7; }
            .experience-item { margin-bottom: 12px; }
            .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
            .job-title { font-weight: 600; font-size: 1.05em; color: #2c3e50; }
            .company { font-weight: 500; color: #7f8c8d; font-size: 1em; }
            .dates { color: #95a5a6; font-size: 0.9em; }
            .responsibilities { list-style: none; padding-left: 15px; }
            .responsibilities li { margin-bottom: 2px; position: relative; font-size: 0.95em; }
            .responsibilities li:before { content: "•"; color: #2c3e50; position: absolute; left: -10px; }
            .education-item { margin-bottom: 10px; }
            .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
            .degree { font-weight: 600; color: #2c3e50; font-size: 1.05em; }
            .institution { color: #7f8c8d; font-size: 1em; }
            .summary { text-align: justify; line-height: 1.4; font-style: italic; font-size: 0.95em; }
            .references-item, .certification-item, .award-item, .volunteer-item, .project-item { margin-bottom: 6px; }
            .references-item strong, .certification-item strong, .award-item strong, .volunteer-item strong, .project-item strong { color: #2c3e50; font-size: 1em; }
            .references-item div, .certification-item div, .award-item div, .volunteer-item div, .project-item div { font-size: 0.9em; color: #7f8c8d; margin-top: 1px; }
            .project-link { color: #2c3e50; text-decoration: none; font-size: 0.9em; }
            @media print { body { margin: 0; } .cv-container { box-shadow: none; } }
          `;
        default:
          return `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
            .cv-container { max-width: 210mm; min-height: 297mm; margin: 0 auto; background: white; }
            .header { background: #2c3e50; color: white; padding: 25px 30px; text-align: center; }
            .header h1 { font-size: 2.2em; font-weight: 700; margin-bottom: 5px; }
            .header h2 { font-size: 1.1em; font-weight: 400; color: #3498db; }
            .content { display: flex; min-height: calc(297mm - 80px); }
            .sidebar { width: 35%; background: #34495e; color: white; padding: 25px; }
            .main-content { width: 65%; padding: 25px; }
            .section { margin-bottom: 20px; }
            .section h3 { font-size: 1em; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 3px; }
            .contact-item { display: flex; align-items: center; margin-bottom: 8px; font-size: 0.9em; }
            .contact-icon { width: 16px; margin-right: 8px; color: #3498db; }
            .skills-list { list-style: none; }
            .skills-list li { margin-bottom: 6px; padding-left: 16px; position: relative; font-size: 0.9em; }
            .skills-list li:before { content: "•"; color: #3498db; position: absolute; left: 0; }
            .languages-list { list-style: none; }
            .languages-list li { margin-bottom: 6px; padding-left: 16px; position: relative; font-size: 0.9em; }
            .languages-list li:before { content: "•"; color: #3498db; position: absolute; left: 0; }
            .profile-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 15px; display: block; border: 3px solid #3498db; }
            .experience-item { margin-bottom: 15px; }
            .experience-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
            .job-title { font-weight: 600; font-size: 1em; color: #2c3e50; }
            .company { font-weight: 500; color: #7f8c8d; font-size: 0.9em; }
            .dates { color: #95a5a6; font-size: 0.85em; }
            .responsibilities { list-style: none; padding-left: 16px; }
            .responsibilities li { margin-bottom: 4px; position: relative; font-size: 0.9em; }
            .responsibilities li:before { content: "•"; color: #3498db; position: absolute; left: -12px; }
            .education-item { margin-bottom: 12px; }
            .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
            .degree { font-weight: 600; color: #2c3e50; font-size: 0.95em; }
            .institution { color: #7f8c8d; font-size: 0.9em; }
            .summary { text-align: justify; line-height: 1.6; font-size: 0.9em; }
            .references-item, .certification-item, .award-item, .volunteer-item, .project-item { margin-bottom: 10px; }
            .references-item strong, .certification-item strong, .award-item strong, .volunteer-item strong, .project-item strong { color: #2c3e50; font-size: 0.95em; }
            .references-item div, .certification-item div, .award-item div, .volunteer-item div, .project-item div { font-size: 0.85em; color: #7f8c8d; margin-top: 2px; }
            .project-link { color: #3498db; text-decoration: none; font-size: 0.85em; }
            @media print { body { margin: 0; } .cv-container { box-shadow: none; } }
          `;
      }
    };

    const cvHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${cvData.personalInfo.fullName} - CV</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          ${getTemplateStyles()}
          @media print {
            body { margin: 0; }
            .cv-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
        <div class="header">
            ${
              template === "normal"
                ? `
          <div class="header-content">
                <div class="header-left">
            ${
              cvData.personalInfo.photo
                ? `<img src="${cvData.personalInfo.photo}" alt="Profile Photo" class="profile-photo" />`
                : ""
            }
                  <div class="header-text">
                    <h1>${cvData.personalInfo.fullName}</h1>
                    <h2>${cvData.personalInfo.email}</h2>
                  </div>
                </div>
                <div class="contact-info">
                  <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>${cvData.personalInfo.phone}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${cvData.personalInfo.location}</span>
                  </div>
                ${
                  cvData.personalInfo.linkedin
                    ? `<div class="contact-item">
                          <span class="contact-icon">💼</span>
                          <span>${cvData.personalInfo.linkedin}</span>
                        </div>`
                    : ""
                }
                ${
                  cvData.personalInfo.portfolio
                    ? `<div class="contact-item">
                          <span class="contact-icon">🌐</span>
                          <span>${cvData.personalInfo.portfolio}</span>
                        </div>`
                    : ""
                }
              </div>
            </div>
            `
                : `
              <h1>${cvData.personalInfo.fullName}</h1>
              <h2>${cvData.personalInfo.email}</h2>
            `
            }
        </div>

          <div class="content">
            ${
              template === "normal"
                ? `
              <!-- Normal template: Single column layout -->
              <div class="main-content">
            `
                : `
              <!-- Other templates: Two column layout -->
              <div class="sidebar">
              ${
                cvData.personalInfo.photo
                  ? `<img src="${cvData.personalInfo.photo}" alt="Profile Photo" class="profile-photo" />`
                  : ""
              }
              
        <div class="section">
                <h3>CONTACT</h3>
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>${cvData.personalInfo.email}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📱</span>
                  <span>${cvData.personalInfo.phone}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>${cvData.personalInfo.location}</span>
                </div>
                ${
                  cvData.personalInfo.linkedin
                    ? `<div class="contact-item">
                        <span class="contact-icon">💼</span>
                        <span>${cvData.personalInfo.linkedin}</span>
                      </div>`
                    : ""
                }
                ${
                  cvData.personalInfo.portfolio
                    ? `<div class="contact-item">
                        <span class="contact-icon">🌐</span>
                        <span>${cvData.personalInfo.portfolio}</span>
                      </div>`
                    : ""
                }
        </div>
        `
            }

              ${
                cvData.skills.length > 0
                  ? `<div class="section">
                      <h3>SKILLS</h3>
                      <ul class="skills-list">
                        ${cvData.skills
                          .map((skill) => `<li>${skill}</li>`)
                          .join("")}
                      </ul>
                    </div>`
                  : ""
              }

        ${
          cvData.languages.length > 0
            ? `<div class="section">
                      <h3>LANGUAGES</h3>
                      <ul class="languages-list">
                        ${cvData.languages
                          .map((lang) => `<li>${lang}</li>`)
                          .join("")}
                      </ul>
                    </div>`
            : ""
        }
            </div>

            ${
              template === "normal"
                ? `
              <!-- Normal template: All content in single column -->
              
              ${
                cvData.skills.length > 0
                  ? `<div class="section">
                      <h3>SKILLS</h3>
                      <ul class="skills-list">
                        ${cvData.skills
                          .map((skill) => `<li>${skill}</li>`)
                          .join("")}
                      </ul>
                    </div>`
                  : ""
              }

              ${
                cvData.languages.length > 0
                  ? `<div class="section">
                      <h3>LANGUAGES</h3>
                      <ul class="languages-list">
                        ${cvData.languages
                          .map((lang) => `<li>${lang}</li>`)
                          .join("")}
                      </ul>
                    </div>`
                  : ""
              }
            `
                : `
              <!-- Other templates: Main content in second column -->
              <div class="main-content">
            `
            }
              ${
                cvData.summary
                  ? `<div class="section">
                      <h3>PROFILE</h3>
                      <div class="summary">${cvData.summary}</div>
                    </div>`
                  : ""
              }

              ${
                cvData.experience.length > 0
                  ? `<div class="section">
                      <h3>WORK EXPERIENCE</h3>
          ${cvData.experience
            .map(
              (exp) => `
            <div class="experience-item">
                          <div class="experience-header">
              <div class="job-title">${exp.position}</div>
                            <div class="dates">${exp.startDate} - ${
                              exp.current ? "Present" : exp.endDate
                            }</div>
            </div>
                          <div class="company">${exp.company}</div>
                          <ul class="responsibilities">
                            ${exp.description
                              .split("\n")
                              .filter((line) => line.trim())
                              .map((line) => `<li>${line.trim()}</li>`)
                              .join("")}
                          </ul>
        </div>
        `
            )
            .join("")}
                    </div>`
                  : ""
              }

        ${
          cvData.education.length > 0
            ? `<div class="section">
                      <h3>EDUCATION</h3>
          ${cvData.education
            .map(
              (edu) => `
            <div class="education-item">
                          <div class="education-header">
                            <div class="degree">${edu.degree} in ${edu.field}</div>
                            <div class="dates">${edu.graduationYear}</div>
                          </div>
                          <div class="institution">${edu.institution}</div>
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }

        ${
          cvData.certifications.length > 0
            ? `<div class="section">
                      <h3>CERTIFICATIONS</h3>
          ${cvData.certifications
            .map(
              (cert) => `
                        <div class="certification-item">
                          <strong>${cert.name}</strong> (${cert.issuer}) - ${cert.date}
                          <div>${cert.description}</div>
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }

        ${
          cvData.awards.length > 0
            ? `<div class="section">
                      <h3>AWARDS & ACHIEVEMENTS</h3>
          ${cvData.awards
            .map(
              (award) => `
                        <div class="award-item">
                          <strong>${award.name}</strong> (${award.issuer}) - ${award.date}
                          <div>${award.description}</div>
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }

        ${
          cvData.volunteer.length > 0
            ? `<div class="section">
                      <h3>VOLUNTEER EXPERIENCE</h3>
          ${cvData.volunteer
            .map(
              (vol) => `
                        <div class="volunteer-item">
                          <strong>${vol.organization}</strong> (${vol.role}) - ${vol.dates}
                          <div>${vol.description}</div>
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }

        ${
          cvData.projects.length > 0
            ? `<div class="section">
                      <h3>PROJECTS</h3>
          ${cvData.projects
            .map(
              (proj) => `
                        <div class="project-item">
                          <strong>${proj.name}</strong> - ${proj.technologies}
                          <div>${proj.description}</div>
                          ${
                            proj.link
                              ? `<div><a href="${proj.link}" class="project-link" target="_blank">${proj.link}</a></div>`
                              : ""
                          }
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }

        ${
          cvData.references.length > 0
            ? `<div class="section">
                      <h3>REFERENCES</h3>
          ${cvData.references
            .map(
              (ref) => `
                        <div class="references-item">
                          <strong>${ref.name}</strong> (${ref.relationship})
                          ${ref.company ? ` - ${ref.company}` : ""}
                          <div>${ref.email} ${ref.phone ? `| ${ref.phone}` : ""}</div>
            </div>
          `
            )
            .join("")}
                    </div>`
            : ""
        }
            ${
              template === "normal"
                ? `
              <!-- Normal template: Close main-content div -->
        </div>
        `
                : `
              <!-- Other templates: Close main-content div -->
            </div>
            `
            }
          </div>
        </div>
      </body>
      </html>
    `;
    return cvHTML;
  };

  const generateCV = () => {
    generatePDF();
  };

  const clearSavedData = () => {
    localStorage.removeItem("cvGeneratorData");
    console.log("🗑️ Cleared CV Generator saved data");
    alert("Saved CV data cleared. Form will reset.");
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
              <label>Current Location *</label>
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
            {/* References */}
            <div className="references-section">
              <h4>References (Optional)</h4>
              {cvData.references.map((ref, idx) => (
                <div key={idx} className="reference-item">
                  <strong>{ref.name}</strong> ({ref.relationship})
                  {ref.company && <> - {ref.company}</>}
                  <div>
                    {ref.email} {ref.phone && <>| {ref.phone}</>}
                  </div>
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={tempReference.name || ""}
                  onChange={(e) =>
                    setTempReference({ ...tempReference, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={tempReference.relationship || ""}
                  onChange={(e) =>
                    setTempReference({
                      ...tempReference,
                      relationship: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={tempReference.company || ""}
                  onChange={(e) =>
                    setTempReference({
                      ...tempReference,
                      company: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={tempReference.email || ""}
                  onChange={(e) =>
                    setTempReference({
                      ...tempReference,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={tempReference.phone || ""}
                  onChange={(e) =>
                    setTempReference({
                      ...tempReference,
                      phone: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => {
                    setCvData((prev) => ({
                      ...prev,
                      references: [...prev.references, tempReference],
                    }));
                    setTempReference({
                      name: "",
                      relationship: "",
                      company: "",
                      email: "",
                      phone: "",
                    });
                  }}
                >
                  Add Reference
                </button>
              </div>
            </div>
            {/* Certifications */}
            <div className="certifications-section">
              <h4>Certifications & Courses (Optional)</h4>
              {cvData.certifications.map((cert, idx) => (
                <div key={idx} className="certification-item">
                  <strong>{cert.name}</strong> ({cert.issuer}) - {cert.date}
                  <div>{cert.description}</div>
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={tempCertification.name || ""}
                  onChange={(e) =>
                    setTempCertification({
                      ...tempCertification,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={tempCertification.issuer || ""}
                  onChange={(e) =>
                    setTempCertification({
                      ...tempCertification,
                      issuer: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={tempCertification.date || ""}
                  onChange={(e) =>
                    setTempCertification({
                      ...tempCertification,
                      date: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={tempCertification.description || ""}
                  onChange={(e) =>
                    setTempCertification({
                      ...tempCertification,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => {
                    setCvData((prev) => ({
                      ...prev,
                      certifications: [
                        ...prev.certifications,
                        tempCertification,
                      ],
                    }));
                    setTempCertification({
                      name: "",
                      issuer: "",
                      date: "",
                      description: "",
                    });
                  }}
                >
                  Add Certification
                </button>
              </div>
            </div>
            {/* Awards */}
            <div className="awards-section">
              <h4>Awards & Achievements (Optional)</h4>
              {cvData.awards.map((award, idx) => (
                <div key={idx} className="award-item">
                  <strong>{award.name}</strong> ({award.issuer}) - {award.date}
                  <div>{award.description}</div>
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={tempAward.name || ""}
                  onChange={(e) =>
                    setTempAward({ ...tempAward, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={tempAward.issuer || ""}
                  onChange={(e) =>
                    setTempAward({ ...tempAward, issuer: e.target.value })
                  }
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={tempAward.date || ""}
                  onChange={(e) =>
                    setTempAward({ ...tempAward, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={tempAward.description || ""}
                  onChange={(e) =>
                    setTempAward({ ...tempAward, description: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    setCvData((prev) => ({
                      ...prev,
                      awards: [...prev.awards, tempAward],
                    }));
                    setTempAward({
                      name: "",
                      issuer: "",
                      date: "",
                      description: "",
                    });
                  }}
                >
                  Add Award
                </button>
              </div>
            </div>
            {/* Volunteer */}
            <div className="volunteer-section">
              <h4>Volunteer Experience (Optional)</h4>
              {cvData.volunteer.map((vol, idx) => (
                <div key={idx} className="volunteer-item">
                  <strong>{vol.organization}</strong> ({vol.role}) - {vol.dates}
                  <div>{vol.description}</div>
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Organization"
                  value={tempVolunteer.organization || ""}
                  onChange={(e) =>
                    setTempVolunteer({
                      ...tempVolunteer,
                      organization: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={tempVolunteer.role || ""}
                  onChange={(e) =>
                    setTempVolunteer({ ...tempVolunteer, role: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Dates"
                  value={tempVolunteer.dates || ""}
                  onChange={(e) =>
                    setTempVolunteer({
                      ...tempVolunteer,
                      dates: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={tempVolunteer.description || ""}
                  onChange={(e) =>
                    setTempVolunteer({
                      ...tempVolunteer,
                      description: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => {
                    setCvData((prev) => ({
                      ...prev,
                      volunteer: [...prev.volunteer, tempVolunteer],
                    }));
                    setTempVolunteer({
                      organization: "",
                      role: "",
                      dates: "",
                      description: "",
                    });
                  }}
                >
                  Add Volunteer
                </button>
              </div>
            </div>
            {/* Projects */}
            <div className="projects-section">
              <h4>Projects (Optional)</h4>
              {cvData.projects.map((proj, idx) => (
                <div key={idx} className="project-item">
                  <strong>{proj.name}</strong> - {proj.technologies}
                  <div>{proj.description}</div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={tempProject.name || ""}
                  onChange={(e) =>
                    setTempProject({ ...tempProject, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={tempProject.description || ""}
                  onChange={(e) =>
                    setTempProject({
                      ...tempProject,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Technologies"
                  value={tempProject.technologies || ""}
                  onChange={(e) =>
                    setTempProject({
                      ...tempProject,
                      technologies: e.target.value,
                    })
                  }
                />
                <input
                  type="url"
                  placeholder="Link"
                  value={tempProject.link || ""}
                  onChange={(e) =>
                    setTempProject({ ...tempProject, link: e.target.value })
                  }
                />
                <button
                  onClick={() => {
                    setCvData((prev) => ({
                      ...prev,
                      projects: [...prev.projects, tempProject],
                    }));
                    setTempProject({
                      name: "",
                      description: "",
                      technologies: "",
                      link: "",
                    });
                  }}
                >
                  Add Project
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
              {cvData.references.length > 0 && (
                <div className="preview-section">
                  <strong>References:</strong> {cvData.references.length}{" "}
                  entries
                </div>
              )}
              {cvData.certifications.length > 0 && (
                <div className="preview-section">
                  <strong>Certifications:</strong>{" "}
                  {cvData.certifications.length} entries
                </div>
              )}
              {cvData.awards.length > 0 && (
                <div className="preview-section">
                  <strong>Awards:</strong> {cvData.awards.length} entries
                </div>
              )}
              {cvData.volunteer.length > 0 && (
                <div className="preview-section">
                  <strong>Volunteer:</strong> {cvData.volunteer.length} entries
                </div>
              )}
              {cvData.projects.length > 0 && (
                <div className="preview-section">
                  <strong>Projects:</strong> {cvData.projects.length} entries
                </div>
              )}
            </div>

            {/* CV Template Selector */}
            <div
              className="template-selector"
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "#f8f9fa",
                borderRadius: "12px",
                border: "1px solid #e9ecef",
              }}
            >
              <h4 style={{ margin: "0 0 1rem 0", color: "#495057" }}>
                🎨 Choose Your CV Style
              </h4>
              <p
                style={{
                  margin: "0 0 1.5rem 0",
                  color: "#6c757d",
                  fontSize: "0.9rem",
                }}
              >
                Select a template style that matches your industry and
                personality
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {/* Normal */}
                <div
                  onClick={() => setSelectedTemplate("normal")}
                  style={{
                    padding: "1.5rem",
                    border:
                      selectedTemplate === "normal"
                        ? "3px solid #28a745"
                        : "2px solid #dee2e6",
                    borderRadius: "12px",
                    background:
                      selectedTemplate === "normal" ? "#e8f5e8" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    📄
                  </div>
                  <h5 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                    Normal
                  </h5>
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6c757d" }}
                  >
                    Simple, clean layout with minimal styling - perfect for any
                    industry
                  </p>
                </div>

                {/* Modern Professional */}
                <div
                  onClick={() => setSelectedTemplate("modern")}
                  style={{
                    padding: "1.5rem",
                    border:
                      selectedTemplate === "modern"
                        ? "3px solid #3498db"
                        : "2px solid #dee2e6",
                    borderRadius: "12px",
                    background:
                      selectedTemplate === "modern" ? "#e3f2fd" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    💼
                  </div>
                  <h5 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                    Modern Professional
                  </h5>
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6c757d" }}
                  >
                    Clean two-column layout with dark sidebar, perfect for
                    corporate and tech industries
                  </p>
                </div>

                {/* Creative Designer */}
                <div
                  onClick={() => setSelectedTemplate("creative")}
                  style={{
                    padding: "1.5rem",
                    border:
                      selectedTemplate === "creative"
                        ? "3px solid #ff6b6b"
                        : "2px solid #dee2e6",
                    borderRadius: "12px",
                    background:
                      selectedTemplate === "creative" ? "#fff5f5" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    🎨
                  </div>
                  <h5 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                    Creative Designer
                  </h5>
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6c757d" }}
                  >
                    Clean layout with subtle gradient header and professional
                    styling for creative industries
                  </p>
                </div>

                {/* Classic Traditional */}
                <div
                  onClick={() => setSelectedTemplate("classic")}
                  style={{
                    padding: "1.5rem",
                    border:
                      selectedTemplate === "classic"
                        ? "3px solid #495057"
                        : "2px solid #dee2e6",
                    borderRadius: "12px",
                    background:
                      selectedTemplate === "classic" ? "#f8f9fa" : "white",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    📋
                  </div>
                  <h5 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                    Classic Traditional
                  </h5>
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6c757d" }}
                  >
                    Elegant serif typography with subtle styling for traditional
                    and academic industries
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#e8f5e8",
                  border: "1px solid #28a745",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#155724" }}>
                  <strong>💡 Tip:</strong> You can change your template style
                  anytime before downloading. Each style is optimized for
                  different industries and will help your CV stand out!
                </p>
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
                  onClick={() => {
                    const cvHTML = generateHTML();
                    const blob = new Blob([cvHTML], { type: "text/html" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${cvData.personalInfo.fullName.replace(/\s+/g, "_")}_CV.html`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="generate-btn"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2>CV Generator</h2>
            <p>Create a professional CV in minutes</p>
          </div>
          <button
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
