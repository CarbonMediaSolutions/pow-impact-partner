
-- Create solutions table
CREATE TABLE public.solutions (
  id text NOT NULL PRIMARY KEY,
  sort_order integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  perspective text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  services text[] NOT NULL DEFAULT '{}',
  detail_content text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  price_note text NOT NULL DEFAULT '',
  image_url text,
  pdf_url text,
  payment_link text,
  title_zh_hant text NOT NULL DEFAULT '',
  title_zh_hans text NOT NULL DEFAULT '',
  description_zh_hant text NOT NULL DEFAULT '',
  description_zh_hans text NOT NULL DEFAULT '',
  detail_content_zh_hant text NOT NULL DEFAULT '',
  detail_content_zh_hans text NOT NULL DEFAULT '',
  services_zh_hant text[] NOT NULL DEFAULT '{}',
  services_zh_hans text[] NOT NULL DEFAULT '{}',
  perspective_zh_hant text NOT NULL DEFAULT '',
  perspective_zh_hans text NOT NULL DEFAULT '',
  price_zh_hant text NOT NULL DEFAULT '',
  price_zh_hans text NOT NULL DEFAULT '',
  price_note_zh_hant text NOT NULL DEFAULT '',
  price_note_zh_hans text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read solutions"
ON public.solutions FOR SELECT
USING (true);

-- Admin write
CREATE POLICY "Admins can insert solutions"
ON public.solutions FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update solutions"
ON public.solutions FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete solutions"
ON public.solutions FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for solution assets
INSERT INTO storage.buckets (id, name, public) VALUES ('solution-assets', 'solution-assets', true);

CREATE POLICY "Anyone can view solution assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'solution-assets');

CREATE POLICY "Admins can upload solution assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'solution-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can update solution assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'solution-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete solution assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'solution-assets' AND auth.role() = 'authenticated');

-- Seed existing solutions
INSERT INTO public.solutions (id, sort_order, title, perspective, description, services, price, price_note) VALUES
('governance', 0, 'Governance & Operating Model', 'Clarity creates capacity', 'Board effectiveness, governance design, and decision architecture for organisations navigating complexity.', ARRAY['Board Effectiveness Review','Governance Framework Design','Decision Architecture','Operating Model Assessment','Policy Development'], 'Engagement-based pricing', 'Scope dependent'),
('capital', 1, 'Capital Allocation & Performance', 'Capital with purpose', 'Financial strategy, performance frameworks, and capital discipline aligned with institutional objectives.', ARRAY['Capital Allocation Strategy','Performance Framework Design','Financial Planning & Analysis','Investment Evaluation','Stakeholder Reporting'], 'Engagement-based pricing', 'Scope dependent'),
('growth', 2, 'Growth & Transformation', 'Scale with coherence', 'Strategic expansion, institutional transition, and change management for organisations at inflection points.', ARRAY['Growth Strategy Development','Organisational Transition','Change Management','Strategic Planning','Market Entry Strategy'], 'Engagement-based pricing', 'Scope dependent'),
('decision-support', 3, 'Decision Systems & Executive Support', 'Leadership leverage', 'Executive advisory, decision support, and strategic facilitation for senior leadership teams.', ARRAY['Outsourced CFO','Executive Decision Support','Strategic Facilitation','Leadership Advisory','Board Presentation Support'], 'Engagement-based pricing', 'Retainer or project-based'),
('data-insight', 4, 'Data & Insight Products', 'Intelligence as infrastructure', 'Benchmarks, sector data, and commissioned analysis for evidence-based decision-making.', ARRAY['Sector Benchmarking','Data Analysis & Reporting','Commissioned Research','Performance Metrics Design','Insight Delivery'], 'Engagement-based pricing', 'Based on scope');
