
-- Add Simplified Chinese columns to perspectives
ALTER TABLE public.perspectives ADD COLUMN IF NOT EXISTS title_zh_hans text;
ALTER TABLE public.perspectives ADD COLUMN IF NOT EXISTS summary_zh_hans text;
ALTER TABLE public.perspectives ADD COLUMN IF NOT EXISTS content_zh_hans text[];

-- Add Simplified Chinese columns to analyses
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS title_zh_hans text;
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS summary_zh_hans text;
ALTER TABLE public.analyses ADD COLUMN IF NOT EXISTS content_zh_hans jsonb;

-- Add Simplified Chinese column to site_content
ALTER TABLE public.site_content ADD COLUMN IF NOT EXISTS value_zh_hans text NOT NULL DEFAULT '';
