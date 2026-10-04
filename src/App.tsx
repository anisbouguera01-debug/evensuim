import React, { Suspense, lazy, startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PageId, BrandTheme } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CustomCursor } from './components/motion/CustomCursor';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { PageTransition, PageTransitionHandle } from './components/motion/PageTransition';
import { useSmoothScroll } from './animations/SmoothScroll';
import { usePageReveals } from './animations/usePageReveals';
import { ScrollTrigger } from './animations/gsap';

// Pages secondaires et modales chargées à la demande (code splitting).
const named = <K extends string>(loader: () => Promise<Record<K, React.ComponentType<any>>>, key: K) =>
  lazy(() => loader().then((m) => ({ default: m[key] })));

const Chocorium2025Page = named(() => import('./pages/Chocorium2025Page'), 'Chocorium2025Page');
const Chocorium2026Page = named(() => import('./pages/Chocorium2026Page'), 'Chocorium2026Page');
const ClinicaPage = named(() => import('./pages/ClinicaPage'), 'ClinicaPage');
const MilktecPage = named(() => import('./pages/MilktecPage'), 'MilktecPage');
const SalonsOverviewPage = named(() => import('./pages/SalonsOverviewPage'), 'SalonsOverviewPage');
const AboutPage = named(() => import('./pages/AboutPage'), 'AboutPage');
const GalleryPage = named(() => import('./pages/GalleryPage'), 'GalleryPage');
const NewsPage = named(() => import('./pages/NewsPage'), 'NewsPage');
const ContactPage = named(() => import('./pages/ContactPage'), 'ContactPage');
const DesignSystemModal = named(() => import('./components/DesignSystemModal'), 'DesignSystemModal');
const ShopifyThemeExporterModal = named(() => import('./components/ShopifyThemeExporterModal'), 'ShopifyThemeExporterModal');

/** Enveloppe d'une page : révélations génériques + recalcul des déclencheurs une fois montée. */
const PageShell: React.FC<{ pageKey: PageId; children: React.ReactNode }> = ({ pageKey, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  usePageReveals(ref, pageKey, pageKey !== 'home');
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pageKey]);
  return <div ref={ref}>{children}</div>;
};

const PageFallback = () => (
  <div className="min-h-[70vh] flex items-center justify-center" role="status" aria-label="Chargement">
    <span className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [designSystemOpen, setDesignSystemOpen] = useState<boolean>(false);
  const [shopifyThemeOpen, setShopifyThemeOpen] = useState<boolean>(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const { scrollTo } = useSmoothScroll();
  const transition = useRef<PageTransitionHandle>(null);
  const pendingReveal = useRef(false);
  const navigating = useRef(false);

  // Compute active brand theme based on current page
  const getBrandTheme = (): BrandTheme => {
    switch (currentPage) {
      case 'chocorium':
      case 'chocorium2025':
        return 'chocorium';
      case 'chocorium2026':
        return 'chocorium2026';
      case 'clinica':
      case 'clinica2025':
        return 'clinica';
      case 'clinica2027':
        return 'clinica2027';
      case 'milktec':
        return 'milktec';
      default:
        return 'evensium';
    }
  };

  /** Changement de page : volets → remplacement → retour en haut → volets qui s'ouvrent. */
  const handlePageChange = useCallback(
    async (page: PageId) => {
      if (page === currentPage) {
        scrollTo(0);
        return;
      }
      if (navigating.current) return;
      navigating.current = true;
      await transition.current?.cover();
      pendingReveal.current = true;
      // Transition React : l'ancienne page reste derrière les volets jusqu'à ce que la nouvelle soit prête.
      startTransition(() => setCurrentPage(page));
    },
    [currentPage, scrollTo],
  );

  // Après le rendu de la nouvelle page : haut de page immédiat, recalcul, ouverture des volets.
  useLayoutEffect(() => {
    if (!pendingReveal.current) return;
    pendingReveal.current = false;
    scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      transition.current?.reveal().finally(() => {
        navigating.current = false;
      });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }, [currentPage, scrollTo]);

  // Les polices modifient les métriques du texte : recalcul une fois chargées.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    // Fond clair : les en-têtes/sections translucides ne virent plus au gris sur un fond noir.
    <div className="min-h-screen bg-[#F8FAFC] text-slate-100 font-sans selection:bg-[#C5A059] selection:text-slate-950">
      <ScrollProgress />

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        brandTheme={getBrandTheme()}
        onOpenDesignSystem={() => setDesignSystemOpen(true)}
        onOpenShopifyTheme={() => setShopifyThemeOpen(true)}
      />

      {/* Main Page Router */}
      <main
        id="main-content"
        tabIndex={-1}
        // Accueil : le hero passe sous le header transparent ; autres pages : décalage d'origine.
        className={`min-h-screen outline-none ${currentPage === 'home' ? '' : 'pt-10'}`}
      >
        <Suspense fallback={<PageFallback />}>
          <PageShell key={currentPage} pageKey={currentPage}>
            {currentPage === 'home' && (
              <Home setCurrentPage={handlePageChange} customVideoUrl={customVideoUrl} onVideoUpload={setCustomVideoUrl} />
            )}

            {/* Dedicated Chocorium Pages */}
            {(currentPage === 'chocorium' || currentPage === 'chocorium2026') && (
              <Chocorium2026Page setCurrentPage={handlePageChange} />
            )}
            {currentPage === 'chocorium2025' && <Chocorium2025Page setCurrentPage={handlePageChange} />}

            {/* Consolidated Clinica Pages */}
            {currentPage === 'clinica' && <ClinicaPage setCurrentPage={handlePageChange} initialTab="2027" />}
            {currentPage === 'clinica2027' && <ClinicaPage setCurrentPage={handlePageChange} initialTab="2027" />}
            {currentPage === 'clinica2025' && <ClinicaPage setCurrentPage={handlePageChange} initialTab="archives" />}

            {/* MILKTEC Page */}
            {currentPage === 'milktec' && <MilktecPage setCurrentPage={handlePageChange} />}

            {currentPage === 'salons' && <SalonsOverviewPage setCurrentPage={handlePageChange} />}
            {currentPage === 'about' && <AboutPage setCurrentPage={handlePageChange} />}
            {currentPage === 'gallery' && <GalleryPage setCurrentPage={handlePageChange} />}
            {currentPage === 'news' && <NewsPage setCurrentPage={handlePageChange} />}
            {currentPage === 'contact' && <ContactPage setCurrentPage={handlePageChange} />}
          </PageShell>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={handlePageChange}
        onOpenDesignSystem={() => setDesignSystemOpen(true)}
        onOpenShopifyTheme={() => setShopifyThemeOpen(true)}
      />

      {/* Modales chargées seulement à l'ouverture */}
      <Suspense fallback={null}>
        {designSystemOpen && <DesignSystemModal isOpen={designSystemOpen} onClose={() => setDesignSystemOpen(false)} />}
        {shopifyThemeOpen && <ShopifyThemeExporterModal isOpen={shopifyThemeOpen} onClose={() => setShopifyThemeOpen(false)} />}
      </Suspense>

      <PageTransition ref={transition} />
      <CustomCursor />
    </div>
  );
}
