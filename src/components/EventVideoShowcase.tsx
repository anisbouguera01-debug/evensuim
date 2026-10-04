import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../assets/images';
import { 
  Images, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  X, 
  Sparkles, 
  Award, 
  Calendar, 
  Eye, 
  Building,
  CheckCircle2,
  Camera,
  Play,
  Pause,
  Video,
  Volume2,
  VolumeX
} from 'lucide-react';

interface PhotoHighlight {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  badge: string;
  badgeColor: string;
}

interface EventVideoShowcaseProps {
  customVideoUrl: string | null;
  onVideoUpload: (url: string | null) => void;
}

export const EventVideoShowcase: React.FC<EventVideoShowcaseProps> = ({ customVideoUrl, onVideoUpload }) => {
  const [activePhotoModal, setActivePhotoModal] = useState<PhotoHighlight | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onVideoUpload(url);
    }
  };

  // Sync mute state programmatically to bypass aggressive browser autoplay blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, customVideoUrl]);

  const photoHighlights: PhotoHighlight[] = [
    {
      id: 'inauguration-ceremony',
      title: 'Inauguration Officielle & Coupure du Ruban CHOCORIUM',
      category: 'Cérémonie Officielle',
      image: IMAGES.chocoriumInauguration,
      description: 'Cérémonie d\'ouverture inaugurale au Pavillon SAFEX en présence du chef exécutif et des dignitaires officiels du salon.',
      badge: 'Inauguration VIP',
      badgeColor: '#88D4B0'
    },
    {
      id: 'palmary-stand-animation',
      title: 'Dégustation Gourmande & Animation au Stand Palmary',
      category: 'Animation Exposants',
      image: IMAGES.chocoriumPalmaryStand,
      description: 'Distribution d\'échantillons exclusifs de biscuits et cookies Palmary Gourmand par l\'équipe d\'hôtesses auprès des visiteurs.',
      badge: 'Stand Palmary',
      badgeColor: '#9B68A6'
    },
    {
      id: 'millotti-coffee-bar',
      title: 'Millotti Espresso — Torréfaction & Dégustation Barista',
      category: 'Espace Barista',
      image: IMAGES.chocoriumMillottiCoffee,
      description: 'Démonstrations d\'extraction espresso sur machine professionnelle et dégustations offertes sur le stand Millotti.',
      badge: 'Millotti Espresso',
      badgeColor: '#1B365D'
    },
    {
      id: 'tartinella-tasting-stand',
      title: 'Stand Tartinella — Pâte à Tartiner Gourmet & Crêpes',
      category: 'Dégustations Live',
      image: IMAGES.chocoriumTartinellaTasting,
      description: 'Présentation de la gamme Tartinella au chocolat noisette avec préparation de crêpes artisanales pour le public.',
      badge: 'Tartinella Gourmet',
      badgeColor: '#C5A059'
    }
  ];

  // Auto-play video smoothly on scroll detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted and playsInline programmatically for iOS/Safari compliance
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay policy prevented playback until user interaction
          });
        }
      }
    };

    // Try playing immediately if already visible
    playVideo();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-sky-50/90 relative overflow-hidden font-sans border-t border-sky-200/80">
      
      {/* Background Subtle Grid Decorator */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] font-mono text-xs uppercase tracking-widest mb-3 shadow-sm">
            <Video className="w-4 h-4 text-[#88D4B0] animate-pulse" />
            <span>Vidéo Immersive & Highlights SAFEX</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            MOMENTS FORTS & <span className="text-[#1B365D]">DÉGUSTATIONS SAFEX</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans leading-relaxed">
            Plongez au cœur des stands d'exception : inaugurations, animations et ambiance générale au Pavillon Casbah SAFEX.
          </p>
        </motion.div>

        {/* Constrained & Elegant Video Banner (NOT full width of page, but inside max-w-7xl) */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 group"
        >
          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            {/* Sound Mute/Unmute Toggle Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-950 text-white border border-slate-700 backdrop-blur-md text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-xl select-none"
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>Activer le son</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#88D4B0] animate-bounce" />
                  <span>Couper le son</span>
                </>
              )}
            </button>
          </div>

          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
            <video
              ref={videoRef}
              key="default"
              src="https://vjs.zencdn.net/v/oceans.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              poster={IMAGES.chocoriumInauguration}
              onError={(e) => {
                console.warn("Video stream load error, poster displayed fallback.");
              }}
              className="w-full h-full object-cover filter brightness-105 contrast-110 transform-gpu group-hover:scale-[1.01] transition-transform duration-700"
            />
            
            {/* Subtle Top & Bottom Gradient Vignette for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Photo Highlights Section Title */}
        <div className="mt-20 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4 text-[#88D4B0]" />
              <span>Galerie Photo Exclusive</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              HIGHLIGHTS DU SALON EN IMAGES
            </h3>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md font-sans">
            Cliquez sur un moment fort pour l'ouvrir en grand format, découvrir les détails de l'inauguration et les stands clés.
          </p>
        </div>

        {/* Photo Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoHighlights.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-3 border border-sky-100 shadow-lg shadow-sky-100/50 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container with Hover Overlay */}
              <div 
                onClick={() => setActivePhotoModal(photo)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-inner group-hover:brightness-105 transition-all"
              >
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1B365D]" />
                    Agrandir
                  </span>
                </div>
                
                {/* Float Category Badge */}
                <div className="absolute top-3 left-3">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white tracking-wider shadow-md backdrop-blur-sm"
                    style={{ backgroundColor: `${photo.badgeColor}ef` }}
                  >
                    {photo.badge}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-2 flex-grow flex flex-col justify-between mt-3">
                <div>
                  <span className="text-[10px] font-bold text-[#1B365D] uppercase tracking-wider block mb-1">
                    {photo.category}
                  </span>
                  <h4 
                    onClick={() => setActivePhotoModal(photo)}
                    className="font-serif text-sm font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#1B365D] transition-colors line-clamp-2"
                  >
                    {photo.title}
                  </h4>
                </div>
                <p className="text-slate-500 text-xs line-clamp-2 mt-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal for Photo Showcase */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Close trigger overlay */}
            <div className="absolute inset-0" onClick={() => setActivePhotoModal(null)} />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full relative z-10 shadow-2xl flex flex-col md:flex-row border border-slate-200/80"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Column */}
              <div className="md:w-3/5 bg-slate-950 relative aspect-video md:aspect-auto flex items-center justify-center">
                <img 
                  src={activePhotoModal.image} 
                  alt={activePhotoModal.title}
                  className="w-full h-full object-cover max-h-[70vh] md:max-h-[80vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text / Info Column */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                      style={{ backgroundColor: activePhotoModal.badgeColor }}
                    >
                      {activePhotoModal.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      {activePhotoModal.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    {activePhotoModal.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {activePhotoModal.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Pavillon Casbah SAFEX
                  </span>
                  <button
                    onClick={() => setActivePhotoModal(null)}
                    className="px-5 py-2 rounded-xl bg-[#1B365D] hover:bg-[#1B365D]/90 text-white font-bold text-xs transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
