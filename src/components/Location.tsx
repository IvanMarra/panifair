import { MapPin, Plane, Car, Train, Building } from 'lucide-react';

const Location = () => {
  const accessPoints = [
    {
      icon: Plane,
      title: "Aeroporto de Confins",
      description: "A poucos minutos do evento",
      detail: "Conexão direta e fácil acesso"
    },
    {
      icon: Plane,
      title: "Aeroporto da Pampulha", 
      description: "Próximo ao centro da cidade",
      detail: "Ideal para voos executivos"
    },
    {
      icon: Train,
      title: "Estação de metrô",
      description: "Minas Shopping",
      detail: "Transporte público eficiente"
    },
    {
      icon: Building,
      title: "Rede hoteleira",
      description: "Hotéis de alto padrão no entorno",
      detail: "Hospedagem de qualidade garantida"
    }
  ];

  // Endereço do Centerminas Expo
  const centerminasAddress = "Av. Pastor Anselmo Silvestre, 1495 - União, Belo Horizonte - MG, 31170-678";
  
  // URL de embed do Google Maps para o endereço do Centerminas Expo
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(centerminasAddress)}&z=16&output=embed`;

  return (
    <section id="local" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Localização estratégica
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O Centerminas Expo, em Belo Horizonte, oferece fácil acesso e infraestrutura completa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Google Maps Embed */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-premium border border-border/50 h-[min(52vh,520px)] min-h-[420px]">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Centerminas Expo"
                ></iframe>
              </div>
            </div>

            {/* Access Points */}
            <div className="flex flex-col gap-5 lg:gap-6">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-2 lg:mb-4">
                Acesso Privilegiado
              </h3>

              {accessPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-5 p-7 md:p-8 bg-card rounded-2xl border border-border/50 hover:shadow-card transition-all duration-300 group lg:min-h-[112px]">
                    <div className="bg-primary/10 p-3.5 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {point.title}
                      </h4>
                      <p className="text-muted-foreground mb-1">{point.description}</p>
                      <p className="text-sm text-muted-foreground/80">{point.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 lg:gap-10">
            <div className="text-center p-8 md:p-10 rounded-2xl border border-border/40 bg-card/30">
              <div className="bg-primary/10 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mx-auto mb-5">
                <MapPin className="h-9 w-9 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">Localização Central</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                No coração de Belo Horizonte, com fácil acesso a toda região metropolitana
              </p>
            </div>

            <div className="text-center p-8 md:p-10 rounded-2xl border border-border/40 bg-card/30">
              <div className="bg-secondary/10 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mx-auto mb-5">
                <Building className="h-9 w-9 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">Infraestrutura Completa</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                Restaurantes, hotéis e serviços de qualidade no entorno do evento
              </p>
            </div>

            <div className="text-center p-8 md:p-10 rounded-2xl border border-border/40 bg-card/30">
              <div className="bg-accent/30 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center mx-auto mb-5">
                <Car className="h-9 w-9 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">Fácil Acesso</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                Múltiplas opções de transporte para máxima comodidade dos participantes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;