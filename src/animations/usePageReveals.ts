import { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ, SCRUB } from './gsap';

/** Un élément déjà animé par `motion` (style inline) ne doit pas être repris par GSAP. */
const ownedByMotion = (el: HTMLElement) => /opacity|transform/.test(el.getAttribute('style') ?? '');

/**
 * Révélations scrubbed génériques pour les pages secondaires :
 * - titres h1/h2 : montée floutée → nette
 * - images dans un cadre `overflow-hidden` : dolly-out (scale 1.18 → 1) pendant la traversée
 * Le contenu reste visible sans JS et en mouvement réduit.
 */
export function usePageReveals(scope: RefObject<HTMLElement | null>, pageKey: string, enabled = true) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !enabled) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const d = ctx.conditions?.desktop ? 1 : 0.6;

        root.querySelectorAll<HTMLElement>('h1, h2').forEach((h) => {
          if (ownedByMotion(h) || h.closest('[data-no-reveal]')) return;
          gsap.fromTo(
            h,
            { yPercent: 40 * d, opacity: 0, filter: 'blur(8px)' },
            {
              yPercent: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
              scrollTrigger: { trigger: h, start: 'top 92%', end: 'top 62%', scrub: SCRUB },
            },
          );
        });

        root.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
          if (ownedByMotion(img) || img.closest('[data-no-reveal]')) return;
          const frame = img.parentElement;
          if (!frame || getComputedStyle(frame).overflow !== 'hidden') return;
          if (img.getBoundingClientRect().width < 160) return;
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
            },
          );
        });
      });

      // Les images chargées après coup changent les hauteurs : on recalcule les déclencheurs.
      let timer: number | undefined;
      const onLoad = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      };
      root.addEventListener('load', onLoad, true);

      return () => {
        root.removeEventListener('load', onLoad, true);
        window.clearTimeout(timer);
        mm.revert();
      };
    },
    { scope, dependencies: [pageKey, enabled], revertOnUpdate: true },
  );
}
