import React, { useEffect, useRef, useState } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '../../animations/gsap';

type CursorState = 'default' | 'link' | 'view';

/**
 * Curseur desktop très discret : un anneau qui suit le pointeur natif (qui reste visible).
 * - lien / bouton : l'anneau s'agrandit légèrement
 * - [data-cursor="view"] (images, cartes, galerie) : l'anneau affiche « Voir »
 * Jamais rendu au tactile ni en mouvement réduit.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(isFinePointer() && !prefersReducedMotion());
    update();
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    const ring = ringRef.current;
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      const view = target?.closest?.('[data-cursor="view"]');
      const link = target?.closest?.('a, button, [role="button"], select, label, input[type="submit"]');
      setState(view ? 'view' : link ? 'link' : 'default');
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`cursor-ring ${visible ? 'is-visible' : ''} is-${state}`}
    >
      <span className="cursor-label">Voir</span>
    </div>
  );
};
