import React, { useRef, useState } from 'react';
import { PageId } from '../types';
import { EvensiumLogo, PILL_DIRECTIONS } from './EvensiumLogo';
import { gsap, SplitText, useGSAP, MQ, SCRUB } from '../animations/gsap';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  ArrowUpRight, 
  Figma, 
  Award, 
  Send, 
  Building2,
  Calendar,
  ShoppingBag
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onOpenDesignSystem: () => void;
  onOpenShopifyTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  setCurrentPage, 
  onOpenDesignSystem,
  onOpenShopifyTheme
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    salon: 'chocorium',
    surface: '9',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const root = useRef<HTMLElement>(null);

  // Conclusion lente : les blocs montent, puis le X se réassemble (miroir du hero)
  // pendant que le grand wordmark s'écrit lettre par lettre.
  useGSAP(
    () => {
      const footer = root.current;
      if (!footer) return;
      const q = gsap.utils.selector(footer);
      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const d = ctx.conditions?.desktop ? 1 : 0.5;
        (q('[data-footer-block]') as HTMLElement[]).forEach((block) => {
          gsap.from(block, {
            y: 80 * d,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: block, start: 'top 98%', end: 'top 70%', scrub: SCRUB },
          });
        });

        const finale = q('[data-footer-finale]')[0] as HTMLElement;
        const word = SplitText.create(q('[data-footer-word]')[0] as HTMLElement, { type: 'chars', mask: 'chars' });
        gsap
          .timeline({ scrollTrigger: { trigger: finale, start: 'top 95%', end: 'bottom bottom', scrub: SCRUB } })
          .from(
            q('[data-footer-finale] [data-pill]'),
            {
              x: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].x * 90,
              y: (_: number, el: Element) => PILL_DIRECTIONS[(el as HTMLElement).dataset.pill as keyof typeof PILL_DIRECTIONS].y * 90,
              opacity: 0,
              ease: 'power3.out',
              stagger: 0.05,
            },
            0,
          )
          .from(word.chars, { yPercent: 110, ease: 'power3.out', stagger: 0.06 }, 0.15);
        return () => word.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="bg-[#f5f5f7] text-[#515154] border-t border-black/10 pt-16 pb-12 relative overflow-hidden font-sans">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section de Réservation de Stand et Contacts Directs */}
        <div data-footer-block className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 mb-12 shadow-lg relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Stand Reservation Form (7 cols) */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#88D4B0]/20 text-[#0f8a53] border border-[#88D4B0]/40 mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#0f8a53]" />
              Espace Exposants
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
              Réserver votre Stand
            </h3>
            <p className="text-[#515154] text-sm mb-6 leading-relaxed">
              Planifiez votre participation dès maintenant. Remplissez ce formulaire pour recevoir un devis personnalisé et réserver l'emplacement idéal pour votre entreprise.
            </p>

            {formSubmitted ? (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#0f8a53]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1d1d1f]">
                  Demande reçue avec succès !
                </h4>
                <p className="text-[#515154] text-xs max-w-md leading-relaxed">
                  Merci, <strong>{formData.contactPerson}</strong>. Notre équipe commerciale va étudier votre demande pour le salon <strong>{formData.salon.toUpperCase()}</strong> et vous contactera par téléphone ({formData.phone}) ou par email ({formData.email}) sous 24 heures.
                </p>
                <button
                  onClick={() => {
                    setFormData({
                      companyName: '',
                      contactPerson: '',
                      phone: '',
                      email: '',
                      salon: 'chocorium',
                      surface: '9',
                      message: ''
                    });
                    setFormSubmitted(false);
                  }}
                  className="mt-2 text-xs font-semibold text-[#0066cc] hover:underline"
                >
                  Faire une nouvelle demande
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.email) {
                    alert('Veuillez remplir tous les champs obligatoires.');
                    return;
                  }
                  setFormLoading(true);

                  const to = 'ops@evensium.com,zineb.taibi@evensium.com';
                  const emailSubject = encodeURIComponent(`Demande de Stand - ${formData.salon.toUpperCase()} : ${formData.companyName}`);
                  const emailBody = encodeURIComponent(
                    `Entreprise : ${formData.companyName}\nContact : ${formData.contactPerson}\nTéléphone : ${formData.phone}\nEmail : ${formData.email}\nSalon : ${formData.salon}\nSurface souhaitée : ${formData.surface} m²\n\nMessage :\n${formData.message}`
                  );
                  window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;

                  setTimeout(() => {
                    setFormLoading(false);
                    setFormSubmitted(true);
                  }, 800);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Ex: Chocolaterie Royale"
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Nom du contact *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Ex: M. Malik Ben"
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Téléphone de contact *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: +213 555 12 34 56"
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: contact@entreprise.com"
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Sélectionner le Salon *
                    </label>
                    <select
                      value={formData.salon}
                      onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    >
                      <option value="chocorium2026">CHOCORIUM 2026 (Chocolat & Confiserie)</option>
                      <option value="milktec">MILKTEC 2026 (Salon du Lait & Industrie)</option>
                      <option value="clinica2027">CLINICA 2027 (Santé & Médical)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1d1d1f] block">
                      Surface souhaitée (m²)
                    </label>
                    <select
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] field"
                    >
                      <option value="9">9 m² (Stand Standard)</option>
                      <option value="12">12 m² (Moyen)</option>
                      <option value="18">18 m² (Grand standard)</option>
                      <option value="24">24 m² (Angle premium)</option>
                      <option value="36">36 m² et plus (Pavillon personnalisé)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1d1d1f] block">
                    Message ou exigences particulières
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ex: Emplacement d'angle souhaité, raccordement eau, électricité triphasée..."
                    className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1d1d1f] focus:outline-none focus:border-[#0066cc] resize-none field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  aria-busy={formLoading}
                  className="btn-cine w-full sm:w-auto px-6 py-3 bg-[#0f8a53] hover:bg-[#0c6b40] disabled:bg-[#0f8a53]/60 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Traitement...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma demande de stand</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Direct Contacts Column (5 cols) */}
          <div className="lg:col-span-5 lg:border-l lg:border-black/5 lg:pl-10 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 mb-4">
                <Globe className="w-3.5 h-3.5 text-[#0066cc]" />
                EVENSIUM Algérie
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1d1d1f] tracking-tight mb-4">
                Contacts Directs
              </h3>
              <p className="text-[#515154] text-xs sm:text-sm mb-6 leading-relaxed">
                Vous préférez nous contacter directement par téléphone ou par email ? Nos conseillers sont à votre entière disposition pour répondre à toutes vos questions.
              </p>

              <div className="space-y-4">
                {/* Phones */}
                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#f5f5f7] transition-all border border-transparent hover:border-black/5">
                  <div className="p-2 rounded-xl bg-sky-50 text-[#0066cc] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1d1d1f]">Téléphones Directs</h4>
                    <div className="text-[#515154] text-xs mt-1 space-y-1 font-mono">
                      <a href="tel:+213559460737" className="block hover:text-[#0066cc] hover:underline">+213 (0) 559 46 07 37</a>
                      <a href="tel:+213555002811" className="block hover:text-[#0066cc] hover:underline">+213 (0) 555 00 28 11</a>
                      <a href="tel:+213550462890" className="block hover:text-[#0066cc] hover:underline">+213 (0) 550 46 28 90</a>
                    </div>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#f5f5f7] transition-all border border-transparent hover:border-black/5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-[#0f8a53] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1d1d1f]">Adresses Emails</h4>
                    <div className="text-[#515154] text-xs mt-1 space-y-1 font-mono">
                      <a href="mailto:ops@evensium.com" className="block hover:text-[#0f8a53] hover:underline">ops@evensium.com</a>
                      <a href="mailto:zineb.taibi@evensium.com" className="block hover:text-[#0f8a53] hover:underline">zineb.taibi@evensium.com</a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#f5f5f7] transition-all border border-transparent hover:border-black/5">
                  <div className="p-2 rounded-xl bg-purple-50 text-[#9B68A6] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1d1d1f]">Bureaux & Permanence SAFEX</h4>
                    <p className="text-[#515154] text-xs mt-1 leading-relaxed">
                      Al Coopérative IGF, Ras Elforn, Dely Brahim, Alger.<br />
                      Permanence : <strong>SAFEX Pins Maritimes, Pavillon Casbah</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-400">
              <span>Organisateur officiel de salons agréés</span>
              <span className="font-mono font-bold text-[#0066cc]">EVENSIUM SPA</span>
            </div>
          </div>

        </div>

        {/* Top Newsletter & Instant Quote Callout */}
        <div data-footer-block className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 mb-16 shadow-lg relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/20 mb-3">
              <Award className="w-3.5 h-3.5 text-[#0066cc]" />
              Plateforme Internationale
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
              S'abonner aux Actualités des Salons EVENSIUM
            </h3>
            <p className="text-[#515154] text-sm mt-2">
              Recevez les programmes officiels, les appels à communication et les disponibilités de réservations de stands pour CHOCORIUM et CLINICA.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:w-80">
              <input
                type="email"
                aria-label="Votre adresse email professionnelle"
                placeholder="Votre adresse email professionnelle"
                className="w-full bg-[#f5f5f7] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-slate-400 focus:outline-none focus:border-[#0066cc] field"
              />
            </div>
            <button className="px-6 py-3 bg-[#0066cc] hover:bg-[#004499] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0">
              <span>S'abonner</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div data-footer-block className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-black/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <EvensiumLogo 
                size={32} 
                textColorClass="text-3xl text-[#1d1d1f] font-bold" 
              />
            </div>

            <p className="text-[#515154] text-sm leading-relaxed max-w-sm">
              EVENSIUM est une entreprise de gestion d'événements de premier plan, spécialisée dans l'organisation de salons professionnels et d'expositions internationales.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-[#1d1d1f] font-sans">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0f8a53] shrink-0" />
                <span>ops@evensium.com • zineb.taibi@evensium.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>+213 555 002 811 / +213 550 462 890</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B68A6] shrink-0 mt-0.5" />
                <span>Al Coopérative IGF, Ras Elforn, Dely Brahim, Alger • SAFEX Pavillon Casbah</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[#1d1d1f] text-sm font-bold tracking-wider uppercase font-mono mb-4">
              Nos Salons
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('chocorium2025')}
                  className="hover:text-[#8a6b29] transition-colors flex items-center gap-1.5 font-semibold text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  CHOCORIUM — Archives 2025
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('chocorium2026')}
                  className="hover:text-[#8a6b29] transition-colors flex items-center gap-1.5 font-semibold text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8a6b29]" />
                  CHOCORIUM — Édition 2026
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('milktec')}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-semibold text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  MILKTEC — Salon du Lait 2026
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('clinica2025')}
                  className="hover:text-[#0066cc] transition-colors flex items-center gap-1.5 font-semibold text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  CLINICA — Archives 2025
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('clinica2027')}
                  className="hover:text-[#0066cc] transition-colors flex items-center gap-1.5 font-semibold text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  CLINICA — Édition 2027
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Retour à l'accueil
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Exhibitor */}
          <div>
            <h4 className="text-[#1d1d1f] text-sm font-bold tracking-wider uppercase font-mono mb-4">
              Espace Exposants
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="text-[#0066cc] hover:underline font-medium transition-colors flex items-center gap-1"
                >
                  Demande de Stand
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Devenir Sponsor (Contact)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('gallery')}
                  className="hover:text-[#1d1d1f] transition-colors"
                >
                  Galerie Médias Immersive
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div>
            <h4 className="text-[#1d1d1f] text-sm font-bold tracking-wider uppercase font-mono mb-4">
              Contact Direct
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>+213 (0) 559 46 07 37</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>+213 (0) 555 00 28 11</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span className="truncate">ops@evensium.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span className="truncate">zineb.taibi@evensium.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0066cc] shrink-0" />
                <span>evensium.event</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
          <p>© 2026 EVENSIUM — Tous droits réservés. Salons Professionnels Internationaux en Algérie.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#1d1d1f]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0f8a53]" />
              Certifié Awwwards Standard
            </span>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-[#1d1d1f]">
              Mentions Légales
            </button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-[#1d1d1f]">
              Accès SAFEX
            </button>
          </div>
        </div>

        {/* Finale : le symbole se réassemble et le wordmark s'écrit */}
        <div data-footer-finale className="pt-14 sm:pt-20 flex items-end gap-4 sm:gap-8 select-none" aria-hidden="true">
          <EvensiumLogo size={120} showText={false} animatable className="footer-finale-mark shrink-0 mb-[0.6vw]" />
          <span data-footer-word className="footer-wordmark">evensium</span>
        </div>

      </div>
    </footer>
  );
};
