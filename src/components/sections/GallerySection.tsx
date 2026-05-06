import { useState, useReducer, useEffect, useCallback, type FC } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useIntersection } from '../../hooks/useIntersection';
import type { GalleryItem } from '../../types';
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from '../../data/gallery';
import styles from './GallerySection.module.css';

/* ============================================================
   Lightbox state — useReducer
   ============================================================ */
interface LightboxState {
  open: boolean;
  currentIndex: number;
}

type LightboxAction =
  | { type: 'OPEN'; index: number }
  | { type: 'CLOSE' }
  | { type: 'PREV'; total: number }
  | { type: 'NEXT'; total: number };

function lightboxReducer(state: LightboxState, action: LightboxAction): LightboxState {
  switch (action.type) {
    case 'OPEN':  return { open: true,  currentIndex: action.index };
    case 'CLOSE': return { open: false, currentIndex: state.currentIndex };
    case 'PREV':  return { ...state, currentIndex: (state.currentIndex - 1 + action.total) % action.total };
    case 'NEXT':  return { ...state, currentIndex: (state.currentIndex + 1) % action.total };
    default:      return state;
  }
}

/* ============================================================
   LazyImage — uses useIntersection for per-image lazy loading
   ============================================================ */
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [ref, isVisible] = useIntersection<HTMLImageElement>({ threshold: 0.05 });

  return (
    <img
      ref={ref}
      src={isVisible ? src : undefined}
      data-src={src}
      alt={alt}
      className={[
        className,
        isVisible
          ? styles['gallery-section__item-img--visible']
          : styles['gallery-section__item-img--hidden'],
      ].filter(Boolean).join(' ')}
      loading="lazy"
      decoding="async"
    />
  );
};

/* ============================================================
   GallerySection
   ============================================================ */
interface GallerySectionProps {
  items: GalleryItem[];
}

const GallerySection: FC<GallerySectionProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('All');
  const [lightbox, dispatch] = useReducer(lightboxReducer, { open: false, currentIndex: 0 });

  const filtered =
    activeFilter === 'All'
      ? items
      : items.filter(item => item.category === activeFilter);

  /* ESC key to close lightbox */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') dispatch({ type: 'CLOSE' });
      if (e.key === 'ArrowLeft')  dispatch({ type: 'PREV', total: filtered.length });
      if (e.key === 'ArrowRight') dispatch({ type: 'NEXT', total: filtered.length });
    },
    [lightbox.open, filtered.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* Lock scroll while lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightbox.open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox.open]);

  const activeLbItem = filtered[lightbox.currentIndex];

  return (
    <section id="gallery" className={styles['gallery-section']}>
      <div className={styles['gallery-section__inner']}>
        <SectionTitle
          eyebrow="Our Work"
          heading="Before & After Gallery"
          sub="See the real results our patients experience — from subtle enhancements to complete smile transformations."
          align="center"
        />

        {/* ---- Filters ---- */}
        <div
          className={styles['gallery-section__filters']}
          role="group"
          aria-label="Filter gallery by category"
        >
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={[
                styles['gallery-section__filter-btn'],
                activeFilter === cat ? styles['gallery-section__filter-btn--active'] : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ---- Masonry ---- */}
        <div className={styles['gallery-section__masonry']}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={styles['gallery-section__item']}
              onClick={() => dispatch({ type: 'OPEN', index: i })}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.altText}`}
              onKeyDown={e => { if (e.key === 'Enter') dispatch({ type: 'OPEN', index: i }); }}
            >
              <LazyImage
                src={item.imageUrl}
                alt={item.altText}
                className={styles['gallery-section__item-img']}
              />
              <div className={styles['gallery-section__item-overlay']} aria-hidden="true">
                {item.caption && (
                  <span className={styles['gallery-section__item-caption']}>{item.caption}</span>
                )}
              </div>
              <div className={styles['gallery-section__zoom-icon']} aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          Lightbox
      ============================================================ */}
      {lightbox.open && activeLbItem && (
        <div
          className={styles['lightbox']}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => dispatch({ type: 'CLOSE' })}
        >
          <div
            className={styles['lightbox__content']}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={activeLbItem.imageUrl}
              alt={activeLbItem.altText}
              className={styles['lightbox__img']}
            />
            {activeLbItem.caption && (
              <p className={styles['lightbox__caption']}>{activeLbItem.caption}</p>
            )}
            <span className={styles['lightbox__counter']}>
              {lightbox.currentIndex + 1} / {filtered.length}
            </span>
          </div>

          {/* Close */}
          <button
            className={styles['lightbox__close']}
            onClick={() => dispatch({ type: 'CLOSE' })}
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className={`${styles['lightbox__arrow']} ${styles['lightbox__arrow--prev']}`}
            onClick={e => { e.stopPropagation(); dispatch({ type: 'PREV', total: filtered.length }); }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>

          {/* Next */}
          <button
            className={`${styles['lightbox__arrow']} ${styles['lightbox__arrow--next']}`}
            onClick={e => { e.stopPropagation(); dispatch({ type: 'NEXT', total: filtered.length }); }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
