import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../animations/gsap';
import { EvensiumLogo } from '../EvensiumLogo';

export interface PageTransitionHandle {
  /** Volets qui recouvrent l'écran ; résout quand la page peut être remplacée. */
  cover: () => Promise<void>;
  /** Volets qui se retirent pour découvrir la nouvelle page. */
  reveal: () => Promise<void>;
}

// Couleurs exactes des 4 pilules du logo, puis le volet nuit qui porte le symbole.
const PANELS = ['#81548e', '#3d9771', '#0c63ad', '#0f172a'];

export const PageTransition = forwardRef<PageTransitionHandle>((_, ref) => {
  const root = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    cover: () =>
      new Promise<void>((resolve) => {
        const el = root.current;
        if (!el || prefersReducedMotion()) return resolve();
        const panels = el.querySelectorAll('[data-panel]');
        const mark = el.querySelector('[data-transition-mark]');
        gsap
          .timeline({ onComplete: () => resolve() })
          .set(el, { visibility: 'visible', pointerEvents: 'auto' })
          .fromTo(panels, { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: 0.6, ease: 'expo.inOut', stagger: 0.06 })
          .fromTo(mark, { opacity: 0, scale: 0.6, rotate: -45 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(1.6)' }, '-=0.25');
      }),
    reveal: () =>
      new Promise<void>((resolve) => {
        const el = root.current;
        if (!el || prefersReducedMotion()) return resolve();
        const panels = Array.from(el.querySelectorAll('[data-panel]')).reverse();
        const mark = el.querySelector('[data-transition-mark]');
        gsap
          .timeline({
            onComplete: () => {
              gsap.set(el, { visibility: 'hidden', pointerEvents: 'none' });
              resolve();
            },
          })
          .to(mark, { opacity: 0, scale: 1.4, duration: 0.3, ease: 'power2.in' })
          .to(panels, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', stagger: 0.06 }, '-=0.1');
      }),
  }));

  return (
    <div ref={root} aria-hidden="true" className="page-transition">
      {PANELS.map((color, i) => (
        <div key={color} data-panel className="absolute inset-0" style={{ background: color, zIndex: i }} />
      ))}
      <div data-transition-mark className="absolute inset-0 z-10 flex items-center justify-center opacity-0">
        <EvensiumLogo size={72} showText={false} />
      </div>
    </div>
  );
});
PageTransition.displayName = 'PageTransition';
