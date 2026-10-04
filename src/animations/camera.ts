/**
 * Caméra d'image — séparation stricte des rôles :
 *
 *   cadre   (frame)  : positionnement / transitions de scène (clip-path, translation du plan)
 *   caméra  ([data-cam]) : cadrage — scale + pan, origine sur le point de focus de l'image
 *   image   (img)    : object-fit: cover + object-position = point de focus. JAMAIS animée.
 *
 * Un plan caméra s'exprime en valeurs normalisées : `scale` (≥ 1) et `pan` ∈ [-1, 1].
 * Le pan est converti en xPercent / yPercent dans la plage qui garantit que l'image
 * couvre toujours son cadre, quelle que soit la taille de la fenêtre : aucun pixel arbitraire.
 */

export interface Focus {
  /** Position horizontale du sujet principal, 0 → 1. */
  x: number;
  /** Position verticale du sujet principal, 0 → 1. */
  y: number;
}

export interface Shot {
  /** Zoom de la caméra (≥ 1 pour ne jamais découvrir le bord). */
  scale: number;
  /** Pan horizontal normalisé : -1 = vers la gauche au maximum, 0 = centré sur le focus, 1 = droite. */
  panX?: number;
  /** Pan vertical normalisé. */
  panY?: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Translation (fraction de la taille du cadre) admissible pour un zoom `s` autour de l'origine `f`.
 * L'image mise à l'échelle couvre [f - f·s, f + (1 - f)·s] ; on cherche t tel que cela contienne [0, 1].
 */
function safeOffset(s: number, f: number, pan: number) {
  const lo = (1 - f) * (1 - s); // ≤ 0
  const hi = f * (s - 1); // ≥ 0
  const p = clamp(pan, -1, 1);
  return p < 0 ? -p * lo : p * hi;
}

/** Valeurs GSAP d'un plan, pour un point de focus donné. */
export function shotVars(shot: Shot, focus: Focus) {
  const s = Math.max(1, shot.scale);
  return {
    scale: s,
    xPercent: safeOffset(s, focus.x, shot.panX ?? 0) * 100,
    yPercent: safeOffset(s, focus.y, shot.panY ?? 0) * 100,
  };
}

/** Lit le focus déclaré sur un élément caméra (`data-fx`, `data-fy`). */
export function focusOf(cam: Element): Focus {
  const el = cam as HTMLElement;
  return { x: parseFloat(el.dataset.fx ?? '0.5'), y: parseFloat(el.dataset.fy ?? '0.5') };
}
