import React, { useId } from 'react';

interface EvensiumLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textColorClass?: string;
  variant?: 'light' | 'dark';
  /**
   * Expose chaque pilule du X dans deux groupes imbriqués
   * (`[data-pill]` pour le scroll, `[data-pill-inner]` pour l'intro) afin de pouvoir
   * animer la construction / l'explosion du logo. Aucun impact visuel.
   */
  animatable?: boolean;
  /** Masque le wordmark aux lecteurs d'écran quand il est décoratif. */
  decorative?: boolean;
}

type Pill = {
  key: 'black' | 'purple' | 'blue' | 'green';
  x: number;
  rotate: number;
  grad: 'black' | 'purple' | 'blue' | 'green';
  shadow?: boolean;
};

// Géométrie d'origine du symbole Evensium (ordre de superposition conservé).
const PILLS: Pill[] = [
  { key: 'black', x: 12, rotate: 45, grad: 'black' },
  { key: 'purple', x: 12, rotate: -45, grad: 'purple' },
  { key: 'blue', x: 44, rotate: -45, grad: 'blue', shadow: true },
  { key: 'green', x: 44, rotate: 45, grad: 'green', shadow: true },
];

export const EvensiumLogo: React.FC<EvensiumLogoProps> = ({
  size = 32,
  showText = true,
  className = '',
  textColorClass = 'text-slate-900',
  animatable = false,
  decorative = false,
}) => {
  // Identifiants uniques : plusieurs logos coexistent sur la page (header, footer, menu…).
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}-${uid}`;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Symbole « X » 4 couleurs */}
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center shrink-0"
        data-logo-mark
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] overflow-visible"
          role={showText ? undefined : 'img'}
          aria-label={showText ? undefined : 'Evensium'}
          aria-hidden={showText ? true : undefined}
        >
          <defs>
            <linearGradient id={id('purple')} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#bc8ec5" />
              <stop offset="100%" stopColor="#81548e" />
            </linearGradient>
            <linearGradient id={id('green')} x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#6fd3a8" />
              <stop offset="100%" stopColor="#3d9771" />
            </linearGradient>
            <linearGradient id={id('blue')} x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#0c63ad" />
              <stop offset="100%" stopColor="#053e70" />
            </linearGradient>
            <linearGradient id={id('black')} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#444444" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            <filter id={id('shadow')} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodOpacity="0.25" />
            </filter>
          </defs>

          {PILLS.map((pill) => {
            const rect = (
              <rect
                x={pill.x}
                y="43"
                width="44"
                height="14"
                rx="7"
                transform={`rotate(${pill.rotate} 50 50)`}
                fill={`url(#${id(pill.grad)})`}
                filter={pill.shadow ? `url(#${id('shadow')})` : undefined}
              />
            );
            if (!animatable) return <React.Fragment key={pill.key}>{rect}</React.Fragment>;
            return (
              <g key={pill.key} data-pill={pill.key}>
                <g data-pill-inner={pill.key}>{rect}</g>
              </g>
            );
          })}
        </svg>
      </div>

      {showText && (
        <span
          style={{ fontFamily: "'Quicksand', 'Plus Jakarta Sans', sans-serif" }}
          className={`text-2xl font-bold tracking-tight lowercase transition-colors ${textColorClass}`}
          aria-hidden={decorative || undefined}
          data-logo-wordmark
        >
          evensium
        </span>
      )}
    </div>
  );
};

/** Direction de sortie de chaque pilule (le long de sa diagonale, depuis le centre). */
export const PILL_DIRECTIONS: Record<Pill['key'], { x: number; y: number }> = {
  black: { x: -1, y: -1 },
  blue: { x: 1, y: -1 },
  purple: { x: -1, y: 1 },
  green: { x: 1, y: 1 },
};
