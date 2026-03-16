import { useState, useEffect } from 'react';
import { MousePointer, Users, Eye, LogOut, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { apiPost } from '@/lib/api';

const AUTH_KEY = 'panifair_painel_auth';

interface DashboardData {
  summary: {
    totalPageViews: number;
    totalClicks: number;
    uniqueSessions: number;
    period: string;
  };
  chartData: { date: string; visualizações: number }[];
  topClicks: { name: string; count: number }[];
  recentEvents: Array<{
    id: string;
    created_at: string;
    event_type: string;
    event_name: string | null;
    event_data: unknown;
  }>;
}

const chartConfig = {
  visualizações: {
    label: 'Visualizações',
    color: 'hsl(var(--primary))',
  },
};

const Painel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(AUTH_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setDataLoading(true);
      setError('');
      try {
        const storedPassword = sessionStorage.getItem('panifair_painel_pwd');
        const json = await apiPost<DashboardData & { error?: string }>('/api/analytics/dashboard', {
          password: storedPassword,
        });

        if (json?.error) {
          if (json.error === 'Senha inválida') {
            sessionStorage.removeItem(AUTH_KEY);
            sessionStorage.removeItem('panifair_painel_pwd');
            setIsAuthenticated(false);
          }
          throw new Error(json.error);
        }

        setData(json);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const json = await apiPost<DashboardData & { error?: string }>('/api/analytics/dashboard', {
        password,
      });

      if (json?.error) {
        throw new Error(json.error);
      }

      sessionStorage.setItem(AUTH_KEY, 'true');
      sessionStorage.setItem('panifair_painel_pwd', password);
      setIsAuthenticated(true);
      setData(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem('panifair_painel_pwd');
    setIsAuthenticated(false);
    setData(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-elegant flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-playfair">Painel de Analytics</CardTitle>
            <CardDescription>
              Acesso restrito. Digite a senha para visualizar os dados de acesso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha de acesso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-playfair text-xl font-bold">Painel de Analytics — PANIFAIR 2026</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {dataLoading && !data ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error && !data ? (
          <div className="text-center py-20 text-destructive">{error}</div>
        ) : data ? (
          <div className="space-y-8">
            {/* Resumo */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizações de página</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.totalPageViews}</div>
                  <p className="text-xs text-muted-foreground">Últimos {data.summary.period}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cliques</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.totalClicks}</div>
                  <p className="text-xs text-muted-foreground">CTAs e links clicados</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessões únicas</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.summary.uniqueSessions}</div>
                  <p className="text-xs text-muted-foreground">Visitantes distintos</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico */}
            {data.chartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Visualizações por dia</CardTitle>
                  <CardDescription>Page views nos últimos 7 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" tickFormatter={(v) => {
                        const d = new Date(v);
                        return `${d.getDate()}/${d.getMonth() + 1}`;
                      }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="visualizações" fill="var(--color-visualizações)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Top cliques */}
            {data.topClicks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Principais cliques</CardTitle>
                  <CardDescription>Elementos mais clicados pelos visitantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.topClicks.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.count} cliques</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eventos recentes */}
            {data.recentEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Eventos recentes</CardTitle>
                  <CardDescription>Últimos 50 eventos registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {data.recentEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0"
                      >
                        <div>
                          <span className="font-medium">{ev.event_type}</span>
                          {ev.event_name && (
                            <span className="text-muted-foreground ml-2">— {ev.event_name}</span>
                          )}
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {new Date(ev.created_at).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!data.chartData.length && !data.topClicks.length && !data.recentEvents.length && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Nenhum dado de analytics ainda. Os eventos começarão a aparecer quando os visitantes navegarem no site.
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Painel;
