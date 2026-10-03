import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  Users, 
  Award, 
  Building2, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface HomeBentoGridProps {
  setCurrentPage: (page: PageId) => void;
}

export const HomeBentoGrid: React.FC<HomeBentoGridProps> = ({ setCurrentPage }) => {
  // Target date: September 23, 2026
  const targetDate = new Date('2026-09-23T09:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-16 bg-white relative overflow-hidden font-sans border-b border-black/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Apple-Style Bento Grid Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="text-xs font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
              Plateforme Événementielle
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              L'Écosystème EVENSIUM.
            </h2>
          </div>
          <p className="text-[#515154] text-xs sm:text-sm max-w-md font-normal">
            Découvrez nos salons internationaux, indicateurs clés et opportunités d'exposition sous le Pavillon Casbah SAFEX.
          </p>
        </motion.div>

        {/* Apple Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Main Hero Bento (Span 7 - Apple Light Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 apple-card-light p-8 sm:p-10 flex flex-col justify-between min-h-[380px] relative overflow-hidden group shadow-lg"
          >
            <div className="space-y-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-[#0f8a53]/15 text-[#0f8a53] border border-[#0f8a53]/30 text-xs font-semibold inline-block">
                Savoir-faire Événementiel
              </span>

              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                L'Art de créer des <br />
                <span className="text-[#0f8a53]">Salons d'Exception.</span>
              </h1>

              <p className="text-[#515154] text-sm max-w-lg leading-relaxed font-normal">
                Concepteur et organisateur de salons professionnels internationaux en Algérie. Nous accompagnons les plus grandes marques dans leur expansion B2B.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 relative z-10">
              <button
                onClick={() => setCurrentPage('contact')}
                className="bg-[#0f8a53] hover:bg-[#0c6e42] text-white font-semibold px-6 py-2.5 rounded-full text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Réserver un Stand</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('about')}
                className="apple-link text-xs font-semibold"
              >
                <span>En savoir plus sur EVENSIUM</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Countdown Card (Span 5 - Apple Light Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 apple-card-light p-6 sm:p-8 flex flex-col justify-between min-h-[380px] relative overflow-hidden shadow-lg border border-black/10"
          >
            <div className="space-y-3">
              <div className="badge-bento badge-mint">
                <Clock className="w-3.5 h-3.5 text-[#0f8a53]" />
                Prochain Événement
              </div>

              <div className="text-xs uppercase tracking-wider text-[#0f8a53] font-mono font-semibold">
                CHOCORIUM 2026 • SAFEX Pavillon Casbah
              </div>

              {/* Countdown Display */}
              <div className="my-6">
                <div className="font-mono text-3xl sm:text-4xl font-bold tracking-widest text-[#1d1d1f] flex items-center justify-center gap-2 bg-white py-4 rounded-2xl border border-black/10 shadow-sm">
                  <span>{timeLeft.days}</span>
                  <span className="text-xs text-slate-400 font-sans">:</span>
                  <span>{timeLeft.hours}</span>
                  <span className="text-xs text-slate-400 font-sans">:</span>
                  <span>{timeLeft.minutes}</span>
                  <span className="text-xs text-slate-400 font-sans">:</span>
                  <span className="text-[#0f8a53] animate-pulse">{timeLeft.seconds}</span>
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 text-center mt-2">
                  Jours : Heures : Min : Sec
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('chocorium')}
              className="w-full bg-[#1d1d1f] hover:bg-black text-white font-semibold py-3 px-4 rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Explorer CHOCORIUM 2026</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 3: Salon CHOCORIUM Bento (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setCurrentPage('chocorium')}
            className="md:col-span-3 apple-card-light p-6 flex flex-col justify-between min-h-[340px] relative overflow-hidden group cursor-pointer border-b-4 border-b-[#C5A059] shadow-lg"
          >
            <div className="relative z-10 space-y-2.5">
              <span className="text-[10px] font-semibold text-[#8a6b29] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 inline-block">
                01. Salon Gourmand
              </span>
              <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#C5A059] transition-colors">
                CHOCORIUM
              </h3>
              <p className="text-xs text-[#515154] leading-relaxed font-normal">
                Salon International du Chocolat, Café & Gourmandises.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8a6b29] pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>23–26 Sept. 2026</span>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <span className="apple-link-mint text-xs font-semibold">
                Découvrir le salon &gt;
              </span>
            </div>
          </motion.div>

          {/* Card 4: Salon MILKTEC Bento (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setCurrentPage('milktec')}
            className="md:col-span-3 apple-card-light p-6 flex flex-col justify-between min-h-[340px] relative overflow-hidden group cursor-pointer border-b-4 border-b-[#0f8a53] shadow-lg"
          >
            <div className="relative z-10 space-y-2.5">
              <span className="text-[10px] font-semibold text-[#0f8a53] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0f8a53]/15 border border-[#0f8a53]/30 inline-block">
                02. Lait & Industrie
              </span>
              <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0f8a53] transition-colors">
                MILKTEC
              </h3>
              <p className="text-xs text-[#515154] leading-relaxed font-normal">
                Salon International du Lait et de l'Équipement Laitier.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#0f8a53] pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>23–26 Sept. 2026</span>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <span className="apple-link-mint text-xs font-semibold">
                Découvrir le salon &gt;
              </span>
            </div>
          </motion.div>

          {/* Card 5: Stat Card (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 apple-card-light p-6 flex flex-col justify-between min-h-[340px] group shadow-lg"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-semibold text-[#1B365D] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 border border-slate-300 inline-block">
                Chiffres Clés SAFEX
              </span>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#1d1d1f]">
                  +450
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-1">
                  Exposants Internationaux
                </div>
              </div>

              <div className="h-[1px] bg-slate-200 w-full" />

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#1B365D]">
                  12K+
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-1">
                  Visiteurs & Décideurs B2B
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B365D]" />
              <span>Pavillon Casbah SAFEX Alger</span>
            </div>
          </motion.div>

          {/* Card 6: Exposant Call To Action (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setCurrentPage('contact')}
            className="md:col-span-3 apple-card-light p-6 flex flex-col justify-between min-h-[340px] relative overflow-hidden group cursor-pointer border border-[#0066cc]/30 shadow-lg"
          >
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-semibold text-[#0066cc] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/30 inline-block">
                Espace Exposants
              </span>

              <h3 className="text-2xl font-bold text-[#1d1d1f] leading-tight group-hover:text-[#0066cc] transition-colors">
                REJOIGNEZ <br />
                L'ÉLITE SAFEX
              </h3>

              <p className="text-xs text-[#515154] leading-relaxed font-normal">
                Réservez votre emplacement stratégique au Pavillon Casbah.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between border-t border-black/10">
              <span className="apple-link text-xs font-semibold">
                Réserver un stand &gt;
              </span>

              <div className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold group-hover:scale-110 transition-transform shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
