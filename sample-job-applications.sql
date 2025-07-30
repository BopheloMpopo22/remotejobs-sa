-- Sample job applications for testing daily digest system
-- Run this after setting up the database schema

-- First, get a paid job assistant application to reference
-- Replace 'your-test-email@example.com' with an actual email from your job_assistant_applications table

-- Sample job applications for testing
INSERT INTO job_applications (
  user_id,
  user_email,
  user_name,
  job_title,
  company,
  location,
  job_url,
  application_date,
  status,
  job_assistant_application_id,
  notes
) VALUES 
-- Replace the user_email and job_assistant_application_id with actual values from your database
(
  'test-user-id',
  'your-test-email@example.com', -- Replace with actual email
  'Test User',
  'Software Developer',
  'Tech Corp',
  'Remote',
  'https://example.com/job1',
  CURRENT_DATE,
  'applied',
  'your-job-assistant-application-id', -- Replace with actual UUID
  'Sample application for testing'
),
(
  'test-user-id',
  'your-test-email@example.com', -- Replace with actual email
  'Test User',
  'Frontend Developer',
  'Startup Inc',
  'Remote',
  'https://example.com/job2',
  CURRENT_DATE,
  'applied',
  'your-job-assistant-application-id', -- Replace with actual UUID
  'Sample application for testing'
),
(
  'test-user-id',
  'your-test-email@example.com', -- Replace with actual email
  'Test User',
  'Full Stack Developer',
  'Enterprise Ltd',
  'Remote',
  'https://example.com/job3',
  CURRENT_DATE,
  'responded',
  'your-job-assistant-application-id', -- Replace with actual UUID
  'Sample application with response'
);

-- Query to get the actual values you need:
-- SELECT id, email, full_name FROM job_assistant_applications WHERE status = 'paid' LIMIT 1; 