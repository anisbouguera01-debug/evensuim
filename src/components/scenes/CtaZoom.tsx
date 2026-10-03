import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { gsap, SplitText } from '../../animations/gsap';
import { useScene } from '../../animations/useScene';

interface Props {
  onScrollTo: (id: string) => void;
}

/**
 * SCÈNE 7 — ZOOM TRANSITION vers le contact (pinnée, ≈ 260 %)
 *  Plan large : une petite fenêtre-photo entre deux lignes de texte
 *  Push : la fenêtre s'agrandit jusqu'à remplir l'écran, les lignes s'écartent hors champ
 *  Gros plan : l'image continue d'avancer, l'invitation et le CTA arrivent
 */
export const CtaZoom: React.FC<Props> = ({ onScrollTo }) => {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ q, wide, timeline, enter }) => {
    const top = SplitText.create(q('[data-cta-top]')[0], { type: 'words,chars', mask: 'chars' });
    const bottom = SplitText.create(q('[data-cta-bottom]')[0], { type: 'words,chars', mask: 'chars' });
    const invite = SplitText.create(q('[data-cta-invite]')[0], { type: 'words', mask: 'words' });
    const W = () => window.innerWidth;

    gsap.set(q('[data-cta-window]'), { clipPath: wide ? 'inset(38% 40% 38% 40% round 999px)' : 'inset(40% 30% 40% 30% round 999px)' });
    gsap.set(q('[data-cta-final]'), { autoAlpha: 0 });

    enter()
      .from(top.chars, { yPercent: 115, stagger: 0.03, duration: 0.6, ease: 'power3.out' }, 0)
      .from(bottom.chars, { yPercent: -115, stagger: 0.03, duration: 0.6, ease: 'power3.out' }, 0.1)
      .fromTo(q('[data-cta-img]'), { scale: 2.2 }, { scale: 1.6, duration: 1 }, 0);

    timeline(240)
      .to({}, { duration: 0.4 }, 0)
      // Push : la fenêtre devient l'écran, les lignes partent chacune de leur côté
      .to(q('[data-cta-window]'), { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.4, ease: 'power3.inOut' }, 1)
      .to(q('[data-cta-top]'), { x: () => -W(), duration: 1.2, ease: 'power2.in' }, 1)
      .to(q('[data-cta-bottom]'), { x: () => W(), duration: 1.2, ease: 'power2.in' }, 1)
      .to(q('[data-cta-img]'), { scale: 1.1, xPercent: -4, yPercent: -3, duration: 2.6 }, 1)
      .to(q('[data-cta-shade]'), { opacity: 1, duration: 1 }, 1.8)
      // Gros plan : invitation + CTA
      .set(q('[data-cta-final]'), { autoAlpha: 1 }, 2.2)
      .from(invite.words, { yPercent: 110, stagger: 0.06, duration: 0.6, ease: 'power3.out' }, 2.2)
      .from(q('[data-cta-line]'), { y: 40, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, 2.7)
      .to({}, { duration: 0.6 });

    return () => {
      top.revert();
      bottom.revert();
      invite.revert();
    };
  });

  return (
    <section ref={root} aria-label="Lancer votre projet" className="scene relative">
      <div className="scene-stage reduce-dark relative overflow-hidden bg-[#f6fbff]">
        <div data-cta-window className="reduce-hide absolute inset-0 overflow-hidden" aria-hidden="true">
          <img data-cta-img src={IMAGES.chocoriumMillottiCoffee} alt="" className="absolute inset-0 w-full h-full object-cover will-change-transform" decoding="async" />
          <div data-cta-shade className="absolute inset-0 bg-[#0b1324]/65 opacity-0" />
        </div>

        <div className="reduce-hide absolute inset-0 flex flex-col items-center justify-between py-[16svh] pointer-events-none" aria-hidden="true">
          <span data-cta-top className="block font-black uppercase tracking-tighter text-slate-900 text-[11vw] lg:text-[8vw] leading-none whitespace-nowrap">
            Votre salon
          </span>
          <span data-cta-bottom className="block font-black uppercase tracking-tighter text-[#0284c7] text-[11vw] lg:text-[8vw] leading-none whitespace-nowrap">
            commence ici
          </span>
        </div>

        <div data-cta-final className="scene-overlay relative z-[2] h-full flex items-center px-6">
          <div className="max-w-5xl mx-auto w-full space-y-6 text-white">
            <span data-cta-line className="block text-xs font-bold text-sky-300 uppercase tracking-widest font-mono">DISPONIBILITÉ • 04</span>
            <p data-cta-invite className="text-[10vw] lg:text-[5.5vw] font-black tracking-tighter leading-[0.95]">
              Prêt à lancer votre prochain projet d'exposition&nbsp;?
            </p>
            <p data-cta-line className="text-slate-200 max-w-md text-sm sm:text-base">
              Nos équipes d'experts sont à votre écoute pour vos salons, séminaires et événements d'entreprise.
            </p>
            <button
              data-cta-line
              onClick={() => onScrollTo('contact')}
              className="btn-cine group inline-flex items-center gap-2 bg-white text-[#1e3a8a] px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Écrire à l'équipe
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
