import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import type { ImageKey } from '../../assets/images';
import { SALONS_DATA } from '../../data/mockData';
import { StatValue, countTween } from '../motion/StatsCounter';
import { SplitText } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
import { CameraImage } from '../motion/CameraImage';

type SalonId = 'clinica' | 'chocorium' | 'milktec';

const SALONS: {
  id: SalonId;
  name: string;
  image: ImageKey;
  badge: string;
  kicker: string;
  description: string;
  location: string;
  accent: string;
}[] = [
  {
    id: 'clinica',
    name: 'Clinica',
    image: 'clinicaHeroBg',
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
    image: 'chocoriumHeroBg',
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
    image: 'milktecHeroBg',
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
const LEN = { wide: 5.6, narrow: 5.8 };

export const SalonsReel: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useScene(root, LEN, ({ q, wide, tl, T0, L, ft, cut, cam, beat }) => {
    const panels = q('[data-salon]');
    const cams = panels.map((p) => p.querySelector<HTMLElement>('[data-cam]')!);
    const intro = SplitText.create(q('[data-salons-title]')[0], { type: 'words,chars', mask: 'chars' });
    const titles = panels.map((p) => SplitText.create(p.querySelector<HTMLElement>('[data-salon-name]')!, { type: 'words,chars', mask: 'chars' }));
    const part = (i: number, sel: string) => Array.from(panels[i].querySelectorAll<HTMLElement>(sel));
    const END = T0 + L;
    const FULL = 'inset(0% 0% 0% 0% round 0px)';
    const CARD = wide ? 'inset(24% 30% 16% 30% round 32px)' : 'inset(30% 10% 18% 10% round 28px)';

    /** Plan d'un salon : texte cinétique + chiffres. `out` = instant de sortie du texte (optionnel). */
    const shot = (i: number, at: number, out?: number) => {
      cut(part(i, '[data-salon-copy]'), at);
      ft(part(i, '[data-salon-kicker]'), { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.25, ease: 'power3.out' }, at);
      ft(titles[i].chars, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, stagger: 0.025, duration: 0.3, ease: 'power3.out' }, at + 0.05);
      ft(part(i, '[data-salon-line]'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power3.out' }, at + 0.2);
      part(i, '[data-count]').forEach((el, k) => tl.add(countTween(el, { duration: 0.45, ease: 'power2.out' }), at + 0.3 + k * 0.05));
      if (out !== undefined) {
        // Le titre recule et sort du cadre (relatif à sa propre largeur)
        ft(part(i, '[data-salon-name]'), { scale: 1, xPercent: 0, opacity: 1 }, { scale: 0.85, xPercent: -20, opacity: 0, duration: 0.3, ease: 'power2.in' }, out);
        ft(part(i, '[data-salon-line]'), { yPercent: 0, opacity: 1 }, { yPercent: -30, opacity: 0, stagger: 0.03, duration: 0.25, ease: 'power2.in' }, out);
      }
    };

    // ---- ENTRÉE : titre + Clinica en carte qui monte ----
    ft(intro.chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.03, duration: 0.35, ease: 'power3.out' }, 0.25);
    ft(panels[0], { yPercent: 25 }, { yPercent: 0, duration: 1, ease: 'power2.out' }, 0);
    cam(cams[0], { scale: 1.5 }, { scale: 1.2 }, 0, T0 + 0.6, 'power2.out');

    // ---- TAKEOVER : la carte devient l'écran ----
    ft(q('[data-salons-intro]'), { scale: 1, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.45, ease: 'power2.in' }, T0);
    ft(panels[0], { clipPath: CARD }, { clipPath: FULL, duration: 0.5, ease: 'power3.inOut' }, T0);
    cut(q('[data-salons-progress]'), T0 + 0.5);
    cam(cams[0], { scale: 1.2 }, { scale: 1.34, panX: -0.7, panY: -0.3 }, T0 + 0.6, 1.6);
    shot(0, T0 + 0.7, T0 + 1.75);

    // ---- CUT 1 — ZOOM-THROUGH : Clinica fonce vers la caméra, Chocorium est derrière ----
    const c1 = T0 + 2.2;
    cut(panels[1], c1);
    ft(panels[0], { scale: 1, opacity: 1 }, { scale: 2.4, opacity: 0, duration: 0.5, ease: 'power3.in' }, c1);
    cam(cams[1], { scale: 1.45 }, { scale: 1.12 }, c1, 0.7, 'power2.out');
    cam(cams[1], { scale: 1.12 }, { scale: 1.3, panX: 0.6, panY: -0.3 }, c1 + 0.7, 1.5);
    ft(q('[data-salons-digits]'), { yPercent: 0 }, { yPercent: -100 / 3, duration: 0.25, ease: 'power2.inOut' }, c1 + 0.2);
    shot(1, c1 + 0.55, c1 + 1.6);

    // ---- CUT 2 — WHIP PAN : Milktec entre en coup de fouet ----
    const c2 = c1 + 2.05;
    cut(panels[2], c2);
    ft(panels[2], { xPercent: 100, skewX: -14 }, { xPercent: 0, skewX: 0, duration: 0.45, ease: 'expo.inOut' }, c2);
    ft(panels[1], { xPercent: 0, scale: 1 }, { xPercent: -45, scale: 0.9, duration: 0.45, ease: 'expo.inOut' }, c2);
    cam(cams[2], { scale: 1.5 }, { scale: 1.12 }, c2, 0.7, 'power2.out');
    cam(cams[2], { scale: 1.12 }, { scale: 1.25, panX: -0.5, panY: -0.2 }, c2 + 0.7, Math.max(0.1, END - (c2 + 0.7)));
    ft(q('[data-salons-digits]'), { yPercent: -100 / 3 }, { yPercent: (-100 / 3) * 2, duration: 0.25, ease: 'power2.inOut' }, c2 + 0.15);
    shot(2, c2 + 0.5);

    ft(q('[data-salons-line]'), { scaleY: 0 }, { scaleY: 1, duration: END - (T0 + 0.5) }, T0 + 0.5);

    beat(T0 + 1.5, T0 + 3.5);

    return () => {
      intro.revert();
      titles.forEach((t) => t.revert());
    };
  });

  return (
    <section ref={root} id="salons" aria-labelledby="salons-title" className="scene relative" style={sceneStyle(LEN)}>
      <div className="scene-stage relative overflow-hidden bg-[#0b1324] text-white">
        {/* Titre d'ouverture */}
        <div data-salons-intro className="scene-overlay absolute inset-x-0 top-[10svh] lg:top-[12svh] z-[6] text-center px-6 pointer-events-none">
          <span className="block text-xs font-bold text-sky-300 uppercase tracking-widest font-mono mb-3">PORTFOLIO • NOS SALONS</span>
          <h2 id="salons-title" data-salons-title className="text-[16vw] lg:text-[9vw] font-black uppercase tracking-tighter leading-[0.85]">
            Nos <span className="text-sky-400">Salons</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-md mx-auto">Découvrez la diversité de nos expositions sectorielles de premier plan en Algérie.</p>
        </div>

        {SALONS.map((s, i) => (
          <article
            key={s.id}
            data-salon
            className="scene-panel absolute inset-0 overflow-hidden"
            style={{ zIndex: [3, 2, 4][i] }}
            aria-label={`Salon ${s.name}`}
          >
            <CameraImage image={s.image} alt={s.name} eager={i === 0} />
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
                  <h3 data-salon-name className="text-[14.5vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.82] origin-left whitespace-nowrap">
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
