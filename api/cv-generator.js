import { createClient } from "@supabase/supabase-js";

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
    const { cvData, userEmail, pdfData, pdfFileName } = req.body;

    if (!cvData || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Attempting to insert CV data...");

    let pdfFileUrl = null;

    // Upload PDF file to Supabase Storage if provided
    if (pdfData && pdfFileName) {
      try {
        console.log("Uploading generated PDF to Supabase Storage...");
        console.log("PDF file name:", pdfFileName);
        console.log("PDF data length:", pdfData.length);

        // Convert base64 to buffer
        const fileBuffer = Buffer.from(pdfData.split(",")[1], "base64");
        console.log("PDF buffer size:", fileBuffer.length);

        // Generate unique filename
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}_${pdfFileName}`;
        console.log("Unique PDF filename:", uniqueFileName);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("cv-files")
          .upload(uniqueFileName, fileBuffer, {
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
          .getPublicUrl(uniqueFileName);

        pdfFileUrl = urlData.publicUrl;
        console.log("PDF file uploaded successfully:", pdfFileUrl);
      } catch (uploadError) {
        console.error("PDF file upload error:", uploadError);
        return res.status(500).json({
          error: "Failed to upload PDF file",
          details: uploadError.message,
        });
      }
    } else {
      console.log("No PDF file data provided");
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
