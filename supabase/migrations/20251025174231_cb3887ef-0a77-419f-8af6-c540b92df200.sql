-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  type TEXT NOT NULL CHECK (type IN ('participante', 'expositor', 'imprensa')),
  message TEXT,
  device_info TEXT,
  location_info TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (we'll handle rate limiting in the edge function)
CREATE POLICY "Anyone can create registrations"
ON public.registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can view registrations (for admin purposes)
CREATE POLICY "Only authenticated users can view registrations"
ON public.registrations
FOR SELECT
TO authenticated
USING (true);

-- Create index for email lookups and rate limiting
CREATE INDEX idx_registrations_email ON public.registrations(email);
CREATE INDEX idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX idx_registrations_ip ON public.registrations(ip_address);