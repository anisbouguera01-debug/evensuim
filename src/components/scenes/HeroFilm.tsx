import React, { useRef } from 'react';
import { Award, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { gsap, SplitText, useGSAP, offsetWithin, prefersReducedMotion } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
import { CameraImage } from '../motion/CameraImage';

interface Props {
  onScrollTo: (id: string) => void;
}

const STATEMENT = "Nous transformons vos projets d'entreprise en expériences mémorables et immersives de grande envergure.";

/** Partie fixe de la scène, en écrans de scroll. */
const LEN = { wide: 3.4, narrow: 3.6 };

/**
 * SCÈNE 1 — CAMERA PUSH (pas d'entrée : la scène est déjà à l'écran)
 * Temps exprimés en écrans de scroll (t = 1 ⇔ 1 hauteur d'écran).
 *  0.00–0.30  plan large : la composition respire
 *  0.30–1.00  travelling avant : la carte logo vient au centre, textes et formes sortent du cadre
 *  1.00–1.70  la caméra traverse le symbole (logo entier mis à l'échelle, jamais modifié) ;
 *             la photo d'événement s'ouvre depuis le centre
 *  1.70–2.60  typographie cinétique EVENSIUM, puis la caméra traverse le mot
 *  2.60–3.40  manifeste + CTA, la caméra continue d'avancer dans la photo
 */
export const HeroFilm: React.FC<Props> = ({ onScrollTo }) => {
  const root = useRef<HTMLElement>(null);

  // Intro au chargement (temps réel, hors scroll) : n'anime que des éléments
  // que la timeline de scroll ne touche jamais (*-inner, data-hero-intro, data-hero-card).
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const intro = gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(q('[data-shape-inner]'), { opacity: 0, scale: 0.7, xPercent: -30 }, { opacity: 1, scale: 1, xPercent: 0, duration: 1.6, stagger: 0.08, clearProps: 'opacity,scale,transform' })
        .fromTo(q('[data-hero-card]'), { yPercent: 12, scale: 0.9, opacity: 0 }, { yPercent: 0, scale: 1, opacity: 1, duration: 1.3, clearProps: 'all' }, 0.15)
        .fromTo(q('[data-hero-intro]'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08, clearProps: 'all' }, 0.3)
        .fromTo(q('[data-hero-float-inner]'), { yPercent: 30, opacity: 0, scale: 0.9 }, { yPercent: 0, opacity: 1, scale: 1, duration: 1, clearProps: 'all' }, 0.8);
      // Dès que le scroll commence, l'intro (temps réel) est terminée d'un coup : seule la position
      // de scroll pilote ensuite l'image.
      const finish = () => {
        if (window.scrollY > 2) intro.progress(1);
      };
      window.addEventListener('scroll', finish, { passive: true });
      return () => window.removeEventListener('scroll', finish);
    },
    { scope: root },
  );

  useScene(
    root,
    LEN,
    ({ stage, q, wide, tl, ft, cut, cam, beat }) => {
      const camera = q('[data-compo]')[0];
      const card = q('[data-hero-stage]')[0];
      const word = SplitText.create(q('[data-kinetic-word]')[0], { type: 'words,chars', mask: 'chars' });
      const manifesto = SplitText.create(q('[data-manifesto-text]')[0], { type: 'words', mask: 'words' });

      // Centre de la carte dans la composition (offsets de layout, indépendants des transforms),
      // recalculé à chaque refresh : la cible reste exacte quelle que soit la taille de la fenêtre.
      const target = () => {
        const b = offsetWithin(card, camera);
        return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
      };
      const origin = () => `${target().x}px ${target().y}px`;
      const push = wide ? 1.55 : 1.35;

      // ---- CAMÉRA (composition) : deux plans enchaînés, valeurs explicites ----
      ft(camera, { x: 0, y: 0, scale: 1, transformOrigin: origin }, { x: 0, y: 0, scale: 1.04, transformOrigin: origin, duration: 0.3 }, 0);
      ft(
        camera,
        { x: 0, y: 0, scale: 1.04, transformOrigin: origin },
        {
          x: () => stage.clientWidth / 2 - target().x,
          y: () => stage.clientHeight / 2 - target().y,
          scale: push,
          transformOrigin: origin,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        0.3,
      );
      ft(q('[data-scroll-cue]'), { autoAlpha: 1, yPercent: 0 }, { autoAlpha: 0, yPercent: 40, duration: 0.15 }, 0);

      // ---- CONTENU : sort du cadre (valeurs relatives à l'élément / à la fenêtre) ----
      ft(
        q('[data-hero-item]'),
        { xPercent: 0, yPercent: 0, opacity: 1, filter: 'blur(0px)' },
        wide
          ? { xPercent: -40, yPercent: 0, opacity: 0, filter: 'blur(10px)', stagger: 0.04, duration: 0.45, ease: 'power2.in' }
          : { xPercent: 0, yPercent: -120, opacity: 0, filter: 'blur(8px)', stagger: 0.03, duration: 0.45, ease: 'power2.in' },
        0.3,
      );

      // ---- PREMIER PLAN : chaque forme à sa vitesse (en % de sa propre taille) ----
      ft(q('[data-shape="blue"]'), { xPercent: 0, yPercent: 0, scale: 1, rotate: 0 }, { xPercent: -70, yPercent: -60, scale: 1.6, rotate: 22, duration: 0.7, ease: 'power2.in' }, 0.3);
      ft(q('[data-shape="mint"]'), { xPercent: 0, scale: 1 }, { xPercent: -120, scale: 1.4, duration: 0.6, ease: 'power2.in' }, 0.35);
      ft(q('[data-shape="purple"]'), { xPercent: 0, yPercent: 0, scale: 1, rotate: 0 }, { xPercent: -30, yPercent: 110, scale: 1.7, rotate: -20, duration: 0.7, ease: 'power2.in' }, 0.3);
      ft(q('[data-shape="mesh"]'), { scale: 1, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 0.5 }, 0.3);
      ft(q('[data-hero-float]'), { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1 }, { xPercent: 160, yPercent: 60, rotate: 18, opacity: 0, duration: 0.45, ease: 'power2.in' }, 0.32);
      ft(q('[data-hero-caption]'), { yPercent: 0, opacity: 1 }, { yPercent: 60, opacity: 0, duration: 0.25 }, 0.4);
      ft(q('[data-hero-glow]'), { scale: 1, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.3 }, 0.5);
      ft(q('[data-hero-panel]'), { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 0, duration: 0.25 }, 0.75);

      // ---- TRAVERSÉE DU SYMBOLE (le logo entier, comme un bloc) ----
      // Agrandissement plafonné (×12) : au-delà, la couche à rasteriser devient énorme pour un gain visuel nul,
      // la photo s'ouvre déjà par-dessus.
      ft(q('[data-hero-mark]'), { scale: 1, rotate: 0 }, { scale: 12, rotate: 90, duration: 0.7, ease: 'power3.in' }, 1.0);
      ft(q('[data-photo]'), { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(80% at 50% 50%)', duration: 0.45, ease: 'power2.inOut' }, 1.2);
      cam(q('[data-photo] [data-cam]'), { scale: 1.6 }, { scale: 1.12 }, 1.2, 0.7, 'power2.out');
      cam(q('[data-photo] [data-cam]'), { scale: 1.12 }, { scale: 1.38, panX: -0.6, panY: -0.4 }, 1.9, 1.5);
      // (le halo « mesh » a déjà son opacité animée : il n'est pas repris ici, une seule source par propriété)
      cut([camera, ...q('[data-shape="blue"], [data-shape="mint"], [data-shape="purple"]')], 1.7, false);

      // ---- TYPO CINÉTIQUE ----
      ft(q('[data-photo-shade]'), { opacity: 0 }, { opacity: 0.6, duration: 0.35 }, 1.65);
      cut(q('[data-kinetic]'), 1.7);
      ft(word.chars, { yPercent: 120, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.03, duration: 0.2, ease: 'power3.out' }, 1.75);
      ft(q('[data-kinetic-word]'), { scale: 1, opacity: 1 }, { scale: wide ? 9 : 7, opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.2);
      ft(q('[data-kinetic-label]'), { yPercent: 0, opacity: 1 }, { yPercent: -150, opacity: 0, duration: 0.2 }, 2.2);

      // ---- MANIFESTE + CTA ----
      cut(q('[data-manifesto]'), 2.6);
      ft(manifesto.words, { yPercent: 100 }, { yPercent: 0, stagger: 0.015, duration: 0.2, ease: 'power3.out' }, 2.62);
      ft(q('[data-manifesto-cta]'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.2, ease: 'power3.out' }, 3.0);

      // Beats : cadrage final du mot EVENSIUM, puis (fin de scène) manifeste + CTA.
      beat(2.1);

      // Dès que la caméra avance, les animations CSS infinies (halo, indicateur de scroll), déjà
      // invisibles, sont coupées : sinon elles forcent un repaint permanent derrière le logo agrandi.
      const quiet = () => stage.classList.toggle('is-moving', tl.time() > 0.25);
      tl.eventCallback('onUpdate', quiet);
      quiet();

      return () => {
        tl.eventCallback('onUpdate', null);
        stage.classList.remove('is-moving');
        word.revert();
        manifesto.revert();
      };
    },
    { entry: false },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="scene relative" style={sceneStyle(LEN)}>
      <h1 id="hero-title" className="sr-only">
        Evensium — gestion d'événements professionnels et salons en Algérie
      </h1>

      <div className="scene-stage relative overflow-hidden bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-white">
        {/* COUCHE 1 — photo d'événement (ouverte depuis le centre du logo) */}
        <div data-photo className="reduce-hide absolute inset-0 z-[1] overflow-hidden bg-[#0f172a]" aria-hidden="true">
          <CameraImage image="evensiumHeroBg" eager />
          <div data-photo-shade className="absolute inset-0 bg-gradient-to-t from-[#0b1324] via-[#0b1324]/55 to-[#0b1324]/20 opacity-0" />
        </div>

        {/* COUCHE 2 — formes de premier plan (bleu nuit, bleu ciel, violet) */}
        <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
          <div data-shape="blue" className="absolute -top-32 -left-40">
            <div data-shape-inner className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] bg-[#1e3a8a] rounded-[80px] sm:rounded-[120px] rotate-[32deg] opacity-[0.85] shadow-xl" />
          </div>
          <div data-shape="mint" className="absolute top-[48%] -left-36">
            <div data-shape-inner className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-[#bae6fd] rounded-[60px] sm:rounded-[90px] rotate-[35deg] opacity-[0.95] shadow-lg" />
          </div>
          <div data-shape="purple" className="absolute -bottom-36 -left-12">
            <div data-shape-inner className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-[#a78bfa] to-[#7c3aed] rounded-[70px] sm:rounded-[100px] rotate-[38deg] opacity-[0.85] shadow-lg" />
          </div>
          <div data-shape="mesh" className="absolute top-10 right-0">
            <div data-shape-inner className="w-[500px] h-[500px] bg-[#e0f2fe] rounded-full filter blur-[100px] opacity-65" />
          </div>
        </div>

        {/* COUCHE 3 — composition d'origine (plan large) */}
        <div data-compo className="relative z-[3] h-full flex items-center px-6 pt-24 pb-10 lg:pt-28">
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
                      <div data-hero-mark>
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
          <div data-kinetic-word className="text-white font-black uppercase tracking-tighter leading-[0.85] text-[19vw] lg:text-[16vw]">
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
