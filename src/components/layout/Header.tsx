import { useState, useEffect, type FC } from 'react';
import Button from '../ui/Button';
import styles from './Header.module.css';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Team',     href: '#team'     },
  { label: 'Contact',  href: '#contact'  },
];

interface HeaderProps {
  transparent?: boolean;
}

const Header: FC<HeaderProps> = ({ transparent = false }) => {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');

  /* Sticky detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const headerClasses = [
    styles['nav-header'],
    transparent && !isScrolled ? styles['nav-header--transparent'] : styles['nav-header--solid'],
    isScrolled ? 'is-sticky' : '',
  ].filter(Boolean).join(' ');

  const hamburgerClasses = [
    styles['nav-header__hamburger'],
    isMenuOpen ? 'is-menu-open' : '',
  ].filter(Boolean).join(' ');

  const mobileMenuClasses = [
    styles['nav-header__mobile-menu'],
    isMenuOpen ? 'is-menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className={styles['nav-header__inner']}>
        {/* ---- Logo ---- */}
        <a href="#home" className={styles['nav-header__logo']} aria-label="NEU Dental — home">
          <LogoSVG />
          <span className={styles['nav-header__logo-text']}>NEU Dental</span>
        </a>

        {/* ---- Desktop nav ---- */}
        <nav className={styles['nav-header__nav']} aria-label="Main navigation">
          <ul className={styles['nav-header__nav-list']}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className={styles['nav-header__nav-item']}>
                <a
                  href={href}
                  className={[
                    styles['nav-header__nav-link'],
                    activeLink === href ? 'is-active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => setActiveLink(href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Desktop CTA ---- */}
        <div className={styles['nav-header__actions']}>
          <Button variant="primary" size="sm" onClick={() => setActiveLink('#contact')}>
            Book Appointment
          </Button>
        </div>

        {/* ---- Hamburger (mobile) ---- */}
        <button
          className={hamburgerClasses}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <span className={styles['nav-header__hamburger-line']} />
          <span className={styles['nav-header__hamburger-line']} />
          <span className={styles['nav-header__hamburger-line']} />
        </button>
      </div>

      {/* ---- Mobile drawer ---- */}
      <div
        id="mobile-menu"
        className={mobileMenuClasses}
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles['nav-header__mobile-nav-list']}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={[
                  styles['nav-header__mobile-nav-link'],
                  activeLink === href ? 'is-active' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => { setActiveLink(href); setIsMenuOpen(false); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles['nav-header__mobile-actions']}>
          <Button
            variant="primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { setActiveLink('#contact'); setIsMenuOpen(false); }}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/* Inline SVG logo: teal circle + simplified tooth path                */
/* ------------------------------------------------------------------ */
const LogoSVG: FC = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    {/* Background circle */}
    <circle cx="18" cy="18" r="18" fill="#4abfbf" />
    {/* Tooth shape (simplified) */}
    <path
      d="M18 7c-2 0-3.5.8-4.5 2-1 1.2-1.5 2.8-1.5 4.5 0 1.2.3 2.4.7 3.5.5 1.3.8 2.6.8 4 0 2 .6 4 1.5 5 .4.5.9.8 1.5.8s1.1-.3 1.5-.8c.9-1 1.5-3 1.5-5 0-1.4.3-2.7.8-4 .4-1.1.7-2.3.7-3.5 0-1.7-.5-3.3-1.5-4.5C21.5 7.8 20 7 18 7z"
      fill="white"
    />
  </svg>
);

export default Header;
