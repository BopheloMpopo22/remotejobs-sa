-- Migration: Add columns for daily digest email system
-- Date: 2025-01-27

-- Add columns to job_applications table for email functionality
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS user_email TEXT;
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS job_assistant_application_id UUID REFERENCES job_assistant_applications(id);

-- Add columns to job_assistant_applications table for tracking
ALTER TABLE job_assistant_applications ADD COLUMN IF NOT EXISTS applications_sent INTEGER DEFAULT 0;
ALTER TABLE job_assistant_applications ADD COLUMN IF NOT EXISTS responses_received INTEGER DEFAULT 0;
ALTER TABLE job_assistant_applications ADD COLUMN IF NOT EXISTS last_application_date DATE;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_job_applications_user_email ON job_applications(user_email);
CREATE INDEX IF NOT EXISTS idx_job_applications_application_date ON job_applications(application_date);
CREATE INDEX IF NOT EXISTS idx_job_assistant_applications_status ON job_assistant_applications(status);

-- Add comments for documentation
COMMENT ON COLUMN job_applications.user_email IS 'User email for sending daily digest emails';
COMMENT ON COLUMN job_applications.user_name IS 'User name for personalizing emails';
COMMENT ON COLUMN job_applications.job_assistant_application_id IS 'Reference to job assistant application';
COMMENT ON COLUMN job_assistant_applications.applications_sent IS 'Total number of applications sent for this user';
COMMENT ON COLUMN job_assistant_applications.responses_received IS 'Total number of responses received';
COMMENT ON COLUMN job_assistant_applications.last_application_date IS 'Date of last application sent'; 