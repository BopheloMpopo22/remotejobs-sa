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
    const {
      fullName,
      email,
      phone,
      location,
      desiredPosition,
      experience,
      salary,
      remotePreference,
      industries,
      additionalNotes,
      cvFileName,
    } = req.body;

    if (!fullName || !email || !desiredPosition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Attempting to insert job assistant application...");

    // Store job assistant application in Supabase
    const { data, error } = await supabase
      .from("job_assistant_applications")
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone || null,
          location: location || null,
          desired_position: desiredPosition,
          experience_level: experience || null,
          salary_expectation: salary || null,
          remote_preference: remotePreference || null,
          industries: industries || [],
          additional_notes: additionalNotes || null,
          cv_file_name: cvFileName || null,
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
    });
  } catch (error) {
    console.error("Job Assistant API error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
