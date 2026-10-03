import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { SALONS_DATA } from '../../data/mockData';
import { AnimatedText } from '../motion/AnimatedText';
import { StatValue, countTween } from '../motion/StatsCounter';
import { gsap, SplitText, useGSAP, MQ, SCRUB } from '../../animations/gsap';

interface SalonScene {
  id: 'clinica' | 'chocorium' | 'milktec';
  name: string;
  image: string;
  badge: string;
  kicker: string;
  description: string;
  location: string;
  imageSide: 'left' | 'right';
  accent: { text: string; dot: string; badge: string; stroke: string };
}

const SCENES: SalonScene[] = [
  {
    id: 'clinica',
    name: 'Clinica',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80',
    badge: 'Santé & Médical',
    kicker: 'Édition Annuelle',
    description:
      "Le Salon International de référence pour l'équipement médical, les cliniques médico-chirurgicales et les technologies de santé d'Algérie. Il rassemble les plus grands experts et fournisseurs de la région.",
    location: 'Palais des Expositions, SAFEX (Alger)',
    imageSide: 'left',
    accent: { text: 'text-cyan-600', dot: 'bg-cyan-500', badge: 'bg-cyan-600', stroke: 'rgba(8,145,178,0.16)' },
  },
  {
    id: 'chocorium',
    name: 'Chocorium',
    image: IMAGES.chocorium2026Poster,
    badge: 'Cacao, Chocolat & Café',
    kicker: 'Édition de Prestige',
    description:
      'Le grand rendez-vous des maîtres chocolatiers, torréfacteurs de café et artisans confiseurs nationaux et internationaux. Une immersion sensorielle unique dédiée aux professionnels et amateurs de haute gastronomie sucrée.',
    location: 'Pavillon Casbah, SAFEX (Alger)',
    imageSide: 'right',
    accent: { text: 'text-amber-600', dot: 'bg-amber-500', badge: 'bg-amber-600', stroke: 'rgba(217,119,6,0.16)' },
  },
  {
    id: 'milktec',
    name: 'Milktec',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
    badge: 'Filière Laitière & Elevage',
    kicker: 'Plateforme Technique B2B',
    description:
      "Le salon d'excellence dédié à l'industrie laitière, aux technologies de transformation de pointe, à l'élevage moderne et aux innovations de packaging en Algérie. Une opportunité unique de connecter l'amont et l'aval de la filière.",
    location: 'Palais des Expositions, SAFEX (Alger)',
    imageSide: 'left',
    accent: { text: 'text-sky-600', dot: 'bg-sky-500', badge: 'bg-sky-600', stroke: 'rgba(2,132,199,0.16)' },
  },
];

/** Deux chiffres clés réels par salon, issus des données du projet. */
const statsFor = (id: SalonScene['id']) => (SALONS_DATA.find((s) => s.id === id)?.stats ?? []).slice(0, 2);

/**
 * NOS SALONS — section pinnée à changement de scène.
 * Desktop : la section reste fixe pendant 3 scènes ; chaque salon entre par un wipe
 * latéral (clip-path) avec un dolly-out de l'image, ses chiffres défilent, et son nom
 * géant dérive en arrière-plan. Mobile : scènes empilées, révélées au scroll.
 */
