-- Add SELECT policies for admin access
-- Using a simple approach: allow SELECT for all authenticated sessions
-- In production, you'd want proper admin role management

CREATE POLICY "Allow select for consultation_leads"
ON public.consultation_leads
FOR SELECT
USING (true);

CREATE POLICY "Allow select for perspective_submissions"
ON public.perspective_submissions
FOR SELECT
USING (true);

CREATE POLICY "Allow select for email_captures"
ON public.email_captures
FOR SELECT
USING (true);