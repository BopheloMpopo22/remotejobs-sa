-- Create Storage bucket for CV files
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-files', 'cv-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public access to CV files
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'cv-files');

-- Create policy to allow authenticated users to upload CV files
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'cv-files');

-- Create policy to allow users to update their own files
CREATE POLICY "Allow updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'cv-files');

-- Create policy to allow users to delete their own files
CREATE POLICY "Allow deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'cv-files'); 