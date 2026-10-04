import React from 'react';
import { OFFICIAL_SPONSORS } from '../data/mockData';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const SponsorMarquee: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-sky-100/90 via-sky-50 to-sky-100/90 border-t border-sky-200 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-widest mb-2 shadow-sm">
          <HeartHandshake className="w-3.5 h-3.5 text-sky-700" />
          Confiance & Partenariats
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          CEUX QUI NOUS FONT CONFIANCE
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Sponsors Gold, Silver et Partenaires Majeurs de nos Salons d'Exception
        </p>
      </div>

      {/* Infinite Ticker Bar */}
      <div className="relative w-full overflow-hidden flex py-4 bg-white/70 border-y border-sky-200 backdrop-blur-md">
        
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-sky-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-sky-100 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-8 animate-marquee whitespace-nowrap items-center shrink-0">
          {[...OFFICIAL_SPONSORS, ...OFFICIAL_SPONSORS].map((sponsor, idx) => (
            <div
              key={`${sponsor.id}-${idx}`}
              className="px-6 py-3 rounded-2xl bg-white border border-sky-200 hover:border-sky-400 transition-all flex items-center gap-3 shrink-0 shadow-sm hover:shadow-md group"
            >
              <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center font-bold text-xs text-sky-800 shrink-0">
                {sponsor.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-serif font-bold text-slate-900 text-sm block group-hover:text-sky-700 transition-colors">
                  {sponsor.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {sponsor.tier} Sponsor • {sponsor.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
