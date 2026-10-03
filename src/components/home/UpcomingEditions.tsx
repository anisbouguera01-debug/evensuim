import React, { useRef } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { PageId } from '../../types';
import { IMAGES } from '../../assets/images';
import { gsap, ScrollTrigger, useGSAP, MQ, SCRUB } from '../../animations/gsap';
import { useSmoothScroll } from '../../animations/SmoothScroll';

interface Props {
  setCurrentPage: (page: PageId) => void;
}

const EDITIONS = [
  {
    title: 'Salon Chocorium 2026',
    date: '23 au 26 Sept. 2026',
    location: 'Palais des Expositions SAFEX, Alger',
    badge: 'Chocolat & Confiserie',
    description:
      'Le rendez-vous incontournable des professionnels du chocolat, de la confiserie et des équipements de production en Algérie.',
    highlight: 'Démonstrations & Masterclass',
    image: IMAGES.chocorium2026Poster,
    pageId: 'chocorium2026' as PageId,
  },
  {
    title: 'Salon Milktec 2026',
    date: '23 au 26 Sept. 2026',
    location: 'Palais des Expositions SAFEX, Alger',
    badge: 'Industrie Laitière',
    description:
      "Le salon professionnel dédié aux technologies de l'industrie laitière, de l'élevage et de la transformation de pointe.",
    highlight: 'Tables rondes & Experts B2B',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
    pageId: 'salons' as PageId,
  },
  {
    title: 'Clinica 2027',
    date: 'Mai 2027',
    location: 'Palais des Expositions SAFEX, Alger',
    badge: 'Santé & Médical',
    description:
      "Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les services de santé.",
    highlight: 'Plus de 120 exposants attendus',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80',
    pageId: 'clinica2027' as PageId,
  },
];

/**
 * PROCHAINES ÉDITIONS — travelling horizontal.
 * Desktop : la section est pinnée et le scroll vertical fait glisser la piste de cartes ;
 * chaque carte « entre dans le champ » (rotateY, scale) et son image panote.
 * Mobile : carrousel natif à scroll-snap, comme à l'origine.
 */
