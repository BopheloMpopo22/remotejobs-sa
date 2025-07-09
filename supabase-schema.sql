-- Create CV Generations table
CREATE TABLE IF NOT EXISTS cv_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  cv_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed',
  download_count INTEGER DEFAULT 0
);

-- Create Job Assistant Applications table
CREATE TABLE IF NOT EXISTS job_assistant_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  desired_position TEXT NOT NULL,
  experience_level TEXT,
  salary_expectation TEXT,
  remote_preference TEXT,
  industries TEXT[],
  additional_notes TEXT,
  cv_file_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  applications_sent INTEGER DEFAULT 0,
  responses_received INTEGER DEFAULT 0,
  subscription_status TEXT DEFAULT 'pending',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE
);

-- Create Users table for future authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status TEXT DEFAULT 'free',
  subscription_plan TEXT DEFAULT 'free'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cv_generations_email ON cv_generations(user_email);
CREATE INDEX IF NOT EXISTS idx_cv_generations_created_at ON cv_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_job_assistant_email ON job_assistant_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_assistant_status ON job_assistant_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_assistant_created_at ON job_assistant_applications(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE cv_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_assistant_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (we'll restrict these later with authentication)
CREATE POLICY "Allow public insert on cv_generations" ON cv_generations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on job_assistant_applications" ON job_assistant_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on users" ON users
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_cv_generations_updated_at 
  BEFORE UPDATE ON cv_generations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_assistant_applications_updated_at 
  BEFORE UPDATE ON job_assistant_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 