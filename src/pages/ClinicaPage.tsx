import React, { useState, useEffect } from 'react';
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
  Clock,
  Send,
  Building,
  Activity,
  Heart,
  Users,
  Phone,
  Mail,
  Quote,
  Star,
  History
} from 'lucide-react';

interface ClinicaPageProps {
  setCurrentPage: (page: PageId) => void;
  initialTab?: '2027' | 'archives';
}

export const ClinicaPage: React.FC<ClinicaPageProps> = ({ setCurrentPage, initialTab = '2027' }) => {
  const [activeTab, setActiveTab] = useState<'2027' | 'archives'>(initialTab);
  const [badgeRequestSubmitted, setBadgeRequestSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', specialty: 'medecin' });
  
  // Countdown state for 2027
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: May 15, 2027 (from original Clinica 2027 Page)
    const targetDate = new Date('2027-05-15T09:00:00').getTime();
    
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
    const emailSubject = encodeURIComponent(`Demande de Badge - Clinica : ${formData.name}`);
    const emailBody = encodeURIComponent(`Nom : ${formData.name}\nEmail : ${formData.email}\nInstitution : ${formData.institution}\nSpécialité / Profil : ${formData.specialty}`);
    
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;
    
    setBadgeRequestSubmitted(true);
  };

  const clinicThemes = [
    {
      title: "Hôpital Intelligent",
      desc: "Intelligence artificielle, dossiers médicaux partagés et solutions de télémédecine intégrées.",
      icon: <Activity className="w-6 h-6 text-sky-600" />
    },
    {
      title: "Chirurgie & Lasers",
      desc: "Démonstrations des dispositifs médicaux de haute technicité et des techniques mini-invasives.",
      icon: <Heart className="w-6 h-6 text-sky-600" />
    },
    {
      title: "Aménagement Médical",
      desc: "Nouvelles conceptions pour blocs opératoires, chambres connectées et cliniques esthétiques.",
      icon: <Building className="w-6 h-6 text-sky-600" />
    }
  ];

  const editions = [
    {
      year: '2025',
      title: '2ème Édition — Cliniques Connectées & Médecine du Futur',
      date: '18 - 21 Février 2025',
      location: 'Hôtel Sheraton Club des Pins, Alger',
      stats: [
        { label: 'Visiteurs Pros', value: '7,400+' },
        { label: 'Exposants', value: '45+' },
        { label: 'Conférenciers', value: '18' },
        { label: 'Cliniques Représentées', value: '22' }
      ],
      description: 'L\'édition 2025 de CLINICA s\'est imposée comme le plus grand carrefour médical d\'Algérie pour les cliniques privées et les technologies medico-esthétiques. Elle a permis de connecter des chirurgiens renommés avec des fabricants d\'implants et d\'appareils lasers de dernière génération.',
      highlights: [
        'Démonstrations en direct d\'interventions micro-invasives et laser esthétique',
        'Conférence plénière sur la digitalisation hospitalière en Algérie',
        'Lancement officiel de 4 nouveaux équipements d\'imagerie médicale portatifs',
        'Table ronde : Coopération internationale et tourisme médical'
      ],
      image: IMAGES.clinicaHeroBg
    },
    {
      year: '2024',
      title: '1ère Édition — L\'Essor de la Clinique Moderne',
      date: '22 - 25 Février 2024',
      location: 'Palais des Expositions SAFEX, Alger',
      stats: [
        { label: 'Visiteurs', value: '5,100+' },
        { label: 'Exposants', value: '30' },
        { label: 'Taux de satisfaction', value: '92%' },
        { label: 'Ateliers Techniques', value: '6' }
      ],
      description: 'La première édition de CLINICA a marqué le lancement d\'une dynamique de réseautage et d\'innovation scientifique sans précédent, structurant un secteur médico-privé en pleine expansion nationale.',
      highlights: [
        'Inauguration officielle par les hautes autorités du secteur de la Santé',
        'Ateliers pratiques de sutures esthétiques et techniques d\'injection anti-âge',
        'Showroom d\'équipements d\'aménagement de blocs opératoires complets',
        'Signature de protocoles d\'accords académiques inter-cliniques'
      ],
      image: IMAGES.chocoriumInauguration // Placeholder
    }
  ];

  const testimonials = [
    {
      quote: "CLINICA nous a permis de rencontrer l'intégralité des décideurs de cliniques privées d'Algérie en un seul lieu. Notre retour sur investissement a été immédiat.",
      author: "Dr. Karim Othmani",
      role: "Directeur Médical & Co-fondateur",
      company: "Clinique Bleue Alger",
      rating: 5
    },
    {
      quote: "L'organisation par l'équipe Evensium a été remarquable. La qualité des visiteurs, majoritairement des chirurgiens et pharmaciens, a fait la différence par rapport à d'autres salons régionaux.",
      author: "Sofia Benmeradi",
      role: "Directrice Commerciale",
      company: "MedTech Instruments",
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-sky-100/40 text-slate-900 min-h-screen font-sans pt-28 pb-20 selection:bg-sky-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-200 text-sky-900 text-xs font-bold shadow-sm hover:bg-sky-50 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'Accueil
          </button>

          {/* Unified elegant Tab Switcher - Medical Blue styled */}
          <div className="inline-flex p-1 bg-sky-950/5 border border-sky-200 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('2027')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === '2027'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-sky-900 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Édition 2027 (À Venir)
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'archives'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-sky-900 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              <History className="w-4 h-4" />
              Rétrospectives & Archives (2024 - 2025)
            </button>
          </div>
        </div>

        {/* ==================== ACTIVE TAB: 2027 EDITION ==================== */}
        {activeTab === '2027' && (
          <div className="space-y-16 animate-fade-in">
            {/* Hero Section styled in clinical blue */}
            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-sky-900 via-slate-950 to-sky-900 text-white p-8 sm:p-16 shadow-2xl border border-sky-800">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.2),transparent_50%)]" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Hero Left Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono uppercase tracking-widest font-bold">
                    <Activity className="w-4 h-4 text-sky-400" />
                    SALON DE RÉFÉRENCE MÉDICALE 2027
                  </div>
                  
                  <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                    CLINICA <span className="text-sky-400">2027</span>
                  </h1>
                  
                  <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Le plus grand carrefour d'Afrique du Nord dédié à l'innovation médicale, au génie hospitalier et au développement des cliniques médico-chirurgicales privées.
                  </p>

                  {/* Event Meta Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-3 bg-sky-900/40 border border-sky-800 p-3.5 rounded-2xl">
                      <Calendar className="w-5 h-5 text-sky-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-sky-300 uppercase font-mono block">DATES</span>
                        <span className="text-sm font-bold text-white">Mai 2027</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-sky-900/40 border border-sky-800 p-3.5 rounded-2xl">
                      <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-sky-300 uppercase font-mono block">LIEU</span>
                        <span className="text-sm font-bold text-white">Palais des Expositions SAFEX, Alger</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Countdown Box */}
                <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl text-center space-y-4">
                  <span className="text-[11px] font-mono tracking-widest text-sky-300 uppercase block font-bold">
                    Compte à rebours de l'Événement
                  </span>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-sky-950/80 p-3 rounded-2xl border border-sky-800">
                      <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.days}</span>
                      <span className="text-[9px] text-sky-300 uppercase font-bold">Jours</span>
                    </div>
                    <div className="bg-sky-950/80 p-3 rounded-2xl border border-sky-800">
                      <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.hours}</span>
                      <span className="text-[9px] text-sky-300 uppercase font-bold">Heures</span>
                    </div>
                    <div className="bg-sky-950/80 p-3 rounded-2xl border border-sky-800">
                      <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.minutes}</span>
                      <span className="text-[9px] text-sky-300 uppercase font-bold">Min</span>
                    </div>
                    <div className="bg-sky-950/80 p-3 rounded-2xl border border-sky-800">
                      <span className="text-2xl sm:text-3xl font-black text-white block font-mono">{timeLeft.seconds}</span>
                      <span className="text-[9px] text-sky-300 uppercase font-bold">Sec</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-sky-200">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>Lancement de l'événement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Medical Themes */}
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2 animate-fade-in">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-600 block">Thématiques 2027</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-sky-950 uppercase tracking-tight">Au cœur du Progrès Médical</h2>
                <p className="text-sm text-slate-500 leading-relaxed">Les axes de développement, de recherche et d'exposition majeurs structurant cette 3ème édition.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clinicThemes.map((theme, idx) => (
                  <div key={idx} className="bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                        {theme.icon}
                      </div>
                      <h3 className="font-serif font-black text-lg text-sky-950 uppercase tracking-tight">{theme.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{theme.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-sky-50 text-[10px] text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Secteur Clinica
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience Banner */}
            <div className="bg-gradient-to-r from-sky-900 to-sky-800 text-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-sky-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_50%)]" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-5 text-center lg:text-left space-y-3">
                  <span className="text-xs uppercase font-mono text-sky-300 tracking-widest font-bold">Un rendez-vous d'exception</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black uppercase leading-tight">À qui s'adresse Clinica ?</h3>
                  <p className="text-xs text-sky-200 leading-relaxed">Un rendez-vous hautement scientifique et commercial structurant les relations professionnelles de la santé.</p>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-700">
                    <span className="font-serif font-black text-lg text-sky-300 block">CHIRURGIENS</span>
                    <span className="text-xs text-sky-100/80 block mt-1">Directeurs de cliniques, urologues, plasticiens, chirurgiens généraux...</span>
                  </div>
                  <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-700">
                    <span className="font-serif font-black text-lg text-sky-300 block">PRATICIENS</span>
                    <span className="text-xs text-sky-100/80 block mt-1">Médecins spécialistes, gynécologues, directeurs de centres de soins...</span>
                  </div>
                  <div className="bg-sky-950/40 p-4 rounded-xl border border-sky-700">
                    <span className="font-serif font-black text-lg text-sky-300 block">DÉCIDEURS</span>
                    <span className="text-xs text-sky-100/80 block mt-1">Acheteurs d'équipements, responsables d'hôpitaux et ingénieurs biomédicaux.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Registration Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Information Column */}
              <div className="lg:col-span-7 bg-white border border-sky-100 rounded-[32px] p-8 sm:p-12 shadow-sm flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-sky-950 uppercase tracking-tight leading-tight">
                    Optimisez vos Partenariats Scientifiques
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    CLINICA 2027 favorise la collaboration interdisciplinaire, l'acquisition de dispositifs d'imagerie et de micro-chirurgie, ainsi que la conclusion de partenariats commerciaux durables.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Secrétariat d'Organisation & Logistique</span>
                    <div className="flex flex-wrap gap-6 text-xs text-[#2D160A] font-bold">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>+213(0) 559 46 07 37</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                        <a href="mailto:sorayadjebar6@gmail.com" className="hover:underline">sorayadjebar6@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-sky-50 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-sky-600" />
                    <span className="text-xs font-bold text-sky-950">Organisé par Evensium Agency</span>
                  </div>
                  
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="px-5 py-2.5 rounded-full border border-sky-200 text-sky-950 bg-sky-50 hover:bg-sky-100 text-xs font-extrabold transition-all cursor-pointer"
                  >
                    Réserver mon Stand Exposant &gt;
                  </button>
                </div>
              </div>

              {/* Badge Request Form Column */}
              <div className="lg:col-span-5 bg-gradient-to-br from-sky-950 via-slate-950 to-sky-950 text-white rounded-[32px] p-8 sm:p-10 shadow-lg flex flex-col justify-between border border-sky-900 relative overflow-hidden">
                {!badgeRequestSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight">Demande d'Invitation Prioritaire</h3>
                      <p className="text-sky-200 text-xs">Inscription gratuite réservée exclusivement aux praticiens de santé, directeurs de cliniques et universitaires biomédicaux.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-sky-300 font-semibold">Nom & Prénom</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Ex: Dr. Anis Bouguera"
                          className="w-full bg-sky-950/80 border border-sky-800 rounded-xl px-4 py-3 text-xs text-white placeholder-sky-200/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-sky-300 font-semibold">Adresse E-mail</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Ex: contact@clinique-alger.com"
                          className="w-full bg-sky-950/80 border border-sky-800 rounded-xl px-4 py-3 text-xs text-white placeholder-sky-200/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-sky-300 font-semibold">Institution / Clinique / Cabinet</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.institution}
                          onChange={(e) => setFormData({...formData, institution: e.target.value})}
                          placeholder="Ex: Clinique Bleue d'Alger"
                          className="w-full bg-sky-950/80 border border-sky-800 rounded-xl px-4 py-3 text-xs text-white placeholder-sky-200/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider uppercase text-sky-300 font-semibold">Spécialité / Fonction</label>
                        <select 
                          value={formData.specialty}
                          onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                          className="w-full bg-sky-950 border border-sky-850 rounded-xl px-4 py-3 text-xs text-white focus:border-sky-450 focus:outline-none transition-all"
                        >
                          <option value="medecin">Médecin Spécialiste / Chirurgien</option>
                          <option value="directeur">Directeur d'Établissement Privé</option>
                          <option value="pharmacien">Pharmacien / Biologiste</option>
                          <option value="ingenieur">Ingénieur Biomédical / Fournisseur</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Obtenir mon Invitation Professionnelle</span>
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6 animate-fade-in relative z-10">
                    <div className="w-16 h-16 bg-sky-500/20 border-2 border-sky-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle className="w-8 h-8 text-sky-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-black text-white uppercase tracking-tight">Inscription validée</h3>
                      <p className="text-sky-200 text-xs leading-relaxed font-semibold">
                        Félicitations {formData.name}. Votre invitation e-badge nominative d'accès gratuit pour CLINICA 2027 a bien été générée.
                      </p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Un récapitulatif détaillé d'accès prioritaire a été transmis à l'adresse <strong>{formData.email}</strong>.
                      </p>
                    </div>

                    <button 
                      onClick={() => setBadgeRequestSubmitted(false)}
                      className="px-6 py-2 rounded-xl border border-sky-800 text-sky-300 bg-sky-950 hover:bg-sky-900 text-xs font-semibold transition-all"
                    >
                      Faire une nouvelle inscription
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== ACTIVE TAB: ARCHIVES & TIMELINE ==================== */}
        {activeTab === 'archives' && (
          <div className="space-y-16 animate-fade-in">
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-900 text-xs font-mono uppercase tracking-widest shadow-sm font-bold">
                <Award className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                Rétrospective & Excellence Médicale
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-sky-950 tracking-tight uppercase">
                CLINICA 2024 & 2025
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Parcourez l'histoire de CLINICA, le rendez-vous d'excellence regroupant les professionnels de la santé, cliniques privées, instituts médico-esthétiques et fabricants d'équipements médicaux en Algérie.
              </p>
            </div>

            {/* Global Retrospective Stats Grid */}
            <div className="bg-white border border-sky-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl pointer-events-none" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-sky-950 mb-6 text-center uppercase tracking-tight">
                Les Chiffres Marquants des Précédentes Éditions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-2xl bg-sky-50/50 border border-sky-100 animate-fade-in">
                  <span className="font-serif font-black text-3xl sm:text-4xl text-sky-800 block">12,500+</span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Médecins & Chirurgiens</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-sky-50/50 border border-sky-100 animate-fade-in">
                  <span className="font-serif font-black text-3xl sm:text-4xl text-sky-800 block">75+</span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Exposants Spécialisés</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-sky-50/50 border border-sky-100 animate-fade-in">
                  <span className="font-serif font-black text-3xl sm:text-4xl text-sky-800 block">26</span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Conférences Scientifiques</span>
                </div>
                <div className="text-center p-4 rounded-2xl bg-sky-50/50 border border-sky-100 animate-fade-in">
                  <span className="font-serif font-black text-3xl sm:text-4xl text-sky-800 block">94%</span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block mt-1">Taux de Recommandation</span>
                </div>
              </div>
            </div>

            {/* Detailed Timeline of Editions */}
            <div className="space-y-12">
              {editions.map((ed, index) => (
                <div 
                  key={ed.year}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-sky-100 p-6 sm:p-10 rounded-[32px] shadow-sm ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Info Side */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="inline-flex px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-mono font-extrabold">
                        Édition {ed.year}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-sky-950 uppercase tracking-tight">
                        {ed.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-sky-600" />
                          {ed.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-sky-600" />
                          {ed.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {ed.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-sky-50/40 p-4 rounded-2xl border border-sky-100">
                      {ed.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="text-center">
                          <span className="text-lg sm:text-xl font-black text-sky-800 font-mono block">
                            {stat.value}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                        Moments Forts & Innovations Scientifiques
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {ed.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-slate-600">
                            <CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-sky-100 shadow-md relative aspect-video sm:aspect-[4/3] bg-sky-100 group">
                      <img
                        src={ed.image}
                        alt={ed.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-transparent to-transparent" />
                      <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-sky-900/90 px-3 py-1 rounded-md backdrop-blur-sm">
                        Rétrospective Clinica {ed.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="bg-sky-950 text-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-sky-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="text-center max-w-xl mx-auto space-y-2 mb-10 relative z-10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-300 block">
                  Témoignages Scientifiques
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight">
                  La Voix des Professionnels
                </h3>
                <div className="w-12 h-0.5 bg-sky-400 mx-auto mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {testimonials.map((t, idx) => (
                  <div 
                    key={idx}
                    className="bg-sky-900/30 border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
                        ))}
                      </div>
                      <p className="text-sm text-sky-100/90 leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-white block">{t.author}</span>
                        <span className="text-[10px] text-sky-200 block">{t.role}</span>
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400 font-bold">
                        {t.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
