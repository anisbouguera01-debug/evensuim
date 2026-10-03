import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import { 
  Camera, 
  X, 
  Maximize2, 
  Filter, 
  Sparkles, 
  Play, 
  Tag, 
  ChevronLeft, 
  ChevronRight,
  Film
} from 'lucide-react';

export const ImmersiveGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['Tous', 'Tirages & TV', 'Cérémonie', 'Ateliers', 'Exposants', 'Café & Barista', 'Technologie'];

  const filteredItems = selectedCategory === 'Tous'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setActiveItem(item);
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(i => i.id === activeItem.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = GALLERY_ITEMS.length - 1;
    if (nextIndex >= GALLERY_ITEMS.length) nextIndex = 0;
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <Camera className="w-3.5 h-3.5 text-[#88D4B0]" />
              Immersion Visuelle & Galerie Photos
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              GALERIE IMMERSIVE & ARCHIVES <span className="text-[#1B365D]">SAFEX</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Revivez l'atmosphère vibrante, les démonstrations de grands chefs, les tirages tombola TV et l'affluence des éditions d'EVENSIUM.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B365D] text-white shadow-lg'
                    : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#88D4B0] transition-all cursor-pointer aspect-[4/3] sm:aspect-square"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono font-semibold text-[#88D4B0] backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-700 text-white backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h4 className="font-serif font-bold text-white text-sm line-clamp-1 group-hover:text-[#88D4B0] transition-colors">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-slate-300 text-xs line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-all z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-all z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-white">
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="badge-bento badge-mint">{activeItem.category}</span>
                <h3 className="font-serif font-bold text-white text-lg mt-2">
                  {activeItem.title}
                </h3>
                {activeItem.caption && (
                  <p className="text-slate-400 text-xs mt-1">
                    {activeItem.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
