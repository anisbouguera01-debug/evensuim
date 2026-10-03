import React, { useRef } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { PageId } from '../../types';
import { IMAGES } from '../../assets/images';
import { gsap, ScrollTrigger, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';
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
    image: IMAGES.milktecHeroBg,
    pageId: 'milktec' as PageId,
  },
  {
    title: 'Clinica 2027',
    date: 'Mai 2027',
    location: 'Palais des Expositions SAFEX, Alger',
    badge: 'Santé & Médical',
    description:
      "Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les services de santé.",
    highlight: 'Plus de 120 exposants attendus',
    image: IMAGES.clinicaHeroBg,
    pageId: 'clinica2027' as PageId,
  },
];

/**
 * SCÈNE 4 — CARD TAKEOVER (pinnée, ≈ 480 %)
 *  La 1re carte grandit jusqu'à devenir l'écran ; on lit l'édition (texte cinétique) ;
 *  la caméra file vers la carte suivante : l'ancienne sort du cadre en pivotant, la nouvelle
 *  arrive en carte depuis la droite et prend l'écran. Final : appel vers la page Salons.
 */
export const EditionsTakeover: React.FC<Props> = ({ setCurrentPage }) => {
  const root = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const labels = useRef<number[]>([]);
  const { scrollTo } = useSmoothScroll();

  useScene(root, ({ q, wide, timeline, enter }) => {
    const cards = q('[data-edition]');
    const end = q('[data-edition-end]')[0];
    const heading = SplitText.create(q('[data-editions-title]')[0], { type: 'words,chars', mask: 'chars' });
    const titles = cards.map((c) => SplitText.create(c.querySelector<HTMLElement>('[data-edition-title]')!, { type: 'words', mask: 'words' }));
    const inCard = (c: Element, sel: string) => c.querySelectorAll<HTMLElement>(sel);

    const cardClip = wide ? 'inset(30% 34% 8% 34% round 32px)' : 'inset(36% 12% 8% 12% round 28px)';
    const sideClip = wide ? 'inset(22% 10% 22% 10% round 32px)' : 'inset(26% 8% 26% 8% round 28px)';
    const full = 'inset(0% 0% 0% 0% round 0px)';

    gsap.set(cards[0], { clipPath: cardClip, zIndex: 3 });
    gsap.set(cards[1], { clipPath: sideClip, xPercent: 78, scale: 0.86, zIndex: 4 });
    gsap.set(cards[2], { clipPath: sideClip, xPercent: 150, scale: 0.86, zIndex: 5 });
    gsap.set(end, { clipPath: 'inset(100% 0% 0% 0%)', zIndex: 6 });
    gsap.set(q('[data-edition-copy]'), { autoAlpha: 0 });

    const read = (tl: gsap.core.Timeline, i: number, at: number) => {
      const c = cards[i];
      tl.set(inCard(c, '[data-edition-copy]'), { autoAlpha: 1 }, at)
        .from(inCard(c, '[data-edition-meta]'), { y: 40, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, at)
        .from(titles[i].words, { yPercent: 110, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, at + 0.1)
        .from(inCard(c, '[data-edition-line]'), { y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, at + 0.35)
        .to(inCard(c, '[data-edition-img]'), { scale: 1.28, xPercent: -5, yPercent: -2, duration: 2.4 }, at - 0.6);
    };

    const tl = timeline(wide ? 480 : 560);
    const mark = () => labels.current.push(tl.duration());

    // Entrée : titre + 1re carte qui monte, la suivante attend au bord du cadre
    enter()
      .from(heading.chars, { yPercent: 115, stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 0)
      .from(cards[0], { yPercent: 30, duration: 0.8, ease: 'power3.out' }, 0)
      .from(cards[1], { xPercent: 120, duration: 0.9, ease: 'power3.out' }, 0.2);
    // La 1re carte prend l'écran
    tl.to({}, { duration: 0.3 }, 0)
      .to(q('[data-editions-head]'), { y: -80, scale: 0.9, opacity: 0, duration: 0.7, ease: 'power2.in' }, 1)
      .to(cards[0], { clipPath: full, duration: 1, ease: 'power3.inOut' }, 1)
      .fromTo(inCard(cards[0], '[data-edition-img]'), { scale: 1.45 }, { scale: 1.1, duration: 1.2, ease: 'power2.out' }, 1)
      .to(cards[1], { xPercent: 110, duration: 1 }, 1);
    read(tl, 0, 1.9);
    mark();
    tl.to({}, { duration: 0.6 });

    // La caméra file vers la carte suivante
    for (let i = 1; i < cards.length; i++) {
      const at = tl.duration();
      tl.to(cards[i - 1], { xPercent: -110, rotate: -7, scale: 0.8, duration: 1, ease: 'power3.inOut' }, at)
        .to(inCard(cards[i - 1], '[data-edition-copy]'), { x: -120, opacity: 0, duration: 0.6, ease: 'power2.in' }, at)
        .to(cards[i], { xPercent: 0, scale: 1, duration: 1, ease: 'power3.inOut' }, at)
        .to(cards[i], { clipPath: full, duration: 0.8, ease: 'power3.inOut' }, at + 0.6)
        .fromTo(inCard(cards[i], '[data-edition-img]'), { scale: 1.45 }, { scale: 1.1, duration: 1.2, ease: 'power2.out' }, at + 0.5);
      if (cards[i + 1]) tl.to(cards[i + 1], { xPercent: 78, duration: 1, ease: 'power3.inOut' }, at + 0.3);
      read(tl, i, at + 1.3);
      mark();
      tl.to({}, { duration: 0.6 });
    }

    // Final : révélation verticale vers « tous les salons »
    const at = tl.duration();
    tl.to(end, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' }, at)
      .to(cards[cards.length - 1], { scale: 0.9, yPercent: -12, duration: 1, ease: 'power3.inOut' }, at)
      .from(q('[data-edition-end-line]'), { y: 70, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, at + 0.5);
    mark();
    tl.to({}, { duration: 0.4 });

    stRef.current = tl.scrollTrigger ?? null;
    return () => {
      heading.revert();
      titles.forEach((t) => t.revert());
      stRef.current = null;
      labels.current = [];
    };
  });

  /** Flèches : sautent à l'édition précédente / suivante dans la timeline. */
  const step = (dir: -1 | 1) => {
    const st = stRef.current;
    if (!st) {
      document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const total = st.animation?.duration() ?? 1;
    const points = labels.current.map((t) => st.start + (st.end - st.start) * (t / total));
    const y = window.scrollY;
    const next = dir > 0 ? points.find((p) => p > y + 8) : [...points].reverse().find((p) => p < y - 8);
    scrollTo(next ?? (dir > 0 ? st.end : st.start), { duration: 1.2 });
  };

  return (
    <section ref={root} id="upcoming" aria-label="Prochaines éditions" className="scene relative">
      <div className="scene-stage relative overflow-hidden bg-[#f6fbff]">
        <div data-editions-head className="scene-overlay absolute inset-x-0 top-[11svh] lg:top-[12svh] z-[2] px-6 text-center">
          <span className="block text-xs font-bold text-[#0284c7] uppercase tracking-widest font-mono mb-3">AGENDA • 02</span>
          <h2 data-editions-title className="text-[13vw] lg:text-[7.5vw] font-black text-slate-900 uppercase tracking-tighter leading-[0.86]">
            Prochaines <span className="text-[#0284c7]">Éditions</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm max-w-md mx-auto">
            Découvrez nos futurs événements et salons professionnels d'envergure nationale et internationale.
          </p>
        </div>

        {EDITIONS.map((e) => (
          <article key={e.title} data-edition data-cursor="view" className="scene-panel absolute inset-0 overflow-hidden bg-[#0b1324] text-white will-change-transform">
            <img data-edition-img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover will-change-transform" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1324] via-[#0b1324]/45 to-transparent" />
            <div data-edition-copy className="relative h-full flex items-end px-6 pb-[11svh]">
              <div className="max-w-6xl mx-auto w-full">
                <div className="max-w-xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span data-edition-meta className="bg-[#0284c7] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">{e.badge}</span>
                    <span data-edition-meta className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-sky-100">
                      <Calendar className="w-4 h-4" /> {e.date}
                    </span>
                  </div>
                  <h3 data-edition-title className="text-[11vw] lg:text-[5vw] font-black tracking-tighter leading-[0.9]">{e.title}</h3>
                  <p data-edition-line className="text-slate-200 text-sm sm:text-base leading-relaxed">{e.description}</p>
                  <div data-edition-line className="flex flex-col gap-2 text-xs">
                    <span className="flex items-center gap-2 text-slate-300"><MapPin className="w-4 h-4 text-sky-300 shrink-0" />{e.location}</span>
                    <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-white"><Sparkles className="w-4 h-4 text-amber-400 shrink-0" />{e.highlight}</span>
                  </div>
                  <button
                    data-edition-line
                    onClick={() => setCurrentPage(e.pageId)}
                    className="btn-cine group inline-flex items-center gap-2 bg-white text-[#1e3a8a] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl"
                  >
                    Découvrir l'édition
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Final : vers la page Salons */}
        <div data-edition-end className="scene-panel absolute inset-0 bg-[#1e3a8a] text-white flex items-center px-6">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            <span data-edition-end-line className="block text-xs font-bold text-sky-300 uppercase tracking-widest font-mono">Tous nos rendez-vous</span>
            <p data-edition-end-line className="text-[12vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.88]">
              Chocorium, Milktec <span className="text-sky-300">&amp;</span> Clinica
            </p>
            <button
              data-edition-end-line
              onClick={() => setCurrentPage('salons')}
              className="btn-cine group inline-flex items-center gap-2 bg-white text-[#1e3a8a] px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Voir les salons
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Flèches conservées */}
        <div className="reduce-hide absolute right-4 lg:right-10 bottom-5 lg:bottom-8 z-[8] flex gap-2">
          <button onClick={() => step(-1)} aria-label="Élément précédent" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-[#1e3a8a] flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => step(1)} aria-label="Élément suivant" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-[#1e3a8a] flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
