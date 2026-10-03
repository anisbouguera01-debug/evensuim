# EVENSIUM — Timeline cinématique (scroll = vidéo)

Stack : React 19 · TypeScript · Vite 6 · Tailwind 4 · **GSAP 3.15 + ScrollTrigger + SplitText** · **Lenis** (smooth scroll).
Toutes les animations de scroll sont **scrubbed** (liées en continu à la progression) et déclarées dans
`gsap.matchMedia()` : `desktop` (≥1024px et hauteur ≥640px), `mobile` (le reste) et `reduce`
(`prefers-reduced-motion: reduce` → aucune animation, contenu statique et visible).

Légende : `p` = progression de la timeline de la scène (0 → 1). `scrub: 1` = lissage de 1 s.

---

## 0 · Intro au chargement (non scrubbed, ~1,6 s)
| Élément | Initial | Final | Easing |
|---|---|---|---|
| Formes de fond (bleu, menthe, violet) | hors-champ, rotation ±20° | position d'origine | expo.out |
| Carte logo | y 80, scale .92, clip inset bas | posée | expo.out |
| 4 pilules du X | écartées en diagonale ×40 | assemblées → le logo se construit | expo.out, stagger .08 |
| Wordmark « evensium » | lettres yPercent 110 (masque) | 0 | expo.out, stagger .03 |
| Paragraphe / CTA / métriques | y 30, blur 8px | net | power3.out |

## 1 · HERO — « la caméra traverse le X » (desktop : pin, 0 → +160 %)
| p | Événement | Propriétés |
|---|---|---|
| 0 → .30 | La colonne texte s'efface vers le haut | y −120, opacity 0, blur 10px, stagger |
| 0 → .55 | Les formes s'écartent (profondeur) | bleu x−30vw y−25vh rot+18 · menthe x−45vw · violet y+45vh rot−14 · halo scale 1.6 |
| .05 → .45 | La carte glisse au centre et s'approche | x/y → centre écran, scale 1.12 |
| .05 → .25 | Badge flottant + légende quittent la scène | x+80 y+60 opacity 0 |
| .35 → .55 | Le panneau blanc de la carte se dissout | opacity 0 |
| .40 → .90 | **Le X grossit ×9, ses 4 pilules s'écartent** : on passe à travers | scale 1 → 9 ; pilules ±(140,140) le long des diagonales |
| .58 → .92 | Phrase-manifeste au centre, mot par mot | opacity .1 → 1, y 24 → 0, blur 6 → 0 |
| .92 → 1 | Sortie | phrase y −40 |
Mobile : pas de pin ; parallax des formes, effacement doux du texte, pilules légèrement écartées.

## 2 · QUI SOMMES-NOUS — texte + image en parallaxe
| Élément | Animation (scrub, top 85 % → top 40 %) |
|---|---|
| Label `PRÉSENTATION • 01` | lettres x −12 → 0, opacity |
| Titre H2 | mots en masque yPercent 110 → 0, rotate 4 → 0 |
| Barre bleue | scaleX 0 → 1 (origine gauche) |
| Phrase d'accroche | **lecture surlignée** : mots opacity .15 → 1 |
| Paragraphe | lignes y 30 → 0 |
| Carte visuel | clip-path inset(100% 0 0 0) → inset(0) ; logo scale 1.3 → 1, rot −8 → 0 |
| Géométries flottantes | parallax à 3 vitesses (yPercent −120 / +80), rotation +90° |

## 3 · NOS SALONS — section pinnée, changement de scène (desktop : pin, 3 scènes)
| p | Scène |
|---|---|
| avant pin | Scène 1 (Clinica) : wipe clip-path de l'image + dolly-out (scale 1.35 → 1) |
| 0 → .33 | Clinica active ; compteurs (+80, +12 000) ; mot géant « CLINICA » en fond, x 15 % → −15 % |
| .33 → .66 | Transition : texte sortant y −40 ; image sortante scale .9 ; **wipe latéral** de Chocorium + dolly-out ; titre lettres en masque ; compteurs |
| .66 → 1 | Transition vers Milktec (même grammaire, côté opposé) |
Indicateur `01 / 03` avec trait de progression vertical. Mobile : scènes empilées, chaque image révélée en clip-path.

## 4 · PROCHAINES ÉDITIONS — mouvement horizontal (desktop : pin, translation X)
| Élément | Animation |
|---|---|
| Piste | x 0 → −(largeur piste − viewport), scrub |
| Cartes | entrée depuis la droite scale .9 → 1, rotateY −10 → 0 (containerAnimation) |
| Images des cartes | pan interne xPercent −8 → 8 |
| Boutons ← → | desktop : avancent le scroll d'une carte ; mobile : défilement natif (inchangé) |
Hover : zoom image, voile, flèche « Découvrir » qui monte, titre qui glisse.

## 5 · NOS SERVICES — cartes staggered en perspective
Titre : lettres blur 12px → 0. Cartes : y 140 → 0, rotateX −24 → 0, opacity, décalage par colonne
(chaque colonne démarre 4 % plus tard). Hover : élévation, balayage lumineux, icône qui pivote, flèche.

## 6 · POURQUOI EVENSIUM — convergence 3D
Mots du titre arrivent en x alterné (±80). Piliers : gauche rotateY 35°/x −120, centre z −300/y 80,
droite rotateY −35°/x +120 → convergent à plat. Icônes : pop scale .4 → 1.

## 7 · CONTACT — reveal cinématique
La section s'ouvre comme un rideau : clip-path inset(6% 4% round 48px) → inset(0 round 0).
Titre lettres en masque ; cartes contact glissent depuis la gauche ; formulaire monte (rotateX 8 → 0).
Champs : focus animé, bordures de validation (`:user-invalid` / `:user-valid`), état loading conservé.

## 8 · FOOTER — conclusion lente
Blocs montent lentement (y 80 → 0). Le **X se réassemble** (pilules de l'extérieur vers le centre,
miroir du hero) et le grand wordmark « evensium » s'écrit lettre par lettre.

## Global
- **Header** : transparent au-dessus du hero, puis verre dépoli + blur, hauteur réduite, logo .92 ; colle sous le bandeau puis en haut.
- **Menu mobile** : overlay plein écran en clip-path circulaire depuis le bouton, liens staggered, burger → croix animé, Échap/clic extérieur, scroll bloqué.
- **Transition de page** : 4 volets aux couleurs du logo (violet, menthe, bleu, nuit).
- **Barre de progression** : dégradé des 4 couleurs du logo.
- **Curseur** (pointeur fin uniquement) : point + anneau ; liens → anneau agrandi ; images → « Voir ».
- **Boutons magnétiques** sur les CTA principaux (pointeur fin uniquement).
- **Autres pages** : titres h1/h2 en montée floutée scrubbed, images en dolly-out à l'intérieur de leur cadre.
