import React, { useRef } from 'react';
import { gsap, SplitText, ScrollTrigger, useGSAP, MQ, SCRUB } from '../../animations/gsap';

/**
 * Langages de texte disponibles — chaque section en choisit un différent :
 * - mask      : mots qui montent derrière un masque de ligne (titres éditoriaux)
 * - chars     : lettres qui montent une à une derrière un masque (titres courts)
 * - blur      : lettres floues → nettes (titres « mise au point »)
 * - highlight : lecture surlignée, les mots s'allument au fil du scroll
 * - slide     : mots qui arrivent latéralement en alternance
 * - lines     : lignes qui montent en douceur (paragraphes)
 */
export type TextVariant = 'mask' | 'chars' | 'blur' | 'highlight' | 'slide' | 'lines';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: TextVariant;
  /** Début / fin du scrub (syntaxe ScrollTrigger). */
  start?: string;
  end?: string;
  children: React.ReactNode;
}

const DEFAULT_RANGE: Record<TextVariant, [string, string]> = {
  mask: ['top 88%', 'top 52%'],
  chars: ['top 88%', 'top 55%'],
  blur: ['top 90%', 'top 55%'],
  highlight: ['top 80%', 'bottom 45%'],
  slide: ['top 90%', 'top 55%'],
  lines: ['top 92%', 'top 60%'],
};

function splitConfig(variant: TextVariant): SplitText.Vars {
  switch (variant) {
    case 'mask':
      return { type: 'lines,words', mask: 'lines', linesClass: 'split-line' };
    case 'chars':
      return { type: 'words,chars', mask: 'words' };
    case 'blur':
      return { type: 'words,chars' };
    case 'lines':
      return { type: 'lines', linesClass: 'split-line' };
    default:
      return { type: 'words' };
  }
}

/** Construit le tween scrubbed d'un split selon la variante. */
export function buildTextTween(
  split: SplitText,
  variant: TextVariant,
  trigger: Element,
  range: [string, string],
  compact = false,
) {
  const scrollTrigger: ScrollTrigger.Vars = { trigger, start: range[0], end: range[1], scrub: SCRUB };
  const d = compact ? 0.6 : 1;
  // Valeurs de départ ET d'arrivée explicites (fromTo) : l'état à une position de scroll donnée
  // ne dépend jamais d'une valeur relue au moment de la création.
  switch (variant) {
    case 'mask':
      return gsap.fromTo(split.words, { yPercent: 110, rotate: 4 * d }, { yPercent: 0, rotate: 0, ease: 'power2.out', stagger: 0.04, scrollTrigger });
    case 'chars':
      return gsap.fromTo(split.chars, { yPercent: 105 }, { yPercent: 0, ease: 'power2.out', stagger: 0.02, scrollTrigger });
    case 'blur':
      return gsap.fromTo(
        split.chars,
        { opacity: 0, yPercent: 30 * d, filter: 'blur(12px)' },
        { opacity: 1, yPercent: 0, filter: 'blur(0px)', ease: 'power1.out', stagger: 0.015, scrollTrigger },
      );
    case 'highlight':
      return gsap.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger });
    case 'slide':
      return gsap.fromTo(
        split.words,
        { xPercent: (i: number) => (i % 2 === 0 ? -40 : 40) * d, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: 'power2.out', stagger: 0.05, scrollTrigger },
      );
    case 'lines':
    default:
      return gsap.fromTo(
        split.lines.length ? split.lines : split.words,
        { yPercent: 40 * d, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: 'power2.out', stagger: 0.08, scrollTrigger },
      );
  }
}

/**
 * Texte animé au scroll (scrubbed). Rend un élément HTML normal : le texte reste
 * lisible et indexable, le split n'existe que si les animations sont autorisées.
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  as: Tag = 'div',
  variant = 'mask',
  start,
  end,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      const v = variant as TextVariant;
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const compact = !ctx.conditions?.desktop;
        const range: [string, string] = [start ?? DEFAULT_RANGE[v][0], end ?? DEFAULT_RANGE[v][1]];
        const split = SplitText.create(el, {
          ...splitConfig(v),
          autoSplit: v === 'mask' || v === 'lines',
          onSplit: (self) => buildTextTween(self, v, el, range, compact),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [variant, start, end] },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
};
