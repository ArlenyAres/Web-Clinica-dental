import { useState } from 'react';
import styles from './Footer.module.css';

/* ── Static data ── */
const SERVICES = [
  { label: 'Teeth Whitening',  href: '#services' },
  { label: 'Dental Implants',  href: '#services' },
  { label: 'Orthodontics',     href: '#services' },
  { label: 'Root Canal',       href: '#services' },
  { label: 'Preventive Care',  href: '#services' },
  { label: 'Porcelain Veneers',href: '#services' },
];

const QUICK_LINKS = [
  { label: 'About Us',         href: '#about'        },
  { label: 'Our Team',         href: '#team'         },
  { label: 'Patient Gallery',  href: '#gallery'      },
  { label: 'Testimonials',     href: '#testimonials' },
  { label: 'Book Appointment', href: '#contact'      },
];

const LEGAL = [
  { label: 'Privacy Policy',  href: '#' },
  { label: 'Terms of Service',href: '#' },
  { label: 'Accessibility',   href: '#' },
  { label: 'Sitemap',         href: '#' },
];

/* ── Social icons (inline SVG — no extra lib needed) ── */
const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

/* ── Component ── */
export default function Footer() {
  const [email,      setEmail]      = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailErr,   setEmailErr]   = useState('');

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr('Enter a valid email address');
      return;
    }
    setEmailErr('');
    setSubscribed(true);
  }

  return (
    <footer className={styles['footer']} aria-label="Site footer">
      {/* ── Main grid ── */}
      <div className={styles['footer__inner']}>

        {/* Col 1: Logo + tagline + social */}
        <div className={styles['footer__col']}>
          <a href="#home" className={styles['footer__logo']} aria-label="NEU Dental — scroll to top">
            <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false">
              <circle cx="20" cy="20" r="20" fill="var(--color-teal)" />
              <path d="M12 22C12 14 28 14 28 22C28 27 24 30 20 30C16 30 12 27 12 22Z" fill="white" />
              <path d="M16 22C16 19 18 17 20 17C22 17 24 19 24 22" fill="var(--color-teal)" />
            </svg>
            <span className={styles['footer__logo-text']}>NEU Dental</span>
          </a>
          <p className={styles['footer__tagline']}>
            Creating confident smiles through advanced care and compassionate expertise since 2009.
          </p>
          <div className={styles['footer__social']} role="list" aria-label="Social media links">
            {SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className={styles['footer__social-link']}
                aria-label={`Follow NEU Dental on ${label} (opens in new tab)`}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Services */}
        <div className={styles['footer__col']}>
          <h3 className={styles['footer__col-heading']}>Services</h3>
          <ul className={styles['footer__link-list']} role="list">
            {SERVICES.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles['footer__link']}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick links */}
        <div className={styles['footer__col']}>
          <h3 className={styles['footer__col-heading']}>Quick Links</h3>
          <ul className={styles['footer__link-list']} role="list">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles['footer__link']}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Newsletter + contact */}
        <div className={styles['footer__col']}>
          <h3 className={styles['footer__col-heading']}>Stay Updated</h3>
          <p className={styles['footer__newsletter-desc']}>
            Subscribe for oral-health tips and appointment reminders.
          </p>

          {subscribed ? (
            <p className={styles['footer__newsletter-success']} role="status">
              ✓ Thanks for subscribing!
            </p>
          ) : (
            <form
              className={styles['footer__newsletter-form']}
              onSubmit={handleSubscribe}
              noValidate
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailErr(''); }}
                placeholder="your@email.com"
                className={`${styles['footer__newsletter-input']} ${emailErr ? styles['footer__newsletter-input--error'] : ''}`}
                aria-label="Email address for newsletter"
                aria-describedby={emailErr ? 'footer-email-err' : undefined}
                aria-invalid={!!emailErr}
                autoComplete="email"
              />
              <button
                type="submit"
                className={styles['footer__newsletter-btn']}
                aria-label="Subscribe to newsletter"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}
          {emailErr && (
            <span id="footer-email-err" className={styles['footer__newsletter-error']} role="alert">{emailErr}</span>
          )}

          <address className={styles['footer__address']}>
            123 Dental Plaza, Suite 200<br />
            New York, NY 10001<br />
            <a href="tel:+15552345678"        className={styles['footer__contact-link']}>+1 (555) 234-5678</a><br />
            <a href="mailto:hello@neudental.com" className={styles['footer__contact-link']}>hello@neudental.com</a>
          </address>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className={styles['footer__bottom']}>
        <p className={styles['footer__copyright']}>
          © {new Date().getFullYear()} NEU Dental. All rights reserved.
        </p>
        <nav className={styles['footer__legal']} aria-label="Legal links">
          {LEGAL.map(({ label, href }) => (
            <a key={label} href={href} className={styles['footer__legal-link']}>{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
