-- Add payment_confirmed_at column to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN payment_confirmed_at TIMESTAMP WITH TIME ZONE;

-- Add yoco_payment_id column if it doesn't exist
ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS yoco_payment_id TEXT;

-- Update existing records to have a default value
UPDATE job_assistant_applications 
SET payment_confirmed_at = created_at 
WHERE payment_confirmed_at IS NULL AND status = 'paid'; 