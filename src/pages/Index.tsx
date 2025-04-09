
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Events from '../components/sections/Events';
import Team from '../components/sections/Team';
import Partners from '../components/sections/Partners';
import Contact from '../components/sections/Contact';
import CTA from '../components/sections/CTA';
import DataVisualization from '../components/sections/DataVisualization';
import QuickLinks from '../components/navigation/QuickLinks';

const Index = () => {
  // Quick links for homepage
  const homeQuickLinks = [
    {
      label: "Upcoming Events",
      href: "#events",
      description: "See what's happening next"
    },
    {
      label: "Join Our Team",
      href: "#team",
      description: "Apply for open positions"
    },
    {
      label: "Resource Library",
      href: "/resources",
      description: "Access tutorials and guides"
    },
    {
      label: "Contact Us",
      href: "#contact",
      description: "Questions or partnership inquiries"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {homeQuickLinks.map((link, index) => (
                <QuickLinks 
                  key={index}
                  title=""
                  links={[link]}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>
        <DataVisualization />
        <Events />
        <Team />
        <Partners />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
