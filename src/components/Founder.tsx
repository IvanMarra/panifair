import { Calendar, Building, TrendingUp, Users } from 'lucide-react';

const Founder = () => {
  const timeline = [
    { year: "1999", event: "primeira padaria em BH", icon: Building },
    { year: "2005", event: "criação da marca MIXPÃO", icon: TrendingUp },
    { year: "2019", event: "mais de 30 unidades ativas", icon: Building },
    { year: "2024", event: "MAFFILLE Gestão e +140 mil seguidores", icon: Users },
    { year: "2025", event: "criação da TRIBUTALIZE e MAFFILLE DIGITAL", icon: TrendingUp },
    { year: "2026", event: "consolidação com o PANIFAIR", icon: Calendar }
  ];

  return (
    <section id="idealizador" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Junior Maffille: da padaria ao ecossistema de negócios
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                De uma infância simples em <span className="font-semibold text-foreground">Viçosa</span> até comandar 
                mais de <span className="font-semibold text-primary">54 empresas</span>, com <span className="font-semibold text-foreground">1.300 colaboradores</span> e 
                crescimento médio de <span className="font-semibold text-primary">10% ao ano</span>, Junior Maffille construiu 
                uma trajetória de sucesso no setor da panificação.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-card rounded-xl border border-border/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">54+</div>
                  <div className="text-sm text-muted-foreground">Empresas</div>
                </div>
                <div className="text-center border-l border-r border-border/30">
                  <div className="text-3xl font-bold text-primary mb-1">1.300</div>
                  <div className="text-sm text-muted-foreground">Colaboradores</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">10%</div>
                  <div className="text-sm text-muted-foreground">Crescimento/ano</div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                <p className="text-foreground italic">
                  "O PANIFAIR 2026 representa a materialização de anos de experiência e paixão pelo setor. 
                  É nossa contribuição para elevar a panificação brasileira a um novo patamar."
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  — Junior Maffille, Idealizador do PANIFAIR
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">
                Trajetória de Sucesso
              </h3>
              
              <div className="space-y-6">
                {timeline.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-gold-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="bg-card p-4 rounded-lg border border-border/50 flex-1 group-hover:shadow-card transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-primary text-lg">{item.year}</span>
                          <div className="h-px bg-primary/30 flex-1"></div>
                        </div>
                        <p className="text-foreground capitalize">{item.event}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-16 text-center">
            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-elegant">
              <h3 className="font-semibold text-xl text-foreground mb-4">
                Acompanhe Junior Maffille
              </h3>
              <p className="text-muted-foreground mb-6">
                Siga a jornada e os bastidores do PANIFAIR 2026
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://www.instagram.com/panifair/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  📸 @panifair
                </a>
                <a 
                  href="mailto:panifair@panifair.com"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  📧 panifair@panifair.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;