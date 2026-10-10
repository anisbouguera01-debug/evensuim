import React, { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { SplitText } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
import { CameraImage } from '../motion/CameraImage';

const LEN = { wide: 3.2, narrow: 3.8 };

/**
 * SCÈNE 2 — TRAVELLING LATÉRAL (entrée + partie fixe)
 * Temps en écrans de scroll. [0, 1] : la scène monte, le titre se compose, la caméra recule.
 * [1, 1 + L] : la piste défile de la première à la dernière image, chaque couche à sa vitesse ;
 * les photos panotent DANS leur cadre (pan borné : le bord de l'image n'apparaît jamais).
 */
export const AboutPanorama: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, LEN, ({ stage, q, wide, T0, L, ft, cam, beat }) => {
    const track = q('[data-track]')[0];
    // Distance réelle à parcourir (layout, sans transforms), recalculée à chaque refresh.
    const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
    const title = SplitText.create(q('[data-about-title]')[0], { type: 'words,chars', mask: 'chars' });
    const lead = SplitText.create(q('[data-about-lead]')[0], { type: 'words' });
    const END = T0 + L;

    // ---- ENTRÉE ----
    ft(q('[data-zoom]'), { scale: 1.12, transformOrigin: '0% 50%' }, { scale: 1, transformOrigin: '0% 50%', duration: 1, ease: 'power2.out' }, 0);
    ft(title.chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.025, duration: 0.35, ease: 'power3.out' }, 0.3);
    ft(q('[data-about-label]'), { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 }, 0.35);

    // ---- TRAVELLING (caméra = la piste) ----
    ft(track, { x: 0 }, { x: () => -distance(), duration: L - 0.3 }, T0);
    // Couches à vitesses différentes (valeurs relatives)
    ft(q('[data-about-title]'), { xPercent: 0 }, { xPercent: -30, duration: 1.2 }, T0);
    ft(q('[data-depth-frame="1"]'), { yPercent: 8, rotate: -3 }, { yPercent: -6, rotate: 1, duration: 1.4 }, T0 + 0.1);
    ft(q('[data-depth-frame="2"]'), { yPercent: -10, rotate: 4 }, { yPercent: 6, rotate: -1, duration: 1.4 }, T0 + 1.2);
    // Rotation portée uniquement par GSAP (45° de départ inclus) : une seule source de vérité.
    ft(q('[data-geo]'), { rotate: 45, yPercent: 40 }, { rotate: 225, yPercent: -60, duration: L }, T0);
    // Pan dans chaque photo, du bord gauche au bord droit admissible
    cam(q('[data-depth-frame] [data-cam]'), { scale: 1.25, panX: -1, panY: 0 }, { scale: 1.25, panX: 1, panY: -0.4 }, T0, L);
    // ---- PLANS DU TRAVELLING ----
    // Un plan par panneau : l'instant où son centre passe au centre de l'écran (mesuré sur le layout,
    // sans transforms). Le scroll se pose là ; chaque texte a fini d'apparaître quand son panneau arrive.
    const travel = L - 0.3;
    const panels = Array.from(track.children) as HTMLElement[];
    const arrive = (el: Element) => {
      const panel = panels.find((p) => p === el || p.contains(el));
      if (!panel) return END;
      const d = distance() || 1;
      const x = panel.offsetLeft + panel.offsetWidth / 2 - stage.clientWidth / 2;
      return T0 + travel * Math.min(1, Math.max(0, x / d));
    };
    const tLead = Math.max(T0 + 0.5, arrive(q('[data-about-lead]')[0]));
    const tBody = Math.max(T0 + 0.5, arrive(q('[data-about-body]')[0]));
    const tCard = Math.min(END, Math.max(T0 + 0.6, arrive(q('[data-about-card]')[0])));

    // L'accroche s'allume pendant que la caméra arrive devant (terminé à l'arrivée)
    const leadFrom = Math.max(T0 + 0.05, tLead - 0.8);
    const leadStagger = Math.max(0.005, (tLead - 0.05 - leadFrom - 0.15) / Math.max(1, lead.words.length - 1));
    ft(lead.words, { opacity: 0.12 }, { opacity: 1, stagger: leadStagger, duration: 0.15 }, leadFrom);
    ft(q('[data-about-body] > *'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.1, duration: 0.35, ease: 'power2.out' }, Math.max(T0, tBody - 0.65));
    ft(q('[data-about-card]'), { scale: 0.8, rotate: -6, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, Math.min(tCard, END) - 0.55);
    ft(q('[data-about-mark]'), { rotate: -45, scale: 0.6 }, { rotate: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, Math.min(tCard, END) - 0.5);

    // Téléphone : un panneau = un écran, chaque photo est un plan. Grand écran : plusieurs panneaux
    // sont visibles à la fois, seuls les panneaux de texte font un plan (centrés, donc lisibles en entier).
    const textPanels = panels.filter((p) => !p.matches('figure'));
    beat(...(wide ? textPanels : panels).map(arrive).filter((t) => END - t > 0.6));

    return () => {
      title.revert();
      lead.revert();
    };
  });

  return (
    <section ref={root} id="about" className="scene relative scroll-mt-0" style={sceneStyle(LEN)}>
      <div className="scene-stage relative overflow-hidden bg-white">
        <div className="absolute top-10 left-10 w-44 h-44 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

        <div data-zoom className="h-full">
        <div
          data-track
          className="panorama-track relative h-full flex items-center gap-[8vw] lg:gap-[6vw] px-6 lg:px-[8vw] pt-20"
        >
          {/* Plan 1 — titre géant */}
          <div className="panel-shrink shrink-0 w-[88vw] lg:w-[62vw] space-y-6">
            <span data-about-label className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
              PRÉSENTATION • 01
            </span>
            <h2
              data-about-title
              className="text-[12vw] lg:text-[7.2vw] font-black text-slate-900 leading-[0.88] uppercase tracking-tighter"
            >
              Qui <span className="text-[#0284c7]">sommes-nous ?</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#0284c7] rounded" />
          </div>

          {/* Plan 2 — photo réelle */}
          <figure data-depth-frame="1" className="panel-shrink shrink-0 relative w-[78vw] lg:w-[38vw] h-[52svh] lg:h-[62svh] rounded-[28px] overflow-hidden shadow-2xl">
            <CameraImage image="chocoriumInauguration" alt="Inauguration d'un salon organisé par Evensium" />
            <figcaption className="absolute left-4 bottom-4 bg-white/90 backdrop-blur text-[10px] font-mono font-bold uppercase tracking-wider text-[#1e3a8a] px-3 py-1.5 rounded-full">
              Inauguration • SAFEX
            </figcaption>
          </figure>

          {/* Plan 3 — accroche */}
          <div className="panel-shrink shrink-0 w-[86vw] lg:w-[46vw]">
            <p
              data-about-lead
              className="text-[7.4vw] lg:text-[3.3vw] leading-[1.15] font-black text-slate-900 tracking-tight pl-5 border-l-[6px] border-[#1e3a8a]"
            >
              Evensium est une agence événementielle de premier plan spécialisée dans l’organisation d’événements professionnels et de salons.
            </p>
          </div>

          {/* Plan 4 — seconde photo, autre profondeur */}
          <figure data-depth-frame="2" className="panel-shrink shrink-0 relative w-[66vw] lg:w-[28vw] h-[40svh] lg:h-[48svh] rounded-[28px] overflow-hidden shadow-xl self-end mb-[10svh]">
            <CameraImage image="chocoriumPalmaryStand" alt="Stand d'exposant sur un salon Evensium" />
          </figure>

          {/* Plan 5 — expertise */}
          <div data-about-body className="panel-shrink shrink-0 w-[86vw] lg:w-[36vw] space-y-5">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">Notre expertise</span>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Notre expertise a été démontrée à travers la réalisation et l'organisation d’événements majeurs haut de gamme et d'envergure nationale et internationale, tels que le prestigieux <strong>Clinica 2024 et 2025</strong>.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Nous combinons rigueur logistique, créativité spatiale et réactivité totale pour assurer un succès retentissant à chacun de vos salons d'affaires.
            </p>
          </div>

          {/* Plan 6 — carte savoir-faire */}
          <div className="panel-shrink shrink-0 relative w-[80vw] sm:w-[60vw] lg:w-[26vw] mr-[6vw]">
            <div data-geo className="absolute -right-8 -top-8 w-24 h-24 bg-[#1e3a8a]/80 rounded-[20px] opacity-60" />
            <div data-geo className="absolute -left-6 bottom-10 w-16 h-16 bg-[#bae6fd] rounded-[15px] opacity-70" />
            <div data-about-card className="relative bg-white border border-sky-100 rounded-3xl p-6 shadow-2xl">
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-sky-50 via-white to-slate-50 mb-6 border border-sky-100/50 flex items-center justify-center overflow-hidden">
                <div data-about-mark>
                  <EvensiumLogo size={120} showText={false} className="opacity-95" />
                </div>
              </div>
              <h3 className="font-mono text-base font-bold text-slate-900 tracking-tight uppercase flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                Savoir-Faire Certifié
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                De l'analyse de vos besoins à la livraison clé en main du projet d'exposition, Evensium est votre unique point de contact stratégique.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
