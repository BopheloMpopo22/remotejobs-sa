# 📧 RemoteJobs SA Email System Guide

## 🎯 Overview

This guide covers everything you need to manage the daily digest email system for RemoteJobs SA.

## 📋 Daily Workflow

### Step 1: Add Job Applications

**When:** Throughout the day as you apply to jobs for users

**Where:** Supabase SQL Editor

**Template:**

```sql
-- Add job applications for today
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
  'user@example.com',                    -- Replace with actual user email
  'User Name',                           -- Replace with actual user name
  'Frontend Developer',                  -- Job title
  'Tech Company A',                      -- Company name
  'Remote',                              -- Location
  'https://example.com/job1',           -- Job URL
  CURRENT_DATE,                          -- Today's date
  'applied',                             -- Status
  (SELECT id FROM job_assistant_applications WHERE email = 'user@example.com'),
  'Applied via Job Assistant - React/TypeScript position'
);
```

**For Multiple Users:**

```sql
-- Add applications for multiple users
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
-- User 1
(
  'user1@example.com',
  'John Doe',
  'Frontend Developer',
  'Tech Corp',
  'Remote',
  'https://example.com/job1',
  CURRENT_DATE,
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'user1@example.com'),
  'Applied via Job Assistant'
),
-- User 2
(
  'user2@example.com',
  'Jane Smith',
  'Backend Developer',
  'Startup Inc',
  'Remote',
  'https://example.com/job2',
  CURRENT_DATE,
  'applied',
  (SELECT id FROM job_assistant_applications WHERE email = 'user2@example.com'),
  'Applied via Job Assistant'
);
```

### Step 2: Send Daily Digest Emails

**When:** At the end of your workday (e.g., 17:00 PM)

**Where:** Admin Panel - https://remotejobs-sa-i11c.vercel.app/admin-daily-digest.html

**How:**

1. Open the admin panel
2. Click "🚀 Send Daily Digest"
3. Monitor the logs for results
4. Verify emails were sent successfully

## 🔧 Admin Panel Features

### Main Functions:

- **🚀 Send Daily Digest** - Sends emails to all paid users
- **🧪 Test Daily Digest** - Sends test email to verify system
- **📊 Real-time Logs** - Shows detailed results and errors
- **📋 Instructions** - Step-by-step workflow guide

### Monitoring:

- **Email Count** - How many emails were sent
- **User Results** - Success/failure for each user
- **Statistics** - Applications per user
- **Error Logs** - Any issues that occurred

## 📊 Database Tables

### job_assistant_applications

**Purpose:** Stores user information and payment status

**Key Fields:**

- `email` - User's email address
- `full_name` - User's full name
- `status` - Must be 'paid' to receive emails
- `subscription_status` - 'active' for ongoing users

### job_applications

**Purpose:** Stores individual job applications

**Key Fields:**

- `user_email` - Links to user
- `user_name` - User's name
- `job_title` - Position applied for
- `company` - Company name
- `location` - Job location
- `application_date` - Date applied (use CURRENT_DATE)
- `status` - Usually 'applied' or 'responded'
- `notes` - Additional details about the application

## 🎨 Email Templates

### Daily Digest Email Features:

- **Professional Design** - Clean, branded template
- **Statistics Section** - Today's applications, total applications, responses
- **Success Rate** - Percentage of responses received
- **Job List** - Detailed list of today's applications
- **Progress Tracking** - Daily vs total applications
- **Contact Information** - Support email and branding

### Email Content Includes:

- 📈 **Today's Summary** - Applications sent today
- 📊 **Total Statistics** - All-time application count
- 📨 **Response Tracking** - How many responses received
- 📋 **Job Details** - Company, position, location
- 🎯 **Progress Metrics** - Success rate and goals

## 🔍 Troubleshooting

### Common Issues:

**1. No Emails Sent:**

- Check if users have `status = 'paid'` in database
- Verify email addresses are correct
- Check admin panel logs for errors

**2. Missing Job Applications:**

- Ensure `application_date = CURRENT_DATE` for today's jobs
- Verify `user_email` matches paid user emails
- Check SQL syntax in Supabase

**3. Email Delivery Issues:**

- Check spam folders
- Verify Resend API key is working
- Test with admin panel's test function

### Debugging Steps:

1. **Test the system** using "🧪 Test Daily Digest"
2. **Check database** for paid users and applications
3. **Review logs** in admin panel
4. **Verify email addresses** in database

## 📈 Best Practices

### For Adding Job Applications:

- **Use CURRENT_DATE** for today's applications
- **Include detailed notes** about each application
- **Add job URLs** when available
- **Update status** to 'responded' when users get responses

### For Sending Emails:

- **Send at consistent time** (e.g., 17:00 PM daily)
- **Test first** if making changes
- **Monitor logs** for any issues
- **Keep track** of email success rates

### For User Management:

- **Update status** to 'paid' when users pay
- **Verify email addresses** are correct
- **Track subscription status** for recurring users
- **Remove inactive users** to avoid errors

## 🔗 Useful Links

### Admin Tools:

- **Admin Panel:** https://remotejobs-sa-i11c.vercel.app/admin-daily-digest.html
- **Supabase Dashboard:** Your Supabase project dashboard
- **Vercel Dashboard:** Your Vercel project dashboard

### API Endpoints:

- **Send Daily Digest:** `/api/send-daily-digest` (GET)
- **Test Daily Digest:** `/api/test-daily-digest` (POST)

### Database Queries:

```sql
-- Check paid users
SELECT email, full_name, status FROM job_assistant_applications WHERE status = 'paid';

-- Check today's applications
SELECT user_email, job_title, company FROM job_applications WHERE application_date = CURRENT_DATE;

-- Check user statistics
SELECT
  ja.email,
  ja.full_name,
  COUNT(job.id) as total_applications,
  COUNT(CASE WHEN job.status = 'responded' THEN 1 END) as responses
FROM job_assistant_applications ja
LEFT JOIN job_applications job ON ja.id = job.job_assistant_application_id
WHERE ja.status = 'paid'
GROUP BY ja.id, ja.email, ja.full_name;
```

## 🚀 Quick Start Checklist

### Daily Routine:

- [ ] **Add job applications** to database using SQL template
- [ ] **Open admin panel** at end of workday
- [ ] **Click "Send Daily Digest"** to trigger emails
- [ ] **Check logs** for successful delivery
- [ ] **Verify emails** were received by users

### Weekly Maintenance:

- [ ] **Test system** using test function
- [ ] **Update user status** for new payments
- [ ] **Clean up** old test data
- [ ] **Monitor** email delivery rates

---

**Last Updated:** August 2024
**System Version:** Daily Digest v1.0
**Contact:** support@remotejobs-sa.com
