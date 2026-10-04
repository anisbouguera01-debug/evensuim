import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { 
  Target, 
  Eye, 
  Award, 
  Globe, 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Megaphone, 
  Laptop, 
  Users, 
  Mail, 
  Phone, 
  Instagram, 
  ChevronRight, 
  CheckCircle2, 
  History,
  PenTool,
  Volume2
} from 'lucide-react';

interface CompanyProfileShowcaseProps {
  setCurrentPage: (page: PageId) => void;
}

export const CompanyProfileShowcase: React.FC<CompanyProfileShowcaseProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'missions' | 'objectifs' | 'milestones' | 'services'>('about');

  // Slide 6 & 7: Milestones
  const milestones = [
    {
      period: '2021 - 2022',
      title: 'Golden Village -beni ksila-',
      subtitle: 'Premier jalon d\'excellence',
      description: 'Lancement réussi des événements résidentiels et culturels d\'envergure sur la côte béjaouie.',
      location: 'Beni Ksila, Bejaia',
      badge: 'Succès Régional'
    },
    {
      period: 'Juillet 2022',
      title: 'Coke Studio',
      subtitle: 'Partenariat de marque d\'élite',
      description: 'Conception logistique, aménagement et activation de la plateforme musicale internationale Coke Studio en Algérie.',
      location: 'Alger, Algérie',
      badge: 'Brand Activation'
    },
    {
      period: '2023',
      title: 'Golden Village -Sheraton-',
      subtitle: 'Consolidation haut de gamme',
      description: 'Rassemblement d\'exception au prestigieux hôtel Sheraton d\'Alger, réunissant VIP et leaders d\'opinions.',
      location: 'Sheraton Club des Pins, Alger',
      badge: 'Luxe & Prestige'
    },
    {
      period: '2024',
      title: 'Mamlaka (المملكة)',
      subtitle: 'Événement thématique majeur',
      description: 'Production immersive et gestion intégrée à 360° de la grande initiative culturelle Mamlaka.',
      location: 'Alger, Algérie',
      badge: 'Production Culturelle'
    },
    {
      period: 'Février 2024',
      title: 'CLINICA 2024',
      subtitle: 'Salon International Médical',
      description: 'Salon professionnel de référence pour les cliniques médico-chirurgicales et d\'esthétique. Une réussite historique sous la direction de Zineb Taibi.',
      location: 'SAFEX Pavillon Casbah, Alger',
      badge: 'Salon d\'Excellence'
    },
    {
      period: 'Mai 2024',
      title: 'L\'MIMA (Fête des Mères)',
      subtitle: 'Émotion & Expérience',
      description: 'Événement d\'envergure célébrant la fête des mères avec des activations de marques premium et des moments inoubliables.',
      location: 'Alger, Algérie',
      badge: 'Événementiel Social'
    },
    {
      period: '2025 (Upcoming)',
      title: 'AGRIUM 2025',
      subtitle: 'Le Salon de l\'Agro-industrie',
      description: 'Salon professionnel d\'envergure dédié à l\'agriculture moderne et aux technologies agroalimentaires.',
      location: 'Palais des Expositions SAFEX, Alger',
      badge: 'Futur Pilier'
    }
  ];

  // Slide 8 & 9: Services list
  const services = [
    {
      title: 'Conception & Organisation d\'Événements',
      category: 'Logistique & Scénographie',
      icon: <Briefcase className="w-5 h-5 text-sky-600" />,
      desc: 'Création de concepts uniques, planification stratégique et exécution rigoureuse de vos salons professionnels et lancements d\'envergure.'
    },
    {
      title: 'Gestion des Événements sur Site',
      category: 'Logistique & Scénographie',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      desc: 'Supervision technique totale, coordination des prestataires et gestion de l\'accueil pour garantir un déroulement fluide et professionnel.'
    },
    {
      title: 'Gestion des Exposants & Sponsors',
      category: 'Logistique & Scénographie',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      desc: 'Accompagnement commercial personnalisé, attribution stratégique des espaces et valorisation optimale de la visibilité des partenaires.'
    },
    {
      title: 'Personnalisation & Aménagement de Stands',
      category: 'Logistique & Scénographie',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      desc: 'Design d\'architecture de stand sur-mesure, menuiserie haut de gamme et installations immersives pour maximiser votre impact visuel.'
    },
    {
      title: 'Team Buildings & Incentives',
      category: 'Logistique & Scénographie',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      desc: 'Conception d\'activités de cohésion uniques pour renforcer l\'esprit d\'équipe de vos collaborateurs dans des cadres exceptionnels.'
    },
    {
      title: 'Stratégie de Communication',
      category: 'Communication & Branding',
      icon: <Megaphone className="w-5 h-5 text-rose-600" />,
      desc: 'Élaboration de plans de communication intégrés à 360° pour amplifier le message de vos événements auprès des publics cibles.'
    },
    {
      title: 'Création de Contenus',
      category: 'Communication & Branding',
      icon: <PenTool className="w-5 h-5 text-pink-600" />,
      desc: 'Rédaction d\'argumentaires, réalisation de vidéos promotionnelles captivantes, communiqués de presse et supports d\'édition premium.'
    },
    {
      title: 'Relations Publiques & Médias',
      category: 'Communication & Branding',
      icon: <Volume2 className="w-5 h-5 text-cyan-600" />,
      desc: 'Couverture médiatique d\'élite (Télévision, Radio, Presse écrite, Influenceurs) pour assurer une résonance maximale à vos salons.'
    },
    {
      title: 'Communication Digitale & Événementielle',
      category: 'Communication & Branding',
      icon: <Laptop className="w-5 h-5 text-blue-600" />,
      desc: 'Animation des réseaux sociaux en temps réel, campagnes publicitaires ciblées et plateformes web dédiées à l\'inscription des visiteurs.'
    },
    {
      title: 'Identité Visuelle & Branding',
      category: 'Communication & Branding',
      icon: <Target className="w-5 h-5 text-teal-600" />,
      desc: 'Charte graphique sur-mesure, logotypes percutants et déclinaisons de signalétiques événementielles haut de gamme.'
    }
  ];

  return (
    <section id="evensium-profile" className="py-24 bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-900 relative overflow-hidden border-b border-sky-100">
      
      {/* Background decorations */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with Evensium ribbon styling */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-900 font-mono text-[11px] uppercase tracking-wider font-bold shadow-sm">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Présentation d'Entreprise</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            PROFIL CORPORATE <span className="text-sky-700">EVENSIUM</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-sans max-w-2xl mx-auto">
            Découvrez la vision stratégique, les jalons historiques et l’expertise événementielle complète de l’un des plus grands organisateurs de salons professionnels en Algérie.
          </p>

          {/* Interactive Navigation Tabs inspired by Slide Agenda */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {[
              { id: 'about', label: 'À propos', icon: <Users className="w-4 h-4" /> },
              { id: 'missions', label: 'Missions & Vision', icon: <Target className="w-4 h-4" /> },
              { id: 'objectifs', label: 'Nos Objectifs', icon: <Award className="w-4 h-4" /> },
              { id: 'milestones', label: 'Milestones (Historique)', icon: <History className="w-4 h-4" /> },
              { id: 'services', label: 'Nos Services', icon: <Briefcase className="w-4 h-4" /> }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-sm border ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900/10' 
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            
            {/* 1. À PROPOS (Slide 3) */}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 uppercase">
                    Une Expertise Événementielle de Premier Plan
                  </h3>
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans font-medium border-l-4 border-sky-500 pl-4 bg-sky-50/50 py-3 pr-2 rounded-r-xl">
                    EVENSIUM est une entreprise de gestion d’événements de premier plan, spécialisée dans l’organisation d’événements professionnels et de salons.
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Sous la direction de <strong>Zineb Taibi</strong>, EVENSIUM a constamment démontré une expertise exceptionnelle en gestion d’événements. Cette exigence et ce savoir-faire se sont illustrés de manière éclatante lors de la réussite retentissante de <strong>CLINICA</strong>, s’imposant comme le rendez-vous incontournable des acteurs de la santé.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                      <span className="font-serif font-black text-3xl text-sky-700 block">100%</span>
                      <span className="text-xs text-slate-500 font-mono uppercase font-bold mt-1 block">Orientation Client</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                      <span className="font-serif font-black text-3xl text-indigo-600 block">Alger</span>
                      <span className="text-xs text-slate-500 font-mono uppercase font-bold mt-1 block">Siège & Ancrage National</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-300 to-indigo-300 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-sm">
                      <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-200">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                          alt="Zineb Taibi - General Manager" 
                          className="w-full h-full object-cover grayscale-25"
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="font-serif font-black text-xl text-slate-900 uppercase">ZINEB TAIBI</h4>
                        <p className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest mt-1">General Manager, Evensium</p>
                        <p className="text-slate-500 text-xs italic mt-3 leading-relaxed">
                          "Notre ambition est d'élever chaque rassemblement professionnel au rang d'expérience mémorable et d'accélérateur d'affaires."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MISSIONS & VISION (Slide 4) */}
            {activeTab === 'missions' && (
              <motion.div
                key="missions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              >
                {/* Mission Card */}
                <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden flex flex-col justify-between group hover:border-sky-500/60 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl" />
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                      Notre Mission
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Notre mission est de créer des événements extraordinaires et des expériences exceptionnelles, en veillant à ce que chaque occasion soit mémorable et marquante.
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold text-slate-800">
                      Nous nous engageons à l’excellence, offrant à nos partenaires et exposants une visibilité inégalée et des opportunités de croissance significatives.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-mono font-bold text-sky-700 uppercase">
                    <span>Créer l'extraordinaire</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden flex flex-col justify-between group hover:border-indigo-500/60 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl" />
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                      Notre Vision
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      EVENSIUM s’engage à organiser des événements exceptionnels grâce à une dévotion inébranlable à l’excellence et à l’innovation.
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold text-slate-800">
                      Notre vision est d’internationaliser notre travail en collaborant avec des partenaires mondiaux, créant ainsi des opportunités de croissance et de succès à l’échelle internationale pour nos clients.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-mono font-bold text-indigo-700 uppercase">
                    <span>Expansion mondiale</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NOS OBJECTIFS (Slide 5) */}
            {activeTab === 'objectifs' && (
              <motion.div
                key="objectifs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: 'Élever les standards des événements',
                    description: 'Améliorer continuellement la qualité et l’exécution des événements pour dépasser les attentes des clients et les normes de l’industrie.',
                    icon: <Award className="w-6 h-6 text-amber-600" />,
                    bg: 'from-amber-500/5 to-transparent',
                    border: 'hover:border-amber-500/60'
                  },
                  {
                    title: 'Augmenter la visibilité mondiale',
                    description: 'Élargir notre portée en augmentant la visibilité et l’impact internationaux pour nos partenaires et exposants grâce à des stratégies innovantes.',
                    icon: <Globe className="w-6 h-6 text-sky-600" />,
                    bg: 'from-sky-500/5 to-transparent',
                    border: 'hover:border-sky-500/60'
                  },
                  {
                    title: 'Offrir des expériences mémorables',
                    description: 'Créer des moments inoubliables et significatifs pour nos clients et leurs invités, en assurant une exécution impeccable et une attention totale aux moindres détails.',
                    icon: <Heart className="w-6 h-6 text-rose-600" />,
                    bg: 'from-rose-500/5 to-transparent',
                    border: 'hover:border-rose-500/60'
                  }
                ].map((obj, i) => (
                  <div
                    key={i}
                    className={`bg-white border-2 border-slate-200/80 rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${obj.border}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${obj.bg} pointer-events-none`} />
                    <div className="space-y-6 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                        {obj.icon}
                      </div>
                      <h4 className="font-serif font-black text-xl text-slate-900 uppercase tracking-tight leading-snug">
                        {obj.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {obj.description}
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mt-4">
                      Objectif Stratégique 0{i + 1}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 4. HISTORIQUE & MILESTONES (Slide 6 & 7) */}
            {activeTab === 'milestones' && (
              <motion.div
                key="milestones"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <History className="w-3.5 h-3.5 text-emerald-600" />
                    Parcours d'Excellence
                  </span>
                </div>

                {/* Horizontal Timeline for Desktop / Vertical for Mobile */}
                <div className="relative border-l-2 border-slate-200/80 pl-6 ml-4 md:border-l-0 md:pl-0 md:ml-0 md:grid md:grid-cols-7 md:gap-4 md:pt-12">
                  {/* Decorative horizontal line for desktop */}
                  <div className="hidden md:block absolute top-[52px] left-4 right-4 h-0.5 bg-gradient-to-r from-sky-200 via-indigo-200 to-amber-200 z-0" />
                  
                  {milestones.map((ms, index) => (
                    <div key={index} className="relative mb-8 md:mb-0 text-left md:text-center group">
                      
                      {/* Interactive dot */}
                      <div className="absolute -left-[35px] top-1.5 md:left-1/2 md:-translate-x-1/2 md:-top-[22px] z-10">
                        <div className="w-6 h-6 rounded-full bg-white border-4 border-slate-900 group-hover:border-sky-500 transition-colors shadow-md flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover:bg-sky-500" />
                        </div>
                      </div>

                      {/* Year badge */}
                      <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-[11px] font-extrabold tracking-wider mb-3 shadow-sm">
                        {ms.period}
                      </div>

                      {/* Card Content */}
                      <div className="md:mt-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all group-hover:border-slate-300 md:max-w-[160px] md:mx-auto">
                        <span className="text-[9px] font-mono font-bold text-sky-700 uppercase tracking-wider block mb-1">
                          {ms.badge}
                        </span>
                        <h4 className="font-serif font-black text-xs sm:text-sm text-slate-900 leading-tight group-hover:text-sky-700 transition-colors line-clamp-2 uppercase">
                          {ms.title}
                        </h4>
                        <p className="text-slate-500 text-[10px] leading-relaxed mt-1 line-clamp-3">
                          {ms.description}
                        </p>
                        <div className="flex items-center justify-start md:justify-center gap-1 text-[9px] text-slate-400 font-mono mt-2">
                          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          <span className="truncate">{ms.location}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. NOS SERVICES (Slide 8 & 9) */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Categorized Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Category A: Logistique & Scénographie (Slide 8) */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                      <span>Ingénierie, Logistique & Scénographie</span>
                    </div>

                    <div className="space-y-4">
                      {services.filter(s => s.category === 'Logistique & Scénographie').map((service, idx) => (
                        <div 
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-sky-300 flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="font-serif font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                              {service.title}
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 font-sans">
                              {service.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category B: Stratégie & Communication (Slide 9) */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Megaphone className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Stratégie, Communication & Branding</span>
                    </div>

                    <div className="space-y-4">
                      {services.filter(s => s.category === 'Communication & Branding').map((service, idx) => (
                        <div 
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-indigo-300 flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="font-serif font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                              {service.title}
                            </h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 font-sans">
                              {service.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Slide 10: Elegant "Connect with us" Banner */}
        <div className="mt-24 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sky-300 text-xs font-mono uppercase tracking-widest font-bold">
                Contact & Partenariats
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-white">
                Collaborons <br />
                <span className="text-sky-400">Ensemble</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                Vous souhaitez exposer à l’un de nos prestigieux salons, devenir sponsor officiel, ou confier la gestion globale de votre prochain événement à l’équipe Evensium ? Écrivez-nous dès aujourd’hui.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-slate-800 pt-8 lg:border-t-0 lg:pt-0">
              
              {/* Emails */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-800/80 flex items-center justify-center text-sky-400">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">E-mail de contact</h4>
                <div className="space-y-1">
                  <a href="mailto:ops@evensium.com" className="text-xs sm:text-sm font-semibold hover:text-sky-400 transition-colors block break-all">
                    ops@evensium.com
                  </a>
                  <a href="mailto:zineb.taibi@evensium.com" className="text-xs sm:text-sm font-semibold hover:text-sky-400 transition-colors block break-all">
                    zineb.taibi@evensium.com
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">Téléphone</h4>
                <div className="space-y-1">
                  <a href="tel:+213555002811" className="text-xs sm:text-sm font-semibold hover:text-emerald-400 transition-colors block">
                    +213 555 002 811
                  </a>
                  <a href="tel:+213550462890" className="text-xs sm:text-sm font-semibold hover:text-emerald-400 transition-colors block">
                    +213 550 462 890
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-800/80 flex items-center justify-center text-pink-400">
                  <Instagram className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">Réseaux Sociaux</h4>
                <div className="space-y-1">
                  <a href="https://instagram.com/evensium.event" target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-semibold hover:text-pink-400 transition-colors block">
                    @evensium.event
                  </a>
                  <a href="https://instagram.com/clinica_expo" target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-semibold hover:text-pink-400 transition-colors block">
                    @clinica_expo
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
