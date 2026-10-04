import React, { useRef } from 'react';
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from '../../animations/gsap';

interface MagneticProps {
  children: React.ReactNode;
  /** Part du déplacement du pointeur reprise par l'élément (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Effet magnétique discret : l'élément suit légèrement le pointeur au survol.
 * Désactivé au tactile et en mouvement réduit.
 */
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe || !isFinePointer() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

      const move = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      const leave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
};
