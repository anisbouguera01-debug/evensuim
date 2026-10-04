import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { SplitText } from '../../animations/gsap';
import { useScene, sceneStyle } from '../../animations/useScene';
import { CameraImage } from '../motion/CameraImage';

interface Props {
  onScrollTo: (id: string) => void;
}

const LEN = { wide: 2.6, narrow: 2.6 };

/**
 * SCÈNE 7 — ZOOM TRANSITION vers le contact (entrée + partie fixe, temps en écrans)
 *  [0, 1]      plan large : petite fenêtre-photo entre deux lignes, la caméra recule dans la photo
 *  [1, 1.6]    push : la fenêtre devient l'écran, les lignes partent chacune de leur côté
 *  [1, 3.6]    la caméra avance de nouveau dans la photo ; invitation + CTA
 */
export const CtaZoom: React.FC<Props> = ({ onScrollTo }) => {
  const root = useRef<HTMLElement>(null);

  useScene(root, LEN, ({ q, wide, T0, L, ft, cut, cam }) => {
    const top = SplitText.create(q('[data-cta-top]')[0], { type: 'words,chars', mask: 'chars' });
    const bottom = SplitText.create(q('[data-cta-bottom]')[0], { type: 'words,chars', mask: 'chars' });
    const invite = SplitText.create(q('[data-cta-invite]')[0], { type: 'words', mask: 'words' });
    const photo = q('[data-cta-window] [data-cam]');
    const WINDOW = wide ? 'inset(38% 40% 38% 40% round 999px)' : 'inset(40% 30% 40% 30% round 999px)';

    // ---- ENTRÉE ----
    ft(top.chars, { yPercent: 115 }, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power3.out' }, 0.3);
    ft(bottom.chars, { yPercent: -115 }, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power3.out' }, 0.4);
    cam(photo, { scale: 2.2 }, { scale: 1.6 }, 0, T0);

    // ---- PUSH ----
    ft(q('[data-cta-window]'), { clipPath: WINDOW }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6, ease: 'power3.inOut' }, T0);
    ft(q('[data-cta-top]'), { xPercent: 0 }, { xPercent: -110, duration: 0.5, ease: 'power2.in' }, T0);
    ft(q('[data-cta-bottom]'), { xPercent: 0 }, { xPercent: 110, duration: 0.5, ease: 'power2.in' }, T0);
    cam(photo, { scale: 1.6 }, { scale: 1.1, panX: -0.5, panY: -0.3 }, T0, L);
    ft(q('[data-cta-shade]'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, T0 + 0.6);

    // ---- GROS PLAN : invitation + CTA ----
    cut(q('[data-cta-final]'), T0 + 1);
    ft(invite.words, { yPercent: 110 }, { yPercent: 0, stagger: 0.03, duration: 0.3, ease: 'power3.out' }, T0 + 1);
    ft(q('[data-cta-line]'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power3.out' }, T0 + 1.4);

    return () => {
      top.revert();
      bottom.revert();
      invite.revert();
    };
  });

  return (
    <section ref={root} aria-label="Lancer votre projet" className="scene relative" style={sceneStyle(LEN)}>
      <div className="scene-stage reduce-dark relative overflow-hidden bg-[#f6fbff]">
        <div data-cta-window className="reduce-hide absolute inset-0 overflow-hidden" aria-hidden="true">
          <CameraImage image="chocoriumMillottiCoffee" />
          <div data-cta-shade className="absolute inset-0 bg-[#0b1324]/65 opacity-0" />
        </div>

        <div className="reduce-hide absolute inset-0 flex flex-col items-center justify-between py-[16svh] pointer-events-none" aria-hidden="true">
          <span data-cta-top className="block w-full text-center font-black uppercase tracking-tighter text-slate-900 text-[11vw] lg:text-[8vw] leading-none whitespace-nowrap">
            Votre salon
          </span>
          <span data-cta-bottom className="block w-full text-center font-black uppercase tracking-tighter text-[#0284c7] text-[11vw] lg:text-[8vw] leading-none whitespace-nowrap">
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
