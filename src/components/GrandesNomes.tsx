import { Globe } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

type Speaker = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  highlight?: 'international';
  /** Linha extra (ex.: tema da palestra) */
  tagline?: string;
};

const speakers: Speaker[] = [
  {
    name: 'Martin Puricelli',
    image: '/assets/palestrantes/Martin_Puricelli_Editado.png',
    imageAlt: 'Martin Puricelli — presença internacional na PANIFAIR 2026',
    tagline: 'Sua próxima filial não é física: está no Mercado Livre',
    description:
      'Diretor do Grupo Brick Consultoria. Especialista em estratégias de crescimento no Mercado Livre, com atuação consolidada em toda a América Latina; à frente de consultoria certificada nível Silver pelo marketplace, com foco em escala digital e resultados de longo prazo.',
    highlight: 'international',
  },
  {
    name: 'Gustavo Tubarão',
    image: '/assets/grandes-nomes/gustavo-trovao-no-mark.png',
    imageAlt: 'Gustavo Tubarão — palestrante confirmado na PANIFAIR 2026',
    description: 'Uma presença de destaque para uma experiência marcante na Panifair.',
  },
  {
    name: 'Junior Maffille',
    image: '/assets/grandes-nomes/JuniorMaffille.png',
    imageAlt: 'Junior Maffille — palestrante confirmado na PANIFAIR 2026',
    description: 'Conteúdo, presença e autoridade para quem vive o mercado na prática.',
  },
];

const scrollToProgramacao = () => {
  const el = document.querySelector('#programacao');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.location.href = '/#programacao';
};

const GrandesNomes = () => {
  return (
    <section
      id="grandes-nomes"
      aria-labelledby="grandes-nomes-heading"
      className="relative overflow-hidden pb-16 pt-24 text-white md:pb-20 md:pt-32 lg:pb-[5.5rem] lg:pt-36"
      style={{
        background:
          'radial-gradient(circle at 50% 8%, rgba(255, 188, 80, 0.2), transparent 45%), linear-gradient(135deg, #090909 0%, #16100b 55%, #050505 100%)',
      }}
    >
      {/* Faixa superior só com fundo — separa visualmente do hero; o grid de + começa abaixo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#070707] via-[#0a0a0a]/95 to-transparent md:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-28 opacity-[0.1] md:top-36"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 14%, black 32%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 14%, black 32%)',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-[1180px] px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#f4b84a]">
            Presenças especiais
          </p>
          <h2
            id="grandes-nomes-heading"
            className="font-playfair mt-3 text-[clamp(1.85rem,5vw,3.25rem)] font-extrabold leading-tight tracking-tight text-white md:mt-4"
          >
            Grandes nomes confirmados na Panifair
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300 md:text-xl">
            Personalidades que vão inspirar, conectar e movimentar o setor — com programação que reúne visão de
            mercado, gestão e futuro da panificação.
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {speakers
            .filter((s) => s.highlight === 'international')
            .map((speaker) => (
              <article
                key={speaker.name}
                className="group relative overflow-hidden rounded-[28px] border border-amber-400/35 bg-gradient-to-br from-[#1c1610] via-[#0f0c09] to-[#050814] shadow-[0_34px_90px_rgba(0,0,0,0.55)] ring-1 ring-sky-500/15 transition-transform duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:ring-amber-200/25"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1.5 bg-gradient-to-r from-amber-400 via-[#f4b84a] to-sky-500"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-24 top-1/2 z-[1] h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-y-1/2 rounded-full bg-amber-500/12 blur-3xl"
                  aria-hidden
                />
                <div className="relative z-[3] flex min-h-[420px] flex-col md:min-h-[380px] md:flex-row">
                  <div className="relative flex min-h-[280px] flex-1 items-end justify-center overflow-hidden bg-gradient-to-b from-amber-950/30 to-transparent md:max-w-[46%] md:min-h-full">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'%3E%3Cpath fill='%23ffffff' d='M44 0L54 34h36L62 55l14 33L44 68 12 88l14-33L0 34h36z'/%3E%3C/svg%3E")`,
                        backgroundSize: '88px 88px',
                      }}
                      aria-hidden
                    />
                    <img
                      src={speaker.image}
                      alt={speaker.imageAlt}
                      className="relative z-[2] max-h-[min(78vw,340px)] w-auto max-w-[94%] object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02] md:max-h-[min(92%,420px)]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-9 lg:p-10">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-100/95 to-amber-50/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-950 shadow-sm">
                      <Globe className="h-4 w-4 shrink-0 text-sky-800" aria-hidden />
                      Presença internacional
                    </span>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-200/90">
                      Palco Principal · Sexta 15/05 · 17h às 17h50
                    </p>
                    <h3 className="mt-2 font-playfair text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
                      {speaker.name}
                    </h3>
                    {speaker.tagline && (
                      <p className="mt-3 border-l-2 border-[#f4b84a]/80 pl-4 text-base font-medium leading-relaxed text-neutral-100 md:text-lg">
                        {speaker.tagline}
                      </p>
                    )}
                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-300 md:text-base">
                      {speaker.description}
                    </p>
                    <a
                      href="/#programacao"
                      onClick={(e) => {
                        trackClick('grandes_nomes_ver_programacao', { speaker: speaker.name });
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          scrollToProgramacao();
                        }
                      }}
                      className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-amber-300/50 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#f4b84a] hover:bg-[#f4b84a] hover:text-[#1b1208] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4b84a]"
                    >
                      Ver na programação
                    </a>
                  </div>
                </div>
              </article>
            ))}

          <div className="grid gap-7 md:grid-cols-2 md:gap-8">
            {speakers
              .filter((s) => s.highlight !== 'international')
              .map((speaker) => (
                <article
                  key={speaker.name}
                  className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#21160d] to-[#090909] shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:border-[#f4b84a]/35 hover:shadow-[0_36px_90px_rgba(0,0,0,0.55)] md:min-h-[540px] lg:min-h-[560px]"
                >
                  <div
                    className="pointer-events-none absolute bottom-[14%] left-[10%] right-[10%] z-[1] h-[240px] blur-2xl md:h-[260px]"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 186, 73, 0.5), transparent 68%)',
                    }}
                    aria-hidden
                  />

                  <img
                    src={speaker.image}
                    alt={speaker.imageAlt}
                    className="pointer-events-none absolute bottom-0 left-1/2 z-[2] max-h-[86%] w-auto max-w-[92%] -translate-x-1/2 object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02] md:max-h-[88%]"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="relative z-[3] mt-auto p-6 md:p-7">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-black/25 to-black/75 p-5 shadow-inner backdrop-blur-md md:p-6">
                      <span className="inline-block rounded-full bg-[#f4b84a] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#1b1208]">
                        Palestrante confirmado
                      </span>
                      <h3 className="mt-3 font-playfair text-2xl font-extrabold tracking-tight text-white md:text-[2rem] lg:text-[2.125rem]">
                        {speaker.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-neutral-200 md:text-base">
                        {speaker.description}
                      </p>
                      <a
                        href="/#programacao"
                        onClick={(e) => {
                          trackClick('grandes_nomes_ver_programacao', { speaker: speaker.name });
                          if (window.location.pathname === '/') {
                            e.preventDefault();
                            scrollToProgramacao();
                          }
                        }}
                        className="mt-5 inline-flex items-center justify-center rounded-full border border-white/35 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#f4b84a] hover:bg-[#f4b84a] hover:text-[#1b1208] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4b84a]"
                      >
                        Ver programação
                      </a>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrandesNomes;
