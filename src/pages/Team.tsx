import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { OfficerData } from '../data/officerData';
import OfficerCard from '../components/cards/OfficerCard';
import '../styles/flipCard.css'; // Make sure to import the CSS file

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <section className="section-padding relative pt-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
                Our Leadership
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The Big Data & Analytics Association is led by passionate students dedicated to creating valuable opportunities for our members.
              </p>
              <div className="w-24 h-1 bg-accent/30 mx-auto mt-6"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {OfficerData.map((officer) => (
                <OfficerCard
                  key={officer.name}
                  {...officer}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600">
                Interested in joining the leadership team? Elections are held at the end of each academic year.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;