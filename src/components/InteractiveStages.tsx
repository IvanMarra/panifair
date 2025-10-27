import { useEffect } from 'react';

const InteractiveStages = () => {
  // The original interactive stages functionality is removed as this component
  // is now a static parallax hero section.
  // The `useEffect` for `initializeStages` is no longer needed.

  const scrollToStructure = () => {
    const element = document.getElementById('estrutura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destaques" className="exp-hero">
      <div className="exp-inner">
        <h1 className="font-playfair">Padaria Modelo em funcionamento</h1>
        <p className="font-inter">
          210m² de experiência ao vivo, produção em tempo real e 22 estandes no entorno.
        </p>
        <button onClick={scrollToStructure} className="btn-hero mt-8">
          Ver Estrutura
        </button>
      </div>
    </section>
  );
};

export default InteractiveStages;