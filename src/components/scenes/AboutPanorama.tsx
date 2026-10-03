import React, { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { IMAGES } from '../../assets/images';
import { gsap, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';

/**
 * SCÈNE 2 — TRAVELLING LATÉRAL (pinnée)
 * La caméra glisse de gauche à droite le long d'un panorama : titre géant, photos réelles
 * d'événements, accroche qui s'allume au passage, carte « savoir-faire ». Chaque couche a sa
 * propre vitesse (profondeur) ; la caméra « respire » (léger zoom) pendant le mouvement.
 */
export const AboutPanorama: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ stage, q, wide, timeline, enter }) => {
    const track = q('[data-track]')[0];
    const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
    const title = SplitText.create(q('[data-about-title]')[0], { type: 'words,chars', mask: 'chars' });
    const lead = SplitText.create(q('[data-about-lead]')[0], { type: 'words' });

    // Entrée : le titre géant se compose pendant que la scène monte, la caméra recule
    enter()
      .fromTo(track, { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power2.out', transformOrigin: '0% 50%' }, 0)
      .from(title.chars, { yPercent: 115, stagger: 0.05, duration: 0.9, ease: 'power3.out' }, 0)
      .from(q('[data-about-label]'), { x: -60, opacity: 0, duration: 0.6 }, 0.2);

    const tl = timeline(wide ? 340 : 400);
    tl
      // Travelling
      .to(track, { x: () => -distance(), duration: 8, ease: 'none' }, 1)
      // Couches à vitesses différentes
      .to(q('[data-about-title]'), { x: () => -stage.clientWidth * 0.25, duration: 3 }, 1)
      .fromTo(q('[data-depth-img]'), { xPercent: -12 }, { xPercent: 12, duration: 8 }, 1)
      .fromTo(q('[data-depth-frame="1"]'), { y: () => stage.clientHeight * 0.08, rotate: -3 }, { y: () => -stage.clientHeight * 0.06, rotate: 1, duration: 4 }, 1.5)
      .fromTo(q('[data-depth-frame="2"]'), { y: () => -stage.clientHeight * 0.1, rotate: 4 }, { y: () => stage.clientHeight * 0.06, rotate: -1, duration: 4 }, 4.5)
      .fromTo(q('[data-geo]'), { rotate: 0, yPercent: 40 }, { rotate: 180, yPercent: -60, duration: 8 }, 1)
      // L'accroche s'allume mot par mot quand la caméra passe devant
      .fromTo(lead.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.08, duration: 0.4 }, 3)
      .from(q('[data-about-body] > *'), { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }, 5.6)
      .from(q('[data-about-card]'), { scale: 0.8, rotate: -6, opacity: 0, duration: 1, ease: 'power3.out' }, 7.4)
      .fromTo(q('[data-about-mark]'), { rotate: -45, scale: 0.6 }, { rotate: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, 7.5)
      .to({}, { duration: 0.6 }, 9);

    return () => {
      title.revert();
      lead.revert();
    };
  });

  return (
    <section ref={root} id="about" className="scene relative scroll-mt-0">
      <div className="scene-stage relative overflow-hidden bg-white">
        <div className="absolute top-10 left-10 w-44 h-44 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

        <div
          data-track
          className="panorama-track relative h-full flex items-center gap-[8vw] lg:gap-[6vw] px-6 lg:px-[8vw] pt-20 will-change-transform"
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
            <img data-depth-img src={IMAGES.chocoriumInauguration} alt="Inauguration d'un salon organisé par Evensium" className="absolute inset-y-0 -left-[15%] w-[130%] max-w-none h-full object-cover" decoding="async" />
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
            <img data-depth-img src={IMAGES.chocoriumPalmaryStand} alt="Stand d'exposant sur un salon Evensium" className="absolute inset-y-0 -left-[15%] w-[130%] max-w-none h-full object-cover" decoding="async" />
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
            <div data-geo className="absolute -right-8 -top-8 w-24 h-24 bg-[#1e3a8a]/80 rounded-[20px] rotate-45 opacity-60" />
            <div data-geo className="absolute -left-6 bottom-10 w-16 h-16 bg-[#bae6fd] rounded-[15px] rotate-45 opacity-70" />
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
    </section>
  );
};
