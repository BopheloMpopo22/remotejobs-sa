import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  console.log("=== FEEDBACK API CALLED ===");
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  
  // Check environment variables
  console.log("Environment check:");
  console.log("SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { rating, feedback, email, userAgent, pageUrl } = req.body;
    console.log("Extracted data:", { rating, feedback, email, userAgent, pageUrl });

    // Validate required fields
    if (!rating || !feedback) {
      return res.status(400).json({
        error: "Rating and feedback are required",
      });
    }

    // Validate rating is between 1-5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from("user_feedback")
      .insert({
        rating: parseInt(rating),
        feedback: feedback,
        email: email || null,
        user_agent: userAgent || null,
        page_url: pageUrl || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({
        error: "Failed to save feedback",
        details: error.message,
      });
    }

    console.log("Feedback saved successfully:", data);

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
