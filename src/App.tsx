import Header               from './components/layout/Header';
import HeroSection          from './components/sections/HeroSection';
import ServicesSection      from './components/sections/ServicesSection';
import AboutSection         from './components/sections/AboutSection';
import TeamSection          from './components/sections/TeamSection';
import TestimonialsSection  from './components/sections/TestimonialsSection';
import GallerySection       from './components/sections/GallerySection';
import CTABanner            from './components/sections/CTABanner';
import { services }         from './data/services';
import { team }             from './data/team';
import { testimonials }     from './data/testimonials';
import { galleryItems }     from './data/gallery';

function App() {
  return (
    <>
      <Header transparent />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <AboutSection />
        <TeamSection members={team} />
        <TestimonialsSection testimonials={testimonials} />
        <GallerySection items={galleryItems} />
        <CTABanner />
      </main>
    </>
  )
}

export default App
