import chocoriumInauguration from './chocorium_inauguration_1784683039076.webp';
import chocoriumPalmaryStand from './chocorium_palmary_stand_1784683026361.webp';
import chocoriumMillottiCoffee from './chocorium_millotti_coffee_1784683052872.webp';
import chocoriumTartinellaTasting from './chocorium_tartinella_tasting_1784683064021.webp';
import chocoriumHeroBg from './chocorium_hero_bg_1784657317508.webp';
import chocorium2026Poster from './chocorium_official_poster_map_1785367458686.webp';
import clinicaHeroBg from './clinica_hero_bg_1784657344765.webp';
import evensiumHeroBg from './evensium_hero_bg_1784657302976.webp';
import milktecHeroBg from './milktec_hero_bg_1784657330588.webp';

// Import image assets for Vite bundling
export const IMAGES = {
  chocoriumInauguration,
  chocoriumPalmaryStand,
  chocoriumMillottiCoffee,
  chocoriumTartinellaTasting,
  chocoriumHeroBg,
  chocorium2026Poster,
  clinicaHeroBg,
  evensiumHeroBg,
  milktecHeroBg,
} as const;

export type ImageKey = keyof typeof IMAGES;

/**
 * Point de focus de chaque photo (sujet principal, 0 → 1), relevé sur l'image elle-même.
 * Sert d'object-position ET d'origine des mouvements de caméra : le sujet reste
 * dans la même zone visuelle quel que soit le format de l'écran.
 */
export const IMAGE_FOCUS: Record<ImageKey, { x: number; y: number }> = {
  evensiumHeroBg: { x: 0.5, y: 0.45 }, // point de fuite de l'allée
  clinicaHeroBg: { x: 0.5, y: 0.55 }, // hologramme central et visiteurs
  chocoriumHeroBg: { x: 0.52, y: 0.3 }, // sculpture de cabosse
  milktecHeroBg: { x: 0.5, y: 0.32 }, // gerbe de lait
  chocoriumInauguration: { x: 0.52, y: 0.45 }, // coupure du ruban
  chocoriumPalmaryStand: { x: 0.6, y: 0.45 }, // échange au comptoir
  chocoriumTartinellaTasting: { x: 0.5, y: 0.5 }, // dégustation
  chocoriumMillottiCoffee: { x: 0.55, y: 0.5 }, // baristas
  chocorium2026Poster: { x: 0.62, y: 0.55 }, // carte en chocolat
};

