// Manual migration script for existing users
// Run this in your browser console or create a simple API endpoint

// This script will help you migrate your existing 100+ users
// You can run this from your Supabase dashboard or create a simple migration API

const migrateExistingUsers = async () => {
  // Step 1: Export users from Supabase auth dashboard
  // Go to Authentication > Users in your Supabase dashboard
  // Export the CSV with: email, raw_user_meta_data, created_at

  // Step 2: Process the CSV and insert into users table
  // You can use this function to process the exported data

  const usersToMigrate = [
    // Add your exported users here
    // Example format:
    // { email: "user1@example.com", full_name: "User One", created_at: "2024-01-01" },
    // { email: "user2@example.com", full_name: "User Two", created_at: "2024-01-02" },
  ];

  console.log(`Ready to migrate ${usersToMigrate.length} users`);

  // Step 3: Insert into users table
  for (const user of usersToMigrate) {
    try {
      const { error } = await supabase.from("users").insert({
        email: user.email,
        full_name: user.full_name || user.email.split("@")[0],
        email_preferences: { daily_digest: true },
        is_active: true,
        created_at: user.created_at || new Date().toISOString(),
      });

      if (error) {
        console.error(`Failed to migrate ${user.email}:`, error);
      } else {
        console.log(`✅ Migrated ${user.email}`);
      }
    } catch (err) {
      console.error(`Error migrating ${user.email}:`, err);
    }
  }
};

// Alternative: Create a simple migration API endpoint
// You can create /api/migrate-users.js and call it from your dashboard

console.log(
  "Migration script loaded. Use migrateExistingUsers() to start migration."
);
