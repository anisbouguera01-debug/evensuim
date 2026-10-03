/**
 * Point d'entrée unique de GSAP : enregistrement des plugins et constantes partagées.
 * Importer gsap / ScrollTrigger / SplitText depuis ce fichier garantit que les
 * plugins sont enregistrés avant toute utilisation.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Évite les recalculs quand la barre d'adresse iOS/Android apparaît/disparaît.
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: 'power3.out' });

/** Requêtes média partagées par toutes les scènes (gsap.matchMedia). */
export const MQ = {
  /** Grand écran assez haut pour les sections pinnées. */
  desktop: '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
  /** Tout le reste (mobile, tablette, petits laptops), animations allégées. */
  mobile:
    '(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 639px) and (prefers-reduced-motion: no-preference)',
  /** Accessibilité : aucune animation de scroll. */
  reduce: '(prefers-reduced-motion: reduce)',
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduce).matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Durée de lissage du scrub : donne l'inertie « caméra » sans décrocher du scroll. */
export const SCRUB = 1;

/**
 * Position d'un élément relativement à un ancêtre, sans tenir compte des transforms
 * (offsetLeft/Top). Indispensable pour calculer des trajectoires de caméra fiables
 * pendant un refresh de ScrollTrigger, quand des transforms sont déjà appliqués.
 */
export function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
