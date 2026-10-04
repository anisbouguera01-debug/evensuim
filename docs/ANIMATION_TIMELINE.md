# EVENSIUM — Accueil « publicité interactive »

Le scroll est la tête de lecture d'un film en 7 scènes plein écran (100svh, **mobile compris**).
`prefers-reduced-motion` : les plans s'empilent en sections lisibles.

## Système déterministe (`src/animations/useScene.ts`)

À une position de scroll donnée, chaque scène est **toujours** exactement dans le même état,
quel que soit le chemin (descente, remontée, saut, rechargement à mi-page, resize).

- **Sticky, pas de pin JS** : la section mesure (1 + L) écrans, son plateau est en `position: sticky`.
  Pas de pin-spacer ni de recalcul de pin.
- **Une timeline par scène**, en pause, pilotée par la progression normalisée de son ScrollTrigger
  (`onUpdate → tl.progress(p)`), sans lissage. Le temps de la timeline est exprimé **en écrans de
  scroll** : t = 1 ⇔ 1 hauteur d'écran. Avec entrée : t ∈ [0, 1] la scène monte, t ∈ [1, 1 + L] elle est fixe.
- **Uniquement des `fromTo` explicites**, `immediateRender: false`, `lazy: false`.
- **Une propriété = un propriétaire** : les plans d'une même propriété s'enchaînent sans se chevaucher.
  Des plans « fixes » sont insérés automatiquement avant, entre et après, pour que chaque propriété ait une
  valeur explicite à tout instant (aucune dépendance aux valeurs mémorisées par GSAP).
- **Refresh** (resize, polices) : la timeline est invalidée puis re-rendue à sa position exacte ;
  les valeurs dépendant du layout sont des fonctions recalculées.

## Caméra et images (`src/animations/camera.ts`, `CameraImage`)

    cadre (frame)        → positionnement, transitions (clip-path, translation du plan)
      caméra [data-cam]  → cadrage : scale + pan, origine sur le point de focus
        image            → object-fit: cover, object-position = focus, jamais animée

Chaque photo a un **point de focus** (`IMAGE_FOCUS` dans `src/assets/images/index.ts`). Un plan caméra
s'écrit `{ scale, panX, panY }` avec un pan normalisé ∈ [-1, 1], converti en % dans la plage qui garantit
que l'image couvre toujours son cadre : aucun pixel arbitraire, aucun bord découvert, quelle que soit la
taille d'écran.

**Logo** : composant `EvensiumLogo.tsx` d'origine, identique octet pour octet. Il est uniquement
déplacé / mis à l'échelle / tourné comme un bloc ; sa forme, ses couleurs et sa typo ne sont jamais touchées.

| # | Scène | Mouvement de caméra | Plans |
|---|---|---|---|
| 1 | Hero (3,4 écrans) | **Camera push** | Plan large → travelling avant vers la carte logo, formes de premier plan qui passent devant l'objectif → la caméra traverse le symbole (×12, rotation 90°) et une photo d'événement s'ouvre depuis son centre → « EVENSIUM » en lettres masquées, puis la caméra traverse le mot → manifeste mot par mot + CTA, la photo continue (scale + x + y) |
| 2 | Qui sommes-nous (1 + 3,2) | **Travelling latéral** | Panorama : titre géant → photo inauguration → accroche qui s'allume au passage → 2e photo → expertise → carte savoir-faire. Couches à vitesses différentes, photos qui panotent dans leur cadre |
| 3 | Nos salons (1 + 5,6) | **Takeover + zoom-through + whip pan** | Clinica en carte → s'ouvre plein écran (clip-path) → titre lettres masquées, chiffres qui défilent, image qui dérive → Clinica fonce vers la caméra et sort du cadre, Chocorium est derrière → Milktec entre en coup de fouet (skew) et chasse Chocorium |
| 4 | Prochaines éditions (1 + 6,9) | **Card takeover** | Une carte grandit jusqu'à l'écran → lecture → elle sort en pivotant pendant que la suivante arrive et prend l'écran (×3) → révélation verticale « Chocorium, Milktec & Clinica ». Les flèches sautent d'édition en édition |
| 5 | Services (1 + 7,2) | **Séquence pinnée / montage rapide** | « NOS SERVICES » traversé par la caméra → 6 plans : décor remplacé par wipe vertical, grand numéro à volets, icône en rotation 3/4, titre mot par mot, image qui zoome ; barre de progression |
| 6 | Pourquoi Evensium (1 + 5,6) | **Typographie cinétique** | Le titre se scinde (une ligne part, l'autre explose vers la caméra) → 3 mots géants traversent l'écran avec leur carte pilier → générique des chiffres réels qui comptent |
| 7 | CTA (1 + 2,6) | **Zoom transition** | Petite fenêtre-photo entre « Votre salon / commence ici » → la fenêtre devient l'écran, les lignes partent chacune de leur côté → invitation + bouton vers le formulaire |

Puis : formulaire de contact (rideau clip-path) et footer (le logo arrive en rotation, le wordmark s'écrit).

Global : header verre, menu mobile plein écran, transitions de page aux 4 couleurs du logo, curseur
(pointeur fin), barre de progression, Lenis sur desktop (tactile 100 % natif sur téléphone).
