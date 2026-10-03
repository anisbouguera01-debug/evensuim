import React, { useState, useEffect } from 'react';
import { PageId, BrandTheme } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DesignSystemModal } from './components/DesignSystemModal';
import { ShopifyThemeExporterModal } from './components/ShopifyThemeExporterModal';

import { Home } from './pages/Home';
import { Chocorium2025Page } from './pages/Chocorium2025Page';
import { Chocorium2026Page } from './pages/Chocorium2026Page';
import { ClinicaPage } from './pages/ClinicaPage';
import { MilktecPage } from './pages/MilktecPage';
import { SalonsOverviewPage } from './pages/SalonsOverviewPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [designSystemOpen, setDesignSystemOpen] = useState<boolean>(false);
  const [shopifyThemeOpen, setShopifyThemeOpen] = useState<boolean>(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);

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

  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#C5A059] selection:text-slate-950">
      
      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        brandTheme={getBrandTheme()}
        onOpenDesignSystem={() => setDesignSystemOpen(true)}
        onOpenShopifyTheme={() => setShopifyThemeOpen(true)}
      />

      {/* Main Page Router */}
      <main className="min-h-screen pt-10">
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={handlePageChange} 
            customVideoUrl={customVideoUrl}
            onVideoUpload={setCustomVideoUrl}
          />
        )}
        
        {/* Dedicated Chocorium Pages */}
        {(currentPage === 'chocorium' || currentPage === 'chocorium2026') && (
          <Chocorium2026Page setCurrentPage={handlePageChange} />
        )}
        {currentPage === 'chocorium2025' && (
          <Chocorium2025Page setCurrentPage={handlePageChange} />
        )}

        {/* Consolidated Clinica Pages */}
        {currentPage === 'clinica' && (
          <ClinicaPage setCurrentPage={handlePageChange} initialTab="2027" />
        )}
        {currentPage === 'clinica2027' && (
          <ClinicaPage setCurrentPage={handlePageChange} initialTab="2027" />
        )}
        {currentPage === 'clinica2025' && (
          <ClinicaPage setCurrentPage={handlePageChange} initialTab="archives" />
        )}

        {/* MILKTEC Page */}
        {currentPage === 'milktec' && (
          <MilktecPage setCurrentPage={handlePageChange} />
        )}

        {currentPage === 'salons' && <SalonsOverviewPage setCurrentPage={handlePageChange} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={handlePageChange} />}
        {currentPage === 'gallery' && <GalleryPage setCurrentPage={handlePageChange} />}
        {currentPage === 'news' && <NewsPage setCurrentPage={handlePageChange} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={handlePageChange} />}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={handlePageChange}
        onOpenDesignSystem={() => setDesignSystemOpen(true)}
        onOpenShopifyTheme={() => setShopifyThemeOpen(true)}
      />

      {/* Design System & Figma Tokens Inspector Modal */}
      <DesignSystemModal
        isOpen={designSystemOpen}
        onClose={() => setDesignSystemOpen(false)}
      />

      {/* Shopify Liquid Theme Exporter Modal */}
      <ShopifyThemeExporterModal
        isOpen={shopifyThemeOpen}
        onClose={() => setShopifyThemeOpen(false)}
      />

    </div>
  );
}
