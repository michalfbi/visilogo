-- 1. Update Leads Table for Automotive Context
-- We drop and recreate or alter. For a clean slate description:

CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL, -- Added
  business_type text NOT NULL, -- Added (Komis, Dealer, Import, etc.)
  location text NOT NULL, -- Added
  inventory_size text NOT NULL, -- Added (Ranges)
  budget_range text NOT NULL, -- Added
  vehicle_focus text, -- Added (What they sell most)
  message text NOT NULL, -- Problem description
  source text DEFAULT 'visilogo_auto',
  status text DEFAULT 'new'
);

-- RLS Policies remain the same (Service Role access)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable access for service role" ON public.leads
  AS PERMISSIVE FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
