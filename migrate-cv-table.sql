-- Migration script to restructure cv_generations table
-- Run this in your Supabase SQL Editor

-- First, create a backup of existing data
CREATE TABLE IF NOT EXISTS cv_generations_backup AS 
SELECT * FROM cv_generations;

-- Drop the existing table
DROP TABLE IF EXISTS cv_generations;

-- Create the new table structure
CREATE TABLE IF NOT EXISTS cv_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  portfolio TEXT,
  photo_url TEXT,
  
  -- Professional Summary
  summary TEXT,
  
  -- Experience (stored as JSON array since it's multiple entries)
  experience JSONB,
  
  -- Education (stored as JSON array since it's multiple entries)
  education JSONB,
  
  -- Skills and Languages
  skills TEXT[],
  languages TEXT[],
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed',
  download_count INTEGER DEFAULT 0
);

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_cv_generations_email ON cv_generations(user_email);
CREATE INDEX IF NOT EXISTS idx_cv_generations_created_at ON cv_generations(created_at);

-- Enable RLS
ALTER TABLE cv_generations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for all users"
ON "public"."cv_generations"
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable select for all users"
ON "public"."cv_generations"
FOR SELECT
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_cv_generations_updated_at 
  BEFORE UPDATE ON cv_generations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 