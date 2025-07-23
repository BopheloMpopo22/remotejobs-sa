import { sendEmail } from "../src/lib/email";
import { supabase } from "../src/lib/supabase";

export default async function handler(req, res) {
  // 1. Get all users with Job Assistant active
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, email, full_name")
    .eq("job_assistant_active", true);

  if (userError) {
    return res.status(500).json({ error: userError.message });
  }

  // 2. For each user, get today's jobs and send email
  for (const user of users) {
    // Query jobs applied to today for this user
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const { data: jobs } = await supabase
      .from("job_applications")
      .select("title, company")
      .eq("user_id", user.id)
      .gte("applied_at", today);

    if (!jobs || jobs.length === 0) continue;

    // Build email content
    const jobList = jobs
      .map((j) => `<li>${j.title} at ${j.company}</li>`)
      .join("");
    const html = `
      <div style="font-family: Arial, sans-serif; background: #f0f4f8; padding: 2rem; border-radius: 1rem; color: #222;">
        <h2 style="color: #2563eb;">Your Daily Job Applications 🚀</h2>
        <p>Hi <b>${user.full_name || "there"}</b>,</p>
        <p>Here are the jobs we applied to for you today:</p>
        <ul>${jobList}</ul>
        <p style="margin-top:1.5rem;">Keep an eye on your inbox for responses from employers! If you have any questions, just reply to this email—I’m here to help.</p>
        <p style="margin-top:2rem; color:#10b981; font-weight:bold;">To your success,<br/>Bophelo<br/>RemoteJobsSA</p>
      </div>
    `;

    // Send the email
    await sendEmail({
      to: user.email,
      subject: "Your Daily Job Applications from RemoteJobsSA",
      html,
    });
  }

  res.status(200).json({ success: true });
}
