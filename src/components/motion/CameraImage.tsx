import React from 'react';
import { IMAGES, IMAGE_FOCUS, ImageKey } from '../../assets/images';

interface CameraImageProps {
  image: ImageKey;
  alt?: string;
  /** Classes du wrapper caméra (par défaut il remplit son cadre). */
  className?: string;
  eager?: boolean;
}

/**
 * Wrapper caméra + image. Le wrapper ([data-cam]) est le SEUL élément animé pour le cadrage ;
 * l'image reste fixe en object-fit: cover, cadrée sur son point de focus.
 * Le cadre parent (overflow hidden) gère le positionnement et les transitions.
 */
export const CameraImage: React.FC<CameraImageProps> = ({ image, alt = '', className = 'absolute inset-0', eager }) => {
  const f = IMAGE_FOCUS[image];
  const pos = `${f.x * 100}% ${f.y * 100}%`;
  return (
    <div data-cam data-fx={f.x} data-fy={f.y} className={`${className}`} style={{ transformOrigin: pos }}>
      <img
        src={IMAGES[image]}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        className="block w-full h-full object-cover"
        style={{ objectPosition: pos }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </div>
  );
};
