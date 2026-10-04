import React from 'react';
import { PageId } from '../types';
import { Building2, Globe, ShieldCheck, Award, Users, CheckCircle2, MapPin, Sparkles, Calendar, Layers, Megaphone, Target, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  const milestones = [
    { year: '2021 - 2022', title: 'Golden Village', location: 'Beni Ksila', color: '#7090B5' },
    { year: 'Juillet 2022', title: 'Coke Studio', location: 'Algérie', color: '#9B68A6' },
    { year: '2023', title: 'Golden Village', location: 'Sheraton Club des Pins', color: '#88D4B0' },
    { year: '2024', title: 'Mamlaka', location: 'Événement Culturel & Prestige', color: '#1B365D' },
    { year: 'Fév 2024', title: 'CLINICA 2024', location: 'Salon International de la Clinique & Esthétique', color: '#88D4B0' },
    { year: 'Mai 2024', title: 'L\'MAMA', location: 'Événement Fête des Mères', color: '#9B68A6' },
    { year: '2025', title: 'AGRIUM', location: 'Salon International de l\'Agriculture & Agro-industrie', color: '#7090B5' },
    { year: 'Sept 2026', title: 'CHOCORIUM & MILKTEC', location: 'SAFEX Pavillon Casbah, Alger', color: '#88D4B0' },
  ];

  const services = [
    { title: 'Conception & Organisation d\'Événements', desc: 'Gestion à 360° de vos salons professionnels et cérémonies de prestige.' },
    { title: 'Gestion des Événements Sur Site', desc: 'Coordination logistique, flux de visiteurs, billetterie et sécurité certifiée.' },
    { title: 'Gestion des Exposants & Sponsors', desc: 'Accompagnement VIP, recherche de partenaires et visibilité maximale.' },
    { title: 'Personnalisation & Aménagement des Stands', desc: 'Design sur-mesure, scénographie bento et montage technique haut de gamme.' },
    { title: 'Team Buildings & Incentives', desc: 'Expériences immersives et séminaires d\'entreprise sur mesure.' },
    { title: 'Stratégie de Communication & Médias', desc: 'Plan média TV, Radio, Presse écrite, Réseaux sociaux et Relations Publiques.' },
  ];

  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 min-h-screen font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-widest shadow-sm">
            <Globe className="w-3.5 h-3.5 text-sky-700" />
            Agence Événementielle & Communication 360°
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            L'AGENCE ÉVÉNEMENTIELLE <span className="evensium-wordmark text-sky-700">evensium</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            EVENSIUM est une agence de référence spécialisée dans le conseil en stratégie événementielle, l'organisation de salons professionnels internationaux et la scénographie de marques B2B en Algérie.
          </p>
        </div>

        {/* General Management Section (Zineb Taibi) */}
        <div className="bg-white/90 border border-sky-200/90 rounded-3xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono text-sky-700 uppercase tracking-widest block font-bold">
                Direction Générale
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Sous la direction de Zineb Taibi, General Manager
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                "EVENSIUM a constantly démontré une expertise exceptionnelle en gestion d'événements, mise en évidence par la réussite retentissante de nos salons phares comme CLINICA, CHOCORIUM et MILKTEC. Notre engagement inébranlable vers l'excellence propulse l'internationalisation de nos partenaires."
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-sky-800 font-semibold">
                <span>ops@evensium.com</span> • <span>zineb.taibi@evensium.com</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-2 shadow-inner">
                <div className="w-16 h-16 mx-auto rounded-full bg-sky-700 border-2 border-sky-300 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-sm">
                  ZT
                </div>
                <h3 className="font-bold text-slate-900 text-base">ZINEB TAIBI</h3>
                <p className="text-xs text-sky-700 font-mono font-bold">General Manager EVENSIUM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missions and Visions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/90 p-8 space-y-4 rounded-3xl border border-sky-200 border-l-4 border-l-sky-600 shadow-md">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-mono font-bold">Notre Mission</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Créer des expériences extraordinaires</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Créer des événements extraordinaires et des expériences exceptionnelles, en veillant à ce que chaque occasion soit mémorable et marquante. Nous nous engageons à l'excellence, offrant à nos partenaires et exposants une visibilité inégalée.
            </p>
          </div>

          <div className="bg-white/90 p-8 space-y-4 rounded-3xl border border-sky-200 border-l-4 border-l-indigo-600 shadow-md">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-mono font-bold">Notre Vision</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">Internationaliser notre savoir-faire</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              EVENSIUM s'engage à organiser des événements d'envergure internationale en collaborant avec des partenaires mondiaux, créant ainsi des opportunités de croissance stratégique à l'échelle internationale.
            </p>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono font-bold uppercase tracking-wider">Historique & Milestones</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 uppercase">Nos Grandes Étapes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white/90 p-6 space-y-3 rounded-2xl border border-sky-200 shadow-sm relative overflow-hidden group hover:border-sky-400 hover:shadow-md transition-all"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-slate-900 shadow-sm"
                  style={{ backgroundColor: item.color === '#1B365D' ? '#BAE6FD' : item.color }}
                >
                  {item.year.slice(-4)}
                </div>
                <span className="text-xs font-mono text-slate-500 block">{item.year}</span>
                <h3 className="font-serif font-bold text-slate-900 text-lg">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono font-bold uppercase tracking-wider">Savoir-Faire</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 uppercase">Nos Services d'Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, i) => (
              <div key={i} className="bg-white/90 p-6 space-y-3 rounded-2xl border border-sky-200 shadow-sm hover:border-sky-400 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-mono font-bold text-xs">
                  0{i+1}
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-base">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-sky-300 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono text-sky-700 uppercase tracking-widest block font-bold">
              Siège Social EVENSIUM
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Al Coopérative IGF, Ras Elforn, Dely Brahim, Alger
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Contactez nos équipes pour organiser votre événement ou réserver votre espace d'exposition.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-sky-600 hover:bg-sky-700 text-white py-3.5 px-8 rounded-full text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Prendre Contact</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

