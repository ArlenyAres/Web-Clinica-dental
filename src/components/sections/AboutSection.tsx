import type { FC } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import styles from './AboutSection.module.css';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80';

const VALUES = [
  'Patient-first approach in every treatment',
  'Cutting-edge digital imaging technology',
  'Certified specialists with 15+ years experience',
  'Gentle, pain-free procedures guaranteed',
  'Transparent pricing with flexible payment plans',
];

const AboutSection: FC = () => (
  <section id="about" className={styles['about-section']}>
    <div className={styles['about-section__inner']}>
      {/* ---- Image column ---- */}
      <div className={styles['about-section__media']}>
        <div className={styles['about-section__decor']} aria-hidden="true" />
        <div className={styles['about-section__image-wrap']}>
          <img
            src={ABOUT_IMAGE}
            alt="NEU Dental clinic interior"
            className={styles['about-section__image']}
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Floating years badge */}
        <div className={styles['about-section__years-badge']} aria-hidden="true">
          <span className={styles['about-section__years-number']}>15</span>
          <span className={styles['about-section__years-label']}>Years of<br />Excellence</span>
        </div>
      </div>

      {/* ---- Text column ---- */}
      <div className={styles['about-section__text']}>
        <SectionTitle
          eyebrow="About Us"
          heading="Dentistry Rooted in Trust & Innovation"
          sub="At NEU Dental we believe that every patient deserves a healthy, beautiful smile — delivered with care, precision and honesty."
        />

        <p className={styles['about-section__body']}>
          Founded in 2010, NEU Dental has grown from a single-chair practice into
          a multi-specialty clinic serving over 2,000 patients. Our team of board-
          certified specialists combines the latest technology with a warm, personal
          touch to make every visit comfortable.
        </p>

        {/* Values checklist */}
        <ul className={styles['about-section__checklist']} aria-label="Our values">
          {VALUES.map((value) => (
            <li key={value} className={styles['about-section__check-item']}>
              <span className={styles['about-section__check-icon']} aria-hidden="true">
                {/* Checkmark SVG */}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <polyline points="1.5,6 4.5,9 10.5,3" />
                </svg>
              </span>
              {value}
            </li>
          ))}
        </ul>

        {/* Stat highlight */}
        <div className={styles['about-section__stat']}>
          <span className={styles['about-section__stat-number']}>98%</span>
          <span className={styles['about-section__stat-label']}>
            Patient satisfaction rate<br />based on 1,200+ reviews
          </span>
        </div>

        <Button variant="primary" size="lg">
          Meet Our Team
        </Button>
      </div>
    </div>
  </section>
);

export default AboutSection;
