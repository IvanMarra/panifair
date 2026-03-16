/**
 * Serviço de analytics interno - rastreia page views e eventos customizados
 * Dados enviados para a API na sua VPS, acessíveis via dashboard em /painel
 */

import { apiPost } from './api';

const SESSION_KEY = 'panifair_analytics_session';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export type EventType = 'page_view' | 'click' | 'scroll' | 'custom';

export interface AnalyticsEvent {
  event_type: EventType;
  event_name?: string;
  event_data?: Record<string, unknown>;
}

async function sendEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await apiPost('/api/analytics/track', {
      event_type: event.event_type,
      event_name: event.event_name,
      event_data: event.event_data ?? {},
      url: typeof window !== 'undefined' ? window.location.href : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      session_id: getSessionId(),
    });
  } catch {
    // Silenciar erros de tracking para não afetar a experiência do usuário
  }
}

/** Registra uma visualização de página */
export function trackPageView(pageName?: string): void {
  sendEvent({
    event_type: 'page_view',
    event_name: pageName ?? (typeof window !== 'undefined' ? window.location.pathname || '/' : 'unknown'),
    event_data: { path: typeof window !== 'undefined' ? window.location.pathname : undefined },
  });
}

/** Registra um clique em elemento/CTA */
export function trackClick(elementName: string, extraData?: Record<string, unknown>): void {
  sendEvent({
    event_type: 'click',
    event_name: elementName,
    event_data: extraData,
  });
}

/** Registra evento customizado */
export function trackEvent(eventName: string, data?: Record<string, unknown>): void {
  sendEvent({
    event_type: 'custom',
    event_name: eventName,
    event_data: data,
  });
}
