import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { users } = req.body;

    if (!users || !Array.isArray(users)) {
      return res.status(400).json({
        error: "Please provide an array of users to migrate",
      });
    }

    console.log(`🔄 Starting migration of ${users.length} users...`);

    let migrated = 0;
    let errors = 0;
    const results = [];

    for (const user of users) {
      try {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("email")
          .eq("email", user.email)
          .single();

        if (existingUser) {
          console.log(`⚠️ User ${user.email} already exists, skipping...`);
          results.push({
            email: user.email,
            status: "skipped",
            reason: "already exists",
          });
          continue;
        }

        // Insert new user
        const { error: insertError } = await supabase.from("users").insert({
          email: user.email,
          full_name: user.full_name || user.email.split("@")[0],
          email_preferences: { daily_digest: true },
          is_active: true,
          created_at: user.created_at || new Date().toISOString(),
        });

        if (insertError) {
          console.error(`❌ Failed to migrate ${user.email}:`, insertError);
          errors++;
          results.push({
            email: user.email,
            status: "failed",
            error: insertError.message,
          });
        } else {
          console.log(`✅ Migrated ${user.email}`);
          migrated++;
          results.push({
            email: user.email,
            status: "success",
          });
        }

        // Small delay to avoid overwhelming the database
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error processing ${user.email}:`, error);
        errors++;
        results.push({
          email: user.email,
          status: "error",
          error: error.message,
        });
      }
    }

    console.log(
      `🎉 Migration completed: ${migrated} migrated, ${errors} errors`
    );

    return res.status(200).json({
      success: true,
      message: `Migration completed: ${migrated} migrated, ${errors} errors`,
      summary: {
        total: users.length,
        migrated,
        errors,
        skipped: users.length - migrated - errors,
      },
      results,
    });
  } catch (error) {
    console.error("❌ Migration error:", error);
    return res.status(500).json({ error: "Migration failed" });
  }
}
