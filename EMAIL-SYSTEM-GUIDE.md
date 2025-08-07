# 📧 RemoteJobs SA Email System Guide

## 🎯 Overview

This guide covers everything you need to manage the daily digest email system for RemoteJobs SA. The system now uses **payment email logs** as the source of truth for who paid, making it more reliable than database status.

## 📋 Daily Workflow

### Step 1: Find Who Paid (Automatic)

**✅ This is now automatic!** The system automatically finds users who have payment confirmation emails in the `payment_email_logs` table.

**How it works:**

- Users who paid get a confirmation email (logged in `payment_email_logs`)
- System queries `payment_email_logs` for `email_status = 'sent'`
- Only includes payments from last 30 days
- **No manual status updates needed!**

### Step 2: Add Job Applications

**When:** Throughout the day as you apply to jobs for users

**Where:** Supabase SQL Editor

**How to find who to apply for:**

```sql
-- Check who has confirmed payments (users you should apply for)
SELECT DISTINCT
  pel.user_email,
  ja.full_name,
  ja.desired_position,
  ja.experience_level
FROM payment_email_logs pel
JOIN job_assistant_applications ja ON ja.email = pel.user_email
WHERE pel.email_status = 'sent'
AND pel.sent_at >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY pel.sent_at DESC;
```

**Template for adding applications:**

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
  'bophelompopo22@gmail.com',           -- User who paid (confirmed by email logs)
  'Test Diamond',                        -- User name
  'Frontend Developer',                  -- Job title
  'Tech Company A',                      -- Company name
  'Remote',                              -- Location
  'https://example.com/job1',           -- Job URL
  CURRENT_DATE,                          -- Today's date
  'applied',                             -- Status
  (SELECT id FROM job_assistant_applications WHERE email = 'bophelompopo22@gmail.com'),
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
-- User 1 (who has confirmed payment)
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
-- User 2 (who has confirmed payment)
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

### Step 3: Send Daily Digest Emails

**When:** At the end of your workday (e.g., 17:00 PM)

**Where:** Admin Panel - https://remotejobs-sa-i11c.vercel.app/admin-daily-digest.html

**How:**

1. Open the admin panel
2. Click "🚀 Send Daily Digest"
3. Monitor the logs for results
4. Verify emails were sent successfully

**What happens automatically:**

- System finds users with `payment_email_logs.email_status = 'sent'`
- Only includes payments from last 30 days
- Sends emails to users who have job applications for today
- Updates statistics in database

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

### payment_email_logs (NEW - Source of Truth)

**Purpose:** Tracks payment confirmation emails (reliable payment status)

**Key Fields:**

- `user_email` - User's email address
- `email_status` - 'sent' (confirmed payment) or 'failed'
- `sent_at` - When payment confirmation was sent
- `yoco_payment_id` - Payment reference
- `amount` - Payment amount in cents
- `payment_reference` - Our payment reference

**How to use:**

```sql
-- Find all users who paid (confirmed by email)
SELECT DISTINCT user_email
FROM payment_email_logs
WHERE email_status = 'sent'
AND sent_at >= CURRENT_DATE - INTERVAL '30 days';
```

### job_assistant_applications

**Purpose:** Stores user information and preferences

**Key Fields:**

- `email` - User's email address
- `full_name` - User's full name
- `desired_position` - Job title they want
- `experience_level` - Years of experience
- `industries` - Preferred industries
- `remote_preference` - Remote work preference

**Note:** Status field is no longer used for email sending - email logs are the source of truth

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

- Check if users have payment confirmation emails in `payment_email_logs`
- Verify email addresses are correct
- Check admin panel logs for errors

**2. Missing Job Applications:**

- Ensure `application_date = CURRENT_DATE` for today's jobs
- Verify `user_email` matches users with confirmed payments
- Check SQL syntax in Supabase

**3. Email Delivery Issues:**

- Check spam folders
- Verify Resend API key is working
- Test with admin panel's test function

### Debugging Steps:

1. **Check who paid:**

```sql
-- Find users with confirmed payments
SELECT user_email, sent_at, amount
FROM payment_email_logs
WHERE email_status = 'sent'
ORDER BY sent_at DESC;
```

2. **Check today's applications:**

```sql
-- Find today's job applications
SELECT user_email, job_title, company
FROM job_applications
WHERE application_date = CURRENT_DATE;
```

3. **Test the system** using "🧪 Test Daily Digest"
4. **Review logs** in admin panel
5. **Verify email addresses** in database

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

- **Payment confirmation is automatic** - no manual status updates needed
- **Verify email addresses** are correct
- **Check payment logs** to see who paid
- **Remove old payment logs** if needed (keep last 30 days)

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
-- Check who paid (confirmed by email)
SELECT user_email, sent_at, amount
FROM payment_email_logs
WHERE email_status = 'sent'
ORDER BY sent_at DESC;

-- Check today's applications
SELECT user_email, job_title, company
FROM job_applications
WHERE application_date = CURRENT_DATE;

-- Check user statistics (for users who paid)
SELECT
  ja.email,
  ja.full_name,
  COUNT(job.id) as total_applications,
  COUNT(CASE WHEN job.status = 'responded' THEN 1 END) as responses
FROM job_assistant_applications ja
JOIN payment_email_logs pel ON ja.email = pel.user_email
LEFT JOIN job_applications job ON ja.id = job.job_assistant_application_id
WHERE pel.email_status = 'sent'
AND pel.sent_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY ja.id, ja.email, ja.full_name;
```

## 🚀 Quick Start Checklist

### Daily Routine:

- [ ] **Check who paid** using payment email logs query
- [ ] **Add job applications** to database using SQL template
- [ ] **Open admin panel** at end of workday
- [ ] **Click "Send Daily Digest"** to trigger emails
- [ ] **Check logs** for successful delivery
- [ ] **Verify emails** were received by users

### Weekly Maintenance:

- [ ] **Test system** using test function
- [ ] **Check payment logs** for new payments
- [ ] **Clean up** old test data
- [ ] **Monitor** email delivery rates
- [ ] **Review payment confirmation** emails are being sent

---

**Last Updated:** August 2024
**System Version:** Daily Digest v1.0
**Contact:** support@remotejobs-sa.com
