import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  videoUrl?: string;
  aspectRatio: string;
}

const GALLERY_MEDIA: MediaItem[] = [
  {
    id: 'aw1',
    type: 'photo',
    url: IMAGES.chocoriumInauguration,
    aspectRatio: 'w-[320px] sm:w-[420px] aspect-[16/10]',
  },
  {
    id: 'aw2',
    type: 'video',
    url: IMAGES.chocoriumHeroBg,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-gourmet-dessert-42790-large.mp4',
    aspectRatio: 'w-[260px] sm:w-[320px] aspect-[3/4]',
  },
  {
    id: 'aw3',
    type: 'photo',
    url: IMAGES.chocoriumPalmaryStand,
    aspectRatio: 'w-[380px] sm:w-[480px] aspect-[16/9]',
  },
  {
    id: 'aw4',
    type: 'photo',
    url: IMAGES.chocoriumMillottiCoffee,
    aspectRatio: 'w-[280px] sm:w-[340px] aspect-square',
  },
  {
    id: 'aw5',
    type: 'video',
    url: IMAGES.chocoriumMillottiCoffee,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-coffee-being-poured-into-a-cup-40899-large.mp4',
    aspectRatio: 'w-[340px] sm:w-[440px] aspect-[16/10]',
  },
  {
    id: 'aw6',
    type: 'photo',
    url: IMAGES.chocoriumTartinellaTasting,
    aspectRatio: 'w-[300px] sm:w-[380px] aspect-[4/3]',
  },
  {
    id: 'aw7',
    type: 'video',
    url: IMAGES.chocoriumHeroBg,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chocolate-fountain-pouring-gourmet-chocolate-42791-large.mp4',
    aspectRatio: 'w-[260px] sm:w-[310px] aspect-[9/16]',
  },
  {
    id: 'aw8',
    type: 'photo',
    url: IMAGES.milktecHeroBg,
    aspectRatio: 'w-[420px] sm:w-[540px] aspect-[21/9]',
  },
  {
    id: 'aw9',
    type: 'photo',
    url: IMAGES.evensiumHeroBg,
    aspectRatio: 'w-[360px] sm:w-[460px] aspect-[16/10]',
  },
  {
    id: 'aw10',
    type: 'photo',
    url: IMAGES.clinicaHeroBg,
    aspectRatio: 'w-[310px] sm:w-[390px] aspect-[4/3]',
  },
];

interface GalleryItemProps {
  item: MediaItem;
}

const GalleryItemElement: React.FC<GalleryItemProps> = ({ item }) => {
  const [videoError, setVideoError] = useState(false);

  if (item.type === 'video' && item.videoUrl && !videoError) {
    return (
      <div className="w-full h-full relative bg-slate-950">
        <video
          src={item.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => {
            console.warn("Gallery video failed to load, falling back to static image.");
            setVideoError(true);
          }}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-100">
      <img
        src={item.url}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export const AwwwardsInfiniteGallery: React.FC = () => {
  // We duplicate the media list to create a flawless infinite ticker
  const marqueeListTrack1 = [...GALLERY_MEDIA, ...GALLERY_MEDIA];
  const marqueeListTrack2 = [...GALLERY_MEDIA.slice().reverse(), ...GALLERY_MEDIA.slice().reverse()];

  return (
    <section className="py-24 bg-gradient-to-b from-sky-100/70 via-sky-50 to-sky-100/70 relative overflow-hidden font-sans border-y border-sky-200/80">
      
      {/* Background Luminous Mesh Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-sky-400/25 via-blue-400/20 to-cyan-300/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-bl from-cyan-400/25 via-sky-300/20 to-blue-400/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/80 text-indigo-700 shadow-sm backdrop-blur-md mb-4 text-xs font-semibold tracking-wide uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Galerie Visuelle • Défilement Continu</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900"
        >
          L'Atmosphère EVENSIUM <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            En Mouvement Perpétuel.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Moments forts, démonstrations culinaires et halls d'exposition du Pavillon Casbah à la SAFEX.
        </motion.p>
      </div>

      {/* INFINITE SCROLLING TICKER TRACK 1 (Moving Left) */}
      <div className="w-full overflow-hidden py-3 relative z-20 group">
        <div className="flex gap-5 sm:gap-7 w-max animate-awwwards-marquee">
          {marqueeListTrack1.map((item, idx) => (
            <div
              key={`track1-${item.id}-${idx}`}
              className={`shrink-0 rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-out ${item.aspectRatio}`}
            >
              <GalleryItemElement item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* INFINITE SCROLLING TICKER TRACK 2 (Moving Right in Opposite Direction) */}
      <div className="w-full overflow-hidden py-3 relative z-20 mt-2">
        <div className="flex gap-5 sm:gap-7 w-max animate-awwwards-marquee-reverse">
          {marqueeListTrack2.map((item, idx) => (
            <div
              key={`track2-${item.id}-${idx}`}
              className={`shrink-0 rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-out ${item.aspectRatio}`}
            >
              <GalleryItemElement item={item} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

