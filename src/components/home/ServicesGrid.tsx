import React, { useRef } from 'react';
import { Briefcase, Calendar, ChevronRight, Heart, MessageSquare, Users, Video } from 'lucide-react';
import { AnimatedText } from '../motion/AnimatedText';
import { gsap, useGSAP, MQ, SCRUB } from '../../animations/gsap';

const SERVICES = [
  {
    icon: Briefcase,
    badge: 'Salon de Prestige',
    title: 'Salons et foires professionnelles',
    text: "Organisation complète de salons d'affaires. Gestion de l'espace, coordination des exposants et architecture commerciale de stands personnalisés.",
    footer: 'Conception & Logistique',
  },
  {
    icon: Calendar,
    badge: 'Savoir Scientifique',
    title: 'Conférences et séminaires',
    text: "Planification de symposiums d'experts, séminaires scientifiques et forums corporatifs d'envergure internationale avec équipement technologique de pointe.",
    footer: 'Coordination Technique',
  },
  {
    icon: Heart,
    badge: 'Gastronomie & VIP',
    title: 'Dîners d’affaires et réceptions',
    text: "Coordination de banquets d'affaires, dîners de gala et réceptions VIP avec mise en valeur culinaire et scénographie lumineuse sur mesure.",
    footer: 'Expérience VIP',
  },
  {
    icon: MessageSquare,
    badge: 'Relations Médias',
    title: 'Conférences de presse',
    text: 'Lancements de produits et communications officielles. Gestion des relations presse, accueil des journalistes, et dossiers médias complets.',
    footer: 'Visibilité Média',
  },
  {
    icon: Users,
    badge: "Cohésion d'Équipe",
    title: 'Team building & événements internes',
    text: "Création d'activités sur mesure pour renforcer l'esprit d'équipe, célébrer les étapes clés de votre entreprise et motiver vos collaborateurs.",
    footer: 'Cohésion Corporate',
  },
  {
    icon: Video,
    badge: 'Studio & Régie',
    title: 'Production audiovisuelle',
    text: "Captation vidéo de haute qualité, réalisation d'aftermovies, diffusion en direct (live streaming) et modélisation 3D de vos stands.",
    footer: "Multimédia d'Élite",
  },
];

/**
 * NOS SERVICES — langage « perspective » : les cartes basculent depuis le sol
 * (rotateX) en cascade colonne par colonne. Titre en mise au point (blur → net).
 */
export const ServicesGrid: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const desktop = !!ctx.conditions?.desktop;
        const cols = desktop ? 3 : window.innerWidth >= 768 ? 2 : 1;
        (q('[data-service]') as HTMLElement[]).forEach((card, i) => {
          const col = i % cols;
          gsap.fromTo(
            card,
            { y: desktop ? 140 : 70, rotateX: desktop ? -24 : -10, opacity: 0, transformOrigin: '50% 100%' },
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: `top ${98 - col * 4}%`,
                end: `top ${68 - col * 4}%`,
                scrub: SCRUB,
              },
            },
          );
          gsap.from(card.querySelector('[data-service-icon]'), {
            scale: 0.4,
            rotate: -30,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: card, start: `top ${88 - col * 4}%`, end: `top ${62 - col * 4}%`, scrub: SCRUB },
          });
        });
        gsap.fromTo(q('[data-services-glow]'), { yPercent: -40 }, { yPercent: 60, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: SCRUB } });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative py-28 bg-gradient-to-b from-[#e0f2fe]/30 to-sky-50/70 overflow-hidden border-b border-sky-100 scroll-mt-24">
      <div data-services-glow className="absolute top-1/4 right-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">COMPÉTENCES • 02</span>
          <AnimatedText as="h2" variant="blur" className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Nos <span className="text-[#0284c7]">Services</span>
          </AnimatedText>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
          <p className="text-slate-500 text-sm">
            Une gamme complète de prestations événementielles haut de gamme exécutées avec une précision chirurgicale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {SERVICES.map(({ icon: Icon, badge, title, text, footer }) => (
            <article
              key={title}
              data-service
              className="service-card bg-white border border-sky-100 rounded-[32px] overflow-hidden shadow-sm group flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="service-band h-32 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#0284c7]/5 flex items-center justify-center relative border-b border-sky-100/40">
                  <div
                    data-service-icon
                    className="service-icon w-14 h-14 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#1e3a8a]"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="service-badge absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] uppercase font-mono">
                <span>{footer}</span>
                <span className="service-arrow w-7 h-7 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
