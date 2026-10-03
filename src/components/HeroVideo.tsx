import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { IMAGES } from '../assets/images';
import { ChevronRight, Sparkles } from 'lucide-react';

interface HeroVideoProps {
  setCurrentPage: (page: PageId) => void;
}

const HERO_PHOTOS = [
  { id: 'p1', url: IMAGES.chocoriumInauguration, aspect: 'w-[360px] sm:w-[480px] aspect-[16/10]' },
  { id: 'p2', url: IMAGES.chocoriumPalmaryStand, aspect: 'w-[320px] sm:w-[420px] aspect-[16/9]' },
  { id: 'p3', url: IMAGES.chocoriumMillottiCoffee, aspect: 'w-[300px] sm:w-[380px] aspect-[4/3]' },
  { id: 'p4', url: IMAGES.chocoriumTartinellaTasting, aspect: 'w-[340px] sm:w-[440px] aspect-[16/10]' },
  { id: 'p5', url: IMAGES.milktecHeroBg, aspect: 'w-[380px] sm:w-[500px] aspect-[16/9]' },
  { id: 'p6', url: IMAGES.evensiumHeroBg, aspect: 'w-[320px] sm:w-[420px] aspect-[16/10]' },
  { id: 'p7', url: IMAGES.clinicaHeroBg, aspect: 'w-[300px] sm:w-[380px] aspect-[4/3]' },
  { id: 'p8', url: IMAGES.chocoriumHeroBg, aspect: 'w-[360px] sm:w-[460px] aspect-[16/9]' },
];

export const HeroVideo: React.FC<HeroVideoProps> = ({ setCurrentPage }) => {
  const marqueePhotos = [...HERO_PHOTOS, ...HERO_PHOTOS, ...HERO_PHOTOS];
  const videoUrl = 'https://vjs.zencdn.net/v/oceans.mp4';

  return (
    <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 text-slate-900 pt-32 pb-16">
      
      {/* 1. ANIMATED AMBIENT BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-110 contrast-125 opacity-15"
          src={videoUrl}
        />
        {/* Soft radial mask over background video */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/85 via-slate-50/20 to-slate-50" />
      </div>

      {/* 2. Luminous Light Rays ("Traits de lumière") & Ambient Backdrop Glares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-400/10 rounded-full blur-[170px] pointer-events-none" />
      
      {/* Diagonal Sweeping Laser Ray of Light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1400px] h-[180px] bg-gradient-to-r from-transparent via-indigo-400/15 to-transparent blur-3xl animate-ray-sweep pointer-events-none" />

      {/* FLOATING AMBIENT LIGHT PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/60 blur-[1px] shadow-sm"
            style={{
              width: `${6 + (i % 4) * 4}px`,
              height: `${6 + (i % 4) * 4}px`,
              left: `${(i * 8.5) % 95}%`,
              top: `${(i * 12) % 85}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 6 + (i % 5) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Dynamic Ambient Glow Backdrop */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[380px] rounded-full blur-[140px] pointer-events-none opacity-50 bg-sky-200"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Pill Badge with Light Beam Border */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 border border-indigo-100 text-indigo-900 shadow-sm backdrop-blur-xl text-xs sm:text-sm font-semibold tracking-wide uppercase relative group overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
            <span>SAFEX Pavillon Casbah • Alger, Algérie</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </span>
        </motion.div>

        {/* Large Pro Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto mb-8 relative"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] flex flex-col justify-center items-center">
            <span className="relative">
              EVENSIUM 2026.
              {/* Subtle top light reflection line */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-beam-pulse" />
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-700 font-extrabold uppercase mt-4 tracking-wider">
            Créateur de Salons Internationaux d'Excellence
          </p>

          {/* Luminous Horizontal Light Beam Accent Line (Trait de lumière) */}
          <div className="w-full max-w-2xl mx-auto h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent my-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3 animate-ray-sweep" />
          </div>

          {/* Subtitle */}
          <div className="h-auto flex items-center justify-center mt-3">
            <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-xl mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>L'excellence événementielle reliant les leaders d'industries</span>
            </p>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
            Découvrez nos salons d'exception au Palais des Expositions SAFEX d'Alger : <strong className="text-amber-800 font-semibold">CHOCORIUM</strong>, le carrefour du chocolat & de la confiserie, et <strong className="text-blue-700 font-semibold">CLINICA</strong>, l'événement majeur du secteur médical.
          </p>

          {/* Action Links */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 text-sm sm:text-base font-semibold">
            <button
              onClick={() => setCurrentPage('salons')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 active:scale-95 group"
            >
              <span>Découvrir nos salons</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-white hover:bg-slate-50 text-blue-600 border border-slate-200/90 px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-95 group"
            >
              <span>Réserver un stand SAFEX</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* PURE PHOTO TICKER (GAUCHE -> DROITE) - AUCUN BOUTON, AUCUNE ÉCRITURE SUR LES PHOTOS */}
      <div className="w-full overflow-hidden py-6 relative z-20 mt-2">
        <div className="flex gap-6 w-max animate-awwwards-marquee-reverse">
          {marqueePhotos.map((photo, idx) => (
            <div
              key={`hero-photo-${photo.id}-${idx}`}
              className={`shrink-0 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-out ${photo.aspect}`}
            >
              <img
                src={photo.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[28px] bg-white border border-slate-200 text-slate-900 shadow-md"
        >
          <div className="text-center p-2">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">+15</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Éditions Réussies</p>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">+50 000</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Visiteurs Qualifiés</p>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">+350</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Marques B2B</p>
          </div>
          <div className="text-center p-2 border-l border-slate-200">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">100%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">SAFEX Pavillon Casbah</p>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
