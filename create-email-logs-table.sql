-- Create table to track payment confirmation emails
CREATE TABLE IF NOT EXISTS payment_email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  yoco_payment_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  payment_reference TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_status TEXT DEFAULT 'sent',
  error_message TEXT
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_payment_email_logs_email ON payment_email_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_payment_email_logs_payment_id ON payment_email_logs(yoco_payment_id); 