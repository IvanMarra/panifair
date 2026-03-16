-- Execute este script no PostgreSQL para criar a tabela de analytics
-- psql -U seu_usuario -d seu_banco -f init-db.sql

CREATE TABLE IF NOT EXISTS analytics_events (
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

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
