import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../animations/gsap';

/** Fine barre de progression aux 4 couleurs du logo Evensium. */
export const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = ref.current;
    if (!bar) return;
    const setScale = gsap.quickSetter(bar, 'scaleX');
    setScale(0);
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScale(self.progress),
      onRefresh: (self) => setScale(self.progress),
    });
  });

  return <div ref={ref} aria-hidden="true" className="scroll-progress" />;
};
