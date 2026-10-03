import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Building, 
  ArrowUpRight, 
  CheckCircle2,
  Users
} from 'lucide-react';

interface EventCountdownProps {
  setCurrentPage: (page: PageId) => void;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({ setCurrentPage }) => {
  // Target date: September 23, 2026
  const targetDate = new Date('2026-09-23T09:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-20 bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 relative overflow-hidden font-sans border-y border-sky-200">
      
      {/* Background Sky Blue Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-300/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Frame */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-amber-950/20 border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Event Specs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-slate-950 uppercase shadow-md">
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                  Prochain Événement
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  2ème Édition • SAFEX Pavillon Casbah
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                CHOCORIUM <span className="text-amber-400">2026</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Le Salon International du Chocolat, du Café et de la Gourmandise réunit l'élite des artisans, industriels et gourmets d'Algérie et de la scène internationale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Dates :</strong> 23 au 26 Septembre 2026</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Lieu :</strong> SAFEX Pavillon Casbah, Alger</span>
                </div>
              </div>

              {/* Floorplan Availability Pill */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <p className="text-xs text-amber-200">
                    <strong className="text-white">Disponibilité des Emplacements :</strong> 78% des stands déjà réservés.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  Pavillon Casbah
                </span>
              </div>

            </div>

            {/* Right Column: Giant Countdown Clock & CTA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-xl space-y-8">
              
              <div className="text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  Ouverture dans
                </span>
                <p className="text-slate-400 text-xs">Compte à Rebours Officiel</p>
              </div>

              {/* Giant Countdown Units */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
                
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/30">
                  <span className="font-serif text-2xl sm:text-4xl font-black text-amber-300">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-1">Jours</span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/30">
                  <span className="font-serif text-2xl sm:text-4xl font-black text-amber-300">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-1">Heures</span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/30">
                  <span className="font-serif text-2xl sm:text-4xl font-black text-amber-300">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-1">Min</span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-amber-500/30">
                  <span className="font-serif text-2xl sm:text-4xl font-black text-amber-400 animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-1">Sec</span>
                </div>

              </div>

              {/* Primary Action Button */}
              <div className="w-full space-y-3">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Réserver un Stand pour CHOCORIUM</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentPage('chocorium')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-amber-300 text-xs font-semibold border border-amber-500/20 transition-all text-center"
                >
                  Voir le programme & Sponsoring
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
