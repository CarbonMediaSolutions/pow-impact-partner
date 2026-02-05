-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Authenticated users can upload perspective images" ON storage.objects;

-- Create a more explicit INSERT policy for authenticated users
CREATE POLICY "Authenticated users can upload perspective images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'perspective-images'
);