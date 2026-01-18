-- Add new columns to consultation_leads table for the request-based booking system
ALTER TABLE public.consultation_leads 
ADD COLUMN IF NOT EXISTS website_linkedin text,
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Reviewing';

-- Add check constraint for valid status values
ALTER TABLE public.consultation_leads 
ADD CONSTRAINT consultation_leads_status_check 
CHECK (status IN ('Reviewing', 'Approved', 'Declined'));