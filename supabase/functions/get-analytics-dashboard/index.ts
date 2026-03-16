import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const expectedPassword = Deno.env.get('ANALYTICS_DASHBOARD_PASSWORD');
    if (!expectedPassword) {
      return new Response(
        JSON.stringify({ error: 'Dashboard não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let password: string;
    try {
      const body = await req.json();
      password = body?.password ?? '';
    } catch {
      password = '';
    }

    if (password !== expectedPassword) {
      return new Response(
        JSON.stringify({ error: 'Senha inválida' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const pageViews = events?.filter(e => e.event_type === 'page_view') ?? [];
    const clicks = events?.filter(e => e.event_type === 'click') ?? [];

    const clicksByEvent: Record<string, number> = {};
    clicks.forEach(c => {
      const name = c.event_name || 'unknown';
      clicksByEvent[name] = (clicksByEvent[name] ?? 0) + 1;
    });

    const viewsByDay: Record<string, number> = {};
    pageViews.forEach(p => {
      const day = p.created_at?.slice(0, 10) ?? 'unknown';
      viewsByDay[day] = (viewsByDay[day] ?? 0) + 1;
    });

    const uniqueSessions = new Set(events?.map(e => e.session_id).filter(Boolean)).size;

    const chartData = Object.entries(viewsByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, visualizações: count }));

    return new Response(
      JSON.stringify({
        summary: {
          totalPageViews: pageViews.length,
          totalClicks: clicks.length,
          uniqueSessions: uniqueSessions,
          period: '7 dias',
        },
        chartData,
        topClicks: Object.entries(clicksByEvent)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([name, count]) => ({ name, count })),
        recentEvents: events?.slice(-50).reverse() ?? [],
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
