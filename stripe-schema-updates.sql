-- Add Stripe-related columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Add Stripe-related columns to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_stripe_subscription_id ON users(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_job_assistant_payment_intent ON job_assistant_applications(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_job_assistant_payment_status ON job_assistant_applications(payment_status);

-- Update existing RLS policies to allow updates
CREATE POLICY "Allow users to update their own subscription" ON users
  FOR UPDATE USING (auth.email() = email);

CREATE POLICY "Allow users to update their own applications" ON job_assistant_applications
  FOR UPDATE USING (auth.email() = email); 