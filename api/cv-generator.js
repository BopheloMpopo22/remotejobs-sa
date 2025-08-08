import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error("Authentication error:", authError);
      return res.status(401).json({ error: "Invalid token" });
    }

    const { cvData } = req.body;

    if (!cvData) {
      return res.status(400).json({ error: "CV data is required" });
    }

    // Save CV data to the database
    const { data: savedCV, error: saveError } = await supabase
      .from("cv_generations")
      .insert({
        user_email: user.email,
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
        template_used: cvData.template || "modern",
        status: "completed",
        download_count: 1,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Database save error:", saveError);
      return res.status(500).json({ error: "Failed to save CV data" });
    }

    console.log("CV saved successfully with ID:", savedCV.id);

    return res.status(200).json({
      success: true,
      cvId: savedCV.id,
      message: "CV data saved successfully"
    });

  } catch (error) {
    console.error("CV generator API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
} 