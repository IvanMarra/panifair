import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EstruturaCenterminas from '@/components/EstruturaCenterminas'; // Novo componente para a estrutura
import PadariaModeloMosaico from '@/components/PadariaModeloMosaico'; // Novo componente para o mosaico da padaria
import Numbers from '@/components/Numbers';
import Opportunities from '@/components/Opportunities';
import Sponsors from '@/components/Sponsors';
import Location from '@/components/Location';
import Registration from '@/components/Registration';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <EstruturaCenterminas /> {/* Nova seção Centerminas Expo com parallax e vídeo */}
        <PadariaModeloMosaico /> {/* Nova seção Padaria Modelo em mosaico */}
        <Numbers />
        <Opportunities />
        <Sponsors />
        <Location />
        <Registration />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
};

export default Index;