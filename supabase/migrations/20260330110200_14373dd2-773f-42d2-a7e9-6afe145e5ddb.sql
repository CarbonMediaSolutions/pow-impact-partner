CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  organisation text,
  email text NOT NULL,
  message text
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can read contact submissions" ON public.contact_submissions
  FOR SELECT TO public USING (has_role(auth.uid(), 'admin'::app_role));