# EVENSIUM — Site vitrine (Trade Shows & Exhibitions)

Site vitrine React + TypeScript + Vite + Tailwind pour EVENSIUM (agence événementielle Algérie) et ses salons CHOCORIUM, MILKTEC et CLINICA.

L'accueil est une **expérience cinématique pilotée par le scroll** (GSAP + ScrollTrigger + Lenis) : le scroll sert de timeline vidéo, chaque section a son propre langage d'animation. La chorégraphie complète est documentée dans [`docs/ANIMATION_TIMELINE.md`](docs/ANIMATION_TIMELINE.md).

## Lancer en local

**Prérequis :** Node.js 18+

1. Installer les dépendances : `npm install`
2. Lancer le serveur de dev : `npm run dev`

## Build de production

`npm run build` génère le dossier `dist/`, à déployer sur Vercel, Netlify ou tout hébergeur statique.

## Architecture

```
src/
  animations/           GSAP (plugins, media queries), Lenis, révélations génériques
  components/
    home/               Les 7 plans de l'accueil (HomeHero, AboutSection, SalonsScenes,
                        UpcomingEditions, ServicesGrid, WhyUs, ContactSection)
    motion/             Briques réutilisables : AnimatedText, StatValue (compteurs),
                        Magnetic, CustomCursor, ScrollProgress, PageTransition
    Navbar / MobileMenu / Footer / EvensiumLogo
  pages/                Pages (chargées à la demande, sauf l'accueil)
  assets/images/        Photos (.webp optimisées, .jpg d'origine conservées)
```

## Principes

- **Scrub partout** : les propriétés suivent la progression du scroll (avance, recule, s'arrête avec l'utilisateur).
- **Desktop / mobile** via `gsap.matchMedia()` : sections pinnées uniquement sur grand écran (≥1024 px de large et ≥640 px de haut) ; le mobile garde un scroll natif et des animations allégées.
- **`prefers-reduced-motion`** : aucune animation de scroll, pas de smooth scroll, contenu entièrement visible.
- Animations en `transform` / `opacity` / `clip-path` ; images en WebP (~85 % plus légères), pages et modales en code splitting.
