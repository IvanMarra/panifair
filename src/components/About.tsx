import { Users, MapPin, Calendar } from 'lucide-react';

// Usando o caminho direto para a imagem na pasta public
const aboutImage = '/assets/centerminas/center-minas-frente.webp'; 

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              O evento que vai transformar o setor
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Durante três dias, <span className="font-semibold text-primary">Belo Horizonte se tornará a capital mundial da panificação</span>.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Com mais de <span className="font-semibold text-foreground">230 estandes</span>, uma padaria modelo em funcionamento pleno,
                área VIP exclusiva, auditório técnico-didático e o inovador <span className="font-semibold text-primary">PANIFEST</span>
                (aberto ao público), o PANIFAIR 2026 reunirá empresários, fornecedores,
                profissionais e amantes do pão em uma experiência única.
              </p>

              {/* Key Features */}
              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">50.000+</h3>
                  <p className="text-sm text-muted-foreground">Visitantes esperados</p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">230+</h3>
                  <p className="text-sm text-muted-foreground">Estandes confirmados</p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">3 Dias</h3>
                  <p className="text-sm text-muted-foreground">De experiências únicas</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-premium">
                <img 
                  src={aboutImage} 
                  alt="Padaria moderna com equipamentos profissionais e ambiente sofisticado"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-elegant border border-border/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">R$ 100M</div>
                  <div className="text-sm text-muted-foreground">em negócios projetados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;