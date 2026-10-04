import React, { useState } from 'react';
import { motion } from 'motion/react';
import JSZip from 'jszip';
import { 
  X, 
  Download, 
  Code, 
  Copy, 
  Check, 
  ShoppingBag, 
  ExternalLink, 
  Sparkles, 
  Palette, 
  Sliders, 
  Monitor, 
  FileCode, 
  CheckCircle2, 
  HelpCircle,
  Eye,
  Settings,
  Layers,
  ArrowRight,
  Archive
} from 'lucide-react';

interface ShopifyThemeExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopifyThemeExporterModal: React.FC<ShopifyThemeExporterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'guide'>('code');
  const [selectedFile, setSelectedFile] = useState<string>('sections/hero-bento.liquid');
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Customization controls
  const [storeName, setStoreName] = useState<string>('EVENSIUM LUXURY & EVENTS');
  const [primaryNavy, setPrimaryNavy] = useState<string>('#1B365D');
  const [accentMint, setAccentMint] = useState<string>('#88D4B0');
  const [accentPurple, setAccentPurple] = useState<string>('#9B68A6');

  if (!isOpen) return null;

  // Complete Shopify 2.0 Liquid Theme Files Data
  const liquidFiles: Record<string, { label: string; language: string; content: string; description: string }> = {
    'sections/hero-bento.liquid': {
      label: 'sections/hero-bento.liquid',
      language: 'liquid',
      description: 'Section Bento Grid pour la page d\'accueil Shopify Online Store 2.0',
      content: `{% comment %}
  EVENSIUM Luxury Bento Grid Section for Shopify 2.0
  Fully customizable via Shopify Theme Editor
{% endcomment %}

<section className="shopify-section-hero-bento py-12 bg-[#0D1B2A] text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="text-center max-w-3xl mx-auto mb-10">
      {% if section.settings.subheading != blank %}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[{{ section.settings.accent_color }}]/20 text-[{{ section.settings.accent_color }}] mb-3">
          {{ section.settings.subheading }}
        </span>
      {% endif %}

      <h2 className="font-serif text-3xl sm:text-5xl font-black text-white">
        {{ section.settings.title | escape }}
      </h2>

      {% if section.settings.description != blank %}
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          {{ section.settings.description }}
        </p>
      {% endif %}
    </div>

    {/* Bento Cards Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {% for block in section.blocks %}
        <div className="bento-card bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-[{{ section.settings.accent_color }}] transition-all" {{ block.shopify_attributes }}>
          {% if block.settings.image != blank %}
            <img src="{{ block.settings.image | image_url: width: 800 }}" alt="{{ block.settings.title }}" class="w-full h-48 object-cover rounded-2xl mb-4" />
          {% endif %}
          <span className="text-[10px] font-mono text-[{{ section.settings.accent_color }}] uppercase block mb-1">
            {{ block.settings.tag }}
          </span>
          <h3 className="font-serif font-bold text-white text-xl mb-2">{{ block.settings.title }}</h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">{{ block.settings.text }}</p>
          {% if block.settings.button_link != blank %}
            <a href="{{ block.settings.button_link }}" className="inline-flex items-center gap-2 text-xs font-bold text-[{{ section.settings.accent_color }}]">
              {{ block.settings.button_label | default: 'Découvrir' }} &rarr;
            </a>
          {% endif %}
        </div>
      {% endfor %}
    </div>

  </div>
</section>

{% schema %}
{
  "name": "EVENSIUM Hero Bento",
  "settings": [
    {
      "type": "text",
      "id": "subheading",
      "label": "Sous-titre / Tag",
      "default": "Collection Exclusive 2026"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Titre Principal",
      "default": "Événements & Créations d'Exception"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Retrouvez les créations, billetterie et salons exclusifs organisés par notre agence."
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Couleur d'accentuation",
      "default": "${accentMint}"
    }
  ],
  "blocks": [
    {
      "type": "bento_item",
      "name": "Carte Bento",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image de couverture" },
        { "type": "text", "id": "tag", "label": "Tag/Catégorie", "default": "VIP SALON" },
        { "type": "text", "id": "title", "label": "Titre du Produit", "default": "Billet VIP CHOCORIUM" },
        { "type": "textarea", "id": "text", "label": "Description", "default": "Accès privilégié aux dégustations et ateliers maîtres chocolatiers." },
        { "type": "text", "id": "button_label", "label": "Texte du bouton", "default": "Réserver Billet" },
        { "type": "url", "id": "button_link", "label": "Lien du bouton" }
      ]
    }
  ],
  "presets": [
    {
      "name": "EVENSIUM Hero Bento",
      "blocks": [
        { "type": "bento_item" },
        { "type": "bento_item" },
        { "type": "bento_item" }
      ]
    }
  ]
}
{% endschema %}`
    },

    'sections/featured-collection.liquid': {
      label: 'sections/featured-collection.liquid',
      language: 'liquid',
      description: 'Grille de produits & billets avec panier dynamique',
      content: `{% comment %}
  Shopify Section: Collection en vedette EVENSIUM
{% endcomment %}

<div className="shopify-section-featured-collection py-16 bg-white text-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-end mb-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[${primaryNavy}] font-bold">
          Boutique & Billetterie
        </span>
        <h2 className="font-serif text-3xl font-black mt-1">
          {{ section.settings.title | default: 'Nos Produits & Pass Salons' }}
        </h2>
      </div>
      <a href="/collections/all" className="text-xs font-bold text-[${primaryNavy}] underline">Voir Tout</a>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {% assign collection = collections[section.settings.collection] %}
      {% for product in collection.products limit: 4 %}
        <div className="product-card bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-all">
          <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-200">
            <img src="{{ product.featured_image | image_url: width: 400 }}" alt="{{ product.title }}" class="w-full h-full object-cover" />
          </div>
          <h3 className="font-serif font-bold text-slate-900 text-sm">{{ product.title }}</h3>
          <p className="font-mono text-xs font-bold text-[${primaryNavy}] mt-1">{{ product.price | money }}</p>

          <form method="post" action="/cart/add" className="mt-3">
            <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}" />
            <button type="submit" className="w-full py-2 bg-[${primaryNavy}] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">
              Réserver / Ajouter au panier
            </button>
          </form>
        </div>
      {% endfor %}
    </div>
  </div>
</div>`
    },

    'config/settings_schema.json': {
      label: 'config/settings_schema.json',
      language: 'json',
      description: 'Configuration visuelle de l\'éditeur de thème Shopify',
      content: JSON.stringify([
        {
          "name": "EVENSIUM Agency Branding",
          "settings": [
            {
              "type": "text",
              "id": "agency_name",
              "label": "Nom de l'agence / boutique",
              "default": storeName
            },
            {
              "type": "color",
              "id": "color_navy",
              "label": "Couleur Navy Corporate",
              "default": primaryNavy
            },
            {
              "type": "color",
              "id": "color_mint",
              "label": "Couleur Mint Vert Agence",
              "default": accentMint
            },
            {
              "type": "color",
              "id": "color_purple",
              "label": "Couleur Violet Premium",
              "default": accentPurple
            },
            {
              "type": "font_picker",
              "id": "type_header_font",
              "label": "Police des titres",
              "default": "playfair_display_n7"
            }
          ]
        }
      ], null, 2)
    },

    'templates/index.json': {
      label: 'templates/index.json',
      language: 'json',
      description: 'Gabarit de page d\'accueil Shopify Online Store 2.0 (Sections JSON)',
      content: JSON.stringify({
        "sections": {
          "hero_bento": {
            "type": "hero-bento",
            "settings": {
              "subheading": "Organisateur Officiel SAFEX",
              "title": storeName,
              "description": "Thème officiel pour billetterie de salons professionnels et expositions d'exception.",
              "accent_color": accentMint
            }
          },
          "featured_products": {
            "type": "featured-collection",
            "settings": {
              "title": "Billets VIP & Pass Exposants"
            }
          }
        },
        "order": [
          "hero_bento",
          "featured_products"
        ]
      }, null, 2)
    }
  };

  const currentFileObj = liquidFiles[selectedFile] || liquidFiles['sections/hero-bento.liquid'];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFileObj.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add files to ZIP
      zip.file('sections/hero-bento.liquid', liquidFiles['sections/hero-bento.liquid'].content);
      zip.file('sections/featured-collection.liquid', liquidFiles['sections/featured-collection.liquid'].content);
      zip.file('config/settings_schema.json', liquidFiles['config/settings_schema.json'].content);
      zip.file('templates/index.json', liquidFiles['templates/index.json'].content);
      zip.file('assets/theme.css', `/* EVENSIUM Shopify 2.0 Theme Assets */\nbody { background-color: ${primaryNavy}; color: #ffffff; font-family: sans-serif; }`);
      zip.file('layout/theme.liquid', `<!doctype html>\n<html lang="{{ request.locale.iso_code }}">\n<head>\n  <meta charset="utf-8">\n  <title>{{ page_title }}</title>\n  {{ content_for_header }}\n  {{ 'theme.css' | asset_url | stylesheet_tag }}\n</head>\n<body>\n  {{ content_for_layout }}\n</body>\n</html>`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'evensium-shopify-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to create ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-sans">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B365D] text-[#88D4B0] border border-[#88D4B0]/30 flex items-center justify-center shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-white text-lg sm:text-xl">
                  GÉNÉRATEUR DE THÈME SHOPIFY 2.0
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#88D4B0]/20 text-[#88D4B0] font-mono text-[10px] font-bold border border-[#88D4B0]/30">
                  Export ZIP Liquid
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Générez le code Liquid et téléchargez le fichier ZIP prêt à être importé dans votre compte Shopify Admin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="btn-evensium-mint py-2.5 px-4 text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isZipping ? (
                <span>Génération du ZIP...</span>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>ZIP Téléchargé !</span>
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4" />
                  <span>Télécharger le Thème ZIP</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'code' ? 'bg-[#1B365D] text-white border border-[#88D4B0]/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4 text-[#88D4B0]" />
              <span>Code Source Liquid & JSON</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'preview' ? 'bg-[#1B365D] text-white border border-[#88D4B0]/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 text-[#88D4B0]" />
              <span>Aperçu Rendu Shopify</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'guide' ? 'bg-[#1B365D] text-white border border-[#88D4B0]/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#88D4B0]" />
              <span>Guide d'Installation Shopify</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Nom du Thème: <strong className="text-white">evensium-shopify-theme.zip</strong></span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: LIQUID CODE & CUSTOMIZATION */}
          {activeTab === 'code' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              
              {/* Left Column: File Explorer & Customizer */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Branding Controls */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#88D4B0] uppercase font-bold">
                    <Settings className="w-4 h-4" />
                    <span>Personnalisation Visuelle</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Nom de la boutique :</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#88D4B0]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Navy :</label>
                      <input
                        type="color"
                        value={primaryNavy}
                        onChange={(e) => setPrimaryNavy(e.target.value)}
                        className="w-full h-8 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Mint :</label>
                      <input
                        type="color"
                        value={accentMint}
                        onChange={(e) => setAccentMint(e.target.value)}
                        className="w-full h-8 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Purple :</label>
                      <input
                        type="color"
                        value={accentPurple}
                        onChange={(e) => setAccentPurple(e.target.value)}
                        className="w-full h-8 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* File Tree Selector */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold block mb-2">
                    Fichiers du Thème OS 2.0 :
                  </span>

                  {Object.keys(liquidFiles).map((fileKey) => (
                    <button
                      key={fileKey}
                      onClick={() => setSelectedFile(fileKey)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between ${
                        selectedFile === fileKey
                          ? 'bg-[#1B365D] text-[#88D4B0] border border-[#88D4B0]/40 font-bold'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className="w-4 h-4 shrink-0 text-[#88D4B0]" />
                        <span className="truncate">{fileKey}</span>
                      </div>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {liquidFiles[fileKey].language}
                      </span>
                    </button>
                  ))}
                </div>

              </div>

              {/* Right Column: Code Editor View */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[520px]">
                
                {/* Code Header */}
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-white">{currentFileObj.label}</span>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">{currentFileObj.description}</p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Editor Screen */}
                <div className="flex-1 p-4 overflow-auto bg-[#070B12] font-mono text-xs text-slate-300 leading-relaxed">
                  <pre>{currentFileObj.content}</pre>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: LIVE STOREFRONT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="badge-bento badge-mint">Rendu Visuel Shopify 2.0</span>
                    <h3 className="font-serif font-bold text-xl text-white mt-1">{storeName}</h3>
                  </div>
                  <span className="text-xs font-mono text-[#88D4B0] border border-[#88D4B0]/30 bg-[#88D4B0]/10 px-3 py-1 rounded-full">
                    Aperçu Direct
                  </span>
                </div>

                {/* Mock Shopify Header */}
                <div className="bg-[#070B12] p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="font-serif font-black text-lg text-white tracking-wider">
                    {storeName}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-300 font-mono">
                    <span>Accueil</span>
                    <span>Salons 2026</span>
                    <span>Billetterie</span>
                    <span className="px-3 py-1.5 rounded-xl bg-[#1B365D] text-[#88D4B0] font-bold">Panier (0)</span>
                  </div>
                </div>

                {/* Mock Bento Hero */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#88D4B0]/20 text-[#88D4B0]">
                    Organisateur Officiel SAFEX
                  </span>
                  <h2 className="font-serif text-3xl font-black text-white">
                    Boutique Officielle & Billetterie EVENSIUM
                  </h2>
                  <p className="text-slate-300 text-sm max-w-xl mx-auto">
                    Réservez vos pass exposants, billets VIP CHOCORIUM & MILKTEC en direct avec paiement sécurisé.
                  </p>
                  <button className="btn-evensium-mint py-3 px-6 text-xs font-bold">
                    Réserver un Billet VIP (Paiement Direct)
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SHOPIFY INSTALLATION GUIDE */}
          {activeTab === 'guide' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-serif font-bold text-2xl text-white">
                  Comment installer le thème EVENSIUM dans votre boutique Shopify ?
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Suivez ces 3 étapes simples pour importer le fichier ZIP dans votre compte Shopify Admin sans aucune programmation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#88D4B0] text-slate-950 font-mono font-bold flex items-center justify-center text-sm">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">Télécharger le ZIP</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Cliquez sur le bouton <strong>"Télécharger le Thème ZIP"</strong> en haut à droite. Vous obtiendrez le fichier <code>evensium-shopify-theme.zip</code>.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#88D4B0] text-slate-950 font-mono font-bold flex items-center justify-center text-sm">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">Admin Shopify</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Rendez-vous dans votre admin Shopify &gt; <strong>Boutique en ligne</strong> &gt; <strong>Thèmes</strong>. Dans la section <em>Bibliothèque de thèmes</em>, cliquez sur <strong>Ajouter un thème</strong> &gt; <strong>Télécharger le fichier ZIP</strong>.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#88D4B0] text-slate-950 font-mono font-bold flex items-center justify-center text-sm">
                    3
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">Personnaliser</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Une fois l'importation terminée, cliquez sur <strong>Personnaliser</strong> pour modifier vos couleurs, logos et sections Bento Grid en temps réel avec l'éditeur visuel Shopify !
                  </p>
                </div>

              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleDownloadZip}
                  className="btn-evensium-mint py-3.5 px-8 text-xs font-bold flex items-center gap-2 shadow-xl"
                >
                  <Archive className="w-4 h-4" />
                  <span>Télécharger Maintenant evensium-shopify-theme.zip</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
