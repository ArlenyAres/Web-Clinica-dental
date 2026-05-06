import Header          from './components/layout/Header';
import HeroSection     from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection    from './components/sections/AboutSection';
import TeamSection     from './components/sections/TeamSection';
import { services }   from './data/services';
import { team }       from './data/team';

function App() {
  return (
    <>
      <Header transparent />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <AboutSection />
        <TeamSection members={team} />
      </main>
    </>
  )
}

export default App
