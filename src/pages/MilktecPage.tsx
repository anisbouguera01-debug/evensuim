import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Send, 
  Users, 
  Phone, 
  Mail, 
  Building, 
  Droplets,
  Factory,
  Truck,
  Box,
  Milk,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EvensiumLogo } from '../components/EvensiumLogo';

interface MilktecPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const MilktecPage: React.FC<MilktecPageProps> = ({ setCurrentPage }) => {
  const [badgeRequestSubmitted, setBadgeRequestSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', role: 'b2b' });

  // Countdown state for MILKTEC 2026 (Du 23 au 26 Septembre 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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
    const emailSubject = encodeURIComponent(`Demande de Badge - Milktec : ${formData.name}`);
    const emailBody = encodeURIComponent(`Nom : ${formData.name}\nEmail : ${formData.email}\nSociété : ${formData.company}\nProfil : ${formData.role}`);
    
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;
    
    setBadgeRequestSubmitted(true);
  };

  return (
    <div className="bg-[linear-gradient(115deg,#e1ebd7_0%,#e7ede0_45%,#ded7c4_100%)] text-[#2d3226] min-h-screen font-sans pt-28 pb-20 selection:bg-[#979b7f] selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-[#c4ccb6] text-[#2d3226] text-xs font-bold shadow-sm hover:bg-white transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#5e664e]" />
            Retour à l'Accueil
          </button>

          <button
            onClick={() => setCurrentPage('contact')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#32382a] hover:bg-[#21261b] text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Building className="w-4 h-4 text-[#b8a760]" />
            <span>Réserver mon Espace &gt;</span>
          </button>
        </div>

        {/* PAGE 1 HERO BROCHURE SECTION */}
        <div className="bg-white/70 backdrop-blur-md border border-[#cbcfba] rounded-[36px] p-6 sm:p-12 shadow-xl space-y-10 relative overflow-hidden">
          
          {/* Header Banner: Logo + Main Gold/Olive Title + Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#d8dcc8] pb-10">
            {/* Logo */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#313729] text-[#bdae67] flex items-center justify-center font-serif font-black text-2xl shadow-md shrink-0">
                  <Milk className="w-7 h-7 text-[#bdae67]" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-serif text-[#2a3022] uppercase">
                    MILKTEC
                  </h1>
                  <span className="text-xs font-bold tracking-[0.25em] text-[#71785f] uppercase block -mt-1 font-mono">
                    ALGÉRIE
                  </span>
                </div>
              </div>
              <p className="text-xs italic text-[#59614a] font-serif pl-1">
                Du terroir à la technologie
              </p>
            </div>

            {/* Main Title & Dates */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-[#a1904b] leading-tight uppercase tracking-tight">
                SALON DU LAIT ET DES INDUSTRIES LAITIÈRES EN ALGÉRIE
              </h2>
              <div className="bg-[#2d3326] text-white px-5 py-3 rounded-2xl shadow-md inline-block">
                <p className="text-xs sm:text-sm font-black tracking-wide font-mono uppercase text-[#e1ebce]">
                  DU 23 AU 26 SEPTEMBRE 2026 PALAIS DES EXPOSITIONS D'ALGER SAFEX
                </p>
                <p className="text-xs font-bold text-[#bdae67] font-mono uppercase tracking-widest mt-0.5">
                  PAVILLON CASBAH
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 & Section 2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Pourquoi Exposer & Ce que Milktec vous apporte */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Pourquoi Exposer */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2b3123] uppercase tracking-tight">
                    POURQUOI EXPOSER ?
                  </h3>
                  <p className="text-xs font-mono font-extrabold uppercase text-[#71785f] tracking-wider">
                    EXPOSEZ AU CŒUR D'UN MARCHÉ EN PLEINE CROISSANCE.
                  </p>
                </div>

                <p className="text-sm text-[#383e2e] leading-relaxed">
                  MILKTEC est le premier Salon professionnel en Algérie dédié exclusivement à la filière laitière et à ses industries.
                </p>

                <div className="bg-white/90 border border-[#cbcfba] p-5 rounded-2xl space-y-3 shadow-sm">
                  <p className="text-xs font-bold text-[#2d3326] leading-snug">
                    Pendant 4 jours, vous bénéficiez d'une plateforme unique combinant :
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#383e2e]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#a1904b] font-black">•</span>
                      <span><strong>B2B :</strong> Décideurs, industriels, distributeurs, investisseurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a1904b] font-black">•</span>
                      <span><strong>B2C :</strong> Grand public qualifié et acheteurs finaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a1904b] font-black">•</span>
                      <span>Opportunités commerciales concrètes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#a1904b] font-black">•</span>
                      <span>Visibilité nationale et internationale</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ce que MILKTEC vous apporte */}
              <div className="space-y-4 pt-4 border-t border-[#d8dcc8]">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2b3123] uppercase tracking-tight">
                  CE QUE MILKTEC VOUS APPORTE:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Accès direct aux industriels et transformateurs",
                    "Rencontre avec des partenaires stratégiques",
                    "Développement de nouveaux marchés",
                    "Lancement de nouveaux produits",
                    "Renforcement de votre notoriété",
                    "Génération de ventes sur place"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-white/80 p-3 rounded-xl border border-[#d2d7c2]">
                      <span className="w-2 h-2 rounded-full bg-[#a1904b] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#2d3326]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side: Stat Polygon Box & Organisé Par */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 h-full">
              
              {/* Stat Polygon / Badge Box */}
              <div className="bg-[#9fa288] text-[#21261b] p-8 rounded-[32px] shadow-lg border border-[#8f9277] space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-6 text-center">
                  <div className="space-y-1 pb-4 border-b border-[#878a70]">
                    <span className="text-3xl sm:text-4xl font-black font-mono block tracking-tight text-[#1b1f16]">
                      + 50
                    </span>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2d3326] block">
                      EXPOSANTS
                    </span>
                  </div>

                  <div className="space-y-1 pb-4 border-b border-[#878a70]">
                    <span className="text-3xl sm:text-4xl font-black font-mono block tracking-tight text-[#1b1f16]">
                      + 5000
                    </span>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2d3326] block">
                      VISITEURS ATTENDUS
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono block tracking-tight text-[#1b1f16]">
                      + 3000 M²
                    </span>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2d3326] block">
                      D'EXPOSITION
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Card */}
              <div className="bg-[#2d3326] text-white p-6 rounded-3xl text-center space-y-3 shadow-md">
                <span className="text-[10px] font-mono tracking-widest text-[#c2b575] uppercase block font-bold">
                  Compte à Rebours MILKTEC 2026
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="bg-[#1f231a] p-2 rounded-xl">
                    <span className="text-lg font-black text-white block font-mono">{timeLeft.days}</span>
                    <span className="text-[8px] text-[#a4aa93] uppercase font-bold">Jours</span>
                  </div>
                  <div className="bg-[#1f231a] p-2 rounded-xl">
                    <span className="text-lg font-black text-white block font-mono">{timeLeft.hours}</span>
                    <span className="text-[8px] text-[#a4aa93] uppercase font-bold">Heures</span>
                  </div>
                  <div className="bg-[#1f231a] p-2 rounded-xl">
                    <span className="text-lg font-black text-white block font-mono">{timeLeft.minutes}</span>
                    <span className="text-[8px] text-[#a4aa93] uppercase font-bold">Min</span>
                  </div>
                  <div className="bg-[#1f231a] p-2 rounded-xl">
                    <span className="text-lg font-black text-white block font-mono">{timeLeft.seconds}</span>
                    <span className="text-[8px] text-[#a4aa93] uppercase font-bold">Sec</span>
                  </div>
                </div>
              </div>

              {/* Organisé Par */}
              <div className="text-center pt-2 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71785f] font-bold block">
                  ORGANISÉ PAR
                </span>
                <div className="flex justify-center">
                  <EvensiumLogo size={28} showText={true} textColorClass="text-[#2d3326]" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* PAGE 2 BROCHURE SECTION : LES UNIVERS DU SALON */}
        <div className="bg-white/70 backdrop-blur-md border border-[#cbcfba] rounded-[36px] p-6 sm:p-12 shadow-xl space-y-10">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#2b3123] uppercase tracking-tight">
              LES UNIVERS DU SALON:
            </h2>
            <div className="w-12 h-0.5 bg-[#a1904b] mx-auto" />
          </div>

          {/* 4 Univers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Univers 1 */}
            <div className="bg-white/90 border border-[#cbcfba] p-6 rounded-3xl space-y-3 shadow-sm hover:border-[#a1904b] transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e3ead8] text-[#333a2a] flex items-center justify-center shrink-0 border border-[#c5ceb6]">
                <Droplets className="w-6 h-6 text-[#5b644a]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-lg text-[#2b3123]">
                  Produits Laitiers & Marques
                </h3>
                <p className="text-xs sm:text-sm text-[#464c3a] leading-relaxed">
                  Positionnez votre marque face aux distributeurs, acheteurs et consommateurs.
                </p>
              </div>
            </div>

            {/* Univers 2 */}
            <div className="bg-white/90 border border-[#cbcfba] p-6 rounded-3xl space-y-3 shadow-sm hover:border-[#a1904b] transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e3ead8] text-[#333a2a] flex items-center justify-center shrink-0 border border-[#c5ceb6]">
                <Factory className="w-6 h-6 text-[#5b644a]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-lg text-[#2b3123]">
                  Transformation & Industrie Laitière
                </h3>
                <p className="text-xs sm:text-sm text-[#464c3a] leading-relaxed">
                  Présentez vos équipements et solutions industrielles aux décideurs.
                </p>
              </div>
            </div>

            {/* Univers 3 */}
            <div className="bg-white/90 border border-[#cbcfba] p-6 rounded-3xl space-y-3 shadow-sm hover:border-[#a1904b] transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e3ead8] text-[#333a2a] flex items-center justify-center shrink-0 border border-[#c5ceb6]">
                <Truck className="w-6 h-6 text-[#5b644a]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-lg text-[#2b3123]">
                  Chaîne du Froid & Logistique
                </h3>
                <p className="text-xs sm:text-sm text-[#464c3a] leading-relaxed">
                  Répondez aux besoins stratégiques du secteur.
                </p>
              </div>
            </div>

            {/* Univers 4 */}
            <div className="bg-white/90 border border-[#cbcfba] p-6 rounded-3xl space-y-3 shadow-sm hover:border-[#a1904b] transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e3ead8] text-[#333a2a] flex items-center justify-center shrink-0 border border-[#c5ceb6]">
                <Box className="w-6 h-6 text-[#5b644a]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-black text-lg text-[#2b3123]">
                  Emballage & Conditionnement
                </h3>
                <p className="text-xs sm:text-sm text-[#464c3a] leading-relaxed">
                  Exposez vos innovations et solutions techniques.
                </p>
              </div>
            </div>

          </div>

          {/* Central Dairy Illustration / Emblem Box */}
          <div className="bg-gradient-to-br from-[#f2f7ec] via-white to-[#eae4d3] border border-[#c3cb1] p-8 sm:p-12 rounded-[32px] text-center space-y-6 shadow-sm max-w-3xl mx-auto">
            
            {/* Eco Milk Drop Graphic Emblem */}
            <div className="w-24 h-24 mx-auto rounded-full bg-[#32382a] text-[#bdae67] flex items-center justify-center shadow-lg border-2 border-[#bdae67]">
              <Droplets className="w-12 h-12 text-[#bdae67]" />
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2b3123] leading-snug">
                MILKTEC c'est l'alliance du terroir et de technologie au service de la performance.
              </h3>
              <p className="text-sm text-[#4a523f] max-w-xl mx-auto leading-relaxed">
                Réservez votre espace , affirmez votre positionnement et devenez un acteur visible et influent du marché
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-3.5 rounded-2xl bg-[#32382a] hover:bg-[#21261b] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Réserver un Stand &gt;
              </button>
            </div>
          </div>

          {/* Organisé Par */}
          <div className="text-center pt-4 border-t border-[#d8dcc8] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71785f] font-bold block">
              ORGANISÉ PAR
            </span>
            <div className="flex justify-center">
              <EvensiumLogo size={32} showText={true} textColorClass="text-[#2d3326]" />
            </div>
          </div>

        </div>

        {/* Contact & Badge Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Info Column */}
          <div className="lg:col-span-7 bg-white/90 border border-[#cbcfba] rounded-[32px] p-8 sm:p-12 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#71785f] uppercase tracking-wider block">CONTACT & RÉSERVATION</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2b3123] uppercase tracking-tight">
                  Réservez votre Stand Exposant
                </h2>
              </div>

              <p className="text-sm text-[#4a523f] leading-relaxed">
                Rejoignez les leaders de la transformation laitière, les équipementiers et les marques agroalimentaires au Pavillon Casbah, SAFEX Alger.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b917b] block">Téléphones</span>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2b3123]">
                    <Phone className="w-4 h-4 text-[#a1904b] shrink-0" />
                    <span>+213(0) 559 46 07 37</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2b3123]">
                    <Phone className="w-4 h-4 text-[#a1904b] shrink-0" />
                    <span>+213(0) 555 00 28 11</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b917b] block">E-mail Organisation</span>
                  <div className="flex items-center gap-2 text-xs text-[#2b3123] hover:underline">
                    <Mail className="w-4 h-4 text-[#a1904b] shrink-0" />
                    <a href="mailto:contact@evensium.com">contact@evensium.com</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#2b3123] hover:underline">
                    <Mail className="w-4 h-4 text-[#a1904b] shrink-0" />
                    <a href="mailto:zineb.taibi@evensium.com">zineb.taibi@evensium.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#d8dcc8] flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#5b644a]" />
                <span className="text-xs font-bold text-[#2b3123]">Organisé par Evensium Agency</span>
              </div>

              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-5 py-2.5 rounded-xl border border-[#cbcfba] text-[#2b3123] bg-white hover:bg-[#e3ead8] text-xs font-extrabold transition-all cursor-pointer"
              >
                Demande de devis stand &gt;
              </button>
            </div>
          </div>

          {/* Interactive Badge Form */}
          <div className="lg:col-span-5 bg-[#2d3326] text-white rounded-[32px] p-8 sm:p-10 shadow-lg flex flex-col justify-between border border-[#434b39] relative overflow-hidden">
            {!badgeRequestSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#e1ebce]">
                    Obtenir mon Badge MILKTEC
                  </h3>
                  <p className="text-[#a8b098] text-xs">
                    Inscrivez-vous gratuitement pour accéder au Salon du Lait et des Industries Laitières.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-[#c2b575] font-semibold">Nom Complet</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Anis Bouguera"
                      className="w-full bg-[#1e2319] border border-[#48513d] rounded-xl px-4 py-3 text-xs text-white placeholder-[#78816a] focus:border-[#c2b575] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-[#c2b575] font-semibold">E-mail Professionnel</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Ex: contact@laiterie.com"
                      className="w-full bg-[#1e2319] border border-[#48513d] rounded-xl px-4 py-3 text-xs text-white placeholder-[#78816a] focus:border-[#c2b575] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-[#c2b575] font-semibold">Entreprise / Organisme</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Ex: Laiterie du Titteri"
                      className="w-full bg-[#1e2319] border border-[#48513d] rounded-xl px-4 py-3 text-xs text-white placeholder-[#78816a] focus:border-[#c2b575] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider uppercase text-[#c2b575] font-semibold">Profil de Visiteur</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-[#1e2319] border border-[#48513d] rounded-xl px-4 py-3 text-xs text-white focus:border-[#c2b575] focus:outline-none transition-all"
                    >
                      <option value="b2b">Professionnel B2B (Transformateur / Acheteur)</option>
                      <option value="equipementier">Équipementier / Froid / Emballage</option>
                      <option value="investisseur">Investisseur / Distributeur</option>
                      <option value="presse">Presse / Média</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#a1904b] hover:bg-[#b0a05a] text-[#1c2116] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Générer mon Badge Gratuit</span>
                  <Send className="w-4 h-4 text-[#1c2116]" />
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-[#a1904b]/20 border-2 border-[#a1904b] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8 text-[#a1904b]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-white uppercase tracking-tight">Badge Confirmé !</h3>
                  <p className="text-[#c7cfb8] text-xs leading-relaxed">
                    Félicitations <strong>{formData.name}</strong>. Votre badge d'accès gratuit pour <strong>MILKTEC ALGÉRIE 2026</strong> est prêt.
                  </p>
                </div>

                <button 
                  onClick={() => setBadgeRequestSubmitted(false)}
                  className="px-6 py-2 rounded-xl border border-[#48513d] text-[#c2b575] bg-[#1e2319] hover:bg-black/40 text-xs font-semibold transition-all"
                >
                  Générer une autre demande
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

