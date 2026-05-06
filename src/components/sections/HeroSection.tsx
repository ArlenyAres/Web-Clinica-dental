import { useEffect, useRef, type FC } from 'react';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';

interface Stat {
  number: string;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { number: '2000', suffix: '+', label: 'Happy Patients' },
  { number: '15',   suffix: ' Yrs', label: 'Experience'     },
  { number: '98',   suffix: '%',    label: 'Satisfaction'   },
];

/* Unsplash dental clinic placeholder (direct CDN, no API key needed) */
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80';

const HeroSection: FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  /* Subtle parallax: move bg image at 30% scroll speed */
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY * 0.3;
      imgRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      className={styles['hero-section']}
      aria-label="Hero — NEU Dental"
    >
      {/* ---- Background image ---- */}
      <div className={styles['hero-section__background']}>
        <img
          ref={imgRef}
          src={HERO_IMAGE_URL}
          alt="Modern dental clinic interior"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ---- Gradient overlay ---- */}
      <div className={styles['hero-section__overlay']} aria-hidden="true" />

      {/* ---- Decorative concentric circles ---- */}
      <div className={styles['hero-section__decor-circle']} aria-hidden="true" />

      {/* ---- Main content ---- */}
      <div className={styles['hero-section__content']}>
        {/* Eyebrow */}
        <span className={styles['hero-section__eyebrow']}>
          Welcome to NEU Dental
        </span>

        {/* H1 */}
        <h1 className={styles['hero-section__title']}>
          Your Smile Deserves{' '}
          <span className={styles['hero-section__title-accent']}>
            Expert Care
          </span>
        </h1>

        {/* Subtitle */}
        <p className={styles['hero-section__subtitle']}>
          State-of-the-art dental treatments delivered with compassion.
          From routine checkups to complete smile transformations — we are
          here for every step of your journey.
        </p>

        {/* CTA row */}
        <div className={styles['hero-section__actions']}>
          <Button variant="primary" size="lg">
            Book Appointment
          </Button>
          <Button variant="outline" size="lg">
            Explore Services
          </Button>
        </div>

        {/* Stats */}
        <div className={styles['hero-section__stats']}>
          {STATS.map(({ number, suffix, label }) => (
            <div key={label} className={styles['hero-section__stat-item']}>
              <span className={styles['hero-section__stat-number']}>
                {number}
                <span>{suffix}</span>
              </span>
              <span className={styles['hero-section__stat-label']}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <div className={styles['hero-section__scroll-cue']} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles['hero-section__scroll-line']} />
      </div>
    </section>
  );
};

export default HeroSection;
