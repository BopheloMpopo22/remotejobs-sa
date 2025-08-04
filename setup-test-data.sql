-- Setup Test Data for Daily Digest System
-- Run this in your Supabase SQL Editor

-- Step 1: Create a test paid user
INSERT INTO job_assistant_applications (
  email,
  full_name,
  desired_position,
  experience_level,
  industries,
  salary_expectation,
  remote_preference,
  additional_notes,
  payment_reference,
  status,
  subscription_status,
  created_at
) VALUES (
  'test@remotejobs-sa.com',
  'Test User',
  'Software Developer',
  'Mid-level',
  ARRAY['Technology', 'Finance'],
  'R25000',
  'Remote only',
  'Test user for daily digest',
  'TEST_PAYMENT_REF_001',
  'paid',
  'active',
  CURRENT_DATE
);

-- Step 2: Get the application ID for reference
SELECT id, email, full_name, status FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com';

-- Step 3: Add sample job applications (run this after getting the ID from step 2)
-- Replace 'YOUR_APPLICATION_ID_HERE' with the actual UUID from step 2
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
(
  gen_random_uuid(),
  'test@remotejobs-sa.com',
  'Test User',
  'Frontend Developer',
  'TechStart Inc',
  'Remote',
  'https://example.com/job1',
  CURRENT_DATE - INTERVAL '1 day',
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant'
),
(
  gen_random_uuid(),
  'test@remotejobs-sa.com',
  'Test User',
  'React Developer',
  'Digital Solutions',
  'Remote',
  'https://example.com/job2',
  CURRENT_DATE - INTERVAL '2 days',
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant'
),
(
  gen_random_uuid(),
  'test@remotejobs-sa.com',
  'Test User',
  'Full Stack Developer',
  'Innovation Corp',
  'Remote',
  'https://example.com/job3',
  CURRENT_DATE,
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'test@remotejobs-sa.com'),
  'Applied via Job Assistant'
);

-- Step 4: Verify the data
SELECT 
  ja.email,
  ja.full_name,
  ja.status,
  COUNT(job.id) as applications_count
FROM job_assistant_applications ja
LEFT JOIN job_applications job ON ja.id = job.job_assistant_application_id
WHERE ja.email = 'test@remotejobs-sa.com'
GROUP BY ja.id, ja.email, ja.full_name, ja.status; 