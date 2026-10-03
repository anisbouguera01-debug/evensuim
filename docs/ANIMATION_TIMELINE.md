# EVENSIUM — Accueil « publicité interactive »

Le scroll est la tête de lecture d'un film en 7 scènes plein écran (100svh, pinnées, **mobile compris**).
Chaque scène a une timeline GSAP maîtresse (`useScene`) en `scrub` : on avance, on recule, on s'arrête
avec le doigt. Chaque scène a aussi une timeline d'**entrée** (pendant qu'elle monte dans l'écran) pour
qu'aucun plan n'arrive vide. `prefers-reduced-motion` : les plans s'empilent en sections lisibles.

**Logo** : composant `EvensiumLogo.tsx` d'origine, identique octet pour octet. Il est uniquement
déplacé / mis à l'échelle / tourné comme un bloc ; sa forme, ses couleurs et sa typo ne sont jamais touchées.

| # | Scène | Mouvement de caméra | Plans |
|---|---|---|---|
| 1 | Hero (≈320 %) | **Camera push** | Plan large → travelling avant vers la carte logo, formes de premier plan qui passent devant l'objectif → la caméra traverse le symbole (×26, rotation 90°) et une photo d'événement s'ouvre depuis son centre → « EVENSIUM » en lettres masquées, puis la caméra traverse le mot → manifeste mot par mot + CTA, la photo continue (scale + x + y) |
| 2 | Qui sommes-nous (≈340 %) | **Travelling latéral** | Panorama : titre géant → photo inauguration → accroche qui s'allume au passage → 2e photo → expertise → carte savoir-faire. Couches à vitesses différentes, photos qui panotent dans leur cadre |
| 3 | Nos salons (≈520 %) | **Takeover + zoom-through + whip pan** | Clinica en carte → s'ouvre plein écran (clip-path) → titre lettres masquées, chiffres qui défilent, image qui dérive → Clinica fonce vers la caméra et sort du cadre, Chocorium est derrière → Milktec entre en coup de fouet (skew) et chasse Chocorium |
| 4 | Prochaines éditions (≈480 %) | **Card takeover** | Une carte grandit jusqu'à l'écran → lecture → elle sort en pivotant pendant que la suivante arrive et prend l'écran (×3) → révélation verticale « Chocorium, Milktec & Clinica ». Les flèches sautent d'édition en édition |
| 5 | Services (≈560 %) | **Séquence pinnée / montage rapide** | « NOS SERVICES » traversé par la caméra → 6 plans : décor remplacé par wipe vertical, grand numéro à volets, icône en rotation 3/4, titre mot par mot, image qui zoome ; barre de progression |
| 6 | Pourquoi Evensium (≈420 %) | **Typographie cinétique** | Le titre se scinde (une ligne part, l'autre explose vers la caméra) → 3 mots géants traversent l'écran avec leur carte pilier → générique des chiffres réels qui comptent |
| 7 | CTA (≈240 %) | **Zoom transition** | Petite fenêtre-photo entre « Votre salon / commence ici » → la fenêtre devient l'écran, les lignes partent chacune de leur côté → invitation + bouton vers le formulaire |

Puis : formulaire de contact (rideau clip-path) et footer (le logo arrive en rotation, le wordmark s'écrit).

Global : header verre, menu mobile plein écran, transitions de page aux 4 couleurs du logo, curseur
(pointeur fin), barre de progression, Lenis sur desktop (tactile 100 % natif sur téléphone).
