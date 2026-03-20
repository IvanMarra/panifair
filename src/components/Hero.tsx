import { useEffect, useState } from 'react';
import { trackClick } from '@/lib/analytics';

const Hero = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after 8 seconds
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 8000);

    return () => clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    // Initialize YouTube video and controls
    const initializeVideo = () => {
      const wrap = document.querySelector('.hero-video') as HTMLElement;
      if (!wrap) return;
      
      const ids = (wrap.dataset.yt || '').split(',').map(x => x.trim()).filter(Boolean);
      const id = ids[0] || 'yLVAm5yyJp0';
      const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
      
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.loading = 'lazy';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      wrap.appendChild(iframe);

      const playBtn = document.querySelector('.play-fallback') as HTMLButtonElement;
      let ok = false;
      
      setTimeout(() => { 
        if (!ok && playBtn) playBtn.hidden = false; 
      }, 1200);
      
      iframe.addEventListener('load', () => ok = true);
      
      if (playBtn) {
        playBtn.addEventListener('click', () => {
          iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&controls=1&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
          playBtn.hidden = true;
        });
      }
    };

    initializeVideo();
  }, []);

  const scrollToInscricao = (cta: string) => {
    trackClick(`hero_${cta}`);
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-video" data-yt="yLVAm5yyJp0"></div>
      <div className="hero-overlay">
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <img 
            src="/assets/logo-panifair-photoshop.png" 
            alt="PANIFAIR 2026" 
            className="hero-logo"
          />
          <h1 className="logo-text">
            <span className="logo-p">P</span>ANIF<span className="logo-f">F</span>AIR 2026
          </h1>
          <p className="kicker font-inter">Feira Internacional da Panificação</p>
          <p className="meta font-inter">
            Belo Horizonte · 15, 16 e 17 de maio de 2026 · Centerminas Expo
          </p>
          <div className="cta-wrap">
            <a
              href="https://www.hbatools.com.br/panifair-2026__2617"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('hero_quero_participar')}
              className="cta cta-primary"
            >
              Quero participar
            </a>
            <button onClick={() => scrollToInscricao('quero_expor')} className="cta cta-secondary">
              Quero expor
            </button>
            <a
              href="https://wa.me/5531983963167"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('hero_quero_patrocinar')}
              className="cta cta-secondary"
            >
              Quero Patrocinar
            </a>
          </div>
        </div>
        <button 
          className="play-fallback" 
          aria-label="Reproduzir vídeo" 
          style={{ display: 'none' }}
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default Hero;