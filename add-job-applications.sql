-- Template for adding job applications manually
-- Run this in your Supabase SQL Editor when you apply to jobs

-- Example: Adding job applications for a user
-- Replace the values with actual job data

INSERT INTO job_applications (
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
-- Example applications (replace with real data):
(
  'test@remotejobs-sa.com',  -- Replace with actual user email
  'Test User',               -- Replace with actual user name
  'Frontend Developer',
  'Tech Company A',
  'Remote',
  'https://example.com/job1',
  CURRENT_DATE,              -- This will be today's date
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant - React/TypeScript position'
),
(
  'test@remotejobs-sa.com',  -- Replace with actual user email
  'Test User',               -- Replace with actual user name
  'Software Engineer',
  'Startup B',
  'Remote',
  'https://example.com/job2',
  CURRENT_DATE,              -- This will be today's date
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant - Full-stack position'
),
(
  'test@remotejobs-sa.com',  -- Replace with actual user email
  'Test User',               -- Replace with actual user name
  'Remote Developer',
  'Digital Agency C',
  'Remote',
  'https://example.com/job3',
  CURRENT_DATE,              -- This will be today's date
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant - Remote development role'
);

-- To add for multiple users, repeat the INSERT with different emails:
-- Example for another user:
/*
INSERT INTO job_applications (
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
(
  'another-user@example.com',  -- Different user
  'Another User',
  'Backend Developer',
  'Company D',
  'Remote',
  'https://example.com/job4',
  CURRENT_DATE,
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'another-user@example.com'),
  'Applied via Job Assistant - Backend position'
);
*/

-- Verify the applications were added
SELECT 
  ja.email,
  ja.full_name,
  COUNT(job.id) as todays_applications
FROM job_assistant_applications ja
LEFT JOIN job_applications job ON ja.id = job.job_assistant_application_id
WHERE job.application_date = CURRENT_DATE
GROUP BY ja.id, ja.email, ja.full_name; 