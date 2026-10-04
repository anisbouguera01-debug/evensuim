import React from 'react';
import { PageId } from '../types';
import { useSmoothScroll } from '../animations/SmoothScroll';
import { HeroFilm } from '../components/scenes/HeroFilm';
import { AboutPanorama } from '../components/scenes/AboutPanorama';
import { SalonsReel } from '../components/scenes/SalonsReel';
import { EditionsTakeover } from '../components/scenes/EditionsTakeover';
import { ServicesSequence } from '../components/scenes/ServicesSequence';
import { WhyKinetic } from '../components/scenes/WhyKinetic';
import { CtaZoom } from '../components/scenes/CtaZoom';
import { ContactSection } from '../components/home/ContactSection';

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
  customVideoUrl?: string | null;
  onVideoUpload?: (url: string) => void;
}

/**
 * Accueil — une publicité interactive en 7 scènes plein écran, le scroll est la tête de lecture :
 * 1 Camera push dans le logo → 2 Travelling latéral → 3 Reel des salons (zoom-through, whip pan)
 * → 4 Card takeover des éditions → 5 Séquence pinnée des services → 6 Typo cinétique + chiffres
 * → 7 Zoom transition vers le formulaire. Détail plan par plan : docs/ANIMATION_TIMELINE.md
 */
export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { scrollTo } = useSmoothScroll();
  const scrollToSection = (id: string) => scrollTo(`#${id}`, { offset: id === 'contact' ? -72 : 0 });

  return (
    <div className="bg-[#f6fbff] text-slate-900 min-h-screen font-sans selection:bg-sky-600 selection:text-white">
      <HeroFilm onScrollTo={scrollToSection} />
      <AboutPanorama />
      <SalonsReel />
      <EditionsTakeover setCurrentPage={setCurrentPage} />
      <ServicesSequence />
      <WhyKinetic />
      <CtaZoom onScrollTo={scrollToSection} />
      <ContactSection />
    </div>
  );
};
