import { createClient } from "@supabase/supabase-js";
import puppeteer from "puppeteer";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Debug logging
console.log("CV Generator API - Environment variables:");
console.log("SUPABASE_URL:", supabaseUrl ? "SET" : "NOT SET");
console.log("SUPABASE_ANON_KEY:", supabaseKey ? "SET" : "NOT SET");

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables");
}

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log("Supabase client created successfully");
} catch (error) {
  console.error("Error creating Supabase client:", error);
  throw error;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cvData, userEmail } = req.body;

    if (!cvData || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Attempting to insert CV data...");

    let pdfFileUrl = null;

    // Generate PDF on server side
    try {
      console.log("Generating PDF on server side...");

      // Create HTML content for PDF
      const htmlContent = `
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
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-content">
              ${
                cvData.personalInfo.photo
                  ? `<div class="photo"><img src="${cvData.personalInfo.photo}" alt="Profile Photo" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;"></div>`
                  : ""
              }
              <div class="info">
                <div class="name">${cvData.personalInfo.fullName}</div>
                <div class="contact">
                  ${cvData.personalInfo.email}<br>
                  ${cvData.personalInfo.phone}<br>
                  ${cvData.personalInfo.location}<br>
                  ${
                    cvData.personalInfo.linkedin
                      ? `LinkedIn: ${cvData.personalInfo.linkedin}<br>`
                      : ""
                  }
                  ${
                    cvData.personalInfo.portfolio
                      ? `Portfolio: ${cvData.personalInfo.portfolio}`
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

      // Generate PDF using Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setContent(htmlContent);

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "20mm",
          bottom: "20mm",
          left: "20mm",
        },
      });

      await browser.close();

      // Generate unique filename
      const timestamp = Date.now();
      const pdfFileName = `${timestamp}_${cvData.personalInfo.fullName.replace(
        /\s+/g,
        "_"
      )}_CV.pdf`;

      console.log("PDF generated, uploading to storage...");

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("cv-files")
        .upload(pdfFileName, pdfBuffer, {
          contentType: "application/pdf",
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return res.status(500).json({
          error: "Failed to upload PDF file",
          details: uploadError.message,
        });
      }

      console.log("PDF upload successful, upload data:", uploadData);

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from("cv-files")
        .getPublicUrl(pdfFileName);

      pdfFileUrl = urlData.publicUrl;
      console.log("PDF file uploaded successfully:", pdfFileUrl);
    } catch (pdfError) {
      console.error("PDF generation error:", pdfError);
      // Continue without PDF if generation fails
    }

    // Store CV data in Supabase
    const { data, error } = await supabase
      .from("cv_generations")
      .insert([
        {
          user_email: userEmail,
          cv_data: cvData,
          pdf_file_url: pdfFileUrl, // Store the PDF URL
          created_at: new Date().toISOString(),
          status: "completed",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res
        .status(500)
        .json({ error: "Failed to save CV data", details: error.message });
    }

    console.log("CV data saved successfully:", data);

    // Send confirmation email (we'll implement this later)
    // await sendCVConfirmationEmail(userEmail, cvData.personalInfo.fullName);

    return res.status(200).json({
      success: true,
      message: "CV generated and saved successfully",
      cvId: data[0].id,
      pdfFileUrl: pdfFileUrl, // Return the PDF URL
    });
  } catch (error) {
    console.error("CV Generator API error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