export const SalonsScenes: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const panels = q('[data-scene]') as HTMLElement[];
      const mm = gsap.matchMedia();

      const parts = (panel: HTMLElement) => ({
        frame: panel.querySelector<HTMLElement>('[data-frame]')!,
        img: panel.querySelector<HTMLElement>('[data-frame] img')!,
        title: panel.querySelector<HTMLElement>('[data-title]')!,
        lines: panel.querySelectorAll<HTMLElement>('[data-line]'),
        counts: panel.querySelectorAll<HTMLElement>('[data-count]'),
        word: section.querySelector<HTMLElement>(`[data-word="${panel.dataset.scene}"]`)!,
        side: panel.dataset.side as 'left' | 'right',
      });

      // Wipe depuis le côté de l'image
      const hiddenClip = (side: 'left' | 'right') =>
        side === 'left' ? 'inset(0% 100% 0% 0% round 24px)' : 'inset(0% 0% 0% 100% round 24px)';
      const openClip = 'inset(0% 0% 0% 0% round 24px)';

      /** Entrée d'une scène, ajoutée à `tl` à la position `at`. */
      const enter = (tl: gsap.core.Timeline, panel: HTMLElement, at: number, splits: SplitText[]) => {
        const p = parts(panel);
        const split = SplitText.create(p.title, { type: 'chars', mask: 'chars' });
        splits.push(split);
        tl.set(panel, { autoAlpha: 1 }, at)
          .fromTo(p.frame, { clipPath: hiddenClip(p.side) }, { clipPath: openClip, duration: 0.8, ease: 'power3.inOut' }, at)
          .fromTo(p.img, { scale: 1.35 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, at)
          .from(split.chars, { yPercent: 110, stagger: 0.035, duration: 0.5, ease: 'power3.out' }, at + 0.25)
          .from(p.lines, { y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, at + 0.3)
          .fromTo(p.word, { autoAlpha: 0, xPercent: 18 }, { autoAlpha: 1, xPercent: 6, duration: 0.8, ease: 'none' }, at);
        p.counts.forEach((el, i) => tl.add(countTween(el, { duration: 0.7, ease: 'power2.out' }), at + 0.45 + i * 0.1));
      };

      /** Sortie d'une scène. */
      const leave = (tl: gsap.core.Timeline, panel: HTMLElement, at: number) => {
        const p = parts(panel);
        tl.to([p.title, ...p.lines], { y: -40, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power2.in' }, at)
          .to(p.frame, { scale: 0.9, opacity: 0, duration: 0.6, ease: 'power2.in' }, at)
          .to(p.word, { autoAlpha: 0, xPercent: -18, duration: 0.6, ease: 'none' }, at)
          .set(panel, { autoAlpha: 0 }, at + 0.6);
      };

      mm.add(MQ.desktop, () => {
        const splits: SplitText[] = [];
        gsap.set(panels.slice(1), { autoAlpha: 0 });
        gsap.set(q('[data-word]'), { autoAlpha: 0 });

        // Scène 1 : entre pendant l'approche de la section (avant le pin)
        const intro = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 75%', end: 'top top', scrub: SCRUB },
        });
        enter(intro, panels[0], 0, splits);

        // Pin : changements de scène
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${panels.length * 90}%`,
            pin: true,
            scrub: SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const HOLD = 0.6;
        let t = 0;
        // Dérive du mot géant pendant le maintien de la scène 1
        tl.to(parts(panels[0]).word, { xPercent: -6, duration: HOLD }, t);
        t += HOLD;
        for (let i = 1; i < panels.length; i++) {
          leave(tl, panels[i - 1], t);
          enter(tl, panels[i], t + 0.35, splits);
          tl.to(parts(panels[i]).word, { xPercent: -6, duration: HOLD }, t + 1.15);
          t += 1.15 + HOLD;
        }

        // Indicateur 01 / 03
        tl.fromTo(q('[data-progress-line]'), { scaleY: 0 }, { scaleY: 1, duration: t, ease: 'none' }, 0);
        const digits = q('[data-progress-digits]')[0];
        for (let i = 1; i < panels.length; i++) {
          tl.to(digits, { yPercent: -100 * i, duration: 0.4, ease: 'power2.inOut' }, HOLD + (i - 1) * (1.15 + HOLD) + 0.4);
        }

        return () => splits.forEach((s) => s.revert());
      });

      mm.add(MQ.mobile, () => {
        panels.forEach((panel) => {
          const p = parts(panel);
          gsap.fromTo(
            p.frame,
            { clipPath: 'inset(0% 0% 100% 0% round 24px)' },
            {
              clipPath: openClip,
              ease: 'power2.out',
              scrollTrigger: { trigger: p.frame, start: 'top 90%', end: 'top 50%', scrub: SCRUB },
            },
          );
          gsap.fromTo(p.img, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: p.frame, start: 'top bottom', end: 'bottom top', scrub: SCRUB } });
          gsap.from([p.title, ...p.lines], {
            y: 30,
            opacity: 0,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: p.title, start: 'top 92%', end: 'top 60%', scrub: SCRUB },
          });
          p.counts.forEach((el) =>
            countTween(el, { ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 65%', scrub: SCRUB } }),
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="salons"
      aria-labelledby="salons-title"
      className="relative py-24 lg:py-0 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden border-b border-sky-100"
    >
      <div className="absolute top-10 right-10 w-64 h-64 bg-sky-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Noms géants en arrière-plan (desktop) */}
      <div className="hidden lg:block absolute inset-x-0 bottom-[4vh] z-0 pointer-events-none select-none" aria-hidden="true">
        {SCENES.map((s) => (
          <span key={s.id} data-word={s.id} className="outline-word" style={{ WebkitTextStrokeColor: s.accent.stroke }}>
            {s.name}
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 lg:h-[100svh] lg:flex lg:flex-col lg:pt-32 lg:pb-12">
        <div className="text-center max-w-xl mx-auto mb-20 lg:mb-8 space-y-4">
          <span className="text-xs font-bold text-[#0284c7] uppercase tracking-widest block font-mono">PORTFOLIO • NOS SALONS</span>
          <AnimatedText as="h2" id="salons-title" variant="blur" className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Nos <span className="text-[#0284c7]">Salons</span>
          </AnimatedText>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto rounded" />
          <p className="text-slate-500 text-sm">Découvrez la diversité de nos expositions sectorielles de premier plan en Algérie.</p>
        </div>

        <div className="relative space-y-24 lg:space-y-0 lg:flex-1 lg:min-h-0">
          {SCENES.map((s, idx) => {
            const imageFirst = s.imageSide === 'left';
            return (
              <article
                key={s.id}
                data-scene={s.id}
                data-side={s.imageSide}
                aria-label={`Salon ${s.name}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center lg:absolute lg:inset-0"
              >
                <div className={`md:col-span-5 ${imageFirst ? '' : 'md:order-last order-first'}`}>
                  <div data-frame className="aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-lg border border-slate-100 relative will-change-transform">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`${s.accent.badge} text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md`}>
                        {s.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`md:col-span-7 space-y-4 ${imageFirst ? '' : 'md:order-first order-last'}`}>
                  <div data-line className={`flex items-center gap-2 text-xs font-mono font-bold ${s.accent.text} uppercase tracking-wider`}>
                    <span className={`w-2 h-2 rounded-full ${s.accent.dot}`} />
                    {s.kicker}
                  </div>
                  <h3 data-title className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                    {s.name}
                  </h3>
                  <p data-line className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    {s.description}
                  </p>
                  <div data-line className="flex gap-8 pt-1">
                    {statsFor(s.id).map((stat) => (
                      <div key={stat.label} className="min-w-0">
                        <StatValue value={stat.value} mode="external" className={`block text-2xl sm:text-3xl font-black ${s.accent.text}`} />
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div data-line className="flex items-center gap-2 text-slate-500 pt-2 border-t border-slate-100 max-w-xs">
                    <MapPin className={`w-4 h-4 ${s.accent.text} shrink-0`} />
                    <span className="text-xs font-bold text-slate-700">{s.location}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Indicateur de scène (desktop) */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3 text-[11px] font-mono font-bold text-slate-400" aria-hidden="true">
        <span className="h-[1.2em] overflow-hidden text-[#0284c7]">
          <span data-progress-digits className="flex flex-col">
            {SCENES.map((s, i) => (
              <span key={s.id} className="h-[1.2em] leading-[1.2em]">{String(i + 1).padStart(2, '0')}</span>
            ))}
          </span>
        </span>
        <span className="relative w-px h-24 bg-slate-200">
          <span data-progress-line className="absolute inset-0 bg-[#0284c7] origin-top" />
        </span>
        <span>{String(SCENES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};
