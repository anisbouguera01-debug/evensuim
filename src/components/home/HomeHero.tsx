import React, { useRef } from 'react';
import { Award, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { EvensiumLogo, PILL_DIRECTIONS } from '../EvensiumLogo';
import { Magnetic } from '../motion/Magnetic';
import { StatValue, countTween } from '../motion/StatsCounter';
import { gsap, SplitText, useGSAP, MQ, SCRUB, offsetWithin, prefersReducedMotion } from '../../animations/gsap';

interface HomeHeroProps {
  onScrollTo: (id: string) => void;
}

const STATEMENT = "Nous transformons vos projets d'entreprise en expériences mémorables et immersives de grande envergure.";

/**
 * HERO — « la caméra traverse le X ».
 * Desktop : section pinnée ; la carte logo glisse au centre, le symbole grossit ×9 et
 * ses quatre pilules s'écartent le long de leurs diagonales : on passe à travers le logo,
 * puis la phrase-manifeste s'écrit mot par mot avant l'arrivée de « Qui sommes-nous ? ».
 */
export const HomeHero: React.FC<HomeHeroProps> = ({ onScrollTo }) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);

      // ---------- 0 · Intro au chargement : le logo se construit ----------
      if (!prefersReducedMotion()) {
        const wordmark = section.querySelector<HTMLElement>('[data-hero-wordmark] [data-logo-wordmark]');
        const wordSplit = wordmark ? SplitText.create(wordmark, { type: 'chars', mask: 'chars' }) : null;
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .from(q('[data-shape-inner]'), {
            opacity: 0,
            scale: 0.6,
            rotate: (i: number) => [-20, 18, -16, 0][i] ?? 0,
            xPercent: -40,
            duration: 1.6,
            stagger: 0.08,
          })
          .from(q('[data-hero-card]'), { y: 80, scale: 0.92, opacity: 0, duration: 1.4 }, 0.15)
          .from(
            q('[data-hero-card] [data-pill-inner]'),
            {
              x: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pillInner as keyof typeof PILL_DIRECTIONS].x * 40,
              y: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pillInner as keyof typeof PILL_DIRECTIONS].y * 40,
              opacity: 0,
              duration: 1.3,
              stagger: 0.08,
            },
            0.35,
          )
          .from(q('[data-hero-intro]'), { y: 30, opacity: 0, filter: 'blur(8px)', duration: 1, ease: 'power3.out', stagger: 0.09 }, 0.3)
          .from(q('[data-hero-float-inner]'), { y: 30, opacity: 0, scale: 0.9, duration: 1 }, 0.9)
          .from(q('[data-hero-wordmark] [data-logo-mark]'), { rotate: -90, scale: 0.4, opacity: 0, duration: 1.2 }, 0.4);
        q('[data-hero-item] [data-count]').forEach((el: HTMLElement, i: number) => {
          intro.add(countTween(el, { duration: 1.6, ease: 'power3.out' }), 0.9 + i * 0.12);
        });
        if (wordSplit) intro.from(wordSplit.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.45);
      }

      const mm = gsap.matchMedia();

      // ---------- 1 · Desktop : scène pinnée, caméra ----------
      mm.add(MQ.desktop, () => {
        const stage = q('[data-hero-stage]')[0] as HTMLElement;
        const centre = () => {
          const box = offsetWithin(stage, section);
          return {
            x: section.clientWidth / 2 - (box.x + box.width / 2),
            y: section.clientHeight / 2 - (box.y + box.height / 2),
          };
        };
        const statementSplit = SplitText.create(q('[data-hero-statement] p')[0] as HTMLElement, { type: 'words' });
        const vw = () => window.innerWidth / 100;
        const vh = () => window.innerHeight / 100;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: SCRUB,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl
          // La colonne texte s'efface vers le haut
          .to(q('[data-hero-item]'), { y: -120, opacity: 0, filter: 'blur(10px)', stagger: 0.03, duration: 0.18, ease: 'power1.in' }, 0)
          .to(q('[data-scroll-cue]'), { opacity: 0, y: 20, duration: 0.08 }, 0)
          // Les formes s'écartent à des vitesses différentes : profondeur
          .to(q('[data-shape="blue"]'), { x: () => -30 * vw(), y: () => -25 * vh(), rotate: 18, duration: 0.55 }, 0)
          .to(q('[data-shape="mint"]'), { x: () => -45 * vw(), rotate: 10, duration: 0.5 }, 0)
          .to(q('[data-shape="purple"]'), { x: () => -10 * vw(), y: () => 45 * vh(), rotate: -14, duration: 0.55 }, 0)
          .to(q('[data-shape="mesh"]'), { scale: 1.6, opacity: 0, duration: 0.5 }, 0)
          // La carte glisse au centre et s'approche
          .to(stage, { x: () => centre().x, y: () => centre().y, scale: 1.12, duration: 0.4, ease: 'power1.inOut' }, 0.05)
          .to(q('[data-hero-float]'), { x: 80, y: 60, opacity: 0, duration: 0.2 }, 0.05)
          .to(q('[data-hero-caption]'), { opacity: 0, y: 20, duration: 0.15 }, 0.1)
          .to(q('[data-hero-glow]'), { opacity: 0, scale: 1.3, duration: 0.25 }, 0.2)
          // Le panneau blanc se dissout : il ne reste que le symbole
          .to(q('[data-hero-panel]'), { opacity: 0, duration: 0.2 }, 0.35)
          // On traverse le X
          .to(q('[data-hero-mark]'), { scale: 9, duration: 0.5, ease: 'power2.in' }, 0.4)
          .to(
            q('[data-hero-mark] [data-pill]'),
            {
              x: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].x * 140,
              y: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].y * 140,
              duration: 0.5,
              ease: 'power2.in',
            },
            0.4,
          )
          // Phrase-manifeste au centre
          .set(q('[data-hero-statement]'), { visibility: 'visible' }, 0.56)
          .fromTo(
            statementSplit.words,
            { opacity: 0.08, y: 24, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.012, duration: 0.14, ease: 'power1.out' },
            0.58,
          )
          .to(q('[data-hero-statement] p'), { y: -40, duration: 0.08 }, 0.92);

        return () => statementSplit.revert();
      });

      // ---------- 1bis · Mobile / tablette : parallax sans pin ----------
      mm.add(MQ.mobile, () => {
        const st = { trigger: section, start: 'top top', end: 'bottom top', scrub: SCRUB };
        gsap.to(q('[data-hero-item]'), { y: -60, opacity: 0.2, stagger: 0.04, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-shape="blue"]'), { yPercent: -40, rotate: 12, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-shape="purple"]'), { yPercent: 30, rotate: -10, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-shape="mint"]'), { xPercent: -30, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-stage]'), {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: q('[data-hero-stage]')[0], start: 'top 70%', end: 'bottom top', scrub: SCRUB },
        });
        gsap.to(q('[data-hero-mark] [data-pill]'), {
          x: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].x * 10,
          y: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].y * 10,
          ease: 'none',
          scrollTrigger: { trigger: q('[data-hero-stage]')[0], start: 'top 70%', end: 'bottom top', scrub: SCRUB },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="hero-section relative min-h-[92vh] lg:min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-white px-6 py-20 lg:py-0 border-b border-sky-100"
    >
      <h1 id="hero-title" className="sr-only">
        Evensium — gestion d'événements professionnels et salons en Algérie
      </h1>

      {/* Formes géométriques (bleu nuit, bleu ciel, violet) — chaque forme a sa propre profondeur */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div data-shape="blue" className="absolute -top-32 -left-40 will-change-transform">
          <div data-shape-inner className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] bg-[#1e3a8a] rounded-[80px] sm:rounded-[120px] rotate-[32deg] opacity-[0.85] shadow-xl" />
        </div>
        <div data-shape="mint" className="absolute top-[48%] -left-36 will-change-transform">
          <div data-shape-inner className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-[#bae6fd] rounded-[60px] sm:rounded-[90px] rotate-[35deg] opacity-[0.95] shadow-lg" />
        </div>
        <div data-shape="purple" className="absolute -bottom-36 -left-12 will-change-transform">
          <div data-shape-inner className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-[#a78bfa] to-[#7c3aed] rounded-[70px] sm:rounded-[100px] rotate-[38deg] opacity-[0.85] shadow-lg" />
        </div>
        <div data-shape="mesh" className="absolute top-10 right-0">
          <div data-shape-inner className="w-[500px] h-[500px] bg-[#e0f2fe] rounded-full filter blur-[100px] opacity-65" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Colonne gauche : carte symbole — devient le « point de caméra » */}
        <div className="lg:col-span-5 relative order-last lg:order-first">
          <div data-hero-stage className="relative w-full max-w-md mx-auto will-change-transform">
            <div data-hero-glow className="absolute -inset-4">
              <div className="w-full h-full bg-gradient-to-tr from-sky-400/20 via-[#1e3a8a]/10 to-purple-400/20 rounded-[40px] rotate-[-6deg] blur-xl animate-pulse" />
            </div>
            <div data-hero-card className="relative min-h-[450px] flex flex-col items-center justify-center text-center group">
              {/* Panneau blanc séparé du symbole pour pouvoir le dissoudre */}
              <div
                data-hero-panel
                className="absolute inset-0 rounded-[32px] border-4 border-white shadow-2xl bg-gradient-to-br from-white via-slate-50 to-sky-50/50"
              />
              <div className="relative p-12 flex flex-col items-center justify-center min-h-[450px] w-full">
                <div className="transform group-hover:scale-105 transition-transform duration-500 my-auto">
                  <div data-hero-mark className="will-change-transform">
                    <EvensiumLogo size={180} showText={false} animatable className="mx-auto filter drop-shadow-xl" />
                  </div>
                </div>
                <div data-hero-caption className="mt-8 space-y-2">
                  <span className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Symbole d'excellence
                  </span>
                  <p className="text-slate-400 text-xs font-medium">Gestion d'événements de classe mondiale</p>
                </div>
              </div>
            </div>

            {/* Badge flottant */}
            <div data-hero-float className="absolute -bottom-6 -right-6">
              <div
                data-hero-float-inner
                className="bg-white p-4 rounded-2xl shadow-xl border border-sky-100 flex items-center gap-3"
              >
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-bold uppercase">Expérience</span>
                <span className="block text-sm font-black text-slate-800">Événements d'Élite</span>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : texte */}
        <div className="lg:col-span-7 text-left space-y-6 lg:pl-8">
          <div data-hero-item>
            <span
              data-hero-intro
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#bae6fd] text-[#0369a1] border border-sky-200 shadow-sm uppercase tracking-wider font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Présentation Officielle
            </span>
          </div>

          <div data-hero-item data-hero-wordmark className="pt-2">
            <EvensiumLogo
              size={80}
              textColorClass="text-5xl sm:text-7xl font-black tracking-tight text-[#0f172a] lowercase"
            />
          </div>

          <div data-hero-item>
            <p data-hero-intro className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              <strong>Gestion d'événements professionnels et salons.</strong> {STATEMENT}
            </p>
          </div>

          <div data-hero-item>
            <div data-hero-intro className="pt-4 flex flex-col sm:flex-row gap-4">
              <Magnetic className="w-full sm:w-auto">
                <button
                  onClick={() => onScrollTo('about')}
                  className="btn-cine w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Qui Sommes-Nous ?</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <button
                  onClick={() => onScrollTo('services')}
                  className="btn-cine w-full bg-white hover:bg-sky-50 text-[#1e3a8a] border border-sky-200 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Découvrir nos services</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </div>
          </div>

          <div data-hero-item>
            <div data-hero-intro className="pt-8 grid grid-cols-2 gap-4 border-t border-sky-100 max-w-lg">
              <div>
                <StatValue value="360°" className="block text-2xl font-black text-[#0284c7]" mode="external" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gestion Clé en Main</span>
              </div>
              <div>
                <StatValue value="100%" className="block text-2xl font-black text-[#0284c7]" mode="external" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Engagement Réussite</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phrase-manifeste (desktop) : apparaît quand on a traversé le X */}
      <div
        data-hero-statement
        aria-hidden="true"
        className="invisible hidden lg:flex absolute inset-0 z-20 items-center justify-center px-10 pointer-events-none"
      >
        <p className="max-w-5xl text-center text-[clamp(2rem,4.4vw,4.25rem)] leading-[1.08] font-black tracking-tight text-[#0f172a]">
          {STATEMENT}
        </p>
      </div>

      <button
        type="button"
        data-scroll-cue
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 cursor-pointer z-10"
        onClick={() => onScrollTo('about')}
        aria-label="Faire défiler vers la présentation"
      >
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">Faites défiler</span>
        <span className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1">
          <span className="w-1 h-2 bg-[#0284c7] rounded-full animate-bounce" />
        </span>
      </button>
    </section>
  );
};
