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

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Test the connection by counting records in each table
    const [cvCount, jobCount, userCount] = await Promise.all([
      supabase
        .from("cv_generations")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("job_assistant_applications")
        .select("*", { count: "exact", head: true }),
      supabase.from("users").select("*", { count: "exact", head: true }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Database connection successful!",
      tables: {
        cv_generations: cvCount.count || 0,
        job_assistant_applications: jobCount.count || 0,
        users: userCount.count || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database test error:", error);
    return res.status(500).json({
      error: "Database connection failed",
      details: error.message,
    });
  }
}
