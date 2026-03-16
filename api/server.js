/**
 * API Panifair - Backend para analytics (roda na sua VPS)
 * Substitui o Supabase para total controle dos dados
 */

import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST /api/analytics/track - Registra evento (sem auth)
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { event_type, event_name, event_data, url, referrer, user_agent, session_id } = req.body;

    await pool.query(
      `INSERT INTO analytics_events (event_type, event_name, event_data, url, referrer, user_agent, session_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        event_type || 'custom',
        event_name || null,
        JSON.stringify(event_data || {}),
        url || null,
        referrer || null,
        user_agent || null,
        session_id || null,
      ]
    );

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Track error:', err);
    res.status(500).json({ error: 'Erro ao registrar evento' });
  }
});

// POST /api/analytics/dashboard - Retorna dados (protegido por senha)
app.post('/api/analytics/dashboard', async (req, res) => {
  try {
    const password = req.body?.password || '';
    const expectedPassword = process.env.ANALYTICS_DASHBOARD_PASSWORD;

    if (!expectedPassword) {
      return res.status(500).json({ error: 'Dashboard não configurado' });
    }

    if (password !== expectedPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { rows: events } = await pool.query(
      `SELECT * FROM analytics_events 
       WHERE created_at >= $1 
       ORDER BY created_at ASC`,
      [sevenDaysAgo]
    );

    const pageViews = events.filter((e) => e.event_type === 'page_view');
    const clicks = events.filter((e) => e.event_type === 'click');

    const clicksByEvent = {};
    clicks.forEach((c) => {
      const name = c.event_name || 'unknown';
      clicksByEvent[name] = (clicksByEvent[name] || 0) + 1;
    });

    const viewsByDay = {};
    pageViews.forEach((p) => {
      const day = p.created_at?.toISOString?.().slice(0, 10) || 'unknown';
      viewsByDay[day] = (viewsByDay[day] || 0) + 1;
    });

    const uniqueSessions = new Set(events.map((e) => e.session_id).filter(Boolean)).size;

    const chartData = Object.entries(viewsByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, visualizações: count }));

    const topClicks = Object.entries(clicksByEvent)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    res.json({
      summary: {
        totalPageViews: pageViews.length,
        totalClicks: clicks.length,
        uniqueSessions,
        period: '7 dias',
      },
      chartData,
      topClicks,
      recentEvents: events.slice(-50).reverse(),
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: err.message || 'Erro ao carregar dados' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Panifair API rodando na porta ${PORT}`);
});
