export type PageId = 
  | 'home' 
  | 'salons' 
  | 'chocorium'
  | 'chocorium2025'
  | 'chocorium2026'
  | 'clinica'
  | 'clinica2025'
  | 'clinica2027'
  | 'milktec'
  | 'about' 
  | 'gallery' 
  | 'news' 
  | 'contact';

export type BrandTheme = 'evensium' | 'chocorium' | 'chocorium2026' | 'clinica' | 'clinica2027' | 'milktec';

export interface Salon {
  id: string;
  name: string;
  tagline: string;
  edition: string;
  date: string;
  startDate: string; // ISO format for countdown
  location: string;
  pavilion: string;
  venue: string;
  accentColor: string;
  secondaryColor: string;
  themeClass: string;
  heroImage: string;
  videoUrl?: string;
  description: string;
  longDescription: string;
  stats: { label: string; value: string }[];
  worlds: { name: string; description: string; icon: string; image?: string }[];
  targetVisitors: string[];
  sponsors: Sponsor[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'Gold' | 'Silver' | 'Official' | 'Partner';
  category?: string;
}

export interface SponsoringPackage {
  id: string;
  title: string;
  priceDZD: number;
  formattedPrice: string;
  badge: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  salonId: 'chocorium' | 'milktec' | 'evensium' | 'clinica';
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  category: string;
  caption?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'Presse' | 'Communiqué' | 'Événement' | 'Innovation';
  image: string;
  author: string;
  readTime: string;
}

export interface StandQuote {
  salonId: string;
  surfaceM2: number;
  standType: 'bare' | 'equipped' | 'custom_island';
  cornerCount: number;
  extraOptions: {
    electricity: boolean;
    ledScreen: boolean;
    brandingCorner: boolean;
    vipPasses: boolean;
    hostesses: boolean;
  };
  sponsoringPackageId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Général' | 'Exposants' | 'Visiteurs' | 'Presse';
}
