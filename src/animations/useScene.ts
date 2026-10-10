import type { CSSProperties, RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP, MQ } from './gsap';
import { Shot, focusOf, shotVars } from './camera';
import { registerSceneStops } from './sceneSnap';

/**
 * SCÈNE DÉTERMINISTE
 * ------------------
 * - La section mesure (entrée + L) écrans ; son « plateau » (.scene-stage) est en position: sticky.
 *   Aucun pin JavaScript : pas de pin-spacer, pas de recalcul de pin, pas de saut.
 * - UNE timeline par scène, UN ScrollTrigger, `scrub: true` (aucun retard : à une position de scroll
 *   donnée correspond exactement un instant de la timeline).
 * - Le temps de la timeline est exprimé en hauteurs d'écran : t = 1 ⇔ on a scrollé 1 écran.
 *   Scène avec entrée : t ∈ [0, 1] = la scène monte dans l'écran, t ∈ [1, 1 + L] = scène fixe.
 * - Toutes les animations sont des fromTo explicites (aucune valeur « courante » relue) :
 *   rechargement à mi-page, resize, aller-retour donnent toujours le même rendu.
 * - Chaque propriété d'un élément n'a qu'un propriétaire à la fois (pas de tweens qui se chevauchent).
 */

export interface SceneLength {
  /** Durée de la partie fixe, en écrans, sur grand écran (≥ 1024px). */
  wide: number;
  /** Durée de la partie fixe, en écrans, sur téléphone / tablette. */
  narrow: number;
}

export interface SceneContext {
  stage: HTMLElement;
  q: (selector: string) => HTMLElement[];
  wide: boolean;
  tl: gsap.core.Timeline;
  /** Instant de timeline (écrans) → position de scroll exacte (px), toujours à jour après resize. */
  toScroll: (t: number) => number;
  /** Instant où la scène devient fixe (1 si la scène a une entrée, 0 sinon). */
  T0: number;
  /** Durée de la partie fixe (écrans). */
  L: number;
  /** Tween explicite (raccourci de tl.fromTo, durée par défaut 1). */
  ft: (targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => void;
  /** Coupe franche : rend visible (on = true) ou masque des éléments à l'instant `at`, réversible. */
  cut: (targets: gsap.TweenTarget, at: number, on?: boolean) => void;
  /** Mouvement de caméra borné autour du point de focus de l'image. */
  cam: (cams: Element | Element[], from: Shot, to: Shot, at: number, duration: number, ease?: string) => void;
  /** Déclare des « beats » : instants (écrans) où le cadrage est final. Le snap s'y pose. */
  beat: (...times: number[]) => void;
}

/**
 * Hauteur de la section = (1 + L) écrans dans tous les cas :
 * avec entrée, la distance « top bottom → bottom bottom » vaut 1 + L ;
 * sans entrée (hero), la distance « top top → bottom bottom » vaut L.
 */
export function sceneStyle(len: SceneLength): CSSProperties {
  return {
    ['--scene-w' as string]: 1 + len.wide,
    ['--scene-n' as string]: 1 + len.narrow,
  } as CSSProperties;
}

/** Un seul refresh global après le montage de toutes les scènes (les hauteurs viennent de changer). */
let refreshQueued = 0;
function requestRefresh() {
  if (refreshQueued) return;
  refreshQueued = requestAnimationFrame(() => {
    refreshQueued = 0;
    ScrollTrigger.refresh();
  });
}

export function useScene(
  scope: RefObject<HTMLElement | null>,
  len: SceneLength,
  build: (ctx: SceneContext) => void | (() => void),
  { entry = true }: { entry?: boolean } = {},
) {
  useGSAP(
    () => {
      const root = scope.current;
      const stage = root?.querySelector<HTMLElement>('.scene-stage');
      if (!root || !stage) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, wide: '(min-width: 1024px)' }, (mctx) => {
        if (!mctx.conditions?.motion) return;
        const wide = !!mctx.conditions?.wide;
        const L = wide ? len.wide : len.narrow;
        const T0 = entry ? 1 : 0;
        const total = T0 + L;

        // Timeline en pause, pilotée à la main par la progression normalisée du ScrollTrigger.
        // lazy: false — sinon, lors d'un grand saut, les tweens rendus pour la première fois écrivent
        // en différé (fin de frame) et dans le désordre.
        // immediateRender: false — aucun tween ne s'applique à sa création (sinon le dernier créé
        // écraserait l'état de départ des plans précédents sur la même propriété).
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: 'none', duration: 1, immediateRender: false, lazy: false },
        });
        // Beats (instants où le cadrage est final) : 0, fin d'entrée, ceux déclarés par la scène, fin.
        // Le ScrollTrigger est créé après `build`, quand on connaît le découpage.
        let st: ScrollTrigger | null = null;
        let B: number[] = [0, total];
        // Position de scroll d'un instant de timeline (inverse du découpage par plans).
        const toScroll: SceneContext['toScroll'] = (t) => {
          if (!st) return 0;
          const n = B.length - 1;
          let k = 0;
          while (k < n - 1 && t > B[k + 1]) k++;
          const span = B[k + 1] - B[k] || 1;
          const s = k + Math.min(1, Math.max(0, (t - B[k]) / span));
          return st.start + ((st.end - st.start) * s) / n;
        };

