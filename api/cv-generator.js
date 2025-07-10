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
    const { cvData, userEmail } = req.body;

    if (!cvData || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Attempting to insert CV data...");

    // Store CV data in Supabase
    const { data, error } = await supabase
      .from("cv_generations")
      .insert([
        {
          user_email: userEmail,
          full_name: cvData.personalInfo.fullName,
          email: cvData.personalInfo.email,
          phone: cvData.personalInfo.phone,
          location: cvData.personalInfo.location,
          linkedin: cvData.personalInfo.linkedin,
          portfolio: cvData.personalInfo.portfolio,
          photo_url: cvData.personalInfo.photo,
          summary: cvData.summary,
          experience: cvData.experience,
          education: cvData.education,
          skills: cvData.skills,
          languages: cvData.languages,
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
    });
  } catch (error) {
    console.error("CV Generator API error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
