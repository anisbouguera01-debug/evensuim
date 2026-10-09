import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { EvensiumLogo } from '../EvensiumLogo';
import { AnimatedText } from '../motion/AnimatedText';
import { gsap, useGSAP, MQ, SCRUB } from '../../animations/gsap';

/**
 * CONTACT — reveal cinématique : la section s'ouvre comme un rideau (clip-path),
 * le formulaire monte en perspective. Logique d'envoi (mailto) inchangée.
 */
export const ContactSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '', service: 'salons' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const to = 'ops@evensium.com,zineb.taibi@evensium.com';
    const emailSubject = encodeURIComponent(`Nouvelle demande depuis la page d'accueil de ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Nom : ${formData.name}\nEmail : ${formData.email}\nTéléphone : ${formData.phone}\nEntreprise : ${formData.company}\nService / Sujet : ${formData.service}\n\nMessage :\n${formData.message}`,
    );

    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '', service: 'salons' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const desktop = !!ctx.conditions?.desktop;
        gsap.fromTo(
          section,
          { clipPath: desktop ? 'inset(6% 4% 0% 4% round 48px)' : 'inset(3% 3% 0% 3% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 25%', scrub: SCRUB },
          },
        );
        gsap.fromTo(
          q('[data-contact-card]'),
          { xPercent: desktop ? -15 : -10, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: q('[data-contact-cards]')[0], start: 'top 92%', end: 'top 55%', scrub: SCRUB },
          },
        );
        gsap.fromTo(
          q('[data-contact-form]'),
          { yPercent: desktop ? 15 : 8, rotateX: desktop ? 8 : 0, scale: 0.95, opacity: 0, transformPerspective: 1200, transformOrigin: '50% 100%' },
          {
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: q('[data-contact-form]')[0], start: 'top 98%', end: 'top 50%', scrub: SCRUB },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const fieldClass =
    'field w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:bg-white focus:border-sky-500 outline-none';

  return (
    <section ref={root} id="contact" className="relative py-28 bg-gradient-to-b from-white to-[#e0f2fe]/50 overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#bae6fd]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">DISPONIBILITÉ • 04</span>
              <AnimatedText as="h2" variant="chars" className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                Contactez-<span className="text-[#0284c7]">nous !</span>
              </AnimatedText>
              <div className="w-16 h-1 bg-[#1e3a8a] rounded" />
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                Prêt à lancer votre prochain projet d'exposition ou de séminaire scientifique ? Nos équipes d'experts sont à votre écoute.
              </p>
            </div>

            <div data-contact-cards className="space-y-4">
              <a
                data-contact-card
                href="mailto:ops@evensium.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-sky-50 border border-sky-100/80 shadow-sm transition-colors group"
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

              <div data-contact-card className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-sky-100/80 shadow-sm">
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

              <div data-contact-card className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-sky-100/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase font-mono">Siège social</span>
                  <span className="block text-slate-800 font-extrabold text-sm">Alger, Algérie - Pavillon Casbah, SAFEX</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <EvensiumLogo size={24} showText={true} textColorClass="text-xs font-bold text-slate-400" />
            </div>
          </div>

          <div data-contact-form className="lg:col-span-7 bg-white rounded-[32px] border border-sky-100 shadow-xl p-8 sm:p-10 relative">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-sky-500" />
              Envoyer un message
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="hc-name" className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Nom Complet *</label>
                  <input
                    id="hc-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ex: Amine Brahimi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="hc-email" className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Adresse Email *</label>
                  <input
                    id="hc-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Ex: contact@entreprise.dz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="hc-phone" className="text-xs font-bold uppercase text-slate-500 font-mono">Téléphone *</label>
                  <input
                    id="hc-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Ex: 0550 12 34 56"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="hc-company" className="text-xs font-bold uppercase text-slate-500 font-mono">Entreprise / Clinique</label>
                  <input
                    id="hc-company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Ex: Clinique El Hana"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="hc-service" className="text-xs font-bold uppercase text-slate-500 font-mono">Service d'Intérêt</label>
                <select
                  id="hc-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={fieldClass}
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
                <label htmlFor="hc-message" className="text-xs font-bold uppercase text-slate-500 font-mono">Votre Message *</label>
                <textarea
                  id="hc-message"
                  required
                  rows={4}
                  placeholder="Décrivez brièvement vos besoins pour l'événement (surface de stand, date, objectifs...)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="btn-cine w-full bg-[#1e3a8a] hover:bg-[#1e40af] disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-2xl text-xs tracking-widest uppercase shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="sr-only">Envoi en cours</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    <span>Envoyer la demande</span>
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  role="status"
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
  );
};
