import { useState } from 'react';
import { Phone, Mail, Instagram, Send, User, Building, Camera, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Registration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'participante',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    return `${ua} | Platform: ${platform} | Language: ${language}`;
  };

  const getLocationInfo = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;
    return `Timezone: ${timezone} | Locale: ${locale}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (import.meta.env.DEV) {
      console.log('Form submission started for type:', formData.type);
    }

    try {
      const { data, error } = await supabase.functions.invoke('submit-registration', {
        body: {
          ...formData,
          deviceInfo: getDeviceInfo(),
          locationInfo: getLocationInfo()
        }
      });

      if (import.meta.env.DEV) {
        console.log('Edge function response:', { success: !!data, hasError: !!error });
      }

      if (error) {
        throw error;
      }

      // Mostrar toast de sucesso
      toast({
        title: "✓ Inscrição enviada com sucesso!",
        description: "Recebemos sua inscrição. Entraremos em contato em breve.",
        duration: 5000,
      });
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        type: 'participante',
        message: ''
      });
    } catch (error: any) {
      // Mostrar toast de erro
      toast({
        title: "✗ Erro ao enviar inscrição",
        description: error.message || 'Por favor, tente novamente.',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(31) 98236-3535",
      href: "https://wa.me/5531982363535",
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

  const participationType = [
    { value: 'participante', label: 'Participante', icon: User },
    { value: 'expositor', label: 'Expositor', icon: Building },
    { value: 'imprensa', label: 'Imprensa', icon: Camera }
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
              Preencha o formulário abaixo e escolha sua modalidade de inscrição: 
              Participante | Expositor | Imprensa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Registration Form */}
            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-elegant">
              <h3 className="font-playfair text-2xl font-bold text-foreground mb-6">
                Formulário de Inscrição
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="(31) 99999-9999"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Empresa/Organização
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                {/* Participation Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-foreground mb-3">
                    Modalidade de participação *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {participationType.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label key={type.value} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            formData.type === type.value 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}>
                            <div className="flex flex-col items-center text-center space-y-2">
                              <IconComponent className={`h-6 w-6 ${
                                formData.type === type.value ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                              <span className={`text-sm font-medium ${
                                formData.type === type.value ? 'text-primary' : 'text-foreground'
                              }`}>
                                {type.label}
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Conte-nos mais sobre seu interesse no evento..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar inscrição
                    </>
                  )}
                </button>
              </form>
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
                <button 
                  onClick={() => {
                    const element = document.querySelector('#sobre');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full btn-hero"
                >
                  Quero participar
                </button>
                <button 
                  onClick={() => {
                    window.open('https://wa.me/5531982363535?text=Olá! Gostaria de informações sobre como expor no PANIFAIR 2026.', '_blank');
                  }}
                  className="w-full btn-secondary"
                >
                  Quero expor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;