import { Suspense, lazy } from 'react';
import Header       from './components/layout/Header';
import HeroSection  from './components/sections/HeroSection';
import RevealSection from './components/ui/RevealSection';
import BackToTop    from './components/ui/BackToTop';
import { services }    from './data/services';
import { team }        from './data/team';
import { testimonials }from './data/testimonials';
import { galleryItems }from './data/gallery';

/* ── Code-split everything below the fold ── */
const ServicesSection     = lazy(() => import('./components/sections/ServicesSection'));
const AboutSection        = lazy(() => import('./components/sections/AboutSection'));
const TeamSection         = lazy(() => import('./components/sections/TeamSection'));
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection'));
const GallerySection      = lazy(() => import('./components/sections/GallerySection'));
const CTABanner           = lazy(() => import('./components/sections/CTABanner'));
const ContactSection      = lazy(() => import('./components/sections/ContactSection'));
const Footer              = lazy(() => import('./components/layout/Footer'));

/* Minimal loading indicator shared by all Suspense boundaries */
function SectionFallback() {
  return (
    <div className="section-fallback" aria-hidden="true">
      <div className="section-fallback__spinner" />
    </div>
  );
}

function App() {
  return (
    <>
      {/* Accessibility: skip to main content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Header transparent />

      <main id="main-content">
        {/* Hero loads eagerly (above the fold) */}
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><ServicesSection services={services} /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><AboutSection /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><TeamSection members={team} /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><TestimonialsSection testimonials={testimonials} /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><GallerySection items={galleryItems} /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><CTABanner /></RevealSection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RevealSection><ContactSection /></RevealSection>
        </Suspense>
      </main>

      {/* Footer loads lazily with no visible fallback */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating back-to-top button — visible after 300 px scroll */}
      <BackToTop />
    </>
  );
}

export default App;
