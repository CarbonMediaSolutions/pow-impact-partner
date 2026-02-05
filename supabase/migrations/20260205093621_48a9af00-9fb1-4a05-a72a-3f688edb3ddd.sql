-- Add pdf_url column to analyses table
ALTER TABLE public.analyses ADD COLUMN pdf_url text;

-- Create bucket for analysis PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('analysis-pdfs', 'analysis-pdfs', true);

-- Allow authenticated users to upload PDFs
CREATE POLICY "Authenticated users can upload analysis PDFs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'analysis-pdfs');

-- Allow authenticated users to update PDFs
CREATE POLICY "Authenticated users can update analysis PDFs"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'analysis-pdfs');

-- Allow authenticated users to delete PDFs
CREATE POLICY "Authenticated users can delete analysis PDFs"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'analysis-pdfs');

-- Allow public read access
CREATE POLICY "Public can view analysis PDFs"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'analysis-pdfs');