-- Clean up ALL test data from RemoteJobs SA database
-- This script removes all current entries since they are all test data

-- Clean up CV Generations table (remove ALL current data)
DELETE FROM cv_generations;

-- Clean up Job Assistant Applications table (remove ALL current data)
DELETE FROM job_assistant_applications;

-- Clean up Users table (remove ALL current data)
DELETE FROM users;

-- Display cleanup results to confirm all data is removed
SELECT 
  'cv_generations' as table_name,
  COUNT(*) as remaining_records
FROM cv_generations
UNION ALL
SELECT 
  'job_assistant_applications' as table_name,
  COUNT(*) as remaining_records
FROM job_assistant_applications
UNION ALL
SELECT 
  'users' as table_name,
  COUNT(*) as remaining_records
FROM users;

-- Expected result: All tables should show 0 remaining records 