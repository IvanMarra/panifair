-- Tabela de eventos de analytics (page views, cliques, etc.)
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL,
  event_name TEXT,
  event_data JSONB,
  url TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT
);

-- Índices para consultas do dashboard
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events(event_name);

-- RLS: permitir INSERT anônimo (tracking), SELECT apenas via service role (dashboard)
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events
FOR INSERT
TO anon
WITH CHECK (true);

-- Nenhuma policy de SELECT para anon - acesso apenas via Edge Function com service role
