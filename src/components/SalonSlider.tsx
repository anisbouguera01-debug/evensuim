import React, { useState } from 'react';
import { PageId, Salon } from '../types';
import { SALONS_DATA } from '../data/mockData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  Award,
  Layers
} from 'lucide-react';

interface SalonSliderProps {
  setCurrentPage: (page: PageId) => void;
}

export const SalonSlider: React.FC<SalonSliderProps> = ({ setCurrentPage }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SALONS_DATA.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SALONS_DATA.length) % SALONS_DATA.length);
  };

  return (
    <section className="py-24 bg-sky-50/90 relative overflow-hidden font-sans border-t border-sky-200/80">
      
      {/* Background Decorator Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[#0066cc] text-xs font-mono uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              Plateforme Évolutive
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
              NOS SALONS INTERNATIONAUX
            </h2>
            <p className="text-[#515154] text-sm sm:text-base mt-2 max-w-xl">
              Faites glisser pour explorer nos univers d'exception organisés sous le Pavillon Casbah de la SAFEX d'Alger.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-black hover:border-[#0066cc] transition-all active:scale-95 shadow-sm"
              aria-label="Salon précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-black hover:border-[#0066cc] transition-all active:scale-95 shadow-sm"
              aria-label="Salon suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden bg-[#f5f5f7] border border-black/10 shadow-xl">
          {SALONS_DATA.map((salon, index) => {
            if (index !== activeIndex) return null;

            return (
              <div key={salon.id} className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] animate-in fade-in zoom-in-95 duration-500">
                
                {/* Visual / Media Side */}
                <div className="lg:col-span-7 relative overflow-hidden group min-h-[320px] lg:min-h-full">
                  <img
                    src={salon.heroImage}
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#f5f5f7]/50 lg:to-[#f5f5f7]" />

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                    <span 
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider text-slate-950 shadow-md uppercase"
                      style={{ backgroundColor: salon.accentColor }}
                    >
                      {salon.edition}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 border border-black/10 text-[#1d1d1f] text-xs font-medium backdrop-blur-md shadow-sm">
                      {salon.pavilion}
                    </span>
                  </div>

                  {/* World Badges Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-2">
                    {salon.worlds.map((w, wIdx) => (
                      <span 
                        key={wIdx} 
                        className="px-2.5 py-1 rounded-lg bg-white/90 border border-black/10 text-[11px] text-[#1d1d1f] backdrop-blur-md shadow-sm"
                      >
                        {w.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-[#f5f5f7]">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="font-mono text-xs text-[#86868b] tracking-widest uppercase">
                        {salon.venue}
                      </span>
                      <span className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0066cc]" />
                        {salon.date}
                      </span>
                    </div>

                    <h3 
                      className="font-serif text-4xl sm:text-5xl font-black tracking-tight uppercase"
                      style={{ color: salon.accentColor }}
                    >
                      {salon.name}
                    </h3>

                    <p className="text-[#515154] text-sm sm:text-base mt-3 leading-relaxed font-normal">
                      {salon.description}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-black/10">
                    {salon.stats.slice(0, 4).map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white p-3 rounded-2xl border border-black/10 shadow-sm">
                        <p className="font-serif text-2xl font-black" style={{ color: salon.accentColor }}>
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-[#86868b] leading-tight mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => setCurrentPage(salon.id as PageId)}
                      className="flex-1 px-6 py-3.5 rounded-2xl text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group active:scale-95"
                      style={{ backgroundColor: salon.accentColor }}
                    >
                      <span>Découvrir {salon.name}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="px-5 py-3.5 rounded-2xl bg-white border border-black/10 hover:border-black/30 text-[#1d1d1f] text-xs font-semibold transition-all shrink-0 shadow-sm"
                    >
                      Réserver un stand
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Thumbnails Navigator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {SALONS_DATA.map((salon, idx) => (
            <button
              key={salon.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-center gap-4 ${
                activeIndex === idx
                  ? 'bg-white border-[#0066cc] shadow-md ring-1 ring-[#0066cc]/30'
                  : 'bg-[#f5f5f7] border-black/10 hover:bg-white opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-black/10">
                <img src={salon.heroImage} alt={salon.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="min-w-0">
                <p className="font-serif font-bold text-[#1d1d1f] text-sm truncate uppercase" style={{ color: activeIndex === idx ? salon.accentColor : '#1d1d1f' }}>
                  {salon.name}
                </p>
                <p className="text-[11px] text-[#86868b] truncate mt-0.5">
                  {salon.date}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
