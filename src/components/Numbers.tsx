import { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="counter">
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </div>
  );
};

const Numbers = () => {
  const stats = [
    {
      number: 50000,
      suffix: "",
      label: "visitantes esperados",
      description: "Profissionais e entusiastas do setor"
    },
    {
      number: 100,
      prefix: "R$ ",
      suffix: " milhões",
      label: "em negócios projetados", 
      description: "Volume de transações estimado"
    },
    {
      number: 208,
      suffix: "",
      label: "estandes no salão principal",
      description: "Empresas e fornecedores participantes"
    },
    {
      number: 288,
      suffix: "",
      label: "lugares no restaurante",
      description: "Mais 176 assentos adicionais disponíveis"
    },
    {
      number: 2150,
      suffix: " m²",
      label: "no salão principal",
      description: "Área dedicada às exposições"
    },
    {
      number: 49,
      suffix: "",
      label: "assentos para palestras",
      description: "Auditório técnico-didático especializado"
    }
  ];

  return (
    <section id="numeros" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Números que credibilizam
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dados que demonstram o impacto e a relevância do PANIFAIR 2026 para o setor da panificação.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card-premium text-center group">
                <div className="mb-6">
                  <Counter 
                    end={stat.number} 
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress Bar Animation */}
                <div className="mt-6 w-full h-1 bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Highlight */}
          <div className="mt-16 bg-gradient-premium rounded-2xl p-8 text-center text-white">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              O maior evento da panificação do Brasil
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Com potencial internacional e números que impressionam, o PANIFAIR 2026 se consolida 
              como referência no setor da panificação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers;