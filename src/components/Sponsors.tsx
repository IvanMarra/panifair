import React from "react";

const apoioLogos = [
  {
    name: "AMIPÃO",
    logo: "/assets/sponsors/logo-amipao.jpeg",
    description: "Sindicato e Associação Mineira da Indústria de Panificação",
  },
  {
    name: "Minas Pão",
    logo: "/assets/sponsors/logo-minas-pao.jpeg",
    description: "Minas Pão",
  },
];

const patrocinioLogos = [
  {
    name: "Mafille Gestão",
    logo: "/assets/sponsors/logo-maffille-gestao.png",
    description: "Consultoria e Assessoria",
  },
];

const Sponsors = () => {
  return (
    <section id="apoio-patrocinio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Seção de Apoio */}
          <div>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">Apoio</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
                Agradecemos aos nossos apoiadores
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
              {apoioLogos.map((logo, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 w-full max-w-sm"
                >
                  <div className="flex items-center justify-center h-32">
                    <img
                      src={logo.logo}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain grayscale-0 group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground font-inter text-sm">
                Quer apoiar o evento? Entre em contato conosco.
              </p>
            </div>
          </div>

          {/* Seção de Patrocínio */}
          <div>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">Realizadora</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
              {patrocinioLogos.map((logo, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 w-full max-w-sm"
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center h-32">
                      <img
                        src={logo.logo}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain grayscale-0 group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground font-inter">
                      Maffille Gestão e Negócios Ltda.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground font-inter text-sm">
                Quer patrocinar o evento? Entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
