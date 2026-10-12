import { OverlayProvider } from './context/OverlayContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppFab from './components/layout/WhatsAppFab.jsx';
import Hero from './components/sections/Hero.jsx';
import Tagline from './components/sections/Tagline.jsx';
import About from './components/sections/About.jsx';
import Services from './components/sections/Services.jsx';
import Editorial from './components/sections/Editorial.jsx';
import Events from './components/sections/Events.jsx';
import WhyChooseUs from './components/sections/WhyChooseUs.jsx';
import Process from './components/sections/Process.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Booking from './components/sections/Booking.jsx';
import Contact from './components/sections/Contact.jsx';
import FinalCta from './components/sections/FinalCta.jsx';

export default function App() {
  return (
    <OverlayProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Tagline />
        <About />
        <Services />
        <Editorial />
        <Events />
        <WhyChooseUs />
        <Process />
        <Gallery />
        <Booking />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
    </OverlayProvider>
  );
}
