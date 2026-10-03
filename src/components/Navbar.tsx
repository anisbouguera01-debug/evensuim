import React, { useState, useEffect } from 'react';
import { PageId, BrandTheme } from '../types';
import { EvensiumLogo } from './EvensiumLogo';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>      {/* Stripe / Framer / Apple Style Luminous Top Announcement Ribbon */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 font-sans backdrop-blur-md relative z-50 flex justify-between items-center shadow-sm">
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
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-200/90 py-2.5 shadow-md' 
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* EVENSIUM Brand Logo */}
          <div 
            onClick={() => setCurrentPage('home')} 
            className="cursor-pointer group"
          >
            <EvensiumLogo 
              size={30} 
              textColorClass="text-slate-900 group-hover:text-blue-600 font-bold transition-colors" 
            />
          </div>

          {/* Desktop Luminous Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-tight">
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
                  >
                    <button
                      className={`py-1 flex items-center gap-1 transition-all duration-200 cursor-pointer ${
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
                      <div className="absolute top-full left-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 px-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
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
                    )}
                  </div>
                );
              }

              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`relative py-1 transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-blue-600 font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Pill Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
            >
              <span>Contactez-nous</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-black"
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 border-b border-slate-200 backdrop-blur-2xl px-4 pt-4 pb-6 mt-3 space-y-2 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
            <div className="grid grid-cols-1 gap-2 pb-3 border-b border-slate-200">
              <button
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#0066cc] text-white font-bold text-[11px]"
              >
                <span>Contactez-nous</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1 py-2 max-h-[60vh] overflow-y-auto">
              {navLinks.map((link) => {
                if ('submenu' in link) {
                  return (
                    <div key={link.label} className="py-1.5 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-slate-400 px-4 uppercase tracking-wider">
                        {link.label}
                      </div>
                      <div className="pl-3 space-y-1">
                        {link.submenu.map((sub) => {
                          const isSubActive = currentPage === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setCurrentPage(sub.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                                isSubActive
                                  ? 'bg-slate-100 text-[#0066cc] border border-slate-200 font-semibold'
                                  : 'text-slate-600 hover:bg-slate-50'
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
                  );
                }

                const isActive = currentPage === link.id;
                return (
                  <div key={link.id} className="space-y-1">
                    <button
                      onClick={() => {
                        setCurrentPage(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-slate-100 text-[#0066cc] border border-slate-300 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
