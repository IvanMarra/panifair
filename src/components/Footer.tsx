import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#sobre', label: 'Sobre o evento' },
    { href: '#estrutura', label: 'Estrutura' }, // 'Padaria Modelo' foi removido daqui
    { href: '#numeros', label: 'Números' },
    { href: '#oportunidades', label: 'Oportunidades' },
    { href: '#local', label: 'Localização' },
    { href: '#inscricao', label: 'Inscrições' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <button 
                onClick={scrollToTop}
                className="font-playfair text-3xl font-bold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                PANIFAIR 2026
              </button>
              <p className="text-lg text-secondary-foreground/80 mt-2">
                Feira Internacional da Panificação
              </p>
            </div>

            <p className="text-secondary-foreground/70 leading-relaxed max-w-md">
              O maior evento da panificação do Brasil, com potencial internacional. 
              Três dias de experiências únicas em Belo Horizonte.
            </p>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/80">
                  Centerminas Expo, Belo Horizonte - MG
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-secondary-foreground/80">
                  15, 16 e 17 de maio de 2026
                </span>
              </div>
            </div>
            
            {/* Patrocinador Master */}
            <div className="mt-6">
              <p className="text-sm text-secondary-foreground/70">
                <strong>Patrocinador Master:</strong> Junior Maffille
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg text-secondary-foreground mb-6">
              Navegação
            </h3>
            <ul className="space-y-3">
              {quickLinks.slice(0, 3).map((link) => ( // Ajustado para 3 links
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold text-lg text-secondary-foreground mb-6">
              Informações
            </h3>
            <ul className="space-y-3">
              {quickLinks.slice(3).map((link) => ( // Ajustado para os links restantes
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-secondary-foreground/60">
              © {currentYear}–2026 — <span className="font-semibold">Maffille</span> — Todos os direitos reservados
            </div>
            <div className="flex gap-6 text-sm">
              <button className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
                Política de Privacidade
              </button>
              <button className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
                Termos de Uso
              </button>
              <button 
                onClick={() => scrollToSection('#inscricao')}
                className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200"
              >
                Contato
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="h-1 bg-gradient-to-r from-primary via-gold-light to-primary"></div>
    </footer>
  );
};

export default Footer;