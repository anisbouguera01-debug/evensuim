import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

type ScrollTarget = number | string | HTMLElement;

interface SmoothScrollApi {
  lenis: Lenis | null;
  /** Scroll vers une cible (Lenis si actif, sinon scroll natif). */
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean; duration?: number }) => void;
  /** Bloque / débloque le scroll (menu mobile, overlays). */
  lock: (locked: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  lenis: null,
  scrollTo: () => {},
  lock: () => {},
});

/**
 * Un conteneur qui défile lui-même (modale, liste) doit garder son scroll natif :
 * Lenis ignore la molette dès qu'un élément du chemin de l'événement est scrollable.
 */
function shouldPrevent(node: HTMLElement) {
  if (!(node instanceof HTMLElement)) return false;
  if (node.hasAttribute('data-lenis-prevent')) return true;
  if (node === document.body || node === document.documentElement) return false;
  const style = getComputedStyle(node);
  const scrollableY = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
  return scrollableY;
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lockedRef = useRef(false);

  useEffect(() => {
    // Accessibilité : pas de smooth scroll si l'utilisateur réduit les animations.
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      // Le tactile reste 100 % natif (inertie iOS/Android, pas de décrochage).
      syncTouch: false,
      prevent: shouldPrevent,
    });

    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis');
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      document.documentElement.classList.remove('lenis');
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target: ScrollTarget, opts: { offset?: number; immediate?: boolean; duration?: number } = {}) => {
      const { offset = 0, immediate = false, duration } = opts;
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate, duration, force: true });
        return;
      }
      let top = 0;
      if (typeof target === 'number') top = target;
      else {
        const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
        if (!el) return;
        top = el.getBoundingClientRect().top + window.scrollY;
      }
      window.scrollTo({ top: top + offset, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    [lenis],
  );

  const lock = useCallback(
    (locked: boolean) => {
      if (lockedRef.current === locked) return;
      lockedRef.current = locked;
      document.documentElement.classList.toggle('scroll-locked', locked);
      if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
      }
    },
    [lenis],
  );

  const api = useMemo(() => ({ lenis, scrollTo, lock }), [lenis, scrollTo, lock]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);
