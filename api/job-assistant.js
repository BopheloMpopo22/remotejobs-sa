import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Debug logging
console.log("Job Assistant API - Environment variables:");
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
    // Get user email from Supabase auth
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userEmail = user.email;

    const {
      fullName,
      phone,
      location,
      desiredPosition,
      experience,
      salary,
      remotePreference,
      industries,
      additionalNotes,
      cvFileName,
      cvFileData, // Base64 encoded file data
      cvFileType, // MIME type of the file
    } = req.body;

    if (!fullName || !desiredPosition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(
      "Attempting to insert job assistant application for user:",
      userEmail
    );

    let cvFileUrl = null;

    // Upload CV file to Supabase Storage if provided
    if (cvFileData && cvFileName) {
      try {
        console.log("Uploading CV file to Supabase Storage...");
        console.log("File name:", cvFileName);
        console.log("File type:", cvFileType);
        console.log("File data length:", cvFileData.length);

        // Convert base64 to buffer
        const fileBuffer = Buffer.from(cvFileData.split(",")[1], "base64");
        console.log("File buffer size:", fileBuffer.length);

        // Generate unique filename
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}_${cvFileName}`;
        console.log("Unique filename:", uniqueFileName);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("cv-files")
          .upload(uniqueFileName, fileBuffer, {
            contentType: cvFileType || "application/pdf",
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          return res.status(500).json({
            error: "Failed to upload CV file",
            details: uploadError.message,
          });
        }

        console.log("Upload successful, upload data:", uploadData);

        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from("cv-files")
          .getPublicUrl(uniqueFileName);

        cvFileUrl = urlData.publicUrl;
        console.log("CV file uploaded successfully:", cvFileUrl);
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(500).json({
          error: "Failed to upload CV file",
          details: uploadError.message,
        });
      }
    } else {
      console.log("No CV file data provided");
      console.log("cvFileData exists:", !!cvFileData);
      console.log("cvFileName exists:", !!cvFileName);
    }

    // Store job assistant application in Supabase
    const { data, error } = await supabase
      .from("job_assistant_applications")
      .insert([
        {
          full_name: fullName,
          email: userEmail, // Use the authenticated user's email
          phone: phone || null,
          location: location || null,
          desired_position: desiredPosition,
          experience_level: experience || null,
          salary_expectation: salary || null,
          remote_preference: remotePreference || null,
          industries: industries || [],
          additional_notes: additionalNotes || null,
          cv_file_name: cvFileName || null,
          cv_file_url: cvFileUrl, // Store the public URL
          status: "pending",
          created_at: new Date().toISOString(),
          applications_sent: 0,
          responses_received: 0,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res
        .status(500)
        .json({ error: "Failed to save application", details: error.message });
    }

    console.log("Job assistant application saved successfully:", data);

    // Send welcome email (we'll implement this later)
    // await sendWelcomeEmail(email, fullName);

    return res.status(200).json({
      success: true,
      message: "Job assistant application submitted successfully",
      applicationId: data[0].id,
      cvFileUrl: cvFileUrl, // Return the file URL
    });
  } catch (error) {
    console.error("Job Assistant API error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
