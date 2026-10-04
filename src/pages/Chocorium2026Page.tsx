import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { IMAGES } from '../assets/images';
import { EvensiumLogo } from '../components/EvensiumLogo';
import { 
  Award, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  Send, 
  Coffee, 
  Cookie, 
  Users, 
  Phone, 
  Mail, 
  History, 
  Building, 
  Camera,
  Star,
  Tv,
  UtensilsCrossed,
  Flame,
  Gift
} from 'lucide-react';

interface Chocorium2026PageProps {
  setCurrentPage: (page: PageId) => void;
}

export const Chocorium2026Page: React.FC<Chocorium2026PageProps> = ({ setCurrentPage }) => {
  const [badgeRequestSubmitted, setBadgeRequestSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', role: 'visiteur' });
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Countdown state for 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: September 23, 2026 (Du 23 au 26 Septembre 2026)
    const targetDate = new Date('2026-09-23T09:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    const to = 'ops@evensium.com,zineb.taibi@evensium.com';
    const emailSubject = encodeURIComponent(`Demande de Badge - Chocorium 2026 : ${formData.name}`);
    const emailBody = encodeURIComponent(`Nom : ${formData.name}\nEmail : ${formData.email}\nSociété : ${formData.company}\nProfil : ${formData.role}`);
    
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;
    
    setBadgeRequestSubmitted(true);
  };

  const chocolatePhotos = [
    {
      url: IMAGES.chocorium2026Poster,
      title: 'Affiche Officielle Chocorium 2026',
      category: 'Affiche Officielle',
      desc: 'Carte d\'Algérie en chocolat, café & gourmandises pour l\'édition 2026.'
    },
    {
      url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
      title: 'Pralines & Truffes Artisanales',
      category: 'Haute Chocolaterie',
      desc: 'Savoir-faire des maîtres chocolatiers et dégustations exclusives.'
    },
    {
      url: IMAGES.chocoriumPalmaryStand || 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80',
      title: 'Stand Palmary & Dégustation 2025/2026',
      category: 'Exposants Majeurs',
      desc: 'Une affluence record sur les stands des plus grands industriels.'
    },
    {
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      title: 'Démonstrations Pâtissières en Direct',
      category: 'Live Cooking Show',
      desc: 'Créations de chefs et ateliers de sculpture sur chocolat.'
    },
    {
      url: IMAGES.chocoriumInauguration || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      title: 'Cérémonie d\'Inauguration Officielle',
      category: 'Lancement Événement',
      desc: 'Découpage du ruban officiel avec personnalités et invités d\'honneur.'
    },
    {
      url: IMAGES.chocoriumMillottiCoffee || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      title: 'Accords Café & Cacao de Spécialité',
      category: 'Barista & Torréfaction',
      desc: 'Espace café du monde et accords gourmands avec le chocolat.'
    }
  ];

  const launchProgram = [
    {
      title: 'Cérémonie Officielle d\'Inauguration',
      desc: 'Coupe du ruban, accueil des délégations, discours des organisateurs d\'Evensium et visite VIP des stands exposants.',
      icon: <Award className="w-5 h-5 text-[#C5A059]" />
    },
    {
      title: 'Masterclass Chef Chocolatier International',
      desc: 'Démonstration de pièces montées en chocolat et techniques de tempérage avancées en direct.',
      icon: <Flame className="w-5 h-5 text-[#C5A059]" />
    },
    {
      title: 'Cocktail B2B & Rencontres Partenaires',
      desc: 'Session de networking privilégiée entre fabricants, distributeurs, acheteurs et médias.',
      icon: <Users className="w-5 h-5 text-[#C5A059]" />
    }
  ];

  const coreThemes = [
    {
      title: "CHOCOLAT & CACAO",
      desc: "Tablettes, pralines, créations artisanales, fèves rares et matières premières.",
      details: "Découvrez le savoir-faire de nos chocolatiers à travers des dégustations de crus d'exception et des démonstrations techniques inédites.",
      icon: <Cookie className="w-6 h-6 text-[#8A6B29]" />
    },
    {
      title: "ARTISANS & CRÉATEURS",
      desc: "Maîtres chocolatiers, pâtissiers d'exception, talents émergents et créations audacieuses.",
      details: "Rencontrez l'élite de la pâtisserie algérienne et internationale. Un espace dédié à l'innovation sucrée et à l'excellence culinaire.",
      icon: <Award className="w-6 h-6 text-[#8A6B29]" />
    },
    {
      title: "CAFÉ & BOISSONS GOURMANDES",
      desc: "Sélections de cafés du monde, thés parfumés, chocolats chauds et boissons sucrées.",
      details: "Une exploration des accords parfaits entre cafés fins fraîchement torréfiés, arômes de cacao et boissons gourmandes réconfortantes.",
      icon: <Coffee className="w-6 h-6 text-[#8A6B29]" />
    },
    {
      title: "BONBONS & DOUCEURS",
      desc: "Confiseries, biscuits, mignardises, nougats, et petits plaisirs sucrés à savourer.",
      details: "Retrouvez les saveurs d'enfance et les innovations de l'industrie de la confiserie avec des produits locaux de qualité supérieure.",
      icon: <Sparkles className="w-6 h-6 text-[#8A6B29]" />
    }
  ];

  const partners = [
    { name: "Palmary", role: "Partenaire Majeur", color: "text-red-600" },
    { name: "El Mordjene", role: "Partenaire Officiel", color: "text-[#C5A059]" },
    { name: "Wafa", role: "Sponsor Confiserie", color: "text-blue-600" },
    { name: "Chocodada", role: "Sponsor Chocolatier", color: "text-amber-800" },
    { name: "Chocolatti", role: "Artisan d'Excellence", color: "text-amber-700" },
    { name: "Dziriya", role: "Douceurs Traditionnelles", color: "text-orange-600" },
    { name: "Bueno Food", role: "Plaisir Gourmand", color: "text-amber-600" }
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

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#C5A059] text-white text-[10px] font-extrabold font-mono uppercase tracking-wider">
              Nouveau 2026
            </span>
            <button
              onClick={() => setCurrentPage('chocorium2025')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white border border-[#C5A059] text-[#5C3A21] hover:bg-[#FAF6F0] text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <History className="w-4 h-4 text-[#C5A059]" />
              <span>Voir Édition 2025 (Archives) &gt;</span>
            </button>
          </div>
        </div>

        {/* Hero Section CHOCORIUM 2026 */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#2D160A] via-[#1D0F0A] to-[#2D160A] text-white p-8 sm:p-16 shadow-2xl border border-[#4D2E1C]/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.2),transparent_50%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5C78C] text-xs font-mono uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                Offre Exclusive CHOCORIUM 2026 (Nouveau)
              </div>
              
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] block font-mono">
                  SALON INTERNATIONAL DU CHOCOLAT ET DE LA GOURMANDISE
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-none uppercase">
                  CHOCORIUM <span className="text-[#C5A059]">2026</span>
                </h1>
                <p className="text-[#F5ECE2] font-serif italic text-lg sm:text-xl">
                  2ème Édition — Safex • Pavillon Casbah (Alger)
                </p>
              </div>
              
              <p className="text-[#E5D7C7] text-sm sm:text-base leading-relaxed max-w-2xl">
                Le grand salon d'exception du chocolat, de la confiserie, du café et des équipements de production en Algérie. Une immersion sensorielle unique, des démonstrations culinaires et un espace B2B d'envergure.
              </p>

              {/* Event Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-[#1D0F0A]/80 border border-[#4D2E1C] p-4 rounded-2xl">
                  <Calendar className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">DATES</span>
                    <span className="text-sm font-bold text-white">Du 23 au 26 Septembre 2026</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-[#1D0F0A]/80 border border-[#4D2E1C] p-4 rounded-2xl">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase font-mono block tracking-wider">LIEU</span>
                    <span className="text-sm font-bold text-white">Safex (Pavillon Casbah), Alger</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl text-center space-y-4">
              <span className="text-[11px] font-mono tracking-widest text-[#C5A059] uppercase block font-bold">
                Grand Lancement Officiel dans
              </span>
              
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#1D0F0A]/90 p-3 rounded-2xl border border-[#4D2E1C]">
                  <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.days}</span>
                  <span className="text-[9px] text-[#C5A059] uppercase font-bold">Jours</span>
                </div>
                <div className="bg-[#1D0F0A]/90 p-3 rounded-2xl border border-[#4D2E1C]">
                  <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.hours}</span>
                  <span className="text-[9px] text-[#C5A059] uppercase font-bold">Heures</span>
                </div>
                <div className="bg-[#1D0F0A]/90 p-3 rounded-2xl border border-[#4D2E1C]">
                  <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.minutes}</span>
                  <span className="text-[9px] text-[#C5A059] uppercase font-bold">Min</span>
                </div>
                <div className="bg-[#1D0F0A]/90 p-3 rounded-2xl border border-[#4D2E1C]">
                  <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.seconds}</span>
                  <span className="text-[9px] text-[#C5A059] uppercase font-bold">Sec</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#E5D7C7]">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Inauguration VIP & Show Chocolatier le 23 Septembre</span>
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED SECTION PHOTO - AFFICHE OFFICIELLE */}
        <div className="bg-white border-2 border-[#C5A059] rounded-[36px] p-6 sm:p-10 shadow-xl space-y-6 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#C5A059] text-[#2D160A] text-xs font-mono font-bold uppercase tracking-wider">
              <Camera className="w-4 h-4 text-[#C5A059]" />
              <span>Photo Officielle</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#2D160A] uppercase tracking-tight">
              PHOTO OFFICIELLE CHOCORIUM 2026
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="flex justify-center">
            <div 
              onClick={() => setActivePhoto(IMAGES.chocorium2026Poster)}
              className="relative group rounded-3xl overflow-hidden cursor-pointer max-w-xl w-full shadow-2xl border-2 border-[#E5D7C7] hover:border-[#C5A059] transition-all bg-[#FAF6F0]"
            >
              <img 
                src={IMAGES.chocorium2026Poster} 
                alt="Photo Officielle Chocorium 2026" 
                className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-mono uppercase tracking-wider gap-2">
                <Camera className="w-5 h-5 text-[#C5A059]" />
                <span>Agrandir en plein écran</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Visitors Section */}
        <div className="bg-[#f6f1e3] border-2 border-[#C5A059] rounded-[36px] p-6 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Top Title */}
          <div className="text-center space-y-1">
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#422112] uppercase tracking-tight leading-snug">
              VOTRE RENDEZ-VOUS SUCRÉ...<br />
              ET DÉLICIEUSEMENT RAFRAÎCHISSANT !
            </h2>
          </div>

          {/* Nos Visiteurs Section */}
          <div className="max-w-3xl mx-auto space-y-6 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-[#e5d9c5] shadow-sm">
            <div className="inline-block transform -rotate-3 bg-[#422112] text-[#f6f1e3] px-4 py-1.5 rounded-xl shadow-sm">
              <span className="font-serif text-lg sm:text-2xl font-black uppercase tracking-wider">
                NOS VISITEURS !
              </span>
            </div>

            <ul className="space-y-3">
              {[
                "Amateurs de chocolat et de douceurs artisanales.",
                "Familles & enfants en quête de moments sucrés.",
                "Professionnels : pâtissiers, chocolatiers, hôteliers, restaurateurs.",
                "Passionnés de café, thé et boissons gourmandes.",
                "Entreprises à la recherche de cadeaux fins et originaux."
              ].map((visitor, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#592d19] shrink-0 mt-1 shadow-sm" />
                  <span className="text-xs sm:text-sm font-semibold text-[#381c0f] leading-snug">
                    {visitor}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#e5d9c5] flex justify-end items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-[#8A6B29]">Organisé par</span>
                <EvensiumLogo size={24} showText={true} textColorClass="text-[#422112]" />
              </div>
            </div>
          </div>
        </div>

        {/* GRAND LANCEMENT DE L'ÉVÉNEMENT SECTION */}
        <div className="bg-gradient-to-br from-[#1D0F0A] via-[#2A150B] to-[#1D0F0A] text-white rounded-[32px] p-8 sm:p-12 border-2 border-[#C5A059]/60 shadow-2xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059] text-[#1D0F0A] text-[10px] font-mono font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Programme Spécial Ouverture
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              GRAND LANCEMENT DE L'ÉVÉNEMENT <span className="text-[#C5A059]">2026</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D7C7] max-w-2xl mx-auto">
              Rejoignez-nous le 23 Septembre 2026 pour la grande cérémonie d'ouverture en présence des grands noms de la chocolaterie, des médias et des partenaires institutionnels.
            </p>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          </div>

          {/* Launch Schedule Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {launchProgram.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#120A07] border border-[#4D2E1C] hover:border-[#C5A059] p-6 rounded-2xl space-y-3 transition-all relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#E5C78C] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C8B8A6] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#2D160A] border border-[#5C3A21] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-[#1D0F0A] flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white uppercase">Accès VIP & Invitation Presse</h4>
                <p className="text-xs text-[#E5D7C7]">Vous êtes professionnel, journaliste ou influenceur ? Demandez votre Pass Inauguration.</p>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#d8b268] text-[#1D0F0A] font-black text-xs uppercase tracking-wider shadow-md transition-all shrink-0 cursor-pointer"
            >
              Demander une Invitation VIP &gt;
            </button>
          </div>
        </div>

        {/* PHOTO GALLERY SECTION - CHOCOLAT & CRÉATIONS */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8A6B29] block">
              Gourmandise & Savoir-faire
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2D160A] uppercase tracking-tight">
              L'UNIVERS VISUEL DE CHOCORIUM
            </h2>
            <p className="text-xs text-slate-600">
              Découvrez les créations chocolatées d'exception, les fontaines géantes, les stands d'exposants et les moments phares du salon.
            </p>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chocolatePhotos.map((photo, index) => (
              <div 
                key={index}
                onClick={() => setActivePhoto(photo.url)}
                className="group relative rounded-3xl overflow-hidden bg-[#2D160A] border border-[#E5D7C7] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#C5A059] tracking-wider">
                    {photo.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-[#E5C78C] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {photo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Core Universes */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8A6B29] block">
              Les Secteurs d'Exposition
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#2D160A] uppercase tracking-tight">
              LES 4 POLES D'EXCELLENCE
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreThemes.map((theme, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E5D7C7] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#C5A059] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E5D7C7] flex items-center justify-center">
                      {theme.icon}
                    </div>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-[#2D160A] uppercase tracking-tight">
                      {theme.title}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#8A6B29] uppercase tracking-wider font-mono">
                      {theme.desc}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {theme.details}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#FAF6F0] text-[11px] text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  Pavillon Casbah • Safex 2026
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires Majeurs */}
        <div className="bg-white border border-[#E5D7C7] rounded-[32px] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8A6B29] block">
              Confiance & Prestige
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2D160A] uppercase tracking-tight">
              ILS FONT CONFIANCE À CHOCORIUM
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {partners.map((p, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF6F0] border border-[#E5D7C7] p-4 rounded-2xl flex flex-col items-center justify-center space-y-1 hover:border-[#C5A059] transition-all"
              >
                <span className={`font-serif font-black text-base sm:text-lg ${p.color}`}>
                  {p.name}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">
                  {p.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Réservation */}
        <div className="bg-white border border-[#E5D7C7] rounded-[32px] p-8 sm:p-12 shadow-sm space-y-8 max-w-4xl mx-auto w-full">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#8A6B29] uppercase tracking-wider block">CONTACT & RÉSERVATION</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2D160A] uppercase tracking-tight">
              Réservez votre stand d'exposition
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2" />
          </div>

          <p className="text-sm text-slate-600 leading-relaxed text-center max-w-2xl mx-auto">
            Rejoignez les plus grandes marques de chocolat, biscuits, cafés et confiseries. Bénéficiez d'un emplacement stratégique au Pavillon Casbah pour maximiser vos ventes et votre notoriété.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 justify-items-center text-center">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Téléphones</span>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm font-bold text-[#2D160A] flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  +213(0) 559 46 07 37
                </p>
                <p className="text-sm font-bold text-[#2D160A] flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  +213(0) 555 00 28 11
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Email Organisation</span>
              <p className="text-sm text-[#2D160A] flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059]" />
                contact@evensium.com
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#FAF6F0] flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-[#2D160A]">Organisé par Evensium Agency</span>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 rounded-xl bg-[#2D160A] hover:bg-[#4D2E1C] text-white font-black text-sm uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Réserver un Stand &gt;
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Photo viewing */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <img 
            src={activePhoto} 
            alt="Agrandissement"
            className="max-w-4xl max-h-[85vh] rounded-2xl object-contain border-2 border-[#C5A059]"
          />
        </div>
      )}
    </div>
  );
};
