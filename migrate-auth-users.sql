-- Migration script to populate users table with existing auth users
-- This will get all users from Supabase auth and insert them into the users table

-- First, let's see what we have in auth.users (this is just for reference)
-- SELECT email, raw_user_meta_data FROM auth.users WHERE email_confirmed_at IS NOT NULL;

-- Insert existing auth users into the users table
-- Note: This assumes you have access to auth.users through Supabase dashboard
-- If you can't access auth.users directly, you'll need to manually export and import

-- For now, let's create a function that can be called when you have access
CREATE OR REPLACE FUNCTION migrate_auth_users()
RETURNS void AS $$
BEGIN
  -- This function will be called manually when you have access to auth.users
  -- It will populate the users table with all confirmed email users
  
  -- For now, this is a placeholder
  -- You'll need to run this manually from Supabase dashboard or with proper permissions
  
  RAISE NOTICE 'Please run this migration manually from Supabase dashboard';
  RAISE NOTICE 'Or use the Supabase CLI with proper service role permissions';
END;
$$ LANGUAGE plpgsql;

-- Alternative: Manual insert for testing (replace with actual emails)
-- INSERT INTO users (email, full_name, created_at, email_preferences, is_active)
-- VALUES 
--   ('test@example.com', 'Test User', NOW(), '{"daily_digest": true}', true)
-- ON CONFLICT (email) DO NOTHING;
