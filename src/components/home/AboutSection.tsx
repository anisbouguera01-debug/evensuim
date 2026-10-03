import React, { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { AnimatedText } from '../motion/AnimatedText';
import { gsap, SplitText, useGSAP, MQ, SCRUB } from '../../animations/gsap';

/**
 * QUI SOMMES-NOUS — langage « éditorial » : titre en masque, lecture surlignée,
 * visuel révélé en clip-path avec trois plans de parallax.
 */
export const AboutSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const d = ctx.conditions?.desktop ? 1 : 0.5;

        const label = SplitText.create(q('[data-about-label]')[0] as HTMLElement, { type: 'chars' });
        gsap.from(label.chars, {
          x: -12,
          opacity: 0,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 55%', scrub: SCRUB },
        });

        gsap.from(q('[data-about-bar]'), {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: { trigger: q('[data-about-bar]')[0], start: 'top 88%', end: 'top 60%', scrub: SCRUB },
        });

        // Visuel : le cadre s'ouvre de bas en haut, le symbole « fait la mise au point »
        const visual = q('[data-about-visual]')[0];
        gsap
          .timeline({ scrollTrigger: { trigger: visual, start: 'top 85%', end: 'top 35%', scrub: SCRUB } })
          .fromTo(
            q('[data-about-card]'),
            { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'power2.out' },
          )
          .fromTo(q('[data-about-mark]'), { scale: 1.3, rotate: -8 }, { scale: 1, rotate: 0, ease: 'power2.out' }, 0);

        // Trois plans de profondeur (les rotations s'ajoutent à la rotation CSS d'origine)
        const depth = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: SCRUB };
        gsap.fromTo(q('[data-about-visual]'), { y: 60 * d }, { y: -60 * d, ease: 'none', scrollTrigger: depth });
        gsap.fromTo(q('[data-geo="navy"]'), { yPercent: 80 * d, rotate: 0 }, { yPercent: -120 * d, rotate: 90, ease: 'none', scrollTrigger: depth });
        gsap.fromTo(q('[data-geo="sky"]'), { yPercent: -60 * d, rotate: 0 }, { yPercent: 80 * d, rotate: -60, ease: 'none', scrollTrigger: depth });
        gsap.fromTo(q('[data-about-tilt]'), { rotate: 4 }, { rotate: -4, ease: 'none', scrollTrigger: depth });
        gsap.fromTo(q('[data-blob]'), { yPercent: -30 }, { yPercent: 30, ease: 'none', scrollTrigger: depth });

        return () => label.revert();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="relative py-28 bg-white overflow-hidden border-b border-sky-100 scroll-mt-24">
      <div data-blob className="absolute top-10 left-10 w-44 h-44 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div data-blob className="absolute bottom-10 right-10 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span data-about-label className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
              PRÉSENTATION • 01
            </span>

            <AnimatedText as="h2" variant="mask" className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
              Qui <span className="text-[#0284c7]">sommes-nous ?</span>
            </AnimatedText>

            <div data-about-bar className="w-20 h-1.5 bg-[#0284c7] rounded" />

            <AnimatedText
              as="p"
              variant="highlight"
              className="text-lg sm:text-xl text-slate-700 leading-relaxed font-semibold pl-4 border-l-4 border-[#1e3a8a]"
            >
              Evensium est une agence événementielle de premier plan spécialisée dans l’organisation d’événements professionnels et de salons.
            </AnimatedText>

            <AnimatedText as="p" variant="lines" className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Notre expertise a été démontrée à travers la réalisation et l'organisation d’événements majeurs haut de gamme et d'envergure nationale et internationale, tels que le prestigieux <strong>Clinica 2024 et 2025</strong>.
              Nous combinons rigueur logistique, créativité spatiale et réactivité totale pour assurer un succès retentissant à chacun de vos salons d'affaires.
            </AnimatedText>
          </div>

          <div className="lg:col-span-5">
            <div data-about-visual className="relative w-full max-w-sm mx-auto will-change-transform">
              <div data-about-tilt className="absolute -inset-4 bg-gradient-to-tr from-[#1e3a8a]/15 to-[#0284c7]/10 rounded-[40px] rotate-[6deg] blur-[2px]" />

              <div data-geo="navy" className="absolute -right-10 top-10 w-24 h-24 bg-[#1e3a8a]/80 rounded-[20px] rotate-45 opacity-60" />
              <div data-geo="sky" className="absolute -left-8 bottom-6 w-16 h-16 bg-[#bae6fd] rounded-[15px] rotate-45 opacity-65" />

              <div data-about-card className="relative bg-white border border-sky-100 rounded-3xl p-6 shadow-xl">
                <div className="aspect-[4/3] sm:aspect-square w-full rounded-2xl bg-gradient-to-br from-sky-50 via-white to-slate-50 mb-6 border border-sky-100/50 flex items-center justify-center p-8 overflow-hidden">
                  <div data-about-mark>
                    <EvensiumLogo size={140} showText={false} className="opacity-95" />
                  </div>
                </div>
                <div>
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
      </div>
    </section>
  );
};
