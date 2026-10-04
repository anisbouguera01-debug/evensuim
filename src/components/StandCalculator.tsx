import React, { useState } from 'react';
import { StandQuote } from '../types';
import { SPONSORING_PACKAGES } from '../data/mockData';
import { 
  Calculator, 
  CheckCircle2, 
  Building, 
  FileText, 
  Send, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Download,
  Info,
  Check
} from 'lucide-react';

export const StandCalculator: React.FC = () => {
  const [salonId, setSalonId] = useState<string>('chocorium');
  const [surfaceM2, setSurfaceM2] = useState<number>(24);
  const [standType, setStandType] = useState<'bare' | 'equipped' | 'custom_island'>('equipped');
  const [cornerCount, setCornerCount] = useState<number>(2);
  const [selectedSponsorPack, setSelectedSponsorPack] = useState<string>('none');

  const [options, setOptions] = useState({
    electricity: true,
    ledScreen: false,
    brandingCorner: true,
    vipPasses: true,
    hostesses: false
  });

  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pricing Rules in DZD per m²
  const basePricePerM2 = standType === 'bare' ? 22000 : standType === 'equipped' ? 32000 : 45000;
  const surfaceCost = surfaceM2 * basePricePerM2;
  const cornerCost = (cornerCount - 1) * 25000;

  const optionCosts = 
    (options.electricity ? 15000 : 0) +
    (options.ledScreen ? 85000 : 0) +
    (options.brandingCorner ? 45000 : 0) +
    (options.vipPasses ? 20000 : 0) +
    (options.hostesses ? 60000 : 0);

  const sponsorPack = SPONSORING_PACKAGES.find(p => p.id === selectedSponsorPack);
  const sponsorCost = sponsorPack ? sponsorPack.priceDZD : 0;

  const totalDZD = surfaceCost + cornerCost + optionCosts + sponsorCost;
  const totalEUR = Math.round(totalDZD / 220); // Approx conversion

  const handleOptionToggle = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.companyName || !contactForm.email || !contactForm.phone) return;

    const to = 'ops@evensium.com,zineb.taibi@evensium.com';
    const emailSubject = encodeURIComponent(`Devis Stand - ${salonId.toUpperCase()} : ${contactForm.companyName}`);
    const emailBody = encodeURIComponent(
      `Entreprise : ${contactForm.companyName}\nContact : ${contactForm.contactName}\nEmail : ${contactForm.email}\nTéléphone : ${contactForm.phone}\n\nSalon : ${salonId}\nSurface : ${surfaceM2} m²\nType de stand : ${standType}\nNombre d'angles : ${cornerCount}\nFormule sponsoring : ${sponsorPack ? sponsorPack.title : 'Aucune'}\n\nTotal estimé : ${totalDZD.toLocaleString('fr-FR')} DZD (≈ ${totalEUR.toLocaleString('fr-FR')} €)\n\nMessage :\n${contactForm.message}`
    );
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;

    setIsSubmitted(true);
  };

  return (
    <div className="bg-white/90 border border-sky-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden font-sans text-slate-900">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-mono uppercase tracking-widest mb-2 font-bold shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-sky-700" />
            Simulateur de Tarif en Temps Réel
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight uppercase">
            ESTIMATEUR & RÉSERVATION DE STAND
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Configurez votre surface d'exposition et recevez un devis officiel personnalisé instantanément.
          </p>
        </div>

        {/* Configuration Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Salon Picker */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Choisissez le Salon
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'chocorium', label: 'CHOCORIUM', badge: 'Sept 2026', color: 'border-amber-500 text-amber-300' },
                  { id: 'milktec', label: 'MILKTEC', badge: 'Sept 2026', color: 'border-cyan-500 text-cyan-300' },
                  { id: 'clinica', label: 'CLINICA', badge: '2027', color: 'border-emerald-500 text-emerald-300' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSalonId(s.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                      salonId === s.id
                        ? `bg-slate-800 ${s.color} shadow-lg ring-1 ring-cyan-500/30`
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[9px] font-mono opacity-80">{s.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  2. Surface du Stand (m²)
                </label>
                <span className="font-serif font-black text-cyan-400 text-lg">
                  {surfaceM2} m²
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="120"
                step="6"
                value={surfaceM2}
                onChange={(e) => setSurfaceM2(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>12 m² (Standard)</span>
                <span>24 m² (Intermédiaire)</span>
                <span>48 m² (Grand Stand)</span>
                <span>120 m² (Pavillon Sur-Mesure)</span>
              </div>
            </div>

            {/* Stand Type */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Formule d'Aménagement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'bare', name: 'Surface Nue', desc: 'Moquette & traçage' },
                  { type: 'equipped', name: 'Équipé Clé-en-main', desc: 'Cloisons, spots, enseigne' },
                  { type: 'custom_island', name: 'Îlot Sur-Mesure', desc: 'Design d\'architecte' },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setStandType(item.type as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      standType === item.type
                        ? 'bg-slate-800 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <p className="font-bold text-xs">{item.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Angles / Corners */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                4. Nombre d'Angles Ouverts
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setCornerCount(cnt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      cornerCount === cnt
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cnt} {cnt === 1 ? 'Angle' : 'Angles'}
                  </button>
                ))}
              </div>
            </div>

            {/* Options Checkboxes */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                5. Options Supplémentaires & Prestations
              </label>
              <div className="space-y-2">
                {[
                  { key: 'electricity', label: 'Raccordement Électrique Haute Puissance (3kW-10kW)', cost: '15 000 DZD' },
                  { key: 'ledScreen', label: 'Écran Mur LED Géant (55" à 85" 4K)', cost: '85 000 DZD' },
                  { key: 'brandingCorner', label: 'TotemSignalétique & Branding Haut de Gamme', cost: '45 000 DZD' },
                  { key: 'vipPasses', label: 'Pack Badges VIP & Inscription Catalogue Officiel', cost: '20 000 DZD' },
                  { key: 'hostesses', label: 'Hôtesses d\'Accueil Trilingues (4 Jours)', cost: '60 000 DZD' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    onClick={() => handleOptionToggle(opt.key as any)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs text-slate-300 select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        options[opt.key as keyof typeof options] ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {options[opt.key as keyof typeof options] && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{opt.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400 font-semibold">{opt.cost}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sponsoring Pack Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                6. Associer un Pack de Sponsoring (Optionnel)
              </label>
              <select
                value={selectedSponsorPack}
                onChange={(e) => setSelectedSponsorPack(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="none">Aucun sponsoring (Stand uniquement)</option>
                {SPONSORING_PACKAGES.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.title} ({pack.formattedPrice})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Real-time Summary Card & Booking Form */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Estimation Globale Officielle
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-300">
                      {totalDZD.toLocaleString('fr-FR')} DZD
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    ~ {totalEUR.toLocaleString('fr-FR')} € HT (Estimation indicative)
                  </p>
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-2 py-4 border-y border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Surface ({surfaceM2} m² @ {basePricePerM2.toLocaleString('fr-FR')} DZD)</span>
                    <span className="font-mono">{surfaceCost.toLocaleString('fr-FR')} DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Angles ({cornerCount} {cornerCount > 1 ? 'angles' : 'angle'})</span>
                    <span className="font-mono">{cornerCost.toLocaleString('fr-FR')} DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prestations & Équipements</span>
                    <span className="font-mono">{optionCosts.toLocaleString('fr-FR')} DZD</span>
                  </div>
                  {sponsorCost > 0 && (
                    <div className="flex justify-between text-amber-300 font-semibold">
                      <span>Sponsoring ({sponsorPack?.title})</span>
                      <span className="font-mono">{sponsorCost.toLocaleString('fr-FR')} DZD</span>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Informations Entreprise
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="Nom de l'entreprise *"
                    value={contactForm.companyName}
                    onChange={(e) => setContactForm({ ...contactForm, companyName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />

                  <input
                    type="text"
                    placeholder="Nom & Prénom du responsable"
                    value={contactForm.contactName}
                    onChange={(e) => setContactForm({ ...contactForm, contactName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Téléphone *"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Précisions sur vos produits ou besoins spécifiques..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la Demande de Réservation</span>
                </button>

              </form>
            ) : (
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-white">
                  Demande Transmise avec Succès !
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed max-w-xs mx-auto">
                  Merci <strong>{contactForm.companyName}</strong>. Notre équipe commerciale EVENSIUM examinera votre configuration de <strong>{surfaceM2}m²</strong> et vous enverra un bon de commande officiel sous 24h.
                </p>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1">
                  <p className="font-mono text-[10px] text-cyan-400">RÉFÉRENCE DE DOSSIER : #EV-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="text-slate-300">Lieu : SAFEX Pavillon Casbah</p>
                  <p className="text-slate-300">Montant Estimé : {totalDZD.toLocaleString('fr-FR')} DZD</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-all"
                >
                  Faire une autre simulation
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
