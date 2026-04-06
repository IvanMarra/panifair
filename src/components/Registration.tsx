import { Phone, Mail, Instagram } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

const Registration = () => {
  const contactMethods = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+55 (31) 99175-3330",
      href: "https://wa.me/5531991753330",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "panifair@panifair.com", 
      href: "mailto:panifair@panifair.com",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@panifair",
      href: "https://www.instagram.com/panifair/",
      gradient: "from-pink-500 to-purple-600"
    }
  ];

  return (
    <section id="inscricao" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
              Garanta sua participação no PANIFAIR 2026
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Escaneie o QR Code abaixo para realizar sua inscrição no evento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* QR Code - Inscrição */}
            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-elegant flex flex-col items-center justify-center">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-6">
                Inscrição via QR Code
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Escaneie o código com a câmera do seu celular para acessar a página de inscrição
              </p>
              <div className="relative p-8 bg-white rounded-2xl shadow-xl border-2 border-primary/20 ring-4 ring-primary/5">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-primary/10 -z-10 blur-sm" />
                <img
                  src="/assets/qrcode_panifair_2026.png"
                  alt="QR Code para inscrição no PANIFAIR 2026"
                  className="w-56 h-56 object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Ou clique em &quot;Quero participar&quot; ao lado
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-6">
                  Contatos diretos
                </h3>
                <p className="text-muted-foreground mb-8">
                  Entre em contato conosco pelos canais abaixo para esclarecer dúvidas ou obter informações adicionais.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick(`contato_${contact.label.toLowerCase()}`, { channel: contact.label })}
                      className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 group"
                    >
                      <div className={`bg-gradient-to-br ${contact.gradient} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {contact.label}
                        </div>
                        <div className="text-muted-foreground">{contact.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 pt-8">
                <a
                  href="https://www.hbatools.com.br/panifair-2026__2617"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('quero_participar', { cta: 'inscricao' })}
                  className="w-full btn-hero flex items-center justify-center"
                >
                  Quero participar
                </a>
                <button 
                  onClick={() => {
                    trackClick('quero_expor', { cta: 'whatsapp' });
                    window.open('https://wa.me/5531991753330?text=Olá! Gostaria de informações sobre como expor no PANIFAIR 2026.', '_blank');
                  }}
                  className="w-full btn-secondary"
                >
                  Quero expor
                </button>
                <a
                  href="https://wa.me/5531983963167"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('quero_patrocinar', { cta: 'inscricao' })}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  Quero patrocinar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;