-- Add payment_reference column to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS payment_reference TEXT; 