        const q = (sel: string): HTMLElement[] => Array.from<HTMLElement>(root.querySelectorAll<HTMLElement>(sel));

        // ---- Registre des plans : élément → propriété → segments [début, fin, de, à] ----
        type Val = unknown;
        type Seg = { start: number; end: number; from: Val; to: Val };
        const registry = new Map<Element, Map<string, Seg[]>>();
        const CONFIG = new Set(['stagger', 'duration', 'ease', 'delay', 'immediateRender', 'overwrite', 'onUpdate', 'onStart', 'onComplete']);

        const add = (t: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, at: number) => {
          tl.fromTo(t, from, to, at);
          const els = gsap.utils.toArray<Element>(t);
          const dur = typeof to.duration === 'number' ? to.duration : 1;
          const stagger = typeof to.stagger === 'number' ? to.stagger : 0;
          els.forEach((el, i) => {
            const start = at + i * stagger;
            let props = registry.get(el);
            if (!props) registry.set(el, (props = new Map()));
            Object.keys(from).forEach((k) => {
              if (CONFIG.has(k)) return;
              const list = props!.get(k) ?? [];
              list.push({ start, end: start + dur, from: from[k], to: to[k] });
              props!.set(k, list);
            });
          });
        };

        const ft: SceneContext['ft'] = (t, from, to, at) => add(t, from, to, at);
        const cut: SceneContext['cut'] = (t, at, on = true) =>
          add(t, { autoAlpha: on ? 0 : 1 }, { autoAlpha: on ? 1 : 0, duration: 0.001 }, at);
        const cam: SceneContext['cam'] = (cams, from, to, at, duration, ease = 'none') => {
          const list = Array.isArray(cams) ? cams : [cams];
          list.forEach((c) => {
            const f = focusOf(c);
            add(c, shotVars(from, f), { ...shotVars(to, f), duration, ease }, at);
          });
        };

        // ---- Beats de snap : instants de timeline → positions de scroll (via le ScrollTrigger) ----
        const beats: number[] = [];
        const beat: SceneContext['beat'] = (...times) => beats.push(...times);
        const cleanup = build({ stage, q, wide, tl, toScroll, T0, L, ft, cut, cam, beat });
        // ---- Plans fixes : chaque propriété est définie explicitement à TOUT instant [0, total] ----
        // (avant son premier plan, entre deux plans, après le dernier). Le rendu à une position
        // donnée ne dépend donc d'aucune valeur mémorisée ni du chemin pour y arriver.
        const EPS = 1e-4;
        const hold = (el: Element, k: string, v: Val, at: number, d: number) => {
          if (d > EPS) tl.fromTo(el, { [k]: v }, { [k]: v, duration: d, ease: 'none' }, at);
        };
        registry.forEach((props, el) => {
          props.forEach((segs, k) => {
            segs.sort((a, b) => a.start - b.start);
            let cursor = 0;
            let value = segs[0].from;
            segs.forEach((seg) => {
              if (seg.start < cursor - EPS && import.meta.env.DEV) {
                console.warn('[useScene] plans qui se chevauchent sur la même propriété :', k, el);
              }
              hold(el, k, value, cursor, seg.start - cursor);
              cursor = Math.max(cursor, seg.end);
              value = seg.to;
            });
            hold(el, k, value, cursor, total - cursor);
          });
        });

