import { useEffect } from 'react';
import { gsap, ScrollTrigger, MQ } from './gsap';

/**
 * SNAP PAR SCÈNES — un seul système actif selon l'appareil
 * ---------------------------------------------------------
 * Le snap décide OÙ le scroll se pose ; les timelines (useScene) décident COMMENT l'image se déroule.
 *
 * Chaque scène est découpée en plans : 1 plan = 1 écran de scroll, et chaque frontière de plan est un
 * « beat » où le cadrage est final. Les beats sont calculés à partir du ScrollTrigger de la scène
 * (toujours à jour après resize / chargement des images).
 *
 * TACTILE (pointer: coarse) — CSS Scroll Snap natif : des repères invisibles (1 px) sont posés aux beats
 * avec `scroll-snap-align: start; scroll-snap-stop: always` et `html { scroll-snap-type: y mandatory }`.
 * C'est le téléphone qui arrête son inertie sur le plan suivant : un swipe = un plan, comme un feed vidéo.
 * Après la dernière scène (contact, pied de page), un repère plus haut que l'écran laisse défiler librement.
 *
 * SOURIS / TRACKPAD (pointer: fine) — calage en fin de geste, sans intercepter la molette : la cible est
 * le beat voisin dans le sens du geste, même si l'inertie du trackpad a emporté la page plus loin.
 */

type StopsGetter = () => number[];
const sources = new Map<object, StopsGetter>();
const listeners = new Set<() => void>();

export function registerSceneStops(key: object, getter: StopsGetter) {
  sources.set(key, getter);
  listeners.forEach((fn) => fn());
  return () => {
    sources.delete(key);
    listeners.forEach((fn) => fn());
  };
}

/** Positions de scroll des beats, triées, sans doublons (positions entières). */
export function sceneStops(): number[] {
  const all: number[] = [];
  sources.forEach((get) => all.push(...get()));
  all.sort((a, b) => a - b);
  const out: number[] = [];
  for (const y of all) {
    const r = Math.round(y);
    if (!out.length || r - out[out.length - 1] > 4) out.push(r);
  }
  // Le haut de page (bandeau au-dessus du hero) est le premier beat.
  if (out.length && out[0] < 120) out[0] = 0;
  return out;
}

if (typeof window !== 'undefined') {
  (window as unknown as { __sceneStops: () => number[] }).__sceneStops = sceneStops;
}

let programmaticAt = 0;
/** À appeler avant un window.scrollTo programmatique : le calage ira au beat le plus proche. */
export function markProgrammaticScroll() {
  programmaticAt = performance.now();
}

const SETTLE_MS = 140;
const MIN_MOVE = 6; // px : en dessous, on revient simplement au beat d'origine

const nearest = (list: number[], y: number) =>
  list.reduce((best, s) => (Math.abs(s - y) < Math.abs(best - y) ? s : best), list[0]);

/** Beat visé après un geste qui a mené de y0 à y1. */
export function pickTarget(list: number[], y0: number, y1: number, opts: { free: boolean }): number | null {
  if (list.length < 2) return null;
  const first = list[0];
  const last = list[list.length - 1];
  if (y1 < first - 2 || y1 > last + 2) return null; // hors du film : défilement normal
  const delta = y1 - y0;
  const inside = y0 >= first - 2 && y0 <= last + 2;
  if (opts.free || !inside) return nearest(list, y1);
  if (Math.abs(delta) < MIN_MOVE) return nearest(list, y1);
  // beat d'origine = le plus proche de y0 ; cible = son voisin dans le sens du geste
  const o = list.indexOf(nearest(list, y0));
  const atOrigin = Math.abs(list[o] - y0) <= 4;
  let idx: number;
  if (delta > 0) idx = atOrigin ? o + 1 : list.findIndex((s) => s > y0 + 4);
  else
    idx = atOrigin
      ? o - 1
      : (() => {
          for (let i = list.length - 1; i >= 0; i--) if (list[i] < y0 - 4) return i;
          return -1;
        })();
  if (idx < 0 || idx >= list.length) return nearest(list, y1);
  return list[idx];
}

/**
 * Doigt (écran tactile) → snap NATIF CSS : le téléphone arrête lui-même son inertie sur le repère suivant.
 * Souris / trackpad → calage en fin de geste (aucune interception de la molette), un geste = une étape.
 * Un seul des deux systèmes est actif à la fois.
 */
export function useSceneSnap(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    if (!window.matchMedia(MQ.motion).matches) return;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    return touch ? nativeSnap() : gestureSnap();
  }, [enabled]);
}

