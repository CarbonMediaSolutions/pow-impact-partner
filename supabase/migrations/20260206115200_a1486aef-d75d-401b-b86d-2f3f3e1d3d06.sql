
-- Create site_content table for admin-editable text overrides
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section_key text NOT NULL,
  value_en text NOT NULL DEFAULT '',
  value_zh text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page, section_key)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read (content is public)
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete site content"
ON public.site_content
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at trigger
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
