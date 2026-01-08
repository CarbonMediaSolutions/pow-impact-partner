-- Create perspectives table
CREATE TABLE public.perspectives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL,
  topic text NOT NULL CHECK (topic IN ('Governance', 'Impact', 'Growth', 'Strategy', 'Risk')),
  featured boolean DEFAULT false,
  image text,
  content text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create analyses table
CREATE TABLE public.analyses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL,
  category text NOT NULL CHECK (category IN ('Capital Allocation', 'Governance', 'Performance', 'Operations', 'Impact')),
  date text,
  featured boolean DEFAULT false,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- RLS policies for perspectives - anyone can read
CREATE POLICY "Anyone can read perspectives"
ON public.perspectives
FOR SELECT
USING (true);

-- Admin insert/update/delete (using true for now - password protected at app level)
CREATE POLICY "Allow insert for perspectives"
ON public.perspectives
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update for perspectives"
ON public.perspectives
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete for perspectives"
ON public.perspectives
FOR DELETE
USING (true);

-- RLS policies for analyses - anyone can read
CREATE POLICY "Anyone can read analyses"
ON public.analyses
FOR SELECT
USING (true);

-- Admin insert/update/delete
CREATE POLICY "Allow insert for analyses"
ON public.analyses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update for analyses"
ON public.analyses
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete for analyses"
ON public.analyses
FOR DELETE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_perspectives_updated_at
BEFORE UPDATE ON public.perspectives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at
BEFORE UPDATE ON public.analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();