import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== CV GENERATOR API START ===");
    
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No authorization header or invalid format");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token received:", token.substring(0, 20) + "...");

    // Verify the user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError) {
      console.error("Authentication error:", authError);
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!user) {
      console.error("No user found");
      return res.status(401).json({ error: "User not found" });
    }

    console.log("User authenticated:", user.email);

    const { cvData } = req.body;

    if (!cvData) {
      console.error("No CV data in request body");
      return res.status(400).json({ error: "CV data is required" });
    }

    console.log("CV data received:", {
      fullName: cvData.personalInfo?.fullName,
      email: cvData.personalInfo?.email,
      template: cvData.template
    });

    // Prepare the data for insertion
    const insertData = {
      user_email: user.email,
      full_name: cvData.personalInfo?.fullName || "",
      email: cvData.personalInfo?.email || "",
      phone: cvData.personalInfo?.phone || "",
      location: cvData.personalInfo?.location || "",
      linkedin: cvData.personalInfo?.linkedin || "",
      portfolio: cvData.personalInfo?.portfolio || "",
      photo_url: cvData.personalInfo?.photo || "",
      summary: cvData.summary || "",
      experience: cvData.experience || [],
      education: cvData.education || [],
      skills: cvData.skills || [],
      languages: cvData.languages || [],
      template_used: cvData.template || "modern",
      status: "completed",
      download_count: 1,
    };

    console.log("Attempting to insert CV data...");

    // Save CV data to the database
    const { data: savedCV, error: saveError } = await supabase
      .from("cv_generations")
      .insert(insertData)
      .select()
      .single();

    if (saveError) {
      console.error("Database save error:", saveError);
      console.error("Error details:", {
        code: saveError.code,
        message: saveError.message,
        details: saveError.details,
        hint: saveError.hint
      });
      return res.status(500).json({ 
        error: "Failed to save CV data",
        details: saveError.message 
      });
    }

    console.log("CV saved successfully with ID:", savedCV.id);

    return res.status(200).json({
      success: true,
      cvId: savedCV.id,
      message: "CV data saved successfully"
    });

  } catch (error) {
    console.error("CV generator API error:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
} 