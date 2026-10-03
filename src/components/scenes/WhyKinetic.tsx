import React, { useRef } from 'react';
import { CheckCircle2, Layers, Users } from 'lucide-react';
import { gsap, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';
import { countTween } from '../motion/StatsCounter';

const PILLARS = [
  {
    icon: CheckCircle2,
    word: 'Rigueur',
    title: 'Expérience éprouvée',
    text: 'Une gestion logistique et financière rigoureuse garantissant la réussite totale de vos congrès et foires.',
    footer: '01 • Rigueur Logistique',
    color: '#0c63ad',
  },
  {
    icon: Layers,
    word: 'Sur mesure',
    title: 'Solutions personnalisées',
    text: 'Chaque stand et événement est modélisé et conçu sur mesure en harmonie absolue avec votre image de marque.',
    footer: '02 • Créativité sur Mesure',
    color: '#81548e',
  },
  {
    icon: Users,
    word: 'Réseau',
    title: 'Réseau solide',
    text: "Un catalogue solide de prestataires qualifiés d'élite pour une exécution irréprochable et ponctuelle.",
    footer: '03 • Réseau de Confiance',
    color: '#3d9771',
  },
];

/** Chiffres réels cités par le site (accueil + fiches salons). */
const FIGURES = [
  { value: '360°', label: 'Gestion clé en main' },
  { value: '+12 000', label: 'Professionnels de santé — Clinica' },
  { value: '3', label: 'Salons sectoriels à la SAFEX' },
  { value: '100%', label: 'Engagement réussite' },
];

/**
 * SCÈNE 6 — TYPOGRAPHIE CINÉTIQUE (pinnée, ≈ 420 %)
 *  1. Le titre se construit, puis se scinde : « Pourquoi choisir » part à gauche, « Evensium ? » grossit
 *  2. Chaque pilier = un mot géant qui traverse l'écran (marquee piloté par le scroll) + sa carte
 *  3. Les chiffres clés s'empilent et défilent comme un générique
 */
export const WhyKinetic: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ q, wide, timeline, enter }) => {
    const a = SplitText.create(q('[data-why-a]')[0], { type: 'words,chars', mask: 'chars' });
    const b = SplitText.create(q('[data-why-b]')[0], { type: 'words,chars', mask: 'chars' });
    const pillars = q('[data-pillar]');
    const figures = q('[data-figure]');
    const W = () => window.innerWidth;

    gsap.set(pillars, { autoAlpha: 0 });
    gsap.set(figures, { autoAlpha: 0 });

    const tl = timeline(wide ? 420 : 480);

    // 1 — le titre se construit puis se scinde
    enter()
      .from(a.chars, { yPercent: 115, stagger: 0.03, duration: 0.6, ease: 'power3.out' }, 0)
      .from(b.chars, { yPercent: -115, stagger: 0.04, duration: 0.6, ease: 'power3.out' }, 0.2);
    tl.to({}, { duration: 0.6 }, 0)
      .to(q('[data-why-a]'), { x: () => -W() * 1.6, duration: 0.9, ease: 'power2.in' }, 1.1)
      .to(q('[data-why-label]'), { y: -40, opacity: 0, duration: 0.4 }, 1.1)
      .to(q('[data-why-b]'), { scale: wide ? 7 : 6, opacity: 0, duration: 1, ease: 'power2.in' }, 1.2)
      .to(q('[data-why-sub]'), { y: 40, opacity: 0, duration: 0.4 }, 1.1);

    // 2 — trois piliers, trois mots géants qui traversent le cadre
    pillars.forEach((p, i) => {
      const at = 2 + i * 1.6;
      const dir = i % 2 ? -1 : 1;
      tl.set(p, { autoAlpha: 1 }, at)
        .fromTo(p.querySelector('[data-pillar-word]'), { x: () => dir * W() * 0.9 }, { x: () => -dir * W() * 0.9, duration: 1.8 }, at - 0.1)
        .from(p.querySelector('[data-pillar-card]'), { y: 140, rotateX: -35, opacity: 0, duration: 0.6, ease: 'power3.out' }, at + 0.2)
        .from(p.querySelector('[data-pillar-icon]'), { scale: 0, rotate: -180, duration: 0.5, ease: 'back.out(2)' }, at + 0.35)
        .to(p.querySelector('[data-pillar-card]'), { y: -120, scale: 0.9, opacity: 0, duration: 0.5, ease: 'power2.in' }, at + 1.2)
        .set(p, { autoAlpha: 0 }, at + 1.75);
    });

    // 3 — générique des chiffres
    const at = 2 + pillars.length * 1.6;
    figures.forEach((f, i) => {
      tl.fromTo(f, { autoAlpha: 0, yPercent: 120 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, at + i * 0.35);
      const n = f.querySelector<HTMLElement>('[data-count]');
      if (n) tl.add(countTween(n, { duration: 0.9, ease: 'power2.out' }), at + i * 0.35);
    });
    tl.from(q('[data-figures-label]'), { x: -50, opacity: 0, duration: 0.5 }, at).to({}, { duration: 1 });

    return () => {
      a.revert();
      b.revert();
    };
  });

  return (
    <section ref={root} id="why-us" aria-labelledby="why-title" className="scene relative">
      <div className="scene-stage relative overflow-hidden bg-white">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f0f9ff] rounded-tr-[240px] opacity-70 pointer-events-none" />

        {/* 1 — titre */}
        <div className="scene-overlay absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center">
          <span data-why-label className="block text-xs font-bold text-[#0284c7] uppercase tracking-widest font-mono mb-4">VALEURS • 03</span>
          <h2 id="why-title" className="font-black uppercase tracking-tighter leading-[0.85] text-slate-900">
            <span data-why-a className="block text-[10vw] lg:text-[6.5vw]">Pourquoi choisir</span>
            <span data-why-b className="block text-[14vw] lg:text-[10vw] text-[#0284c7] will-change-transform">Evensium ?</span>
          </h2>
          <p data-why-sub className="mt-4 text-slate-500 text-sm max-w-md">
            Notre engagement s'appuie sur trois piliers fondamentaux pour garantir un succès sans faille.
          </p>
        </div>

        {/* 2 — piliers */}
        {PILLARS.map(({ icon: Icon, word, title, text, footer, color }) => (
          <div key={title} data-pillar className="scene-panel absolute inset-0 z-[3] flex items-center justify-center px-6">
            <div
              data-pillar-word
              aria-hidden="true"
              className="reduce-hide absolute top-1/2 left-1/2 -translate-y-1/2 -ml-[50vw] w-[100vw] text-center whitespace-nowrap font-black uppercase tracking-tighter leading-none text-[34vw] lg:text-[22vw] will-change-transform"
              style={{ color, opacity: 0.12 }}
            >
              {word}
            </div>
            <article data-pillar-card className="pillar-card relative w-full max-w-md rounded-[32px] bg-white/90 backdrop-blur border border-sky-100 shadow-2xl p-8" style={{ perspective: '800px' }}>
              <div data-pillar-icon className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5" style={{ background: color }}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed">{text}</p>
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pt-5 mt-5 border-t border-slate-100">{footer}</span>
            </article>
          </div>
        ))}

        {/* 3 — générique des chiffres */}
        <div className="scene-panel absolute inset-0 z-[4] flex items-center px-6 pointer-events-none">
          <div className="max-w-6xl mx-auto w-full">
            <span data-figures-label className="reduce-hide block text-xs font-bold text-[#0284c7] uppercase tracking-widest font-mono mb-4">Evensium en chiffres</span>
            <ul className="space-y-1 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-4">
              {FIGURES.map((f) => (
                <li key={f.label} data-figure className="overflow-hidden border-b border-slate-200 py-2 lg:py-3 flex items-baseline justify-between gap-4">
                  <span className="text-[16vw] lg:text-[6vw] font-black tracking-tighter leading-[0.9] text-slate-900 tabular-nums">
                    <span className="sr-only">{f.value}</span>
                    <span aria-hidden="true" data-count={f.value}>{f.value}</span>
                  </span>
                  <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-slate-500 text-right max-w-[40%]">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
