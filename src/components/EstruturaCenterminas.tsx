import React, { useEffect, useState } from "react";

const BG = "/assets/centerminas/centerminas-parallax.jpg"; // Revertido para a imagem original
const BG_FALLBACK = "https://images.unsplash.com/photo-1539037116277-4db2089fa4db?w=1920&q=80&auto=format&fit=crop";
const VIDEO = "/assets/centerminas/centerminas.mp4";
const VIDEO_POSTER = "/assets/centerminas/centerminas-aereo.webp"; // Usando a nova imagem como poster

export default function EstruturaCenterminas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    if (typeof window !== "undefined") {
      handleResize(); // Set initial value
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const bgUrl = BG || BG_FALLBACK;
  const showVideo = true; // Mantido como true, o navegador tentará carregar o vídeo.

  return (
    <section id="estrutura" aria-label="Estrutura" className="relative">
      {/* BACKGROUND FULL-BLEED PARALLAX */}
      <div
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen"
        style={{
          minHeight: isMobile ? "65vh" : "90vh",
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-24 lg:py-32 text-white"> {/* Aumentado o padding vertical */}
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold drop-shadow">
            Centerminas Expo: palco do futuro da panificação
          </h2>
          <p className="mt-4 max-w-3xl text-white/90 text-lg font-inter">
            Com <strong>57 mil m²</strong>, pé-direito de até <strong>14 metros</strong>, estacionamento
            para <strong>2.300 veículos</strong> e acesso privilegiado a aeroportos, metrô e rede hoteleira,
            o Centerminas Expo garante toda a infraestrutura necessária para um evento de nível internacional.
          </p>

          {/* MÉTRICAS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { k: "57 mil m²", v: "Área total do evento" },
              { k: "2.300", v: "Vagas de estacionamento" },
              { k: "14 metros", v: "Pé-direito máximo" },
              { k: "210 m²", v: "Padaria modelo" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 py-8 px-5" // Aumentado o padding vertical
              >
                <div className="text-xl font-semibold font-inter">{m.k}</div>
                <div className="text-sm text-white/80 font-inter">{m.v}</div>
              </div>
            ))}
          </div>

          {/* CTA opcional abaixo do texto */}
          <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4 justify-end"> {/* Adicionado mb-8 e flex-col para mobile */}
            <a
              href="#inscricao"
              className="w-full sm:w-auto btn-hero" // Usando btn-hero e ajustando largura
            >
              Quero participar
            </a>
            <a
              href="#oportunidades"
              className="w-full sm:w-auto btn-secondary" // Usando btn-secondary e ajustando largura
            >
              Quero expor
            </a>
          </div>
        </div>
      </div>

      {/* CARD DE VÍDEO (OPCIONAL). Se o arquivo não existir, NÃO renderizar este bloco. */}
      {showVideo && (
        <div className="mx-auto max-w-6xl px-6 lg:px-8 -mt-24 lg:-mt-32 relative z-20"> {/* Subido o card de vídeo */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-black/10 bg-white">
            <div className="relative aspect-[16/9]">
              <video
                className="h-full w-full object-cover"
                src={VIDEO}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Vídeo do Centerminas Expo"
                poster={VIDEO_POSTER} // Usando a nova imagem como poster
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}