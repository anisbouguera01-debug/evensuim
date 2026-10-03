import { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from './gsap';

export interface SceneContext {
  /** Élément `.scene-stage` (100svh) qui est pinné. */
  stage: HTMLElement;
  /** Sélecteur limité à la scène. */
  q: (selector: string) => HTMLElement[];
  /** Grand écran (≥1024px de large). Sinon : cadrage téléphone / tablette. */
  wide: boolean;
  /** Crée la timeline maîtresse de la scène, pilotée par le scroll et pinnée. */
  timeline: (lengthPercent: number, vars?: ScrollTrigger.Vars) => gsap.core.Timeline;
  /** Timeline de l'entrée : pendant que la scène monte dans l'écran, avant le pin. */
  enter: () => gsap.core.Timeline;
}

/** Lissage du scrub : réactif sous le doigt, sans à-coups. */
export const SCENE_SCRUB = 0.7;

/**
 * Une scène = une section pinnée plein écran dont le scroll fait avancer une timeline,
 * comme un monteur qui avance la tête de lecture. Montée seulement si l'utilisateur
 * accepte le mouvement ; sinon les plans s'empilent en sections classiques (CSS).
 */
export function useScene(scope: RefObject<HTMLElement | null>, build: (ctx: SceneContext) => void | (() => void)) {
  useGSAP(
    () => {
      const root = scope.current;
      const stage = root?.querySelector<HTMLElement>('.scene-stage');
      if (!root || !stage) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, wide: '(min-width: 1024px)' }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const q = (sel: string): HTMLElement[] => Array.from<HTMLElement>(root.querySelectorAll<HTMLElement>(sel));
        const timeline = (lengthPercent: number, vars: ScrollTrigger.Vars = {}) =>
          gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: `+=${lengthPercent}%`,
              pin: true,
              scrub: SCENE_SCRUB,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              ...vars,
            },
          });
        const enter = () =>
          gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: stage, start: 'top 85%', end: 'top top', scrub: SCENE_SCRUB, invalidateOnRefresh: true },
          });
        return build({ stage, q, wide: !!ctx.conditions?.wide, timeline, enter });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
