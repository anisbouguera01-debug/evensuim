import React, { useState } from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, Building2, Send, CheckCircle2, Globe, Clock } from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignement Général',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    
    const to = 'ops@evensium.com,zineb.taibi@evensium.com';
    const emailSubject = encodeURIComponent(`Nouvelle demande : ${form.subject} de ${form.name}`);
    const emailBody = encodeURIComponent(`Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone}\nSujet : ${form.subject}\n\nMessage :\n${form.message}`);
    
    window.location.href = `mailto:${to}?subject=${emailSubject}&body=${emailBody}`;
    
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 min-h-screen font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-200/80 border border-sky-300 text-sky-900 text-xs font-mono uppercase tracking-widest shadow-sm font-bold">
            <Mail className="w-3.5 h-3.5 text-sky-700" />
            Contact & Localisation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
            CONTACTER L'ÉQUIPE EVENSIUM
          </h1>
          <p className="text-slate-600 text-sm">
            Notre équipe commerciale et technique est à votre entière disposition pour répondre à toutes vos demandes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Directory */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Cards */}
            <div className="p-6 rounded-3xl bg-white/90 border border-sky-200 space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Coordonnées Officielle
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Siège Social EVENSIUM :</strong>
                    <span>Al Coopérative IGF, Ras Elforn, Dely Brahim, Alger, Algérie</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Lieu des Salons :</strong>
                    <span>Palais des Expositions SAFEX - Pavillon Casbah, Pins Maritimes, Alger</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <Phone className="w-4 h-4 text-sky-700 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Téléphones Commerciaux :</strong>
                    <span>+213 (0) 559 46 07 37 • +213 (0) 555 00 28 11</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
                  <Mail className="w-4 h-4 text-sky-700 shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Adresses Emails :</strong>
                    <span className="block">ops@evensium.com</span>
                    <span className="block">zineb.taibi@evensium.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-3xl bg-white/90 border border-sky-200 space-y-2 text-xs shadow-sm">
              <div className="flex items-center gap-2 font-bold text-sky-800">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Horaires d'Ouverture du Bureau</span>
              </div>
              <p className="text-slate-600">Du Dimanche au Jeudi : 08h30 - 17h00 (Heure d'Alger)</p>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white/90 border border-sky-200 rounded-3xl p-8 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  Envoyer un Message Direct
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 uppercase mb-1 font-semibold">Nom Complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mohamed Amine"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 uppercase mb-1 font-semibold">Email Professionnel *</label>
                    <input
                      type="email"
                      required
                      placeholder="nom@entreprise.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 uppercase mb-1 font-semibold">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+213 ..."
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 uppercase mb-1 font-semibold">Sujet de la Demande</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Réservation Stand CHOCORIUM">Réservation Stand CHOCORIUM 2026</option>
                    <option value="Réservation Stand MILKTEC">Réservation Stand MILKTEC 2026</option>
                    <option value="Pré-inscription CLINICA">Pré-inscription CLINICA 2027</option>
                    <option value="Offres de Sponsoring">Offres de Sponsoring & Partenariat</option>
                    <option value="Accréditation Presse">Accréditation Presse & Médias</option>
                    <option value="Renseignement Général">Renseignement Général</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 uppercase mb-1 font-semibold">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Expliquez-nous votre projet ou votre besoin d'information..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Message Transmis !</h3>
                <p className="text-slate-600 text-xs max-w-sm mx-auto">
                  Merci {form.name}. Notre équipe vous recontactera à l'adresse <strong>{form.email}</strong> dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 border border-sky-200 text-xs text-slate-900 font-bold cursor-pointer transition-all"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
