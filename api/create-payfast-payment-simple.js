import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Simple test response
    return res.status(200).json({
      message: "PayFast API is working",
      timestamp: new Date().toISOString(),
      test: "This is a simplified version",
    });
  } catch (error) {
    console.error("PayFast payment creation error:", error);
    return res.status(500).json({
      error: "Failed to create PayFast payment",
      details: error.message,
    });
  }
}
