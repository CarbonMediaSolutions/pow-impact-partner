-- Create storage bucket for perspective images
INSERT INTO storage.buckets (id, name, public)
VALUES ('perspective-images', 'perspective-images', true);

-- Allow authenticated users to upload perspective images
CREATE POLICY "Authenticated users can upload perspective images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'perspective-images');

-- Allow public read access for perspective images
CREATE POLICY "Public read access for perspective images"
ON storage.objects FOR SELECT
USING (bucket_id = 'perspective-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update perspective images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'perspective-images');

-- Allow authenticated users to delete perspective images
CREATE POLICY "Authenticated users can delete perspective images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'perspective-images');

-- Add tags column to perspectives table
ALTER TABLE perspectives ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';