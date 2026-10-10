import React, { useRef } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { PageId } from '../../types';
import type { ImageKey } from '../../assets/images';
import { SplitText } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
import { CameraImage } from '../motion/CameraImage';
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
    image: 'chocorium2026Poster' as ImageKey,
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
    image: 'milktecHeroBg' as ImageKey,
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
    image: 'clinicaHeroBg' as ImageKey,
    pageId: 'clinica2027' as PageId,
  },
];

/**
 * SCÈNE 4 — CARD TAKEOVER (pinnée, ≈ 480 %)
 *  La 1re carte grandit jusqu'à devenir l'écran ; on lit l'édition (texte cinétique) ;
 *  la caméra file vers la carte suivante : l'ancienne sort du cadre en pivotant, la nouvelle
 *  arrive en carte depuis la droite et prend l'écran. Final : appel vers la page Salons.
 */
const LEN = { wide: 6.9, narrow: 6.9 };

export const EditionsTakeover: React.FC<Props> = ({ setCurrentPage }) => {
  const root = useRef<HTMLElement>(null);
  const toScrollRef = useRef<((t: number) => number) | null>(null);
  const labels = useRef<number[]>([]);
  const totalRef = useRef(0);
  const { scrollTo } = useSmoothScroll();

  useScene(root, LEN, ({ q, wide, toScroll, T0, L, ft, cut, cam, beat }) => {
    const cards = q('[data-edition]');
    const cams = cards.map((c) => c.querySelector<HTMLElement>('[data-cam]')!);
    const end = q('[data-edition-end]')[0];
    const heading = SplitText.create(q('[data-editions-title]')[0], { type: 'words,chars', mask: 'chars' });
    const titles = cards.map((c) => SplitText.create(c.querySelector<HTMLElement>('[data-edition-title]')!, { type: 'words', mask: 'words' }));
    const inCard = (c: Element, sel: string) => Array.from(c.querySelectorAll<HTMLElement>(sel));

    const CARD = wide ? 'inset(30% 34% 8% 34% round 32px)' : 'inset(36% 12% 8% 12% round 28px)';
    const SIDE = wide ? 'inset(22% 10% 22% 10% round 32px)' : 'inset(26% 8% 26% 8% round 28px)';
    const FULL = 'inset(0% 0% 0% 0% round 0px)';
    const STEP = 2; // écrans par édition
    labels.current = [];

    /** Lecture d'une édition : méta, titre mot par mot, lignes. */
    const read = (i: number, at: number) => {
      const c = cards[i];
      cut(inCard(c, '[data-edition-copy]'), at);
      ft(inCard(c, '[data-edition-meta]'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.25, ease: 'power3.out' }, at);
      ft(titles[i].words, { yPercent: 110 }, { yPercent: 0, stagger: 0.04, duration: 0.3, ease: 'power3.out' }, at + 0.05);
      ft(inCard(c, '[data-edition-line]'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power3.out' }, at + 0.2);
      labels.current.push(at + 0.6);
    };

    // ---- ENTRÉE : titre, 1re carte qui monte, la suivante attend au bord ----
    ft(heading.chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.015, duration: 0.35, ease: 'power3.out' }, 0.25);
    ft(cards[0], { yPercent: 30 }, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.1);
    ft(cards[1], { xPercent: 120, scale: 0.86 }, { xPercent: 78, scale: 0.86, duration: 0.8, ease: 'power3.out' }, 0.2);

    // ---- 1re carte → plein écran ----
    ft(q('[data-editions-head]'), { yPercent: 0, scale: 1, opacity: 1 }, { yPercent: -40, scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.in' }, T0 + 0.2);
    ft(cards[0], { clipPath: CARD }, { clipPath: FULL, duration: 0.5, ease: 'power3.inOut' }, T0 + 0.2);
    ft(cards[1], { xPercent: 78, scale: 0.86 }, { xPercent: 110, scale: 0.86, duration: 0.5 }, T0 + 0.2);
    cam(cams[0], { scale: 1.45 }, { scale: 1.1 }, T0 + 0.2, 0.7, 'power2.out');
    cam(cams[0], { scale: 1.1 }, { scale: 1.28, panX: -0.6, panY: -0.2 }, T0 + 0.9, STEP - 0.9);
    read(0, T0 + 0.8);

    // ---- La caméra file vers la carte suivante ----
    for (let i = 1; i < cards.length; i++) {
      const at = T0 + i * STEP;
      ft(cards[i - 1], { xPercent: 0, rotate: 0, scale: 1 }, { xPercent: -110, rotate: -7, scale: 0.8, duration: 0.5, ease: 'power3.inOut' }, at);
      cut(cards[i - 1], at + 0.5, false);
      ft(inCard(cards[i - 1], '[data-edition-copy]'), { xPercent: 0 }, { xPercent: -30, duration: 0.3, ease: 'power2.in' }, at);
      // carte entrante : position de départ = position d'attente précédente
      const waitX = i === 1 ? 110 : 78;
      ft(cards[i], { xPercent: waitX, scale: 0.86 }, { xPercent: 0, scale: 1, duration: 0.5, ease: 'power3.inOut' }, at);
      ft(cards[i], { clipPath: SIDE }, { clipPath: FULL, duration: 0.4, ease: 'power3.inOut' }, at + 0.3);
      cam(cams[i], { scale: 1.45 }, { scale: 1.1 }, at + 0.25, 0.7, 'power2.out');
      cam(cams[i], { scale: 1.1 }, { scale: 1.28, panX: i % 2 ? 0.6 : -0.6, panY: -0.2 }, at + 0.95, STEP - 0.95);
      if (cards[i + 1]) ft(cards[i + 1], { xPercent: 150, scale: 0.86 }, { xPercent: 78, scale: 0.86, duration: 0.5, ease: 'power3.inOut' }, at + 0.15);
      read(i, at + 0.7);
    }

    // ---- Final : révélation verticale « tous les salons » ----
    const fin = T0 + cards.length * STEP;
    ft(end, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.inOut' }, fin);
    ft(q('[data-edition-end-line]'), { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power3.out' }, fin + 0.3);
    labels.current.push(fin + 0.6);

    // Beats = les lectures d'édition (le dernier label tombe sur la fin de scène, déjà un beat).
    beat(...labels.current.slice(0, -1));

    toScrollRef.current = toScroll;
    totalRef.current = T0 + L;
    return () => {
      heading.revert();
      titles.forEach((t) => t.revert());
      toScrollRef.current = null;
    };
  });

  /** Flèches : sautent à l'édition précédente / suivante dans la timeline. */
  const step = (dir: -1 | 1) => {
    const toScroll = toScrollRef.current;
    if (!toScroll) {
      scrollTo('#upcoming');
      return;
    }
    const total = totalRef.current || 1;
    // instant de timeline (en écrans) → position de scroll exacte
    // mêmes points que les beats (donc que les repères de snap) : chaque édition lue, puis la fin
    const points = [...labels.current.slice(0, -1), total].map((t) => toScroll(t));
    const y = window.scrollY;
    const next = dir > 0 ? points.find((p) => p > y + 8) : [...points].reverse().find((p) => p < y - 8);
    scrollTo(next ?? toScroll(dir > 0 ? total : 0), { duration: 1.2 });
  };

  return (
    <section ref={root} id="upcoming" aria-label="Prochaines éditions" className="scene relative" style={sceneStyle(LEN)}>
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

        {EDITIONS.map((e, i) => (
          <article key={e.title} data-edition data-cursor="view" style={{ zIndex: 3 + i }} className="scene-panel absolute inset-0 overflow-hidden bg-[#0b1324] text-white">
            <CameraImage image={e.image} alt={e.title} eager={i === 0} />
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
        <div data-edition-end style={{ zIndex: 6 }} className="scene-panel absolute inset-0 bg-[#1e3a8a] text-white flex items-center px-6">
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
