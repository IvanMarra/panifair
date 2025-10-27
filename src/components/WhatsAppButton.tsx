const WhatsAppButton = () => {
  const phoneNumber = '5531982363535'; // Formato internacional: +55 31 98236-3535
  const message = 'Olá! Gostaria de mais informações sobre a PANIFAIR 2026.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
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
