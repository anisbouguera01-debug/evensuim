import React, { useState } from 'react';
import { 
  X, 
  Figma, 
  Layers, 
  Palette, 
  Type, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check,
  Grid,
  Layout,
  MousePointer
} from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'components' | 'grid'>('tokens');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorPalettes = [
    {
      brand: 'evensium Identité Officielle',
      subtitle: 'Navy, Steel Blue, Mint Green & Amethyst Purple',
      colors: [
        { name: 'Navy Corporate', hex: '#1B365D', role: 'Fond Principal & Cartes Corporate' },
        { name: 'Steel Ice Blue', hex: '#7090B5', role: 'Accents Secondaires & Sous-titres' },
        { name: 'Mint Sage Green', hex: '#88D4B0', role: 'Accent Logo X & Badges Succès' },
        { name: 'Amethyst Purple', hex: '#9B68A6', role: 'Accent Logo X & Services Créatifs' },
        { name: 'Charcoal Black', hex: '#1D1F24', role: 'Accent Logo X & Texte Sombre' }
      ]
    },
    {
      brand: 'CHOCORIUM Theme',
      subtitle: 'Roasted Cocoa & Royal Gold',
      colors: [
        { name: 'Roasted Cacao', hex: '#180F0A', role: 'Pavillon Atmosphere' },
        { name: 'Imperial Gold', hex: '#D4AF37', role: 'Primary Accent & Badges' },
        { name: 'Cream Silk', hex: '#FFF8F0', role: 'High Contrast Text' },
        { name: 'Dark Chocolate', hex: '#3D2314', role: 'Card Borders & Gradients' }
      ]
    },
    {
      brand: 'MILKTEC Theme',
      subtitle: 'Alpine Glacier & Steel Blue',
      colors: [
        { name: 'Glacier Blue', hex: '#00B4D8', role: 'Tech & Industrial Accent' },
        { name: 'Midnight Industry', hex: '#0B192C', role: 'Deep Surface' },
        { name: 'Steel Silver', hex: '#94A3B8', role: 'Subtitles & Specs' }
      ]
    },
    {
      brand: 'CLINICA Theme',
      subtitle: 'Emerald Medical Teal',
      colors: [
        { name: 'Medical Emerald', hex: '#00F5D4', role: 'Healthcare Innovation' },
        { name: 'Midnight Slate', hex: '#0B1320', role: 'Deep Clinical Backdrop' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300 font-sans">
      
      {/* Modal Box */}
      <div className="w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500/40 text-pink-400">
              <Figma className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  EVENSIUM — Design System & Figma Tokens
                </h3>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono">
                  v2.4 Production
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Spécifications internationales d'agence créative pour investisseurs et développeurs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 border-b border-slate-800 text-xs font-mono">
          {[
            { id: 'tokens', label: 'Color Tokens & Ambiance', icon: Palette },
            { id: 'typography', label: 'Typographie & Échelle', icon: Type },
            { id: 'components', label: 'Composants & Boutons', icon: Layers },
            { id: 'grid', label: 'Grille & Wireframe Figma', icon: Grid },
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: COLOR TOKENS */}
          {activeTab === 'tokens' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Palettes Officielles & Ambiance par Salon
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Cliquez sur une couleur pour copier le code HEX dans le presse-papier.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colorPalettes.map((pal, pIdx) => (
                  <div key={pIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div>
                      <h5 className="font-serif font-bold text-white text-sm">
                        {pal.brand}
                      </h5>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {pal.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pal.colors.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          onClick={() => copyToClipboard(c.hex)}
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all flex items-center gap-3 group"
                        >
                          <div
                            className="w-8 h-8 rounded-lg shadow-md border border-slate-700 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-white truncate">{c.name}</p>
                              <span className="text-[10px] font-mono text-slate-400 group-hover:text-purple-300">
                                {copiedToken === c.hex ? <Check className="w-3 h-3 text-emerald-400" /> : c.hex}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">{c.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === 'typography' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Échelle Typographique & Ratios
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Combinaison de polices Display avec empattement pour le prestige, et polices sans empattement pour la lisibilité technique.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 font-sans">
                
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    Display Headline 1 (H1) • Playfair / Serif Bold
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-black text-white">
                    EVENSIUM — Salons Internationaux
                  </h1>
                </div>

                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    Section Title (H2) • Serif Bold
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                    CHOCORIUM & MILKTEC 2026
                  </h2>
                </div>

                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Body Regular (16px) • Line height 1.6
                  </span>
                  <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                    Le site d'EVENSIUM associe un design minimaliste et luxueux digne d'un Awwwards à une architecture évolutive capable d'accueillir CHOCORIUM, MILKTEC et CLINICA.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                    Badge & Technical Tag (11px) • Mono
                  </span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                      SAFEX PAVILLON CASBAH
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                      STANDARD AWWWARDS
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: COMPONENTS */}
          {activeTab === 'components' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Bibliothèque de Composants UI Luxe
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Aperçu des boutons, cartes et micro-interactions interactives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Buttons Spec */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h5 className="font-serif font-bold text-white text-sm">
                    Boutons d'Action Principaux
                  </h5>

                  <div className="space-y-3">
                    <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                      Primary CTA (Cyan Gradient)
                    </button>
                    <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                      Gold Chocorium CTA
                    </button>
                    <button className="w-full py-3 px-6 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider">
                      Secondary Glass Button
                    </button>
                  </div>
                </div>

                {/* Card Spec */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h5 className="font-serif font-bold text-white text-sm">
                    Spécification de Carte Glassmorphic
                  </h5>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        BORDER RADIUS: 24PX
                      </span>
                      <span className="text-[10px] text-slate-500">
                        PADDING: 24PX
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Structure de carte sans imbrication avec hairline border de 1px et ombres portées douces.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: GRID & FIGMA */}
          {activeTab === 'grid' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Grille 12 Colonnes & Artboards Figma
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Système de mise en page réactif aligné sur 1440px max-width avec conteneurs fluides.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="grid grid-cols-12 gap-2 h-24 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-purple-900/20 border border-purple-500/30 rounded flex items-center justify-center text-[10px] font-mono text-purple-300">
                      Col {i + 1}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Desktop Standard</p>
                    <p className="text-slate-500 text-[11px] font-mono">1440px / 12 Columns / 32px Gutter</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Tablette / iPad</p>
                    <p className="text-slate-500 text-[11px] font-mono">768px / 6 Columns / 24px Gutter</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Mobile Responsive</p>
                    <p className="text-slate-500 text-[11px] font-mono">375px / 1 Column / 16px Padding</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500 flex justify-between items-center px-6">
          <span>Projet EVENSIUM • Conçu par Agence Internationale</span>
          <span className="text-purple-400 font-mono">Awwwards Excellence Grade</span>
        </div>

      </div>
    </div>
  );
};
