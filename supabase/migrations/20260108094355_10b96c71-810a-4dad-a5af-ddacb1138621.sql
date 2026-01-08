-- Create perspective_submissions table
CREATE TABLE public.perspective_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  perspective_text TEXT NOT NULL,
  topic TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create consultation_leads table
CREATE TABLE public.consultation_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  role TEXT,
  problem_statement TEXT NOT NULL,
  desired_outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_captures table
CREATE TABLE public.email_captures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.perspective_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts (public forms)
CREATE POLICY "Anyone can submit perspectives" 
ON public.perspective_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit consultation leads" 
ON public.consultation_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can capture emails" 
ON public.email_captures 
FOR INSERT 
WITH CHECK (true);