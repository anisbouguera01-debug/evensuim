import React, { useRef } from 'react';
import { Award, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { IMAGES } from '../../assets/images';
import { gsap, SplitText, useGSAP, offsetWithin, prefersReducedMotion } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';

interface Props {
  onScrollTo: (id: string) => void;
}

const STATEMENT = "Nous transformons vos projets d'entreprise en expériences mémorables et immersives de grande envergure.";

/**
 * SCÈNE 1 — CAMERA PUSH (≈ 320 % de scroll, pinnée, mobile compris)
 *  0 → 1    plan large : la composition d'origine respire
 *  1 → 3.2  travelling avant vers la carte logo ; textes et formes passent hors champ
 *  3.2→5.4  la caméra traverse le symbole (logo entier, mis à l'échelle et tourné, jamais modifié) ;
 *           une photo d'événement s'ouvre depuis son centre et devient le décor
 *  5.4→7.6  typographie cinétique : EVENSIUM se dévoile lettre par lettre puis la caméra le traverse
 *  7.6→10   manifeste + CTA pendant que la photo continue son mouvement
 */
export const HeroFilm: React.FC<Props> = ({ onScrollTo }) => {
  const root = useRef<HTMLElement>(null);

  // Intro au chargement (hors scroll) : la composition se pose.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(q('[data-shape-inner]'), { opacity: 0, scale: 0.7, xPercent: -30, duration: 1.6, stagger: 0.08 })
        .from(q('[data-hero-card]'), { y: 70, scale: 0.9, opacity: 0, duration: 1.3 }, 0.15)
        .from(q('[data-hero-intro]'), { y: 34, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08 }, 0.3)
        .from(q('[data-hero-float-inner]'), { y: 30, opacity: 0, scale: 0.9, duration: 1 }, 0.8);
    },
    { scope: root },
  );

  useScene(root, ({ stage, q, wide, timeline }) => {
    const compo = q('[data-compo]')[0];
    const card = q('[data-hero-stage]')[0];
    const word = SplitText.create(q('[data-kinetic-word]')[0], { type: 'words,chars', mask: 'chars' });
    const manifesto = SplitText.create(q('[data-manifesto-text]')[0], { type: 'words' });

    // Point de la carte à amener au centre de l'écran (sans tenir compte des transforms).
    const target = () => {
      const box = offsetWithin(card, compo);
      return { ox: box.x + box.width / 2, oy: box.y + box.height / 2 };
    };
    const vw = (n: number) => () => (window.innerWidth * n) / 100;
    const vh = (n: number) => () => (stage.clientHeight * n) / 100;

    gsap.set(q('[data-photo]'), { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(q('[data-kinetic]'), { autoAlpha: 0 });
    gsap.set(q('[data-manifesto]'), { autoAlpha: 0 });

    const tl = timeline(320);
    tl
      // PLAN LARGE — la scène respire
      .to(compo, { scale: 1.03, duration: 1, transformOrigin: () => `${target().ox}px ${target().oy}px` }, 0)
      .to(q('[data-scroll-cue]'), { autoAlpha: 0, y: 20, duration: 0.5 }, 0)

      // TRAVELLING AVANT — la carte vient au centre, le cadre se resserre
      .to(
        compo,
        {
          x: () => stage.clientWidth / 2 - target().ox,
          y: () => stage.clientHeight / 2 - target().oy,
          scale: wide ? 1.55 : 1.35,
          duration: 2.2,
          ease: 'power2.inOut',
        },
        1,
      )
      .to(
        q('[data-hero-item]'),
        wide
          ? { x: vw(-30), opacity: 0, filter: 'blur(10px)', stagger: 0.12, duration: 1.3, ease: 'power2.in' }
          : { y: vh(-45), opacity: 0, filter: 'blur(8px)', stagger: 0.08, duration: 1.3, ease: 'power2.in' },
        1,
      )
      // Premier plan qui passe devant l'objectif, chaque forme à sa vitesse
      .to(q('[data-shape="blue"]'), { x: vw(-40), y: vh(-35), scale: 1.6, rotate: 22, duration: 2.2, ease: 'power2.in' }, 1)
      .to(q('[data-shape="mint"]'), { x: vw(-60), scale: 1.4, duration: 2, ease: 'power2.in' }, 1.2)
      .to(q('[data-shape="purple"]'), { x: vw(-15), y: vh(60), scale: 1.7, rotate: -20, duration: 2.2, ease: 'power2.in' }, 1)
      .to(q('[data-shape="mesh"]'), { scale: 2.2, opacity: 0, duration: 1.6 }, 1)
      .to(q('[data-hero-float]'), { x: vw(45), y: vh(10), rotate: 18, opacity: 0, duration: 1.4, ease: 'power2.in' }, 1.1)
      .to(q('[data-hero-caption]'), { y: 30, opacity: 0, duration: 0.8 }, 1.4)
      .to(q('[data-hero-glow]'), { scale: 1.6, opacity: 0, duration: 1 }, 1.6)
      .to(q('[data-hero-panel]'), { opacity: 0, scale: 1.08, duration: 0.8 }, 2.4)

      // TRAVERSÉE DU SYMBOLE — le logo entier grossit et pivote, on passe au travers
      .to(q('[data-hero-mark]'), { scale: 26, rotate: 90, duration: 2.2, ease: 'power3.in' }, 3.2)
      .to(q('[data-photo]'), { clipPath: 'circle(80% at 50% 50%)', duration: 1.4, ease: 'power2.inOut' }, 3.9)
      .fromTo(q('[data-photo-img]'), { scale: 1.7 }, { scale: 1.2, duration: 2, ease: 'power2.out' }, 3.9)
      .set([compo, ...q('[data-shape]')], { autoAlpha: 0 }, 5.4)

      // TYPO CINÉTIQUE — EVENSIUM se dévoile puis la caméra le traverse
      .to(q('[data-photo-shade]'), { opacity: 0.6, duration: 1.2 }, 5.2)
      .set(q('[data-kinetic]'), { autoAlpha: 1 }, 5.3)
      .from(word.chars, { yPercent: 120, rotate: 8, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, 5.4)
      .to(q('[data-kinetic-word]'), { scale: wide ? 9 : 7, opacity: 0, duration: 1.2, ease: 'power2.in' }, 6.6)
      .to(q('[data-kinetic-label]'), { y: -40, opacity: 0, duration: 0.6 }, 6.6)

      // La photo continue son mouvement (combiné : scale + x + y)
      .to(q('[data-photo-img]'), { scale: 1.38, xPercent: -6, yPercent: -3, duration: 4.6 }, 5.4)

      // MANIFESTE + CTA
      .set(q('[data-manifesto]'), { autoAlpha: 1 }, 7.5)
      .from(manifesto.words, { y: 70, opacity: 0, rotate: 3, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 7.6)
      .from(q('[data-manifesto-cta]'), { y: 40, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, 8.6)
      .to({}, { duration: 0.6 }, 9.4);

    return () => {
      word.revert();
      manifesto.revert();
    };
  });

  return (
    <section ref={root} aria-labelledby="hero-title" className="scene relative">
      <h1 id="hero-title" className="sr-only">
        Evensium — gestion d'événements professionnels et salons en Algérie
      </h1>

      <div className="scene-stage relative overflow-hidden bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-white">
        {/* COUCHE 1 — photo d'événement (ouverte depuis le centre du logo) */}
        <div data-photo className="reduce-hide absolute inset-0 z-[1] overflow-hidden bg-[#0f172a]" aria-hidden="true">
          <img
            data-photo-img
            src={IMAGES.evensiumHeroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            decoding="async"
          />
          <div data-photo-shade className="absolute inset-0 bg-gradient-to-t from-[#0b1324] via-[#0b1324]/55 to-[#0b1324]/20 opacity-0" />
        </div>

        {/* COUCHE 2 — formes de premier plan (bleu nuit, bleu ciel, violet) */}
        <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
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

        {/* COUCHE 3 — composition d'origine (plan large) */}
        <div data-compo className="relative z-[3] min-h-[100svh] flex items-center px-6 pt-24 pb-10 lg:pt-28 will-change-transform">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
            {/* Carte symbole : la cible de la caméra */}
            <div className="lg:col-span-5 relative">
              <div data-hero-stage className="relative w-full max-w-[220px] sm:max-w-xs lg:max-w-md mx-auto">
                <div data-hero-glow className="absolute -inset-4">
                  <div className="w-full h-full bg-gradient-to-tr from-sky-400/20 via-[#1e3a8a]/10 to-purple-400/20 rounded-[40px] rotate-[-6deg] blur-xl animate-pulse" />
                </div>
                <div data-hero-card className="relative h-[24svh] min-h-[170px] lg:h-auto lg:min-h-[450px] flex flex-col items-center justify-center text-center group">
                  <div data-hero-panel className="absolute inset-0 rounded-[28px] lg:rounded-[32px] border-4 border-white shadow-2xl bg-gradient-to-br from-white via-slate-50 to-sky-50/50" />
                  <div className="relative p-6 lg:p-12 flex flex-col items-center justify-center h-full w-full">
                    {/* Le logo d'origine, déplacé comme un bloc par la caméra */}
                    <div className="my-auto scale-[0.55] lg:scale-100">
                      <div data-hero-mark className="will-change-transform">
                        <EvensiumLogo size={180} showText={false} className="mx-auto filter drop-shadow-xl" />
                      </div>
                    </div>
                    <div data-hero-caption className="hidden lg:block mt-8 space-y-2">
                      <span className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Symbole d'excellence
                      </span>
                      <p className="text-slate-400 text-xs font-medium">Gestion d'événements de classe mondiale</p>
                    </div>
                  </div>
                </div>
                <div data-hero-float className="absolute -bottom-5 -right-10 lg:-bottom-6 lg:-right-6">
                  <div data-hero-float-inner className="bg-white p-3 lg:p-4 rounded-2xl shadow-xl border border-sky-100 flex items-center gap-3">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] lg:text-xs text-slate-400 font-bold uppercase">Expérience</span>
                      <span className="block text-xs lg:text-sm font-black text-slate-800 whitespace-nowrap">Événements d'Élite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne texte */}
            <div className="lg:col-span-7 text-left space-y-4 lg:space-y-6 lg:pl-8">
              <div data-hero-item>
                <span data-hero-intro className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#bae6fd] text-[#0369a1] border border-sky-200 shadow-sm uppercase tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Présentation Officielle
                </span>
              </div>
              <div data-hero-item className="pt-1 lg:pt-2">
                <div data-hero-intro>
                  <EvensiumLogo size={80} textColorClass="text-5xl sm:text-7xl font-black tracking-tight text-[#0f172a] lowercase" />
                </div>
              </div>
              <div data-hero-item>
                <p data-hero-intro className="text-slate-600 text-[15px] sm:text-lg max-w-xl leading-relaxed">
                  <strong>Gestion d'événements professionnels et salons.</strong> {STATEMENT}
                </p>
              </div>
              <div data-hero-item>
                <div data-hero-intro className="pt-2 lg:pt-4 flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <button
                    onClick={() => onScrollTo('about')}
                    className="btn-cine bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-3.5 lg:py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Qui Sommes-Nous ?</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => onScrollTo('services')}
                    className="btn-cine bg-white hover:bg-sky-50 text-[#1e3a8a] border border-sky-200 px-8 py-3.5 lg:py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Découvrir nos services</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
              <div data-hero-item className="[@media(max-height:740px)]:hidden lg:[@media(max-height:740px)]:block">
                <div data-hero-intro className="pt-4 lg:pt-8 grid grid-cols-2 gap-4 border-t border-sky-100 max-w-lg">
                  <div>
                    <span className="block text-2xl font-black text-[#0284c7]">360°</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gestion Clé en Main</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-[#0284c7]">100%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Engagement Réussite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COUCHE 4 — typographie cinétique */}
        <div data-kinetic className="reduce-hide absolute inset-0 z-[4] flex flex-col items-center justify-center pointer-events-none" aria-hidden="true">
          <span data-kinetic-label className="mb-4 text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-sky-200">
            Salons • Congrès • Événements
          </span>
          <div data-kinetic-word className="text-white font-black uppercase tracking-tighter leading-[0.85] text-[19vw] lg:text-[16vw] will-change-transform">
            Evensium
          </div>
        </div>

        {/* COUCHE 5 — manifeste + CTA */}
        <div data-manifesto className="reduce-hide absolute inset-0 z-[5] flex items-end lg:items-center px-6 pb-[12svh] lg:pb-0">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            <p data-manifesto-text className="text-white font-black tracking-tight leading-[1.04] text-[8.6vw] sm:text-[6vw] lg:text-[4.4vw] max-w-5xl" aria-hidden="true">
              {STATEMENT}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                data-manifesto-cta
                onClick={() => onScrollTo('about')}
                className="btn-cine bg-white text-[#1e3a8a] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 group"
              >
                Qui sommes-nous ?
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                data-manifesto-cta
                onClick={() => onScrollTo('contact')}
                className="btn-cine border border-white/50 text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-sm flex items-center justify-center gap-2"
              >
                Lancer un projet
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          data-scroll-cue
          className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 cursor-pointer z-[6]"
          onClick={() => onScrollTo('about')}
          aria-label="Faire défiler vers la présentation"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">Faites défiler</span>
          <span className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <span className="w-1 h-2 bg-[#0284c7] rounded-full animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
};
