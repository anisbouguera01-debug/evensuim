import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { prefersReducedMotion } from './gsap';
import { markProgrammaticScroll } from './sceneSnap';

type ScrollTarget = number | string | HTMLElement;

interface ScrollApi {
  /** Scroll programmatique (ancres, flèches, retour en haut). */
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean; duration?: number }) => void;
  /** Bloque / débloque le scroll (menu mobile, overlays). */
  lock: (locked: boolean) => void;
}

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  lock: () => {},
});

/**
 * SCROLL NATIF, SANS LISSAGE NI INERTIE AJOUTÉE.
 *
 * Le lissage de molette (Lenis, lerp) a été retiré : il faisait continuer la page à glisser
 * après l'arrêt de la main, d'une quantité qui dépendait de la vitesse du geste. Désormais la
 * position du scroll est celle que donne le navigateur à l'instant t, et les animations
 * (ScrollTrigger, scrub: true) lisent directement cette position : aucune vitesse, aucun délai.
 * Le défilement tactile garde l'inertie native du téléphone (c'est la position qui pilote).
 */
export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lockedRef = useRef(false);

  const scrollTo = useCallback((target: ScrollTarget, opts: { offset?: number; immediate?: boolean; duration?: number } = {}) => {
    const { offset = 0, immediate = false } = opts;
    let top = 0;
    if (typeof target === 'number') top = target;
    else {
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;
      top = el.getBoundingClientRect().top + window.scrollY;
    }
    markProgrammaticScroll();
    window.scrollTo({ top: top + offset, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const lock = useCallback((locked: boolean) => {
    if (lockedRef.current === locked) return;
    lockedRef.current = locked;
    document.documentElement.classList.toggle('scroll-locked', locked);
  }, []);

  const api = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock]);
  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
};

export const useSmoothScroll = () => useContext(ScrollContext);
