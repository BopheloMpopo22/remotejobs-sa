-- Add PayFast-related columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Add PayFast-related columns to job_assistant_applications table
ALTER TABLE job_assistant_applications 
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payfast_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS amount_paid DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS payment_fee DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS net_amount DECIMAL(10,2);

-- Create payments table for tracking all payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_reference TEXT NOT NULL,
  payfast_payment_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  application_id UUID REFERENCES job_assistant_applications(id),
  payment_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2),
  net_amount DECIMAL(10,2),
  status TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_webhooks table for logging webhook data
CREATE TABLE IF NOT EXISTS payment_webhooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_reference TEXT NOT NULL,
  payfast_payment_id TEXT,
  payment_status TEXT NOT NULL,
  amount_gross DECIMAL(10,2),
  amount_fee DECIMAL(10,2),
  amount_net DECIMAL(10,2),
  webhook_data JSONB,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_job_assistant_payment_ref ON job_assistant_applications(payment_reference);
CREATE INDEX IF NOT EXISTS idx_job_assistant_payfast_payment_id ON job_assistant_applications(payfast_payment_id);
CREATE INDEX IF NOT EXISTS idx_job_assistant_payment_status ON job_assistant_applications(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(payment_reference);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_application_id ON payments(application_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_reference ON payment_webhooks(payment_reference);

-- Update existing RLS policies to allow updates
-- Drop and recreate policy for updating own subscription (safe for production if recreated immediately)
DROP POLICY IF EXISTS "Allow users to update their own subscription" ON users;
CREATE POLICY "Allow users to update their own subscription" ON users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users to view their own subscription" ON users;
CREATE POLICY "Allow users to view their own subscription" ON users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow admins to view all subscriptions" ON subscriptions;
CREATE POLICY "Allow admins to view all subscriptions" ON subscriptions
  FOR SELECT USING (auth.role() = 'admin');

DROP POLICY IF EXISTS "Allow users to view their own subscriptions" ON subscriptions;
CREATE POLICY "Allow users to view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own applications" ON job_assistant_applications
  FOR UPDATE USING (auth.email() = email);

-- RLS policies for payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for payment_webhooks table (admin only)
ALTER TABLE payment_webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view webhooks" ON payment_webhooks
  FOR ALL USING (auth.email() IN ('admin@remotejobssa.com')); -- Replace with your admin email 

-- Add subscription fields to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_status'
  ) THEN
    ALTER TABLE users ADD COLUMN subscription_status TEXT DEFAULT 'inactive';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_start_date'
  ) THEN
    ALTER TABLE users ADD COLUMN subscription_start_date TIMESTAMP WITH TIME ZONE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='subscription_end_date'
  ) THEN
    ALTER TABLE users ADD COLUMN subscription_end_date TIMESTAMP WITH TIME ZONE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='next_billing_date'
  ) THEN
    ALTER TABLE users ADD COLUMN next_billing_date TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Create subscriptions table if not exists
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  next_billing_date TIMESTAMP WITH TIME ZONE,
  payfast_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
); 