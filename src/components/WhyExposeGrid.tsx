import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { 
  Building2, 
  Globe2, 
  TrendingUp, 
  Sparkles, 
  Tv, 
  Award, 
  ArrowUpRight,
  Handshake
} from 'lucide-react';

interface WhyExposeGridProps {
  setCurrentPage: (page: PageId) => void;
}

export const WhyExposeGrid: React.FC<WhyExposeGridProps> = ({ setCurrentPage }) => {
  const cards = [
    {
      icon: Handshake,
      title: "Réseautage B2B & Décideurs",
      subtitle: "B2B & B2C Synergie",
      description: "Accédez directement aux grands décideurs industriels, distributeurs, acheteurs institutionnels, investisseurs et à un grand public qualifié.",
      stat: "+85%",
      statLabel: "de rendez-vous d'affaires concrétisés",
      accentColor: "text-[#C5A059]",
      badgeClass: "badge-gold"
    },
    {
      icon: Tv,
      title: "Médiatisation & Visibilité 360°",
      subtitle: "Couverture TV & Social Media",
      description: "Bénéficiez d'un plan médias complet : reportages télévisés, relais radio, campagnes digitales ciblées et présences d'influenceurs majeurs.",
      stat: "+3M",
      statLabel: "d'impressions médias garanties",
      accentColor: "text-[#C5A059]",
      badgeClass: "badge-gold"
    },
    {
      icon: TrendingUp,
      title: "Ventes Directes & ROI Accéléré",
      subtitle: "Opportunités Commerciales",
      description: "Commercialisez directement vos produits, testez vos nouvelles innovations auprès de milliers de consommateurs et développez votre notoriété.",
      stat: "x4",
      statLabel: "Retour sur investissement moyen",
      accentColor: "text-[#A8C0D0]",
      badgeClass: "badge-blue"
    },
    {
      icon: Globe2,
      title: "Positionnement International",
      subtitle: "Standard d'Excellence",
      description: "Inscrivez votre marque dans un environnement de prestige digne des plus grands salons mondiaux au Palais des Expositions d'Alger (SAFEX).",
      stat: "3 000m²",
      statLabel: "Pavillon Casbah ultra-moderne",
      accentColor: "text-[#A8C0D0]",
      badgeClass: "badge-blue"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-sky-100/90 via-sky-50 to-sky-100/90 relative overflow-hidden font-sans border-t border-sky-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono font-semibold uppercase tracking-wider mx-auto mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-sky-700" />
            Pourquoi Exposer ?
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            QUATRE PILIERS D'EXCELLENCE POUR VOTRE MARQUE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Propulsez votre entreprise au cœur des marchés en forte croissance en Algérie et à l'international.
          </p>
        </motion.div>

        {/* 4 Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/90 border border-sky-200/90 hover:border-sky-400 p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between shadow-md hover:shadow-xl transition-all"
              >
                {/* Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-sky-700" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-mono font-medium">
                      {card.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Stat Bar */}
                <div className="mt-8 pt-6 border-t border-sky-100 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-3xl font-black text-sky-700">
                      {card.stat}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {card.statLabel}
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="p-3 rounded-xl bg-sky-100 hover:bg-sky-600 hover:text-white border border-sky-200 text-sky-800 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    title="Simuler un stand"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setCurrentPage('contact')}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-sky-500/30 transition-all inline-flex items-center gap-3 text-sm cursor-pointer"
          >
            <span>Réserver votre Stand ou devenir Sponsor</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
