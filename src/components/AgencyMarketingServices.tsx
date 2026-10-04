import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { 
  Building2, 
  Megaphone, 
  Target, 
  CheckCircle2, 
  Layers,
  Zap
} from 'lucide-react';

interface AgencyMarketingServicesProps {
  setCurrentPage?: (page: PageId) => void;
}

export const AgencyMarketingServices: React.FC<AgencyMarketingServicesProps> = () => {
  const agencyPillars = [
    {
      icon: Building2,
      badge: 'Organisation Keyturn',
      title: 'Organisation de Salons Internationaux',
      description: 'Prise en charge à 360° : réservation du Pavillon Casbah SAFEX, gestion des accréditations, sécurité certifiée et logistique d’accueil.',
      stats: '15+ Éditions Réussies'
    },
    {
      icon: Layers,
      badge: 'Design & Modélisation 3D',
      title: 'Scénographie & Stands Sur-Mesure',
      description: 'Conception architecturale personnalisée, fabrication de stands prestige bento et habillage de marque haute qualité.',
      stats: 'Stands 18m² à +200m²'
    },
    {
      icon: Megaphone,
      badge: 'Visibilité Média 360°',
      title: 'Plan Média & Couverture TV Nationale',
      description: 'Diffusions télévisées en direct, tirages au sort tombola sous les projecteurs, campagnes réseaux sociaux et relations presse.',
      stats: '+4.5 M d’Impressions'
    },
    {
      icon: Target,
      badge: 'Growth & Matchmaking',
      title: 'Matchmaking B2B & Clôture de Contrats',
      description: 'Mise en relation ciblée entre industriels, distributeurs et acheteurs VIP lors de sessions de networking fermées.',
      stats: '+85% Taux de Conversion'
    }
  ];

  return (
    <section className="py-24 bg-sky-50/90 relative overflow-hidden font-sans border-t border-sky-200/80">
      
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] font-mono text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            Savoir-Faire Agence Événementielle 360°
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            NOTRE EXPERTISE MARKETING <br />
            <span className="text-[#1B365D]">AU SERVICE DE VOTRE CROISSANCE</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            <strong className="text-slate-900">EVENSIUM</strong> accompagne les plus grandes marques nationales et internationales dans la concrétisation de leurs objectifs commerciaux et leur rayonnement média.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencyPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-6 rounded-3xl border border-sky-200/80 hover:border-sky-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B365D] text-sky-300 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#1B365D] bg-[#1B365D]/10 px-2.5 py-1 rounded-md">
                    {pillar.badge}
                  </span>

                  <h3 className="font-serif font-bold text-slate-900 text-lg group-hover:text-[#1B365D] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-[#1B365D] font-bold">
                  <span>{pillar.stats}</span>
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

