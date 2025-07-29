-- Add subscription-related columns to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS paypal_subscription_id TEXT;

ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'pending';

-- Update existing records to have proper subscription status
UPDATE job_assistant_applications 
SET subscription_status = 'pending' 
WHERE subscription_status IS NULL; 