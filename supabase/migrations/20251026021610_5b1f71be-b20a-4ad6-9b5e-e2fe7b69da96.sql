-- Remove overly permissive SELECT policy on registrations table
-- This prevents any authenticated user from viewing all registration data
-- Administrators should access this data through the backend dashboard only
DROP POLICY IF EXISTS "Only authenticated users can view registrations" ON public.registrations;