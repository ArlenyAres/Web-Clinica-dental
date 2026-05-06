import { useState, useEffect, useCallback, type FC } from 'react';
import SectionTitle from '../ui/SectionTitle';
import type { Testimonial } from '../../types';
import styles from './TestimonialsSection.module.css';

/* ---- Star rating ---- */
const StarRating: FC<{ rating: number }> = ({ rating }) => (
  <div className={styles['testimonials-section__stars']} aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={[
          styles['testimonials-section__star'],
          i >= rating ? styles['testimonials-section__star--empty'] : '',
        ].filter(Boolean).join(' ')}
        viewBox="0 0 24 24"
        fill={i < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

/* ---- TestimonialsSection ---- */
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent(c => (total > 0 ? (c + 1) % total : 0));
  }, [total]);
  const prev = useCallback(() => {
    setCurrent(c => (total > 0 ? (c - 1 + total) % total : 0));
  }, [total]);

  /* Auto-play — pauses on hover */
  useEffect(() => {
    if (isPaused || total === 0) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [isPaused, next, total]);

  return (
    <section
      id="testimonials"
      className={styles['testimonials-section']}
      aria-label="Patient testimonials"
    >
      <div className={styles['testimonials-section__inner']}>
        <SectionTitle
          eyebrow="What Patients Say"
          heading="Real Stories, Real Smiles"
          align="center"
        />

        <div
          className={styles['testimonials-section__slider']}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track */}
          <div className={styles['testimonials-section__track']}>
            <div
              className={styles['testimonials-section__slides']}
              style={{ transform: `translateX(-${current * 100}%)` }}
              aria-live="polite"
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={styles['testimonials-section__slide']}
                  aria-hidden={i !== current}
                  role="group"
                  aria-label={`Testimonial ${i + 1} of ${total}`}
                >
                  {t.authorPhotoUrl && (
                    <img
                      src={t.authorPhotoUrl}
                      alt={t.authorName}
                      className={styles['testimonials-section__author-photo']}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <StarRating rating={t.rating} />
                  <blockquote className={styles['testimonials-section__quote']}>
                    {t.quote}
                  </blockquote>
                  <div>
                    <p className={styles['testimonials-section__author-name']}>{t.authorName}</p>
                    {t.role && (
                      <p className={styles['testimonials-section__author-role']}>{t.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles['testimonials-section__controls']}>
          <button
            className={styles['testimonials-section__arrow']}
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>

          <ol className={styles['testimonials-section__dots']} aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <li key={t.id}>
                <button
                  className={[
                    styles['testimonials-section__dot'],
                    i === current ? 'is-active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>

          <button
            className={styles['testimonials-section__arrow']}
            onClick={next}
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
