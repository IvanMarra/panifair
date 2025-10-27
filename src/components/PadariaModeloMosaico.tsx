import React from 'react';

const images = [
  { src: "/images/interior-elegante.jpg", alt: "Interior elegante de uma padaria moderna", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/paes-frescos-em-exposicao.jpg", alt: "Pães frescos em exposição", span: "md:col-span-1 md:row-span-1" },
  { src: "/images/paes-sendo-assados-em-forno-industrial.jpg", alt: "Pães sendo assados em forno industrial", span: "md:col-span-1 md:row-span-1" },
  { src: "/images/campo-de-trigo-dourado.jpg", alt: "Campo de trigo dourado", span: "md:col-span-2 md:row-span-1" },
  // Adicione mais imagens aqui se desejar, ajustando os spans para o layout
];

const PadariaModeloMosaico = () => {
  return (
    <section id="padaria-modelo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              A Padaria Modelo: Inovação em Ação
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
              Experimente a panificação do futuro em nosso espaço interativo, com demonstrações ao vivo e as últimas tendências do setor.
            </p>
          </div>

          {/* Mosaico de Imagens */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 ${image.span}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#inscricao"
              className="btn-hero"
            >
              Quero participar
            </a>
            <a
              href="#oportunidades"
              className="btn-secondary"
            >
              Quero expor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PadariaModeloMosaico;