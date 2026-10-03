import React, { useRef } from 'react';
import { gsap, useGSAP, MQ, SCRUB } from '../../animations/gsap';

/** Découpe « +10 000 », « 3 000 m² », « 25+ », « 360° » en préfixe / nombre / suffixe. */
export function parseStat(value: string) {
  const match = value.match(/^([^\d]*)(\d[\d\s  .,]*)(.*)$/);
  if (!match) return null;
  const digits = match[2].replace(/[\s  .,]/g, '');
  const target = parseInt(digits, 10);
  if (Number.isNaN(target)) return null;
  const grouped = /[\s  ]/.test(match[2].trim());
  return { prefix: match[1], target, suffix: match[3], grouped };
}

/** Format français avec espace insécable (pas de retour à la ligne au milieu d'un nombre). */
export function formatStat(n: number, grouped: boolean) {
  const s = Math.round(n).toString();
  return grouped ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s;
}

/**
 * Tween qui fait défiler le nombre d'un élément `[data-count]`.
 * Utilisable dans n'importe quelle timeline (scènes pinnées).
 */
export function countTween(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const parsed = parseStat(el.dataset.count ?? '');
  if (!parsed) return gsap.to({}, { duration: 0.01 });
  const proxy = { v: 0 };
  const render = () => {
    el.textContent = `${parsed.prefix}${formatStat(proxy.v, parsed.grouped)}${parsed.suffix}`;
  };
  const tween = gsap.fromTo(
    proxy,
    { v: 0 },
    {
      v: parsed.target,
      ease: 'power2.out',
      onUpdate: render,
      onStart: render,
      ...vars,
    },
  );
  // Affiche immédiatement l'état initial (0) pour éviter un saut valeur finale → 0.
  render();
  return tween;
}

interface StatValueProps {
  value: string;
  className?: string;
  /** `self` : déclenché par sa propre entrée dans le viewport. `external` : piloté par une scène. */
  mode?: 'self' | 'external';
}

/**
 * Valeur statistique animée. Le HTML contient toujours la valeur finale
 * (SEO, lecteurs d'écran, prefers-reduced-motion).
 */
export const StatValue: React.FC<StatValueProps> = ({ value, className, mode = 'self' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (mode !== 'self' || !ref.current) return;
      const el = ref.current;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        countTween(el, {
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 60%', scrub: SCRUB },
        });
        return () => {
          el.textContent = value;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value, mode] },
  );

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" data-count={value} className="tabular-nums">
        {value}
      </span>
    </span>
  );
};
