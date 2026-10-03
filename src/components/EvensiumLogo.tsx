import React from 'react';

interface EvensiumLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  textColorClass?: string;
  variant?: 'light' | 'dark';
}

export const EvensiumLogo: React.FC<EvensiumLogoProps> = ({
  size = 32,
  showText = true,
  className = '',
  textColorClass = 'text-slate-900',
  variant = 'light'
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      
      {/* 4-color Overlapping Rounded 'X' Logo Symbol */}
      <div 
        style={{ width: size, height: size }} 
        className="relative flex items-center justify-center shrink-0"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
        >
          <defs>
            {/* Elegant Gradients mimicking the 3D-like depth of the Evensium Logo */}
            <linearGradient id="purpleGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#bc8ec5" />
              <stop offset="100%" stopColor="#81548e" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#6fd3a8" />
              <stop offset="100%" stopColor="#3d9771" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#0c63ad" />
              <stop offset="100%" stopColor="#053e70" />
            </linearGradient>
            <linearGradient id="blackGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#444444" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            
            {/* Drop shadow for 3D layered intersection */}
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Pill 3: Black (Bottom-Left) */}
          <rect 
            x="12" 
            y="43" 
            width="44" 
            height="14" 
            rx="7" 
            transform="rotate(45 50 50)" 
            fill="url(#blackGrad)" 
          />

          {/* Pill 1: Purple (Top-Left) */}
          <rect 
            x="12" 
            y="43" 
            width="44" 
            height="14" 
            rx="7" 
            transform="rotate(-45 50 50)" 
            fill="url(#purpleGrad)" 
          />

          {/* Pill 2: Blue (Bottom-Right) */}
          <rect 
            x="44" 
            y="43" 
            width="44" 
            height="14" 
            rx="7" 
            transform="rotate(-45 50 50)" 
            fill="url(#blueGrad)" 
            filter="url(#shadow)"
          />

          {/* Pill 4: Mint Green (Top-Right) */}
          <rect 
            x="44" 
            y="43" 
            width="44" 
            height="14" 
            rx="7" 
            transform="rotate(45 50 50)" 
            fill="url(#greenGrad)" 
            filter="url(#shadow)"
          />
        </svg>
      </div>

      {showText && (
        <span 
          style={{ fontFamily: "'Quicksand', 'Plus Jakarta Sans', sans-serif" }}
          className={`text-2xl font-bold tracking-tight lowercase transition-colors ${textColorClass}`}
        >
          evensium
        </span>
      )}
    </div>
  );
};