/** Snap natif CSS (écrans tactiles). */
function nativeSnap(): () => void {
  const html = document.documentElement;
  const rail = document.createElement('div');
  rail.className = 'snap-rail';
  rail.setAttribute('aria-hidden', 'true');
  document.body.appendChild(rail);

  let key = '';
  const sync = () => {
    const stops = sceneStops();
    const docH = html.scrollHeight;
    const next = stops.join(',') + '|' + docH;
    if (next === key) return;
    key = next;
    // Repères posés en coordonnées du document (le rail est en absolute dans <body> non positionné).
    const frag = document.createDocumentFragment();
    stops.forEach((y, i) => {
      const m = document.createElement('i');
      m.className = 'snap-mark';
      m.style.top = `${y}px`;
      // Dernier repère : zone libre jusqu'en bas de page (contact, footer).
      if (i === stops.length - 1) {
        m.classList.add('snap-mark--free');
        m.style.height = `${Math.max(1, docH - y)}px`;
      }
      frag.appendChild(m);
    });
    rail.replaceChildren(frag);
    const off = (window as unknown as { __SNAP_OFF__?: boolean }).__SNAP_OFF__;
    html.classList.toggle('scene-snap', stops.length > 1 && !off);
  };

  // Les positions dépendent des ScrollTriggers : on les recalcule après chaque refresh
  // (resize, chargement des images / polices, changement de breakpoint).
  // Pendant un refresh, ScrollTrigger mesure et restaure la position : le snap est suspendu,
  // puis réactivé avec les nouveaux repères (le navigateur se recale alors sur le plus proche).
  const suspend = () => {
    key = '';
    html.classList.remove('scene-snap');
  };
  ScrollTrigger.addEventListener('refreshInit', suspend);
  ScrollTrigger.addEventListener('refresh', sync);
  listeners.add(sync);
  const ro = new ResizeObserver(() => sync());
  ro.observe(document.body);
  sync();

  return () => {
    ScrollTrigger.removeEventListener('refreshInit', suspend);
    ScrollTrigger.removeEventListener('refresh', sync);
    listeners.delete(sync);
    ro.disconnect();
    rail.remove();
    html.classList.remove('scene-snap');
  };
}

/** Calage en fin de geste (souris, trackpad). */
function gestureSnap(): () => void {
  const proxy = { y: 0 };
  let tween: gsap.core.Tween | null = null;
  let timer = 0;
  let restY = window.scrollY;
  let gestureStartY: number | null = null;
  let touching = false;
  let snapping = false;
  let freeMode = false;
  let sawInput = false;

  const stop = () => {
    tween?.kill();
    tween = null;
    snapping = false;
  };

  const settle = () => {
    timer = 0;
    if (touching || snapping || (window as unknown as { __SNAP_OFF__?: boolean }).__SNAP_OFF__) return;
    const y1 = window.scrollY;
    const y0 = gestureStartY ?? restY;
    const now = performance.now();
    const list = document.documentElement.classList.contains('scroll-locked') ? [] : sceneStops();
    const vh = window.innerHeight;
    // « libre » : déplacement qui n'est pas un geste de scène (ancre, flèches, barre de défilement, Début/Fin)
    // Pas de molette / toucher / clavier pendant le mouvement (saut d'ancre, recherche, API) : beat le plus proche.
    const free = freeMode || !sawInput || now - programmaticAt < 2500;
    freeMode = false;
    sawInput = false;
    const target = pickTarget(list, y0, y1, { free });
    gestureStartY = null;
    restY = y1;
    if (target === null || Math.abs(target - y1) < 1.5) return;
    const dist = Math.abs(target - y1);
    proxy.y = y1;
    snapping = true;
    tween = gsap.to(proxy, {
      y: target,
      duration: Math.min(0.9, Math.max(0.35, 0.3 + (dist / vh) * 0.25)),
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () =>
        window.scrollTo({
          top: proxy.y,
          behavior: 'instant' as ScrollBehavior,
        }),
      onComplete: () => {
        window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
        snapping = false;
        tween = null;
        restY = target;
      },
    });
  };

  const arm = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(settle, SETTLE_MS);
  };

  const onScroll = () => {
    if (snapping) return;
    if (gestureStartY === null) {
      gestureStartY = restY;
    }
    if (!touching) arm();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Home' || e.key === 'End') freeMode = true;
    else sawInput = true;
    interrupt();
  };
  const onWheel = () => {
    sawInput = true;
    interrupt();
  };
  // Clic sur la barre de défilement (à droite du contenu) : on laisse l'utilisateur la tirer librement.
  const onMouseDown = (e: MouseEvent) => {
    if (e.clientX >= document.documentElement.clientWidth) {
      freeMode = true;
      interrupt();
    }
  };
  const interrupt = () => {
    if (snapping) {
      stop();
      restY = window.scrollY;
      gestureStartY = null;
      // Si l'input n'a finalement produit aucun scroll, on se repose quand même.
      if (!touching) arm();
    }
  };
  const onTouchStart = () => {
    touching = true;
    sawInput = true;
    window.clearTimeout(timer);
    interrupt();
  };
  const onTouchEnd = () => {
    touching = false;
    arm();
  };
  // Après un vrai redimensionnement (largeur ou hauteur > 100 px : pas la barre d'adresse mobile),
  // les beats ont bougé : on se repose proprement sur le plus proche.
  let lastW = window.innerWidth;
  let lastH = window.innerHeight;
  let resizeTimer = 0;
  const onResize = () => {
    const real = Math.abs(window.innerWidth - lastW) > 0 || Math.abs(window.innerHeight - lastH) > 100;
    stop();
    restY = window.scrollY;
    gestureStartY = null;
    if (!real) return;
    lastW = window.innerWidth;
    lastH = window.innerHeight;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      markProgrammaticScroll();
      settle();
    }, 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('keydown', onKey);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  window.addEventListener('resize', onResize);
  return () => {
    stop();
    window.clearTimeout(timer);
    window.clearTimeout(resizeTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchcancel', onTouchEnd);
    window.removeEventListener('resize', onResize);
  };
}
