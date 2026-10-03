import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { EvensiumLogo } from '../components/EvensiumLogo';
import { IMAGES } from '../assets/images';
import { 
  Award, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Briefcase, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Send,
  Video,
  Layers,
  Heart,
  ExternalLink
} from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  customVideoUrl?: string | null;
  onVideoUpload?: (url: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '', service: 'salons' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll Ref for Upcoming Editions
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const scrollAmount = 374; // Card width (350px) + gap (24px)
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const upcomingEditions = [
    {
      title: "Salon Chocorium 2026",
      date: "23 au 26 Sept. 2026",
      location: "Palais des Expositions SAFEX, Alger",
      badge: "Chocolat & Confiserie",
      description: "Le rendez-vous incontournable des professionnels du chocolat, de la confiserie et des équipements de production en Algérie.",
      highlight: "Démonstrations & Masterclass",
      image: IMAGES.chocorium2026Poster,
      pageId: 'chocorium2026' as PageId
    },
    {
      title: "Salon Milktec 2026",
      date: "23 au 26 Sept. 2026",
      location: "Palais des Expositions SAFEX, Alger",
      badge: "Industrie Laitière",
      description: "Le salon professionnel dédié aux technologies de l'industrie laitière, de l'élevage et de la transformation de pointe.",
      highlight: "Tables rondes & Experts B2B",
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
      pageId: 'salons' as PageId
    },
    {
      title: "Clinica 2027",
      date: "Mai 2027",
      location: "Palais des Expositions SAFEX, Alger",
      badge: "Santé & Médical",
      description: "Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les services de santé.",
      highlight: "Plus de 120 exposants attendus",
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80',
      pageId: 'clinica2027' as PageId
    }
  ];

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    const to = 'ops@evensium.com,zineb.taibi@evensium.com';
    const emailSubject = encodeURIComponent(`Nouvelle demande depuis la page d'accueil de ${formData.name}`);
    const emailBody = encodeURIComponent(`Nom : ${formData.name}\nEmail : ${formData.email}\nTéléphone : ${formData.phone}\nEntreprise : ${formData.company}\nService / Sujet : ${formData.service}\n\nMessage :\n${formData.message}`);
    
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '', service: 'salons' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="bg-sky-50/40 text-slate-900 min-h-screen font-sans selection:bg-sky-600 selection:text-white">
      
      {/* ================= SECTION 1: HERO / COVER PAGE ================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#f0f9ff] via-[#e0f2fe] to-white px-6 py-20 border-b border-sky-100">
        
        {/* Abstract Background Shapes (gorgeous geometric layout with sky-blue, mint green, and soft purple accents) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Top-Left Dark Blue Shape */}
          <div className="absolute -top-32 -left-40 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] bg-[#1e3a8a] rounded-[80px] sm:rounded-[120px] rotate-[32deg] opacity-[0.85] shadow-xl" />
          
          {/* Bottom-Left Mint/Sky Green Shape */}
          <div className="absolute top-[48%] -left-36 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-[#bae6fd] rounded-[60px] sm:rounded-[90px] rotate-[35deg] opacity-[0.95] shadow-lg" />
          
          {/* Very Bottom-Left Soft Purple Shape */}
          <div className="absolute -bottom-36 -left-12 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-[#a78bfa] to-[#7c3aed] rounded-[70px] sm:rounded-[100px] rotate-[38deg] opacity-[0.85] shadow-lg" />
          
          {/* Light Right Gradient Mesh */}
          <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#e0f2fe] rounded-full filter blur-[100px] opacity-65" />
        </div>

        {/* Main Grid Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          {/* Left Column: Beautiful brand showcase with the main Evensium logo symbol */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="relative w-full max-w-md mx-auto">
              {/* Soft rotating background glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 via-[#1e3a8a]/10 to-purple-400/20 rounded-[40px] rotate-[-6deg] blur-xl animate-pulse" />
              
              {/* Main Premium Card */}
              <div className="relative rounded-[32px] border-4 border-white shadow-2xl bg-gradient-to-br from-white via-slate-50 to-sky-50/50 p-12 min-h-[450px] flex flex-col items-center justify-center text-center group">
                
                {/* Large Logo Icon */}
                <div className="transform group-hover:scale-105 transition-transform duration-500 my-auto">
                  <EvensiumLogo 
                    size={180} 
                    showText={false} 
                    className="mx-auto filter drop-shadow-xl"
                  />
                </div>
                
                <div className="mt-8 space-y-2">
                  <span className="bg-[#1e3a8a]/10 text-[#1e3a8a] font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Symbole d'excellence
                  </span>
                  <p className="text-slate-400 text-xs font-medium">Gestion d'événements de classe mondiale</p>
                </div>
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-sky-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-bold uppercase">Expérience</span>
                  <span className="block text-sm font-black text-slate-800">Événements d'Élite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text block on the right */}
          <div className="lg:col-span-7 text-left space-y-6 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#bae6fd] text-[#0369a1] border border-sky-200 shadow-sm uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Présentation Officielle
              </span>
              
              <div className="pt-2">
                <EvensiumLogo 
                  size={80} 
                  textColorClass="text-5xl sm:text-7xl font-black tracking-tight text-[#0f172a] lowercase" 
                />
              </div>
            </motion.div>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              <strong>Gestion d'événements professionnels et salons.</strong> Nous transformons vos projets d'entreprise en expériences mémorables et immersives de grande envergure.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-4 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('about')}
                className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
              >
                <span>Qui Sommes-Nous ?</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="bg-white hover:bg-sky-50 text-[#1e3a8a] border border-sky-200 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Découvrir nos services</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-2 gap-4 border-t border-sky-100 max-w-lg">
              <div>
                <span className="block text-2xl font-black text-[#0284c7]">360°</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gestion Clé en Main</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-[#0284c7]">100%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Engagement Réussite</span>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 cursor-pointer" onClick={() => scrollToSection('about')}>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">Faites défiler</span>
          <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#0284c7] rounded-full animate-bounce" />
          </div>
        </div>
      </section>


      {/* ================= SECTION 2: QUI SOMMES-NOUS ? ================= */}
      <section id="about" className="relative py-28 bg-white overflow-hidden border-b border-sky-100">
        
        {/* Subtle Decorative elements */}
        <div className="absolute top-10 left-10 w-44 h-44 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Presentation & Core content with real image */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
                PRÉSENTATION • 01
              </span>
              
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                Qui <span className="text-[#0284c7]">sommes-nous ?</span>
              </h2>
              
              <div className="w-20 h-1.5 bg-[#0284c7] rounded" />

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-semibold pl-4 border-l-4 border-[#1e3a8a]">
                Evensium est une agence événementielle de premier plan spécialisée dans l’organisation d’événements professionnels et de salons.
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Notre expertise a été démontrée à travers la réalisation et l'organisation d’événements majeurs haut de gamme et d'envergure nationale et internationale, tels que le prestigieux <strong>Clinica 2024 et 2025</strong>. 
                Nous combinons rigueur logistique, créativité spatiale et réactivité totale pour assurer un succès retentissant à chacun de vos salons d'affaires.
              </p>


            </div>

            {/* Right Column: Key visual with Team background illustration */}
            <div className="lg:col-span-5">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1e3a8a]/15 to-[#0284c7]/10 rounded-[40px] rotate-[6deg] blur-[2px]" />
                
                {/* Floating geometry */}
                <div className="absolute -right-10 top-10 w-24 h-24 bg-[#1e3a8a]/80 rounded-[20px] rotate-45 opacity-60" />
                <div className="absolute -left-8 bottom-6 w-16 h-16 bg-[#bae6fd] rounded-[15px] rotate-45 opacity-65" />

                <div className="relative bg-white border border-sky-100 rounded-3xl p-6 shadow-xl">
                  <div className="aspect-[4/3] sm:aspect-square w-full rounded-2xl bg-gradient-to-br from-sky-50 via-white to-slate-50 mb-6 border border-sky-100/50 flex items-center justify-center p-8">
                    <EvensiumLogo size={140} showText={false} className="opacity-95" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-slate-900 tracking-tight uppercase flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-sky-600" />
                      Savoir-Faire Certifié
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      De l'analyse de vos besoins à la livraison clé en main du projet d'exposition, Evensium est votre unique point de contact stratégique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

           {/* ================= SECTION 2.2: NOS SALONS (NON-CLICKABLE, HORIZONTAL ROWS) ================= */}
      <section className="relative py-24 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden border-b border-sky-100">
        <div className="absolute top-10 right-10 w-64 h-64 bg-sky-200/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
              PORTFOLIO • NOS SALONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Nos <span className="text-[#0284c7]">Salons</span>
            </h2>
            <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
            <p className="text-slate-500 text-sm">
              Découvrez la diversité de nos expositions sectorielles de premier plan en Algérie.
            </p>
          </div>

          <div className="space-y-24">
            
            {/* Salon 1: Clinica - Image Left, Content Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-lg border border-slate-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80" 
                    alt="Clinica" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyan-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Santé & Médical
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Édition Annuelle
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                  Clinica
                </h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les technologies de santé d'Algérie. Il rassemble les plus grands experts et fournisseurs de la région.
                </p>
                <div className="flex items-center gap-2 text-slate-500 pt-2 border-t border-slate-100 max-w-xs">
                  <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Palais des Expositions, SAFEX (Alger)</span>
                </div>
              </div>
            </div>

            {/* Salon 2: Chocorium - Image Right, Content Left */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-7 space-y-4 md:order-first order-last">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Édition de Prestige
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                  Chocorium
                </h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Le grand rendez-vous des maîtres chocolatiers, torréfacteurs de café et artisans confiseurs nationaux et internationaux. Une immersion sensorielle unique dédiée aux professionnels et amateurs de haute gastronomie sucrée.
                </p>
                <div className="flex items-center gap-2 text-slate-500 pt-2 border-t border-slate-100 max-w-xs">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Pavillon Casbah, SAFEX (Alger)</span>
                </div>
              </div>

              <div className="md:col-span-5 md:order-last order-first">
                <div className="aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-lg border border-slate-100 relative">
                  <img 
                    src={IMAGES.chocorium2026Poster} 
                    alt="Chocorium" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Cacao, Chocolat & Café
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Salon 3: Milktec - Image Left, Content Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-lg border border-slate-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80" 
                    alt="Milktec" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Filière Laitière & Elevage
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-600 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Plateforme Technique B2B
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                  Milktec
                </h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Le salon d'excellence dédié à l'industrie laitière, aux technologies de transformation de pointe, à l'élevage moderne et aux innovations de packaging en Algérie. Une opportunité unique de connecter l'amont et l'aval de la filière.
                </p>
                <div className="flex items-center gap-2 text-slate-500 pt-2 border-t border-slate-100 max-w-xs">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Palais des Expositions, SAFEX (Alger)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= SECTION 2.5: PROCHAINES ÉDITIONS ================= */}
      <section id="upcoming" className="relative py-24 bg-gradient-to-b from-white to-sky-50/30 overflow-hidden border-b border-sky-100">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
                AGENDA • 02
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Prochaines <span className="text-[#0284c7]">Éditions</span>
              </h2>
              <div className="w-16 h-1 bg-[#1e3a8a] rounded" />
              <p className="text-slate-500 text-sm">
                Découvrez nos futurs événements et salons professionnels d'envergure nationale et internationale.
              </p>
            </div>
            
            {/* Scroll Navigation Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-sky-200/80 bg-white hover:bg-sky-50 text-[#1e3a8a] flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                aria-label="Élément suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Row */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 -mx-4 px-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {upcomingEditions.map((edition, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentPage(edition.pageId)}
                className="w-[280px] sm:w-[350px] shrink-0 snap-start bg-white border border-sky-100/80 rounded-[28px] p-6 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer active:scale-[0.98]"
              >
                <div className="space-y-4">
                  {/* Card Image representation */}
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-sky-100/50 relative">
                    <img 
                      src={edition.image} 
                      alt={edition.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0284c7] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {edition.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Header: Date */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-1.5 text-[#1e3a8a]">
                      <Calendar className="w-4 h-4 text-[#0284c7]" />
                      <span className="text-xs font-extrabold uppercase tracking-wide">{edition.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#0284c7] transition-colors">
                    {edition.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {edition.description}
                  </p>
                </div>

                {/* Card Footer: Location & Highlights */}
                <div className="mt-6 pt-4 border-t border-sky-50 space-y-3">
                  <div className="flex items-start gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span className="text-[11px] font-semibold text-slate-500">{edition.location}</span>
                  </div>
                  
                  <div className="bg-sky-50/50 rounded-xl p-3 border border-sky-100/50 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-wider">{edition.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="mt-2 text-center md:hidden">
            <span className="inline-block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              ← Glissez pour en voir plus →
            </span>
          </div>

        </div>
      </section>


      {/* ================= SECTION 3: NOS SERVICES ================= */}
      <section id="services" className="relative py-28 bg-gradient-to-b from-[#e0f2fe]/30 to-sky-50/70 overflow-hidden border-b border-sky-100">
        
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
              COMPÉTENCES • 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Nos <span className="text-[#0284c7]">Services</span>
            </h2>
            <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
            <p className="text-slate-500 text-sm">
              Une gamme complète de prestations événementielles haut de gamme exécutées avec une précision chirurgicale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Salon de Prestige
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Salons et foires professionnelles
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Organisation complète de salons d'affaires. Gestion de l'espace, coordination des exposants et architecture commerciale de stands personnalisés.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Conception & Logistique</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Savoir Scientifique
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Conférences et séminaires
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Planification de symposiums d'experts, séminaires scientifiques et forums corporatifs d'envergure internationale avec équipement technologique de pointe.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Coordination Technique</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Gastronomie & VIP
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Dîners d’affaires et réceptions
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Coordination de banquets d'affaires, dîners de gala et réceptions VIP avec mise en valeur culinaire et scénographie lumineuse sur mesure.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Expérience VIP</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Relations Médias
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Conférences de presse
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Lancements de produits et communications officielles. Gestion des relations presse, accueil des journalistes, et dossiers médias complets.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Visibilité Média</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 5 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Cohésion d'Équipe
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Team building & événements internes
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Création d'activités sur mesure pour renforcer l'esprit d'équipe, célébrer les étapes clés de votre entreprise et motiver vos collaborateurs.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Cohésion Corporate</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Service 6 */}
            <div className="bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a] transform group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Studio & Régie
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Production audiovisuelle
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Captation vidéo de haute qualité, réalisation d'aftermovies, diffusion en direct (live streaming) et modélisation 3D de vos stands.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>Multimédia d'Élite</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= SECTION 4: POURQUOI CHOISIR EVENSIUM ? ================= */}
      <section id="why-us" className="relative py-28 bg-white overflow-hidden border-b border-sky-100">
        
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f0f9ff] rounded-tr-[240px] opacity-70 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
              VALEURS • 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
              Pourquoi choisir <span className="text-[#0284c7]">Evensium ?</span>
            </h2>
            <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
            <p className="text-slate-500 text-sm">
              Notre engagement s'appuie sur trois piliers fondamentaux pour garantir un succès sans faille.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="rounded-[32px] bg-sky-50/40 border border-sky-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100/80 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Expérience éprouvée
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Une gestion logistique et financière rigoureuse garantissant la réussite totale de vos congrès et foires.
                  </p>
                </div>
              </div>
              
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pt-6 mt-6 border-t border-slate-100">
                01 • Rigueur Logistique
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-[32px] bg-sky-50/40 border border-sky-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100/80 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Solutions personnalisées
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Chaque stand et événement est modélisé et conçu sur mesure en harmonie absolue avec votre image de marque.
                  </p>
                </div>
              </div>
              
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pt-6 mt-6 border-t border-slate-100">
                02 • Créativité sur Mesure
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-[32px] bg-sky-50/40 border border-sky-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100/80 flex items-center justify-center text-sky-600 shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    Réseau solide
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Un catalogue solide de prestataires qualifiés d'élite pour une exécution irréprochable et ponctuelle.
                  </p>
                </div>
              </div>
              
              <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pt-6 mt-6 border-t border-slate-100">
                03 • Réseau de Confiance
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* ================= SECTION 5: CONTACTEZ-NOUS ! ================= */}
      <section id="contact" className="relative py-28 bg-gradient-to-b from-white to-[#e0f2fe]/50 overflow-hidden">
        
        {/* Soft background reflections */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#bae6fd]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Direct info */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">
                  DISPONIBILITÉ • 04
                </span>
                
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                  Contactez-<span className="text-[#0284c7]">nous !</span>
                </h2>
                
                <div className="w-16 h-1 bg-[#1e3a8a] rounded" />
                
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                  Prêt à lancer votre prochain projet d'exposition ou de séminaire scientifique ? Nos équipes d'experts sont à votre écoute.
                </p>
              </div>

              {/* Real contact coordinates from Slide 5 */}
              <div className="space-y-4">
                
                {/* Email link */}
                <a 
                  href="mailto:ops@evensium.com" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-sky-50 border border-sky-100/80 shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Email de contact</span>
                    <span className="block text-slate-800 font-extrabold text-sm sm:text-base">ops@evensium.com</span>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-sky-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Telephone links */}
                <div 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-sky-100/80 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Téléphones officiels</span>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-0.5">
                      <a href="tel:0550462890" className="text-slate-800 hover:text-sky-600 font-extrabold text-sm sm:text-base transition-colors">
                        0550 46 28 90
                      </a>
                      <span className="hidden sm:inline text-slate-300">|</span>
                      <a href="tel:0550462891" className="text-slate-800 hover:text-sky-600 font-extrabold text-sm sm:text-base transition-colors">
                        0550 46 28 91
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-sky-100/80 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Siège social</span>
                    <span className="block text-slate-800 font-extrabold text-sm">Alger, Algérie - Pavillon Casbah, SAFEX</span>
                  </div>
                </div>

              </div>

              {/* Small branding footer */}
              <div className="pt-4 flex items-center gap-2">
                <EvensiumLogo size={24} showText={true} textColorClass="text-xs font-bold text-slate-400" />
              </div>
            </div>

            {/* Right Column: Custom Interactive Form */}
            <div className="lg:col-span-7 bg-white rounded-[32px] border border-sky-100 shadow-xl p-8 sm:p-10 relative">
              
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-sky-500" />
                Envoyer un message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Nom Complet *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Amine Brahimi"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Adresse Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Ex: contact@entreprise.dz"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-mono">Téléphone *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ex: 0550 12 34 56"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-mono">Entreprise / Clinique</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Clinique El Hana"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 font-mono">Service d'Intérêt</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                  >
                    <option value="salons">Salons et foires professionnelles</option>
                    <option value="conferences">Conférences et séminaires</option>
                    <option value="diners">Dîners d’affaires et réceptions</option>
                    <option value="presse">Conférences de presse</option>
                    <option value="team-building">Team building & événements internes</option>
                    <option value="audiovisuel">Production audiovisuelle</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Message *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Décrivez brièvement vos besoins pour l'événement (surface de stand, date, objectifs...)"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-2xl text-xs tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer la demande</span>
                    </>
                  )}
                </button>
              </form>

              {/* Success Notification */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-x-6 bottom-6 bg-emerald-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-xl"
                  >
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="font-extrabold text-sm">Message Envoyé !</p>
                      <p className="text-[11px] opacity-90">Merci. Nos chargés d'affaires Evensium vous répondront sous 24 heures.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