        // La timeline dure exactement `total` (en écrans de la version d'origine).
        if (tl.duration() > total + 1e-6 && import.meta.env.DEV) {
          console.warn(`[useScene] timeline (${tl.duration().toFixed(2)}) plus longue que la scène (${total})`);
        }
        tl.to({}, { duration: Math.max(0, total - tl.duration()) }, tl.duration());

        // ---- DÉCOUPAGE EN PLANS : 1 plan = 1 écran de scroll ----
        // Un beat trop proche du précédent ou de la fin n'a pas de sens ; début, fin d'entrée et fin
        // sont toujours présents. Chaque intervalle entre deux beats occupe exactement un écran de
        // scroll : le snap natif (un repère par écran) pose donc toujours la scène sur un cadrage final.
        // Beats trop rapprochés (< 0.35 écran de timeline) : on garde le dernier (cadrage le plus avancé).
        const cand = [...beats.filter((t) => t > T0 + 0.3 && total - t >= 0.5)].sort((a, b) => a - b);
        B = [0, T0];
        for (const t of cand) {
          if (t - B[B.length - 1] < 0.35) {
            if (B.length > 2) B[B.length - 1] = t;
          } else B.push(t);
        }
        B.push(total);
        B = Array.from(new Set(B));
        const n = B.length - 1;
        // Hauteur de la section = n écrans de scroll (+ 1 écran pour la scène sans entrée, le hero).
        const screens = String(n + (entry ? 0 : 1));
        root.style.setProperty('--scene-w', screens);
        root.style.setProperty('--scene-n', screens);

        // Progression du scroll (0→1) → instant de timeline, linéaire dans chaque plan.
        // Jamais exactement 0 : à t = 0 pile, GSAP restitue l'état « avant » ou « de départ » selon le
        // sens d'arrivée ; à 1e-6 c'est toujours l'état de départ, quel que soit le chemin.
        const timeAt = (p: number) => {
          const s = Math.min(1, Math.max(0, p)) * n;
          const k = Math.min(n - 1, Math.floor(s));
          return B[k] + (s - k) * (B[k + 1] - B[k]);
        };
        const apply = (p: number) => tl.time(Math.min(total, Math.max(1e-6, timeAt(p))));
        st = ScrollTrigger.create({
          trigger: root,
          start: entry ? 'top bottom' : 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => apply(self.progress),
          // Après resize / chargement des polices : les valeurs calculées (fonctions) sont
          // réévaluées puis la scène est re-rendue à sa position exacte.
          onRefresh: (self) => {
            tl.invalidate();
            apply(self.progress);
          },
        });
        const trigger = st;
        const unregister = registerSceneStops(root, () =>
          B.map((_, i) => trigger.start + ((trigger.end - trigger.start) * i) / n),
        );
        // Premier rendu explicite à la position courante.
        apply(st.progress);
        requestRefresh();

        return () => {
          // tl et st sont créés dans le contexte matchMedia : ils sont révertés (styles restaurés)
          // et supprimés automatiquement à la sortie du contexte (changement de breakpoint, démontage).
          unregister();
          root.style.removeProperty('--scene-w');
          root.style.removeProperty('--scene-n');
          if (typeof cleanup === 'function') cleanup();
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/** Nombre de ScrollTriggers actifs (contrôle anti-duplication, utilisé par les tests). */
if (typeof window !== 'undefined') {
  (window as unknown as { __scrollTriggerCount: () => number }).__scrollTriggerCount = () => ScrollTrigger.getAll().length;
}
