import React, { useRef } from 'react';
import { CheckCircle2, Layers, Users } from 'lucide-react';
import { SplitText } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
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
const LEN = { wide: 5.6, narrow: 5.6 };

export const WhyKinetic: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, LEN, ({ q, wide, tl, T0, ft, cut }) => {
    const a = SplitText.create(q('[data-why-a]')[0], { type: 'words,chars', mask: 'chars' });
    const b = SplitText.create(q('[data-why-b]')[0], { type: 'words,chars', mask: 'chars' });
    const pillars = q('[data-pillar]');
    const figures = q('[data-figure]');

    // ---- 1. ENTRÉE : le titre se construit ----
    ft(a.chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.015, duration: 0.3, ease: 'power3.out' }, 0.2);
    ft(b.chars, { yPercent: -115 }, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power3.out' }, 0.35);
    // … puis se scinde : une ligne file hors champ, l'autre explose vers la caméra
    ft(q('[data-why-a]'), { xPercent: 0 }, { xPercent: -160, duration: 0.45, ease: 'power2.in' }, T0 + 0.2);
    ft(q('[data-why-label]'), { yPercent: 0, opacity: 1 }, { yPercent: -150, opacity: 0, duration: 0.2 }, T0 + 0.2);
    ft(q('[data-why-sub]'), { yPercent: 0, opacity: 1 }, { yPercent: 60, opacity: 0, duration: 0.2 }, T0 + 0.2);
    ft(q('[data-why-b]'), { scale: 1, opacity: 1 }, { scale: wide ? 7 : 6, opacity: 0, duration: 0.5, ease: 'power2.in' }, T0 + 0.25);

    // ---- 2. PILIERS : un mot géant traverse le cadre, la carte entre puis ressort ----
    pillars.forEach((p, i) => {
      const at = T0 + 0.9 + i * 1.2;
      const dir = i % 2 ? -1 : 1;
      const card = p.querySelector('[data-pillar-card]');
      cut(p, at);
      ft(p.querySelector('[data-pillar-word]'), { xPercent: dir * 90 }, { xPercent: -dir * 90, duration: 1.3 }, at - 0.05);
      ft(card, { yPercent: 50, rotateX: -35, scale: 1, opacity: 0 }, { yPercent: 0, rotateX: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' }, at + 0.1);
      ft(p.querySelector('[data-pillar-icon]'), { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' }, at + 0.2);
      ft(card, { yPercent: 0, rotateX: 0, scale: 1, opacity: 1 }, { yPercent: -40, rotateX: 0, scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' }, at + 0.85);
      cut(p, at + 1.2, false);
    });

    // ---- 3. GÉNÉRIQUE DES CHIFFRES ----
    const at = T0 + 0.9 + pillars.length * 1.2;
    ft(q('[data-figures-label]'), { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.25 }, at);
    figures.forEach((f, i) => {
      ft(f, { autoAlpha: 0, yPercent: 120 }, { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: 'power3.out' }, at + i * 0.2);
      const n = f.querySelector<HTMLElement>('[data-count]');
      if (n) tl.add(countTween(n, { duration: 0.5, ease: 'power2.out' }), at + i * 0.2);
    });

    return () => {
      a.revert();
      b.revert();
    };
  });

  return (
    <section ref={root} id="why-us" aria-labelledby="why-title" className="scene relative" style={sceneStyle(LEN)}>
      <div className="scene-stage relative overflow-hidden bg-white">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f0f9ff] rounded-tr-[240px] opacity-70 pointer-events-none" />

        {/* 1 — titre */}
        <div className="scene-overlay absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center">
          <span data-why-label className="block text-xs font-bold text-[#0284c7] uppercase tracking-widest font-mono mb-4">VALEURS • 03</span>
          <h2 id="why-title" className="w-full font-black uppercase tracking-tighter leading-[0.85] text-slate-900">
            <span data-why-a className="block w-full text-[10vw] lg:text-[6.5vw]">Pourquoi choisir</span>
            <span data-why-b className="block text-[14vw] lg:text-[10vw] text-[#0284c7]">Evensium ?</span>
          </h2>
          <p data-why-sub className="mt-4 text-slate-500 text-sm max-w-md">
            Notre engagement s'appuie sur trois piliers fondamentaux pour garantir un succès sans faille.
          </p>
        </div>

        {/* 2 — piliers */}
        {PILLARS.map(({ icon: Icon, word, title, text, footer, color }) => (
          <div key={title} data-pillar className="scene-panel absolute inset-0 z-[3] flex items-center justify-center px-6">
            <div className="reduce-hide absolute inset-0 flex items-center overflow-hidden pointer-events-none" aria-hidden="true">
              <div
                data-pillar-word
                className="w-full shrink-0 text-center whitespace-nowrap font-black uppercase tracking-tighter leading-none text-[34vw] lg:text-[22vw]"
                style={{ color, opacity: 0.12 }}
              >
                {word}
              </div>
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
