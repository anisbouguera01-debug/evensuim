import React from 'react';
import { PageId } from '../types';
import { useSmoothScroll } from '../animations/SmoothScroll';
import { HomeHero } from '../components/home/HomeHero';
import { AboutSection } from '../components/home/AboutSection';
import { SalonsScenes } from '../components/home/SalonsScenes';
import { UpcomingEditions } from '../components/home/UpcomingEditions';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { WhyUs } from '../components/home/WhyUs';
import { ContactSection } from '../components/home/ContactSection';

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  customVideoUrl?: string | null;
  onVideoUpload?: (url: string) => void;
}

/**
 * Page d'accueil — un film en 7 plans, piloté par le scroll :
 * HERO (caméra dans le X) → QUI SOMMES-NOUS (parallaxe) → NOS SALONS (scènes pinnées)
 * → PROCHAINES ÉDITIONS (travelling horizontal) → SERVICES (cascade 3D)
 * → POURQUOI EVENSIUM (convergence) → CONTACT (rideau). Détail : docs/ANIMATION_TIMELINE.md
 */
export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { scrollTo } = useSmoothScroll();
  const scrollToSection = (id: string) => scrollTo(`#${id}`, { offset: -72 });

  return (
    <div className="bg-[#f6fbff] text-slate-900 min-h-screen font-sans selection:bg-sky-600 selection:text-white">
      <HomeHero onScrollTo={scrollToSection} />
      <AboutSection />
      <SalonsScenes />
      <UpcomingEditions setCurrentPage={setCurrentPage} />
      <ServicesGrid />
      <WhyUs />
      <ContactSection />
    </div>
  );
};
