import { useState, type FC } from 'react';
import SectionTitle from '../ui/SectionTitle';
import type { Service } from '../../types';
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from '../../data/services';
import styles from './ServicesSection.module.css';

/* ---- Service icons (inline SVG paths keyed by icon name) ---- */
const SERVICE_ICONS: Record<string, JSX.Element> = {
  whitening: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.2 4.7 3 6.1V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.9A7 7 0 0 0 12 2z" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  implants: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="6" r="4" />
      <path d="M12 10v12" />
      <path d="M8 18h8" />
      <path d="M9 14h6" />
    </svg>
  ),
  orthodontics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <line x1="7" y1="8" x2="7" y2="16" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="17" y1="8" x2="17" y2="16" />
    </svg>
  ),
  'root-canal': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3C9 3 7 5 7 8c0 2 .8 3.8 2 5l1 7h4l1-7c1.2-1.2 2-3 2-5 0-3-2-5-5-5z" />
    </svg>
  ),
  preventive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 12 2a8 8 0 0 0-8 8.2C4 17.5 12 22 12 22z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  veneers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M8 6v12" />
      <path d="M16 6v12" />
      <path d="M4 12h16" />
    </svg>
  ),
};

/* ---- ServiceCard ---- */
interface ServiceCardProps {
  service: Service;
  style?: React.CSSProperties;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, style }) => (
  <article className={styles['service-card']} style={style}>
    <span className={styles['service-card__category']}>{service.category}</span>
    <div className={styles['service-card__icon-wrap']}>
      {SERVICE_ICONS[service.icon] ?? SERVICE_ICONS['preventive']}
    </div>
    <h3 className={styles['service-card__title']}>{service.title}</h3>
    <p className={styles['service-card__description']}>{service.description}</p>
    <a href={`#${service.slug}`} className={styles['service-card__link']}>
      Learn more
      <span className={styles['service-card__link-arrow']} aria-hidden="true">→</span>
    </a>
  </article>
);

/* ---- ServicesSection ---- */
interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: FC<ServicesSectionProps> = ({ services }) => {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>('All');

  const filtered =
    activeFilter === 'All'
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className={styles['services-section']}>
      <div className={styles['services-section__inner']}>
        <SectionTitle
          eyebrow="What We Offer"
          heading="Our Services"
          sub="Comprehensive dental care tailored to every patient — from preventive cleanings to full smile transformations."
          align="center"
        />

        {/* ---- Filter tabs ---- */}
        <div
          className={styles['services-section__filters']}
          role="group"
          aria-label="Filter services by category"
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={[
                styles['services-section__filter-btn'],
                activeFilter === cat
                  ? styles['services-section__filter-btn--active']
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ---- Grid ---- */}
        <div className={styles['services-section__grid']}>
          {filtered.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
