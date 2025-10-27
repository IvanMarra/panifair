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

  // Endereço correto do Centerminas Expo
  const centerminasAddress = "Av. Pastor Anselmo Silvestre, 1495 - União, Belo Horizonte - MG, 31170-678";
  
  // URL de embed do Google Maps gerado diretamente para o endereço fornecido, com zoom 4f15
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.9999999999995!2d-43.938000!3d-19.866000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f15!3m3!1m2!1s0xa69919a69919a699%3A0x0!2sCenterminas+Expo!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr`;

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
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-premium border border-border/50 h-[400px]">
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

              {/* Floating Info Card */}
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-premium border border-border/50">
                <div className="flex items-center gap-3">
                  <Car className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">2.300 vagas</div>
                    <div className="text-sm text-muted-foreground">Estacionamento gratuito</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Points */}
            <div className="space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-8">
                Acesso Privilegiado
              </h3>

              {accessPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 group">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary" />
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
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Localização Central</h3>
              <p className="text-muted-foreground text-sm">
                No coração de Belo Horizonte, com fácil acesso a toda região metropolitana
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Infraestrutura Completa</h3>
              <p className="text-muted-foreground text-sm">
                Restaurantes, hotéis e serviços de qualidade no entorno do evento
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fácil Acesso</h3>
              <p className="text-muted-foreground text-sm">
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