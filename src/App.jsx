import { OverlayProvider } from './OverlayContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Tagline from './components/Tagline.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Editorial from './components/Editorial.jsx';
import Events from './components/Events.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Process from './components/Process.jsx';
import Gallery from './components/Gallery.jsx';
import Booking from './components/Booking.jsx';
import Contact from './components/Contact.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';

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
