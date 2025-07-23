export async function sendEmail({ to, subject, html }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_API_URL = "https://api.resend.com/emails";
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "RemoteJobsSA <noreply@remotejobssa.com>",
      to,
      subject,
      html,
    }),
  });
  return response.json();
}
