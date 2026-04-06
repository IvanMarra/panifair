import { trackClick } from '@/lib/analytics';

const WhatsAppButton = () => {
  const phoneNumber = '5531991753330'; // Celular BR: +55 (31) 99175-3330 (9 após o DDD é obrigatório no wa.me)
  const message = 'Olá! Gostaria de mais informações sobre a PANIFAIR 2026.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick('whatsapp_flutuante', { source: 'floating_button' })}
      className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contato via WhatsApp"
    >
      <img 
        src="/assets/whatsapp-icon.svg" 
        alt="WhatsApp" 
        className="h-8 w-8"
      />
    </a>
  );
};

export default WhatsAppButton;
