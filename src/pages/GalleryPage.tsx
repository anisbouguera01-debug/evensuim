import React from 'react';
import { PageId } from '../types';
import { ImmersiveGallery } from '../components/ImmersiveGallery';

interface GalleryPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-slate-900 min-h-screen font-sans pt-28 pb-20">
      <ImmersiveGallery />
    </div>
  );
};
