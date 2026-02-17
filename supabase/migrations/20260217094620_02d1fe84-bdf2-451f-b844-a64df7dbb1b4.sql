
-- Create team_members table
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  name_zh_hant text NOT NULL DEFAULT '',
  name_zh_hans text NOT NULL DEFAULT '',
  role text NOT NULL,
  role_zh_hant text NOT NULL DEFAULT '',
  role_zh_hans text NOT NULL DEFAULT '',
  focus text NOT NULL DEFAULT '',
  focus_zh_hant text NOT NULL DEFAULT '',
  focus_zh_hans text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  bio_zh_hant text NOT NULL DEFAULT '',
  bio_zh_hans text NOT NULL DEFAULT '',
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read team members"
ON public.team_members
FOR SELECT
USING (true);

-- Admin write access
CREATE POLICY "Admins can insert team members"
ON public.team_members
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update team members"
ON public.team_members
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete team members"
ON public.team_members
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for team portraits
INSERT INTO storage.buckets (id, name, public) VALUES ('team-portraits', 'team-portraits', true);

-- Storage policies
CREATE POLICY "Team portraits are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-portraits');

CREATE POLICY "Admins can upload team portraits"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team-portraits' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update team portraits"
ON storage.objects FOR UPDATE
USING (bucket_id = 'team-portraits' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete team portraits"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-portraits' AND public.has_role(auth.uid(), 'admin'));
