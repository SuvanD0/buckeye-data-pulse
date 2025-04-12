import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Events from '../components/sections/Events';
import Partners from '../components/sections/Partners';
import Contact from '../components/sections/Contact';
import CTA from '../components/sections/CTA';
// import DataVisualization from '../components/sections/DataVisualization'; // Comment out import

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        {/* <DataVisualization /> */ /* Comment out usage */}
        <Events />
        <Partners />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
