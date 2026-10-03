import React, { useState } from 'react';
import { PageId } from '../types';
import { IMAGES } from '../assets/images';
import { 
  Award, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Quote,
  Star,
  History,
  Camera,
  Coffee,
  Cookie
} from 'lucide-react';

interface Chocorium2025PageProps {
  setCurrentPage: (page: PageId) => void;
}

export const Chocorium2025Page: React.FC<Chocorium2025PageProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('chocolat');

  // 2025 Categories
  const categories = [
    {
      id: 'chocolat',
      label: 'Chocolat',
      emoji: '🍫',
      title: 'Au Cœur du Chocolat — Édition 2025',
      tagline: 'Artisanat d\'excellence, tablettes de prestige et maîtres chocolatiers.',
      description: 'Une immersion sensorielle au royaume du cacao : démonstrations de sculpture sur chocolat en direct, fontaine géante de chocolat Chocorium, et ateliers de dégustation animés par les grands chefs.',
      textColorClass: 'text-[#8A6B29]',
      activeBorder: 'border-[#C5A059] bg-[#FFFBF7] text-[#3D2314] ring-2 ring-[#C5A059]/20',
      inactiveBorder: 'border-[#E5D7C7] hover:border-[#C5A059] bg-white hover:bg-[#FAF6F0]/50 text-[#4D2E1C]'
    },
    {
      id: 'cafe',
      label: 'Café',
      emoji: '☕',
      title: 'Au Cœur du Café — Édition 2025',
      tagline: 'Torréfaction artisanale, arômes intenses et baristas d\'élite.',
      description: 'Le voyage du grain à la tasse : championnat de Latte Art 2025, dégustation de cafés de spécialité torréfiés sur place, et rencontres B2B entre importateurs et artisans.',
      textColorClass: 'text-[#5C3A21]',
      activeBorder: 'border-[#5C3A21] bg-[#FFFBF7] text-[#3D2314] ring-2 ring-[#5C3A21]/20',
      inactiveBorder: 'border-[#E5D7C7] hover:border-[#5C3A21] bg-white hover:bg-[#FAF6F0]/50 text-[#4D2E1C]'
    },
    {
      id: 'gourmandise',
      label: 'Gourmandise',
      emoji: '🍬',
      title: 'Au Cœur de la Gourmandise — Édition 2025',
      tagline: 'Confiseries fines, bonbons traditionnels et douceurs créatives.',
      description: 'L\'univers de la pure tentation : guimauves artisanales, bonbons gélifiés, nougats traditionnels et caramels au beurre salé qui ont émerveillé plus de 18 000 visiteurs.',
      textColorClass: 'text-amber-600',
      activeBorder: 'border-amber-600 bg-[#FFFBF7] text-[#3D2314] ring-2 ring-amber-600/20',
      inactiveBorder: 'border-[#E5D7C7] hover:border-amber-600 bg-white hover:bg-[#FAF6F0]/50 text-[#4D2E1C]'
    }
  ];

  const activeCat = categories.find(c => c.id === selectedCategory) || categories[0];

  const stats2025 = [
    { label: 'Visiteurs Uniques', value: '18,400+' },
    { label: 'Exposants & Marques', value: '55+' },
    { label: 'Maîtres Chocolatiers', value: '12' },
    { label: 'Couverture Média', value: '14 Chaînes' }
  ];

  const highlights2025 = [
    'Lancement spectaculaire de la fontaine de chocolat géante Chocorium',
    'Conférence internationale sur l\'avenir de la filière cacaoyère',
    'Remise du prix "Le Cacao d\'Or" au meilleur artisan chocolatier algérien',
    'Ateliers pédagogiques et dégustations interactives pour le grand public'
  ];

  const testimonials = [
    {
      quote: "L'édition 2025 de Chocorium a surpassé nos attentes. Nous avons pu échanger directement avec des milliers de passionnés et signer de nouveaux contrats de distribution.",
      author: "Yacine Rahmani",
      role: "Directeur Commercial",
      company: "Palmary Biscuiterie",
      rating: 5
    },
    {
      quote: "Une organisation haut de gamme signée Evensium. L'espace d'exposition de la SAFEX était magnifiquement agencé pour mettre en valeur les créations artisanales.",
      author: "Amel Millotti",
      role: "Fondatrice",
      company: "Millotti Coffee & Co",
      rating: 5
    }
  ];

  return (
    <div className="bg-[#FAF6F0] text-[#3D2314] min-h-screen font-sans pt-28 pb-20 selection:bg-[#C5A059] selection:text-[#1D0F0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5D7C7] text-[#4D2E1C] text-xs font-bold shadow-sm hover:bg-[#F5ECE2] transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'Accueil
          </button>

          {/* Banner link to 2026 Edition */}
          <button
            onClick={() => setCurrentPage('chocorium2026')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5C3A21] hover:bg-[#4A2E1A] text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Découvrir L'Offre CHOCORIUM 2026 &gt;</span>
          </button>
        </div>

        {/* Hero Section CHOCORIUM 2025 */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2D160A] via-[#1D0F0A] to-[#3D2314] text-white p-8 sm:p-16 shadow-2xl border border-[#4D2E1C]/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_50%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5C78C] text-xs font-mono uppercase tracking-widest font-bold">
                <History className="w-4 h-4 text-[#C5A059]" />
                Archives & Rétrospective Officielle
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] block font-mono">
                  SALON INTERNATIONAL DU CHOCOLAT ET DE LA GOURMANDISE
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-none uppercase">
                  CHOCORIUM <span className="text-[#C5A059]">2025</span>
                </h1>
                <p className="text-[#F5ECE2] font-serif italic text-lg sm:text-xl">
                  2ème Édition — L'Éveil des Sens
                </p>
              </div>

              <p className="text-[#E5D7C7] text-sm sm:text-base leading-relaxed">
                Revivez le succès retentissant de l'édition 2025 du salon Chocorium, qui a rassemblé plus de 18 400 visiteurs, 55 exposants majeurs et l'élite des chocolatiers au Pavillon Casbah de la SAFEX (Alger).
              </p>

              {/* Event Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-[#1D0F0A]/80 border border-[#4D2E1C] p-4 rounded-2xl">
                  <Calendar className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">DATES LORS DU SALON</span>
                    <span className="text-sm font-bold text-white">Du 24 au 26 Septembre 2025</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#1D0F0A]/80 border border-[#4D2E1C] p-4 rounded-2xl">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">LIEU</span>
                    <span className="text-sm font-bold text-white">SAFEX, Pavillon Casbah, Alger</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Preview / Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl aspect-[4/3] bg-black/40">
                <img 
                  src={IMAGES.chocoriumTartinellaTasting} 
                  alt="Chocorium 2025 Dégustation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D0F0A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold font-mono">Dégustation Tartinella 2025</span>
                  <span className="bg-[#C5A059] text-[#1D0F0A] px-2 py-0.5 rounded text-[10px] font-bold">SAFEX 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats Grid for 2025 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats2025.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#E5D7C7] p-6 rounded-3xl text-center shadow-sm space-y-1 hover:border-[#C5A059] transition-all"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#5C3A21] font-mono block">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A6B29] block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="bg-white border border-[#E5D7C7] rounded-[32px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8A6B29] block">
              Rétrospective 2025
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2D160A] uppercase tracking-tight">
              Les Temps Forts de l'Édition 2025
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights2025.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF6F0] border border-[#E5D7C7]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#5C3A21] text-white flex items-center justify-center font-bold font-mono shrink-0">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2D160A] mb-1">Moment Fort</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 3 Piliers Sensoriels */}
        <div className="bg-gradient-to-b from-[#FAF6F0] via-white to-[#FAF6F0] border border-[#E5D7C7] rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-8">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-black text-[#2D160A] uppercase tracking-tight">
              Secteurs & Dégustations de 2025
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sélectionnez un univers pour découvrir ce qui a fait le succès du salon auprès du public et des acheteurs professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id ? cat.activeBorder : cat.inactiveBorder
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-xs font-black uppercase tracking-wider">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#E5D7C7] p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto text-left space-y-3 shadow-inner">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${activeCat.textColorClass}`}>
              {activeCat.tagline}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-black text-[#2D160A] uppercase tracking-tight">
              {activeCat.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {activeCat.description}
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#5C3A21] text-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-[#4D2E1C] relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C5A059] block">
              Témoignages Exposants 2025
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight">
              Ce Qu'ils Ont Pensé de Chocorium 2025
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#1D0F0A]/80 border border-[#4D2E1C] p-6 rounded-2xl space-y-4">
                <div className="flex gap-1 text-[#C5A059]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#E5D7C7] italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-[#4D2E1C]">
                  <span className="text-xs font-bold text-white block">{t.author}</span>
                  <span className="text-[10px] text-[#C5A059] font-mono">{t.role} • {t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action for 2026 */}
        <div className="bg-gradient-to-r from-[#2D160A] via-[#1D0F0A] to-[#2D160A] text-white rounded-[32px] p-8 sm:p-12 text-center border border-[#4D2E1C] space-y-6 shadow-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5C78C] text-xs font-mono uppercase font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            Cap sur la 2ème Édition !
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Prêt pour CHOCORIUM 2026 ?
          </h2>
          <p className="text-sm text-[#E5D7C7] max-w-xl mx-auto leading-relaxed">
            Découvrez l'offre complète d'exposition, les espaces au Pavillon Casbah de la SAFEX, et demandez votre badge d'accès gratuit pour la prochaine édition du 23 au 26 Septembre 2026.
          </p>
          <div>
            <button
              onClick={() => setCurrentPage('chocorium2026')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C5A059] hover:bg-[#B38D46] text-[#1D0F0A] font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Accéder à l'Offre CHOCORIUM 2026</span>
              <ArrowRight className="w-4 h-4 text-[#1D0F0A]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
