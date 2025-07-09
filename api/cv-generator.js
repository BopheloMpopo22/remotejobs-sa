import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Store CV data in Supabase
    const { data, error } = await supabase
      .from("cv_generations")
      .insert([
        {
          user_email: userEmail,
          cv_data: cvData,
          created_at: new Date().toISOString(),
          status: "completed",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to save CV data" });
    }

    // Send confirmation email (we'll implement this later)
    // await sendCVConfirmationEmail(userEmail, cvData.personalInfo.fullName);

    return res.status(200).json({
      success: true,
      message: "CV generated and saved successfully",
      cvId: data[0].id,
    });
  } catch (error) {
    console.error("CV Generator API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
