
-- Create client_logos table
CREATE TABLE public.client_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read client logos"
ON public.client_logos FOR SELECT
USING (true);

-- Admin write
CREATE POLICY "Admins can insert client logos"
ON public.client_logos FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update client logos"
ON public.client_logos FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete client logos"
ON public.client_logos FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for client logos
INSERT INTO storage.buckets (id, name, public) VALUES ('client-logos', 'client-logos', true);

-- Storage policies
CREATE POLICY "Client logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'client-logos');

CREATE POLICY "Admins can upload client logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update client logos storage"
ON storage.objects FOR UPDATE
USING (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete client logos storage"
ON storage.objects FOR DELETE
USING (bucket_id = 'client-logos' AND public.has_role(auth.uid(), 'admin'::app_role));
