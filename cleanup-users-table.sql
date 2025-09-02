-- Clean up users table for daily digest functionality
-- Remove unnecessary columns that are not needed for daily digest emails

-- Remove columns that are not relevant for daily digest
ALTER TABLE users DROP COLUMN IF EXISTS phone;
ALTER TABLE users DROP COLUMN IF EXISTS cv_url;
ALTER TABLE users DROP COLUMN IF EXISTS subscription_status;
ALTER TABLE users DROP COLUMN IF EXISTS subscription_start_date;
ALTER TABLE users DROP COLUMN IF EXISTS subscription_end_date;
ALTER TABLE users DROP COLUMN IF EXISTS next_billing_date;

-- Add email preferences field (default to receiving daily digest)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_preferences JSONB DEFAULT '{"daily_digest": true}';

-- Add a simple field to track if user is active
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Verify the cleaned up structure
-- The table should now have: id, full_name, email, created_at, updated_at, email_preferences, is_active