export const UpcomingEditions: React.FC<Props> = ({ setCurrentPage }) => {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinState = useRef<ScrollTrigger | null>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const section = root.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        track.dataset.pinned = 'true';
        // Distance réelle jusqu'au dernier panneau + marge de droite (scrollWidth ignore le padding final).
        const distance = () => {
          const last = track.lastElementChild as HTMLElement | null;
          if (!last) return 0;
          const gutter = Math.max(24, (window.innerWidth - 1152) / 2 + 24);
          return Math.max(0, last.offsetLeft + last.offsetWidth + gutter - window.innerWidth);
        };

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        pinState.current = move.scrollTrigger ?? null;

        (q('[data-edition]') as HTMLElement[]).forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -10, scale: 0.9, opacity: 0.35 },
            {
              rotateY: 0,
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 100%', end: 'left 55%', scrub: true },
            },
          );
          gsap.fromTo(
            card.querySelector('[data-edition-img]'),
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });

        gsap.from(q('[data-edition-end] > *'), {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: q('[data-edition-end]')[0], containerAnimation: move, start: 'left 90%', end: 'left 60%', scrub: true },
        });

        return () => {
          delete track.dataset.pinned;
          pinState.current = null;
        };
      });

      mm.add(MQ.mobile, () => {
        gsap.from(q('[data-edition]'), {
          y: 80,
          opacity: 0,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: track, start: 'top 92%', end: 'top 55%', scrub: SCRUB },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  /** Les flèches restent fonctionnelles : défilement natif, ou avancée du travelling si pinné. */
  const step = (direction: 'left' | 'right') => {
    const sign = direction === 'left' ? -1 : 1;
    const st = pinState.current;
    if (st) {
      const per = (st.end - st.start) / EDITIONS.length;
      const target = Math.min(st.end, Math.max(st.start, window.scrollY + sign * per));
      scrollTo(target, { duration: 1.1 });
      return;
    }
    const el = trackRef.current;
    if (el) el.scrollTo({ left: el.scrollLeft + sign * 374, behavior: 'smooth' });
  };

  return (
    <section
      ref={root}
      id="upcoming"
      aria-label="Prochaines éditions"
      className="relative py-24 lg:py-0 bg-gradient-to-b from-white to-sky-50/30 overflow-hidden border-b border-sky-100 scroll-mt-24"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête mobile / tablette (disposition d'origine) */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">AGENDA • 02</span>
              <h2 id="upcoming-title" className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Prochaines <span className="text-[#0284c7]">Éditions</span>
              </h2>
              <div className="w-16 h-1 bg-[#1e3a8a] rounded" />
              <p className="text-slate-500 text-sm">
                Découvrez nos futurs événements et salons professionnels d'envergure nationale et internationale.
              </p>
          </div>
            <div className="flex gap-3">
              <button
                onClick={() => step('left')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => step('right')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
        </div>
      </div>

      <div className="relative z-10 lg:h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div
          ref={trackRef}
          className="editions-track relative flex gap-6 lg:gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pb-0 lg:pt-20 scrollbar-none will-change-transform"
          style={{ perspective: '1400px' }}
        >
          {/* Panneau titre (desktop) : premier plan du travelling */}
          <div className="hidden lg:flex shrink-0 w-[min(30vw,420px)] flex-col justify-center space-y-4 pr-6">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">AGENDA • 02</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Prochaines <span className="text-[#0284c7]">Éditions</span>
            </h2>
            <div className="w-16 h-1 bg-[#1e3a8a] rounded" />
            <p className="text-slate-500 text-sm">
              Découvrez nos futurs événements et salons professionnels d'envergure nationale et internationale.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => step('left')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => step('right')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {EDITIONS.map((edition) => (
            <div
              key={edition.title}
              data-edition
              data-cursor="view"
              className="edition-card relative text-left w-[280px] sm:w-[350px] lg:w-[clamp(340px,32vw,480px)] shrink-0 snap-start bg-white border border-sky-100/80 rounded-[28px] p-6 shadow-sm flex flex-col justify-between group cursor-pointer active:scale-[0.98] will-change-transform"
            >
              <div className="space-y-4 w-full">
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-sky-100/50 relative">
                  <div data-edition-img className="absolute inset-[-10%] will-change-transform">
                    <img
                      src={edition.image}
                      alt={edition.title}
                      className="edition-img w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="edition-veil absolute inset-0" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0284c7] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      {edition.badge}
                    </span>
                  </div>
                  <span className="edition-cta absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    Découvrir
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#1e3a8a] pt-1">
                  <Calendar className="w-4 h-4 text-[#0284c7]" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">{edition.date}</span>
                </div>

                <h3 className="edition-title text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#0284c7] transition-colors">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(edition.pageId)}
                    className="stretched-link text-left cursor-pointer focus-visible:outline-none"
                  >
                    {edition.title}
                  </button>
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{edition.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-50 space-y-3 w-full">
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <span className="text-[11px] font-semibold text-slate-500">{edition.location}</span>
                </div>
                <div className="bg-sky-50/50 rounded-xl p-3 border border-sky-100/50 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">{edition.highlight}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Fin du travelling : ouverture vers la page Salons */}
          <div data-edition-end className="hidden lg:flex shrink-0 w-[min(28vw,380px)] flex-col justify-center gap-4 pl-4">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest font-mono">Tous nos rendez-vous</span>
            <p className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              Chocorium, Milktec &amp; Clinica
            </p>
            <button
              onClick={() => setCurrentPage('salons')}
              className="btn-cine self-start bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-2 group cursor-pointer"
            >
              <span>Voir les salons</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="mt-2 text-center md:hidden">
          <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            ← Glissez pour en voir plus →
          </span>
        </div>
      </div>
    </section>
  );
};
