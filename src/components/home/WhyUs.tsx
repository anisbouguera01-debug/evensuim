import React, { useRef } from 'react';
import { CheckCircle2, Layers, Users } from 'lucide-react';
import { AnimatedText } from '../motion/AnimatedText';
import { gsap, useGSAP, MQ, SCRUB } from '../../animations/gsap';

const PILLARS = [
  {
    icon: CheckCircle2,
    title: 'Expérience éprouvée',
    text: 'Une gestion logistique et financière rigoureuse garantissant la réussite totale de vos congrès et foires.',
    footer: '01 • Rigueur Logistique',
  },
  {
    icon: Layers,
    title: 'Solutions personnalisées',
    text: 'Chaque stand et événement est modélisé et conçu sur mesure en harmonie absolue avec votre image de marque.',
    footer: '02 • Créativité sur Mesure',
  },
  {
    icon: Users,
    title: 'Réseau solide',
    text: "Un catalogue solide de prestataires qualifiés d'élite pour une exécution irréprochable et ponctuelle.",
    footer: '03 • Réseau de Confiance',
  },
];

/**
 * POURQUOI EVENSIUM — langage « convergence » : les trois piliers arrivent de la
 * profondeur et des côtés (rotateY / z) et se rejoignent à plat, comme trois plans
 * qui se recomposent en une seule image.
 */
export const WhyUs: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const [left, centre, right] = q('[data-pillar]');
        const st = { trigger: q('[data-pillars]')[0], start: 'top 95%', end: 'top 45%', scrub: SCRUB };
        gsap.fromTo(left, { x: -120, rotateY: 35, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
        gsap.fromTo(centre, { z: -300, y: 80, opacity: 0 }, { z: 0, y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
        gsap.fromTo(right, { x: 120, rotateY: -35, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
        gsap.from(q('[data-pillar-icon]'), {
          scale: 0.4,
          ease: 'back.out(2.2)',
          stagger: 0.1,
          scrollTrigger: { trigger: q('[data-pillars]')[0], start: 'top 75%', end: 'top 45%', scrub: SCRUB },
        });
        gsap.fromTo(q('[data-why-corner]'), { scale: 0.6 }, { scale: 1.25, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: SCRUB } });
      });

      mm.add(MQ.mobile, () => {
        (q('[data-pillar]') as HTMLElement[]).forEach((card, i) => {
          gsap.from(card, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 65%', scrub: SCRUB },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why-us" className="relative py-28 bg-white overflow-hidden border-b border-sky-100">
      <div data-why-corner className="absolute bottom-0 left-0 w-96 h-96 bg-[#f0f9ff] rounded-tr-[240px] opacity-70 pointer-events-none origin-bottom-left" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">VALEURS • 03</span>
          <AnimatedText as="h2" variant="slide" className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Pourquoi choisir <span className="text-[#0284c7]">Evensium ?</span>
          </AnimatedText>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
          <p className="text-slate-500 text-sm">
            Notre engagement s'appuie sur trois piliers fondamentaux pour garantir un succès sans faille.
          </p>
        </div>

        <div data-pillars className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1400px' }}>
          {PILLARS.map(({ icon: Icon, title, text, footer }) => (
            <article
              key={title}
              data-pillar
              className="pillar-card rounded-[32px] bg-sky-50/40 border border-sky-100 overflow-hidden shadow-sm group flex flex-col justify-between p-8 will-change-transform"
            >
              <div className="space-y-4">
                <div data-pillar-icon className="w-12 h-12 rounded-2xl bg-sky-100/80 flex items-center justify-center text-sky-600 shrink-0">
                  <span className="pillar-icon flex"><Icon className="w-6 h-6" /></span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{text}</p>
                </div>
              </div>
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pt-6 mt-6 border-t border-slate-100">
                {footer}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
