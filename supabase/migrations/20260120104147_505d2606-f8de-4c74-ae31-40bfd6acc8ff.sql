-- Add Traditional Chinese translation columns to perspectives table
ALTER TABLE public.perspectives 
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS summary_zh text,
ADD COLUMN IF NOT EXISTS content_zh text[];

-- Add Traditional Chinese translation columns to analyses table
ALTER TABLE public.analyses 
ADD COLUMN IF NOT EXISTS title_zh text,
ADD COLUMN IF NOT EXISTS summary_zh text,
ADD COLUMN IF NOT EXISTS content_zh jsonb;

-- Add comments for documentation
COMMENT ON COLUMN public.perspectives.title_zh IS 'Traditional Chinese translation of title';
COMMENT ON COLUMN public.perspectives.summary_zh IS 'Traditional Chinese translation of summary';
COMMENT ON COLUMN public.perspectives.content_zh IS 'Traditional Chinese translation of content paragraphs';
COMMENT ON COLUMN public.analyses.title_zh IS 'Traditional Chinese translation of title';
COMMENT ON COLUMN public.analyses.summary_zh IS 'Traditional Chinese translation of summary';
COMMENT ON COLUMN public.analyses.content_zh IS 'Traditional Chinese translation of content';