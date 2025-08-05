-- Add payment_provider column to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN payment_provider VARCHAR(50) DEFAULT 'yoco';

-- Add yoco_payment_id column for tracking Yoco payments
ALTER TABLE job_assistant_applications 
ADD COLUMN yoco_payment_id VARCHAR(255);

-- Update existing records to have payment_provider = 'yoco'
UPDATE job_assistant_applications 
SET payment_provider = 'yoco' 
WHERE payment_provider IS NULL; 