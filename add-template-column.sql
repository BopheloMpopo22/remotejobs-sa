-- Add template column to cv_generations table
-- Run this in your Supabase SQL Editor

ALTER TABLE cv_generations 
ADD COLUMN IF NOT EXISTS template_used TEXT DEFAULT 'modern';

-- Add index for template queries
CREATE INDEX IF NOT EXISTS idx_cv_generations_template ON cv_generations(template_used); 