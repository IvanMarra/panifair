import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

type LegalPageLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

const LegalPageLayout = ({ title, lastUpdated = '3 de maio de 2026', children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="font-playfair text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
          >
            PANIFAIR 2026
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <p className="text-sm text-muted-foreground mb-2">Última atualização: {lastUpdated}</p>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">{title}</h1>
        <div className="space-y-6 text-foreground/90 text-[15px] md:text-base leading-relaxed">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
