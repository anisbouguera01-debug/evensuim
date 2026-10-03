import React, { useState, useEffect, useRef } from 'react';
import { PageId, BrandTheme } from '../types';
import { EvensiumLogo } from './EvensiumLogo';
import { MobileMenu } from './MobileMenu';
import { Magnetic } from './motion/Magnetic';
import { 
  Sparkles, 
  Calendar, 
  Menu, 
  X, 
  ChevronRight, 
  Figma, 
  Layers, 
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Building,
  ShoppingBag
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  brandTheme: BrandTheme;
  onOpenDesignSystem: () => void;
  onOpenShopifyTheme?: () => void;
}

export type NavItem = 
  | { id: PageId; label: string }
  | { 
      label: string; 
      key: 'chocorium' | 'clinica';
      submenu: { id: PageId; label: string; badge: string }[];
    };

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  brandTheme,
  onOpenDesignSystem,
  onOpenShopifyTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'FR' | 'EN' | 'AR'>('FR');
  const [activeDropdown, setActiveDropdown] = useState<'chocorium' | 'clinica' | null>(null);

  const ribbonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Le header colle sous le bandeau puis remonte en haut de l'écran (transform, pas de reflow).
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const ribbonH = ribbonRef.current?.offsetHeight ?? 0;
      if (headerRef.current) headerRef.current.style.transform = `translate3d(0, ${Math.max(0, ribbonH - y)}px, 0)`;
      setScrolled(y > 30);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Ferme le menu mobile si l'écran repasse en desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMobileMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Header « intégré » (verre léger) tant qu'on est au-dessus du hero de l'accueil
  const transparent = (currentPage === 'home' && !scrolled) || mobileMenuOpen;

  const navLinks: NavItem[] = [
    { id: 'home', label: 'Accueil' },
    { 
      label: 'CHOCORIUM', 
      key: 'chocorium',
      submenu: [
        { id: 'chocorium2026', label: 'Offre CHOCORIUM 2026 (Nouveau)', badge: 'Nouveau 2026' },
        { id: 'chocorium2025', label: 'Édition 2025 (Archives)', badge: 'Rétrospective' }
      ]
    },
    { 
      label: 'CLINICA', 
      key: 'clinica',
      submenu: [
        { id: 'clinica2027', label: 'Édition 2027 (Nouveau)', badge: 'Salon 2027' },
        { id: 'clinica2025', label: 'Édition 2025 (Archives)', badge: 'Rétrospective' }
      ]
    },
    { id: 'milktec', label: 'MILKTEC' },
    { id: 'about', label: 'L\'Agence' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'news', label: 'Actualités' },
    { id: 'contact', label: 'Contact' },
  ];

  // Determine dynamic theme styling based on brandTheme
  const getThemeAccentClass = () => {
    switch (brandTheme) {
      case 'chocorium':
        return 'from-amber-700 to-amber-900 text-amber-300 border-amber-700/30';
      case 'chocorium2026':
        return 'from-amber-800 to-amber-950 text-amber-300 border-[#C5A059]/30';
      case 'clinica':
        return 'from-emerald-400 to-teal-500 text-emerald-300 border-emerald-500/30';
      case 'clinica2027':
        return 'from-blue-500 to-sky-600 text-sky-300 border-sky-500/30';
      case 'milktec':
        return 'from-emerald-600 to-teal-700 text-emerald-300 border-emerald-500/30';
      default:
        return 'from-cyan-400 via-indigo-500 to-purple-500 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Aller au contenu</a>

      {/* Stripe / Framer / Apple Style Luminous Top Announcement Ribbon */}
      <div ref={ribbonRef} className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 font-sans backdrop-blur-md relative z-50 flex justify-between items-center shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-sky-500/20 text-sky-300 border border-sky-500/40 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Information
            </span>
            <p className="text-slate-300 truncate font-medium text-xs">
              <strong className="text-white font-semibold">EVENSIUM</strong> — Organisation de salons professionnels et de rétrospectives d'excellence en Algérie.
              <button onClick={() => setCurrentPage('about')} className="ml-2 text-cyan-400 hover:underline font-semibold inline-flex items-center gap-0.5">
                Découvrir l'agence &gt;
              </button>
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 text-xs">
            <span className="text-slate-400 flex items-center gap-1 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Organisateur Certifié SAFEX
            </span>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full p-0.5 shadow-sm">
              {(['FR', 'EN', 'AR'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full transition-all ${
                    language === lang 
                      ? 'bg-blue-600 text-white shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luminous Frosted Glass Header */}
      <header
        ref={headerRef}
        data-scrolled={scrolled}
        className={`site-header fixed top-0 left-0 right-0 z-40 ${
          transparent
            ? 'bg-white/35 backdrop-blur-md border-b border-white/40 py-3.5'
            : scrolled
              ? 'bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200/90 py-2 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)]'
              : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* EVENSIUM Brand Logo */}
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            aria-label="Evensium — accueil"
            className={`header-logo cursor-pointer group origin-left ${scrolled ? 'scale-[0.92]' : 'scale-100'}`}
          >
            <EvensiumLogo
              size={30}
              textColorClass="text-slate-900 group-hover:text-blue-600 font-bold transition-colors"
            />
          </button>

          {/* Desktop Luminous Navigation Links */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-tight">
            {navLinks.map((link) => {
              if ('submenu' in link) {
                const isOpen = activeDropdown === link.key;
                const isAnyActive = link.submenu.some(sub => currentPage === sub.id);
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveDropdown(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setActiveDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => setActiveDropdown(isOpen ? null : link.key)}
                      className={`nav-link py-1 flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                        isAnyActive 
                          ? 'text-blue-600 font-bold' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                    </button>

                    {/* Popover Submenu */}
                    {isOpen && (
                      <div className="nav-dropdown absolute top-full left-0 pt-1.5 w-60 z-50">
                      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl py-2 px-2 flex flex-col gap-1">
                        {link.submenu.map((sub) => {
                          const isSubActive = currentPage === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setCurrentPage(sub.id);
                                setActiveDropdown(null);
                              }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                isSubActive
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                              }`}
                            >
                              <span>{sub.label}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-slate-100 text-slate-600">
                                {sub.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-link relative py-1 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-blue-600 font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className={`nav-underline absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full ${isActive ? 'is-active' : ''}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Primary Action Pill Button */}
          <div className="hidden sm:flex items-center gap-3 ml-auto lg:ml-0 mr-3 lg:mr-0">
            <Magnetic strength={0.25}>
              <button
                onClick={() => setCurrentPage('contact')}
                className="btn-cine group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                <span>Contactez-nous</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </div>

          {/* Bouton menu mobile : burger → croix */}
          <button
            ref={burgerRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`burger lg:hidden relative w-11 h-11 rounded-xl border flex items-center justify-center ${
              mobileMenuOpen ? 'is-open bg-white border-slate-200' : 'bg-slate-100 border-slate-300'
            }`}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        triggerRef={burgerRef}
      />
    </>
  );
};
