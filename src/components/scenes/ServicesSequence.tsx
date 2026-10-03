import React, { useRef } from 'react';
import { Briefcase, Calendar, Heart, MessageSquare, Users, Video } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { gsap, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';

const SERVICES = [
  {
    icon: Briefcase,
    badge: 'Salon de Prestige',
    title: 'Salons et foires professionnelles',
    text: "Organisation complète de salons d'affaires. Gestion de l'espace, coordination des exposants et architecture commerciale de stands personnalisés.",
    footer: 'Conception & Logistique',
    image: IMAGES.chocoriumPalmaryStand,
  },
  {
    icon: Calendar,
    badge: 'Savoir Scientifique',
    title: 'Conférences et séminaires',
    text: "Planification de symposiums d'experts, séminaires scientifiques et forums corporatifs d'envergure internationale avec équipement technologique de pointe.",
    footer: 'Coordination Technique',
    image: IMAGES.clinicaHeroBg,
  },
  {
    icon: Heart,
    badge: 'Gastronomie & VIP',
    title: 'Dîners d’affaires et réceptions',
    text: "Coordination de banquets d'affaires, dîners de gala et réceptions VIP avec mise en valeur culinaire et scénographie lumineuse sur mesure.",
    footer: 'Expérience VIP',
    image: IMAGES.chocoriumTartinellaTasting,
  },
  {
    icon: MessageSquare,
    badge: 'Relations Médias',
    title: 'Conférences de presse',
    text: 'Lancements de produits et communications officielles. Gestion des relations presse, accueil des journalistes, et dossiers médias complets.',
    footer: 'Visibilité Média',
    image: IMAGES.chocoriumInauguration,
  },
  {
    icon: Users,
    badge: "Cohésion d'Équipe",
    title: 'Team building & événements internes',
    text: "Création d'activités sur mesure pour renforcer l'esprit d'équipe, célébrer les étapes clés de votre entreprise et motiver vos collaborateurs.",
    footer: 'Cohésion Corporate',
    image: IMAGES.evensiumHeroBg,
  },
  {
    icon: Video,
    badge: 'Studio & Régie',
    title: 'Production audiovisuelle',
    text: "Captation vidéo de haute qualité, réalisation d'aftermovies, diffusion en direct (live streaming) et modélisation 3D de vos stands.",
    footer: "Multimédia d'Élite",
    image: IMAGES.chocoriumMillottiCoffee,
  },
];

/**
 * SCÈNE 5 — SÉQUENCE PINNÉE (≈ 560 %)
 * Six services, six plans enchaînés comme un montage rapide. Chaque plan :
 *  - le décor (photo réelle) se remplace par un wipe vertical en diagonale
 *  - le grand numéro bascule comme un compteur à volets
 *  - le titre arrive mot par mot, le texte glisse, l'icône fait une rotation de 3/4
 *  - la photo dérive et zoome pendant toute la durée du plan
 */
export const ServicesSequence: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ q, wide, timeline, enter }) => {
    const shots = q('[data-service]');
    const head = SplitText.create(q('[data-services-title]')[0], { type: 'words,chars', mask: 'chars' });
    const titles = shots.map((s) => SplitText.create(s.querySelector<HTMLElement>('[data-service-title]')!, { type: 'words', mask: 'words' }));
    const inShot = (i: number, sel: string) => shots[i].querySelectorAll<HTMLElement>(sel);

    gsap.set(shots, { autoAlpha: 0 });
    gsap.set(q('[data-service-bg]'), { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' });

    const tl = timeline(wide ? 560 : 640);

    // Ouverture : « NOS SERVICES » gigantesque puis la caméra le traverse
    enter().from(head.chars, { yPercent: 115, stagger: 0.04, duration: 0.7, ease: 'power3.out' }, 0);
    tl.to(q('[data-services-head]'), { scale: wide ? 6 : 5, opacity: 0, duration: 1, ease: 'power2.in' }, 0.6);

    shots.forEach((_, i) => {
      const at = 1.6 + i * 1.5;
      tl.set(shots[i], { autoAlpha: 1, zIndex: 10 + i }, at)
        .to(inShot(i, '[data-service-bg]'), { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.6, ease: 'power3.inOut' }, at)
        .fromTo(inShot(i, '[data-service-img]'), { scale: 1.45, yPercent: 6 }, { scale: 1.15, yPercent: -4, xPercent: i % 2 ? 4 : -4, duration: 1.8 }, at)
        .from(inShot(i, '[data-service-num]'), { yPercent: 100, rotateX: -90, duration: 0.5, ease: 'power3.out' }, at + 0.15)
        .from(inShot(i, '[data-service-icon]'), { scale: 0, rotate: -270, duration: 0.7, ease: 'back.out(1.6)' }, at + 0.2)
        .from(titles[i].words, { yPercent: 110, stagger: 0.06, duration: 0.5, ease: 'power3.out' }, at + 0.25)
        .from(inShot(i, '[data-service-line]'), { x: wide ? 100 : 0, y: wide ? 0 : 40, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, at + 0.4);
      if (i > 0) {
        // Le plan précédent recule et s'assombrit sous le nouveau
        tl.to(inShot(i - 1, '[data-service-fg]'), { y: -60, opacity: 0, duration: 0.45, ease: 'power2.in' }, at)
          .to(inShot(i - 1, '[data-service-img]'), { scale: 1.05, filter: 'brightness(0.5)', duration: 0.6 }, at);
      }
      tl.to(q('[data-services-bar]'), { scaleX: (i + 1) / shots.length, duration: 0.5 }, at);
    });
    tl.to({}, { duration: 0.8 });

    return () => {
      head.revert();
      titles.forEach((t) => t.revert());
    };
  });

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="scene relative">
      <div className="scene-stage relative overflow-hidden bg-[#0b1324] text-white">
        <div data-services-head className="scene-overlay absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center will-change-transform">
          <span className="block text-xs font-bold text-sky-300 uppercase tracking-widest font-mono mb-3">COMPÉTENCES • 02</span>
          <h2 id="services-title" data-services-title className="text-[15vw] lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85]">
            Nos <span className="text-sky-400">Services</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm max-w-md">Une gamme complète de prestations événementielles haut de gamme exécutées avec une précision chirurgicale.</p>
        </div>

        {SERVICES.map(({ icon: Icon, badge, title, text, footer, image }, i) => (
          <article key={title} data-service className="scene-panel absolute inset-0">
            <div data-service-bg className="absolute inset-0 overflow-hidden">
              <img data-service-img src={image} alt="" className="absolute inset-0 w-full h-full object-cover will-change-transform" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0b1324] via-[#0b1324]/75 to-[#0b1324]/20" />
            </div>
            <div data-service-fg className="relative h-full flex items-end lg:items-center px-6 pb-[10svh] lg:pb-0">
              <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-6 items-end lg:items-center">
                <div className="lg:col-span-5 flex items-end gap-4" style={{ perspective: '600px' }}>
                  <span className="overflow-hidden block">
                    <span data-service-num className="block text-[30vw] lg:text-[16vw] font-black leading-[0.8] tracking-tighter text-white/90 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span data-service-icon className="mb-[2vw] w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-white text-[#1e3a8a] flex items-center justify-center shadow-2xl shrink-0">
                    <Icon className="w-7 h-7 lg:w-9 lg:h-9" />
                  </span>
                </div>
                <div className="lg:col-span-7 space-y-4 max-w-xl">
                  <span data-service-line className="inline-block bg-sky-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {badge}
                  </span>
                  <h3 data-service-title className="text-[9.5vw] lg:text-[3.8vw] font-black tracking-tight leading-[0.95]">{title}</h3>
                  <p data-service-line className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed">{text}</p>
                  <span data-service-line className="block text-xs font-bold text-sky-300 uppercase font-mono tracking-wider">{footer}</span>
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="reduce-hide absolute left-6 right-6 lg:left-[8vw] lg:right-[8vw] top-[calc(env(safe-area-inset-top,0px)+76px)] z-[30] h-[2px] bg-white/15" aria-hidden="true">
          <div data-services-bar className="h-full bg-white origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
};
