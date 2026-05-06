import type { FC } from 'react';
import styles from './CTABanner.module.css';

interface CTABannerProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  outlineLabel?: string;
  onPrimary?: () => void;
  onOutline?: () => void;
}

const CTABanner: FC<CTABannerProps> = ({
  eyebrow    = 'Start Today',
  title      = 'Ready for a Smile You\'re Proud Of?',
  subtitle   = 'Book your free consultation and let our specialists craft a personalised treatment plan just for you.',
  primaryLabel = 'Book Free Consultation',
  outlineLabel = 'Call Us Now',
  onPrimary,
  onOutline,
}) => (
  <section
    id="contact"
    className={styles['cta-banner']}
    aria-label="Call to action — book appointment"
  >
    {/* Decorative circles */}
    <div className={styles['cta-banner__decor']} aria-hidden="true">
      <span className={`${styles['cta-banner__circle']} ${styles['cta-banner__circle--1']}`} />
      <span className={`${styles['cta-banner__circle']} ${styles['cta-banner__circle--2']}`} />
      <span className={`${styles['cta-banner__circle']} ${styles['cta-banner__circle--3']}`} />
    </div>

    <div className={styles['cta-banner__content']}>
      <span className={styles['cta-banner__eyebrow']}>{eyebrow}</span>
      <h2 className={styles['cta-banner__title']}>{title}</h2>
      <p className={styles['cta-banner__subtitle']}>{subtitle}</p>

      <div className={styles['cta-banner__actions']}>
        <button
          className={styles['cta-banner__btn-solid']}
          onClick={onPrimary}
          type="button"
        >
          {primaryLabel}
        </button>
        <button
          className={styles['cta-banner__btn-outline']}
          onClick={onOutline}
          type="button"
        >
          {outlineLabel}
        </button>
      </div>
    </div>
  </section>
);

export default CTABanner;
