import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import type { NavItem } from './Navbar';
import { EvensiumLogo } from './EvensiumLogo';
import { gsap, useGSAP, prefersReducedMotion } from '../animations/gsap';
import { useSmoothScroll } from '../animations/SmoothScroll';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  /** Bouton déclencheur : origine du cercle d'ouverture et retour du focus. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Menu mobile plein écran : ouverture en cercle depuis le bouton, liens qui montent
 * en cascade derrière un masque, pilules du logo qui dérivent. Échap ferme le menu,
 * le focus est piégé à l'intérieur puis rendu au bouton.
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, navLinks, currentPage, onNavigate, triggerRef }) => {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { lock } = useSmoothScroll();

  const { contextSafe } = useGSAP({ scope: root });

  useGSAP(() => {
    if (root.current) gsap.set(root.current, { autoAlpha: 0 });
  }, { scope: root });

  /** Construit la timeline d'ouverture à chaque fois (origine du cercle = position actuelle du bouton). */
  const build = contextSafe(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const r = triggerRef.current?.getBoundingClientRect();
    const at = r ? `${r.left + r.width / 2}px ${r.top + r.height / 2}px` : '100% 0%';
    tl.current?.kill();
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { autoAlpha: 1 })
      .fromTo(el, { clipPath: `circle(0px at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: 0.8, ease: 'expo.inOut' })
      .fromTo(q('[data-menu-link]'), { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'expo.out', stagger: 0.045 }, 0.3)
      .fromTo(q('[data-menu-fade]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.45)
      .fromTo(q('[data-menu-pill]'), { scale: 0, rotate: -45 }, { scale: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.07 }, 0.25);
    return tl.current;
  });

  useEffect(() => {
    lock(open);
    const reduced = prefersReducedMotion();
    if (open) {
      const t = build();
      if (reduced) t.progress(1);
      else t.play();
      const first = root.current?.querySelector<HTMLElement>('[data-menu-focus]');
      window.setTimeout(() => first?.focus(), reduced ? 0 : 350);
    } else if (tl.current && tl.current.progress() > 0) {
      if (reduced) tl.current.progress(0);
      else tl.current.timeScale(1.6).reverse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `build` est recréé à chaque rendu, seul `open` doit relancer l'animation
  }, [open, lock]);

  useEffect(() => () => lock(false), [lock]);

  // Échap + piège à focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !root.current) return;
      const focusables = Array.from<HTMLElement>(root.current.querySelectorAll<HTMLElement>('button, a[href]')).filter((n) => !n.hasAttribute('disabled'));
      const trigger = triggerRef.current;
      const ring = trigger ? [trigger, ...focusables] : focusables;
      const idx = ring.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        ring[ring.length - 1]?.focus();
      } else if (!e.shiftKey && idx === ring.length - 1) {
        e.preventDefault();
        ring[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, triggerRef]);

  const go = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  let focusAssigned = false;
  const focusAttr = () => {
    if (focusAssigned) return {};
    focusAssigned = true;
    return { 'data-menu-focus': true };
  };

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden={!open}
      className="mobile-menu lg:hidden fixed inset-0 z-[35] bg-gradient-to-br from-white via-sky-50 to-[#e0f2fe] overflow-y-auto"
    >
      {/* Pilules du logo en décor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span data-menu-pill className="absolute -right-16 top-32 w-56 h-14 rounded-full rotate-45 bg-gradient-to-r from-[#0c63ad] to-[#053e70] opacity-15" />
        <span data-menu-pill className="absolute -left-20 top-1/2 w-64 h-14 rounded-full -rotate-45 bg-gradient-to-r from-[#bc8ec5] to-[#81548e] opacity-15" />
        <span data-menu-pill className="absolute right-10 bottom-16 w-48 h-12 rounded-full -rotate-45 bg-gradient-to-r from-[#6fd3a8] to-[#3d9771] opacity-20" />
      </div>

      <nav className="relative min-h-full flex flex-col justify-between px-6 pt-32 pb-10" aria-label="Navigation mobile">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            if ('submenu' in link) {
              return (
                <li key={link.label} className="py-2">
                  <div className="overflow-hidden">
                    <span data-menu-link className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {link.label}
                    </span>
                  </div>
                  <ul className="pl-1 space-y-1">
                    {link.submenu.map((sub) => (
                      <li key={sub.id} className="overflow-hidden">
                        <button
                          data-menu-link
                          {...focusAttr()}
                          onClick={() => go(sub.id)}
                          aria-current={currentPage === sub.id ? 'page' : undefined}
                          className={`w-full text-left flex items-center justify-between gap-3 py-1.5 text-lg font-bold tracking-tight ${
                            currentPage === sub.id ? 'text-[#0066cc]' : 'text-slate-800'
                          }`}
                        >
                          <span>{sub.label}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-white/80 border border-slate-200 text-slate-600 shrink-0">
                            {sub.badge}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            const active = currentPage === link.id;
            return (
              <li key={link.id} className="overflow-hidden">
                <button
                  data-menu-link
                  {...focusAttr()}
                  onClick={() => go(link.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`group w-full text-left flex items-center gap-3 py-1.5 text-3xl font-black tracking-tight uppercase ${
                    active ? 'text-[#0066cc]' : 'text-slate-900'
                  }`}
                >
                  <span className={`h-[3px] rounded-full bg-[#0066cc] transition-all duration-300 ${active ? 'w-6' : 'w-0 group-hover:w-6'}`} />
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="pt-10 space-y-5">
          <button
            data-menu-fade
            onClick={() => go('contact')}
            className="btn-cine w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-xs tracking-widest uppercase shadow-lg"
          >
            <span>Contactez-nous</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <div data-menu-fade className="flex items-center justify-between text-xs text-slate-500">
            <EvensiumLogo size={22} textColorClass="text-base text-slate-700" />
            <a href="mailto:ops@evensium.com" className="font-mono hover:text-[#0066cc]">ops@evensium.com</a>
          </div>
        </div>
      </nav>
    </div>
  );
};
