import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { SALONS_DATA } from '../../data/mockData';
import { StatValue, countTween } from '../motion/StatsCounter';
import { gsap, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';

type SalonId = 'clinica' | 'chocorium' | 'milktec';

const SALONS: {
  id: SalonId;
  name: string;
  image: string;
  badge: string;
  kicker: string;
  description: string;
  location: string;
  accent: string;
}[] = [
  {
    id: 'clinica',
    name: 'Clinica',
    image: IMAGES.clinicaHeroBg,
    badge: 'Santé & Médical',
    kicker: 'Édition Annuelle',
    description:
      "Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les technologies de santé d'Algérie. Il rassemble les plus grands experts et fournisseurs de la région.",
    location: 'Palais des Expositions, SAFEX (Alger)',
    accent: '#22d3ee',
  },
  {
    id: 'chocorium',
    name: 'Chocorium',
    image: IMAGES.chocoriumHeroBg,
    badge: 'Cacao, Chocolat & Café',
    kicker: 'Édition de Prestige',
    description:
      'Le grand rendez-vous des maîtres chocolatiers, torréfacteurs de café et artisans confiseurs nationaux et internationaux. Une immersion sensorielle unique dédiée aux professionnels et amateurs de haute gastronomie sucrée.',
    location: 'Pavillon Casbah, SAFEX (Alger)',
    accent: '#fbbf24',
  },
  {
    id: 'milktec',
    name: 'Milktec',
    image: IMAGES.milktecHeroBg,
    badge: 'Filière Laitière & Elevage',
    kicker: 'Plateforme Technique B2B',
    description:
      "Le salon d'excellence dédié à l'industrie laitière, aux technologies de transformation de pointe, à l'élevage moderne et aux innovations de packaging en Algérie. Une opportunité unique de connecter l'amont et l'aval de la filière.",
    location: 'Palais des Expositions, SAFEX (Alger)',
    accent: '#7dd3fc',
  },
];

const statsFor = (id: SalonId) => (SALONS_DATA.find((s) => s.id === id)?.stats ?? []).slice(0, 2);

/**
 * SCÈNE 3 — REEL DES SALONS (pinnée, ≈ 520 %)
 *  Intro     « NOS SALONS » en très grand ; Clinica attend en carte au centre
 *  Takeover  la carte s'ouvre en plein écran (clip-path) + travelling avant dans l'image
 *  Plan      titre en lettres masquées, chiffres qui défilent, l'image dérive (scale + x + y)
 *  Cut 1     ZOOM-THROUGH : Clinica fonce vers la caméra et sort du cadre, Chocorium est derrière
 *  Cut 2     WHIP PAN : Milktec entre en coup de fouet depuis la droite, Chocorium est chassé
 */
export const SalonsReel: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ q, wide, timeline, enter }) => {
    const panels = q('[data-salon]');
    const intro = SplitText.create(q('[data-salons-title]')[0], { type: 'words,chars', mask: 'chars' });
    const titles = panels.map((p) => SplitText.create(p.querySelector<HTMLElement>('[data-salon-name]')!, { type: 'words,chars', mask: 'chars' }));
    const part = (i: number, sel: string) => panels[i].querySelectorAll<HTMLElement>(sel);

    // État de départ : Clinica en carte, les autres hors scène
    gsap.set(panels[0], { clipPath: wide ? 'inset(24% 30% 16% 30% round 32px)' : 'inset(30% 10% 18% 10% round 28px)', zIndex: 3 });
    gsap.set(panels[1], { zIndex: 2, autoAlpha: 0 });
    gsap.set(panels[2], { zIndex: 4, xPercent: 100, autoAlpha: 0 });
    gsap.set(q('[data-salon-copy]'), { autoAlpha: 0 });

    /** Plan d'un salon : texte cinétique + chiffres + dérive de l'image. */
    const shot = (tl: gsap.core.Timeline, i: number, at: number) => {
      tl.set(part(i, '[data-salon-copy]'), { autoAlpha: 1 }, at)
        .from(part(i, '[data-salon-kicker]'), { x: -80, opacity: 0, duration: 0.5, ease: 'power3.out' }, at)
        .from(titles[i].chars, { yPercent: 115, rotate: 6, stagger: 0.05, duration: 0.7, ease: 'power3.out' }, at + 0.1)
        .from(part(i, '[data-salon-line]'), { y: 60, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, at + 0.4);
      part(i, '[data-count]').forEach((el, k) => tl.add(countTween(el, { duration: 0.9, ease: 'power2.out' }), at + 0.6 + k * 0.1));
      tl.to(part(i, '[data-salon-img]'), { scale: 1.32, xPercent: i % 2 ? 5 : -6, yPercent: -3, duration: 2.6 }, at)
        // Le titre quitte le cadre en se réduisant, comme un plan qui recule
        .to(part(i, '[data-salon-name]'), { scale: 0.85, x: -100, opacity: 0, duration: 0.6, ease: 'power2.in' }, at + 2)
        .to(part(i, '[data-salon-line]'), { y: -50, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power2.in' }, at + 2);
    };

    const tl = timeline(wide ? 520 : 600);

    // INTRO (pendant l'entrée) + TAKEOVER
    enter()
      .from(intro.chars, { yPercent: 115, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 0)
      .from(panels[0], { yPercent: 25, duration: 1, ease: 'power2.out' }, 0);
    tl.fromTo(part(0, '[data-salon-img]'), { scale: 1.5 }, { scale: 1.12, duration: 1.8, ease: 'power2.out' }, 0)
      .to(q('[data-salons-intro]'), { scale: 1.6, opacity: 0, duration: 0.9, ease: 'power2.in' }, 1)
      .to(panels[0], { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'power3.inOut' }, 1)
      .to(q('[data-salons-progress]'), { autoAlpha: 1, duration: 0.3 }, 1.6);
    shot(tl, 0, 1.8);

    // CUT 1 — ZOOM-THROUGH
    tl.set(panels[1], { autoAlpha: 1 }, 4.4)
      .fromTo(part(1, '[data-salon-img]'), { scale: 1.45 }, { scale: 1.12, duration: 1.2, ease: 'power2.out' }, 4.4)
      .to(panels[0], { scale: 2.4, opacity: 0, duration: 1, ease: 'power3.in' }, 4.4)
      .to(q('[data-salons-digits]'), { yPercent: -100 / 3, duration: 0.5, ease: 'power2.inOut' }, 4.8);
    shot(tl, 1, 5.3);

    // CUT 2 — WHIP PAN
    tl.set(panels[2], { autoAlpha: 1 }, 7.9)
      .to(panels[2], { xPercent: 0, duration: 0.8, ease: 'expo.inOut' }, 7.9)
      .fromTo(panels[2], { skewX: -14 }, { skewX: 0, duration: 0.8, ease: 'expo.inOut' }, 7.9)
      .fromTo(part(2, '[data-salon-img]'), { scale: 1.5 }, { scale: 1.12, duration: 1.3, ease: 'power2.out' }, 7.9)
      .to(panels[1], { xPercent: -45, scale: 0.9, duration: 0.8, ease: 'expo.inOut' }, 7.9)
      .to(q('[data-salons-digits]'), { yPercent: (-100 / 3) * 2, duration: 0.5, ease: 'power2.inOut' }, 8.2);
    shot(tl, 2, 8.7);
    tl.fromTo(q('[data-salons-line]'), { scaleY: 0 }, { scaleY: 1, duration: 9.5 }, 1.6).to({}, { duration: 0.3 }, 11.3);

    return () => {
      intro.revert();
      titles.forEach((t) => t.revert());
    };
  });

  return (
    <section ref={root} id="salons" aria-labelledby="salons-title" className="scene relative">
      <div className="scene-stage relative overflow-hidden bg-[#0b1324] text-white">
        {/* Titre d'ouverture */}
        <div data-salons-intro className="scene-overlay absolute inset-x-0 top-[10svh] lg:top-[12svh] z-[6] text-center px-6 pointer-events-none">
          <span className="block text-xs font-bold text-sky-300 uppercase tracking-widest font-mono mb-3">PORTFOLIO • NOS SALONS</span>
          <h2 id="salons-title" data-salons-title className="text-[16vw] lg:text-[9vw] font-black uppercase tracking-tighter leading-[0.85]">
            Nos <span className="text-sky-400">Salons</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-md mx-auto">Découvrez la diversité de nos expositions sectorielles de premier plan en Algérie.</p>
        </div>

        {SALONS.map((s) => (
          <article key={s.id} data-salon className="scene-panel absolute inset-0 overflow-hidden will-change-transform" aria-label={`Salon ${s.name}`}>
            <img
              data-salon-img
              src={s.image}
              alt={s.name}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1324] via-[#0b1324]/55 to-[#0b1324]/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1324]/70 to-transparent lg:block hidden" />

            <div data-salon-copy className="relative h-full flex items-end px-6 pb-[9svh] lg:pb-[11svh]">
              <div className="max-w-6xl mx-auto w-full">
                <div className="max-w-2xl space-y-4">
                  <div data-salon-kicker className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: s.accent }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: s.accent }} />
                    {s.kicker}
                    <span className="ml-2 px-2.5 py-0.5 rounded-full text-[9px] bg-white/15 text-white backdrop-blur">{s.badge}</span>
                  </div>
                  <h3 data-salon-name className="text-[14.5vw] lg:text-[8.5vw] font-black uppercase tracking-tighter leading-[0.82] origin-left">
                    {s.name}
                  </h3>
                  <p data-salon-line className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {s.description}
                  </p>
                  <div data-salon-line className="flex gap-8">
                    {statsFor(s.id).map((stat) => (
                      <div key={stat.label}>
                        <StatValue value={stat.value} mode="external" className="block text-3xl lg:text-4xl font-black" />
                        <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div data-salon-line className="flex items-center gap-2 pt-2 border-t border-white/15 max-w-xs">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: s.accent }} />
                    <span className="text-xs font-bold text-white">{s.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Repère de scène 01 / 03 */}
        <div data-salons-progress className="reduce-hide invisible absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[7] flex flex-col items-center gap-3 text-[11px] font-mono font-bold text-white/60" aria-hidden="true">
          <span className="h-[1.2em] overflow-hidden text-white">
            <span data-salons-digits className="flex flex-col">
              {SALONS.map((s, i) => (
                <span key={s.id} className="h-[1.2em] leading-[1.2em]">{String(i + 1).padStart(2, '0')}</span>
              ))}
            </span>
          </span>
          <span className="relative w-px h-20 bg-white/25">
            <span data-salons-line className="absolute inset-0 bg-white origin-top" />
          </span>
          <span>03</span>
        </div>
      </div>
    </section>
  );
};
