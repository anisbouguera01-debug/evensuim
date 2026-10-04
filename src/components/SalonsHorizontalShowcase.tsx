import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { SALONS_DATA } from '../data/mockData';
import { IMAGES } from '../assets/images';
import { ArrowRight, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

interface SalonsHorizontalShowcaseProps {
  setCurrentPage: (page: PageId) => void;
}

export const SalonsHorizontalShowcase: React.FC<SalonsHorizontalShowcaseProps> = ({ setCurrentPage }) => {
  // Retrieve the 3 salons
  const chocorium = SALONS_DATA.find((s) => s.id === 'chocorium') || SALONS_DATA[0];
  const milktec = SALONS_DATA.find((s) => s.id === 'milktec') || SALONS_DATA[1];
  const clinica = SALONS_DATA.find((s) => s.id === 'clinica') || SALONS_DATA[2];

  const baseSalons = [chocorium, milktec, clinica];

  // Custom theme configurations per salon ID
  const salonThemes: Record<string, {
    cardBg: string;
    borderColor: string;
    hoverBorder: string;
    glowShadow: string;
    titleColor: string;
    titleHover: string;
    textColor: string;
    subtextColor: string;
    badgeStyle: string;
    iconColor: string;
    btnStyle: string;
    accentDot: string;
    fallbackImg: string;
  }> = {
    chocorium: {
      cardBg: 'bg-gradient-to-b from-[#28170D] via-[#1D0F08] to-[#120804]',
      borderColor: 'border-amber-600/70',
      hoverBorder: 'hover:border-amber-400',
      glowShadow: 'shadow-[0_0_40px_rgba(217,119,6,0.35)]',
      titleColor: 'text-white',
      titleHover: 'group-hover:text-amber-400',
      textColor: 'text-amber-100/90',
      subtextColor: 'text-amber-200/70',
      badgeStyle: 'bg-amber-950/90 text-amber-300 border-amber-500/60 ring-2 ring-amber-500/20',
      iconColor: 'text-amber-400',
      btnStyle: 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-amber-950/60 font-black',
      accentDot: 'bg-amber-400',
      fallbackImg: IMAGES.chocorium2026Poster,
    },
    milktec: {
      cardBg: 'bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#0c4a6e]',
      borderColor: 'border-sky-300/70',
      hoverBorder: 'hover:border-sky-200',
      glowShadow: 'shadow-[0_0_40px_rgba(56,189,248,0.35)]',
      titleColor: 'text-white',
      titleHover: 'group-hover:text-sky-200',
      textColor: 'text-sky-100/90',
      subtextColor: 'text-sky-200/80',
      badgeStyle: 'bg-sky-950/90 text-sky-200 border-sky-400/60 ring-2 ring-sky-400/20',
      iconColor: 'text-sky-300',
      btnStyle: 'bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 hover:from-white hover:to-sky-100 text-sky-950 shadow-sky-950/60 font-black',
      accentDot: 'bg-sky-300',
      fallbackImg: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80',
    },
    clinica: {
      cardBg: 'bg-gradient-to-b from-white via-slate-50 to-slate-100',
      borderColor: 'border-cyan-500/60',
      hoverBorder: 'hover:border-cyan-600',
      glowShadow: 'shadow-[0_15px_40px_rgba(6,182,212,0.2)]',
      titleColor: 'text-slate-900',
      titleHover: 'group-hover:text-cyan-700',
      textColor: 'text-slate-700',
      subtextColor: 'text-slate-500',
      badgeStyle: 'bg-slate-950 text-white border-cyan-500/60 ring-2 ring-cyan-500/20',
      iconColor: 'text-cyan-600',
      btnStyle: 'bg-gradient-to-r from-slate-900 to-cyan-800 hover:from-cyan-800 hover:to-cyan-700 text-white shadow-slate-400/50 font-black',
      accentDot: 'bg-cyan-500',
      fallbackImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 relative overflow-hidden border-t border-sky-200">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300/80 text-sky-900 font-mono text-[11px] uppercase tracking-widest mb-3 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Nos Événements d'Excellence</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight uppercase text-slate-900">
            RÉTROSPECTIVE DE NOS <span className="text-sky-700">SALONS</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-sans leading-relaxed">
            Découvrez nos salons d'exception CHOCORIUM et CLINICA. Parcourez leurs anciennes éditions, leurs chiffres clés et leurs témoignages.
          </p>
        </motion.div>

        {/* 3 Side-by-side Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {baseSalons.map((salon) => {
            const pageIdMap: Record<string, PageId> = {
              chocorium: 'chocorium2026',
              milktec: 'milktec',
              clinica: 'clinica2027',
            };

            const targetPage = pageIdMap[salon.id] || 'home';
            const theme = salonThemes[salon.id] || salonThemes.chocorium;

            return (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`group ${theme.cardBg} ${theme.borderColor} ${theme.hoverBorder} ${theme.glowShadow} border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between relative cursor-pointer shadow-xl hover:scale-[1.02]`}
                onClick={() => setCurrentPage(targetPage)}
              >
                {/* Top Image Banner */}
                <div className="relative overflow-hidden bg-slate-900 aspect-[16/10]">
                  <img
                    src={salon.id === 'chocorium' ? IMAGES.chocorium2026Poster : (salon.id === 'milktec' ? 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80' : (salon.id === 'clinica' ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80' : (salon.heroImage || theme.fallbackImg)))}
                    alt={salon.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${salon.id === 'clinica' ? 'from-white via-white/10' : 'from-slate-950/95 via-slate-950/40'} to-transparent`} />
                  
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border shadow-md flex items-center gap-1.5 ${theme.badgeStyle}`}>
                    <Star className="w-3 h-3 fill-current animate-pulse" />
                    <span>Rétrospective</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className={`font-serif font-black text-2xl sm:text-3xl tracking-tight ${theme.titleColor} ${theme.titleHover} transition-colors`}>
                      {salon.name}
                    </h3>
                    
                    <p className={`${theme.textColor} text-xs sm:text-sm line-clamp-2 leading-relaxed`}>
                      {salon.tagline}
                    </p>

                    <div className={`pt-2 space-y-1.5 text-xs font-mono ${theme.subtextColor}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-4 h-4 ${theme.iconColor} shrink-0`} />
                        <span>Éditions passées : 2024, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-4 h-4 ${theme.iconColor} shrink-0`} />
                        <span>SAFEX Alger & Sheraton Club des Pins</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Button */}
                  <div
                    className={`w-full rounded-xl ${theme.btnStyle} uppercase tracking-wider py-3.5 text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 shadow-md`}
                  >
                    <span>Explorer le Salon {salon.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
