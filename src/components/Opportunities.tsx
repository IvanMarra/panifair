import { Briefcase, Cog, Factory, Building, Camera, Heart } from 'lucide-react';

const Opportunities = () => {
  const opportunities = [
    {
      icon: Briefcase,
      title: "Empresários do setor",
      description: "feche parcerias, descubra tendências e amplie negócios.",
      gradient: "from-primary to-gold-light"
    },
    {
      icon: Cog,
      title: "Fornecedores e colaboradores", 
      description: "conheça tecnologias e técnicas para modernizar sua operação.",
      gradient: "from-secondary to-brown-light"
    },
    {
      icon: Factory,
      title: "Indústria e softwares",
      description: "apresente soluções, feche contratos e aumente sua rede.",
      gradient: "from-accent to-beige-dark"
    },
    {
      icon: Building,
      title: "Governo e instituições",
      description: "apoie o setor que mais gera empregos e fortalece a economia.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: Camera,
      title: "Mídia e influenciadores",
      description: "cubra o maior evento do setor e tenha acesso exclusivo às lideranças.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: Heart,
      title: "Público em geral",
      description: "viva o PANIFEST, com shows, concursos, praça de alimentação e muita diversão gratuita.",
      gradient: "from-gold-light to-primary"
    }
  ];

  return (
    <section id="oportunidades" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Oportunidades para todos os públicos
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O PANIFAIR conecta toda a cadeia da panificação.
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {opportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;
              return (
                <div key={index} className="card-premium group">
                  {/* Icon with Gradient Background */}
                  <div className={`bg-gradient-to-br ${opportunity.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {opportunity.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="mt-6 w-0 h-1 bg-gradient-to-r from-primary to-gold-light group-hover:w-full transition-all duration-500 ease-out"></div>
                </div>
              );
            })}
          </div>

          {/* Special Highlight - PANIFEST */}
          <div className="bg-gradient-premium rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative z-10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                PANIFEST 2026
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Festival aberto ao público geral
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                Shows ao vivo, concursos de panificação, praça de alimentação gourmet, 
                workshops gratuitos e muito mais. Uma celebração completa da cultura da panificação.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">Shows ao vivo</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Concursos</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Workshops gratuitos</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Praça de alimentação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;