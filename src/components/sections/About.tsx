
import { ArrowRight, Award, Users, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="section-padding relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          {/* Left Column - Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              About BDAA
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Award-Winning Student Organization at Ohio State
            </h2>
            
            <div className="data-line my-4"></div>
            
            <p className="text-gray-700">
              Founded in 2014, the Big Data & Analytics Association (BDAA) at Ohio State University has been dedicated to inspiring students to think analytically, empowering them through hands-on training, and connecting them to potential employers.
            </p>
            
            <p className="text-gray-700">
              We've been recognized with the Outstanding Overall Organization Award multiple times, highlighting our commitment to excellence and student development in the field of data analytics.
            </p>
            
            <div className="pt-4">
              <Button className="group text-white bg-secondary hover:bg-secondary/90">
                Our Mission
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          {/* Right Column - Stats & Info */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Excellence</h3>
                <p className="text-gray-600">Multiple-time winner of OSU's Outstanding Organization Award</p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Community</h3>
                <p className="text-gray-600">Vibrant network of data-passionate students and professionals</p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Events</h3>
                <p className="text-gray-600">Weekly workshops, speaker series, and case competitions</p>
              </div>
              
              {/* Card 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Learning</h3>
                <p className="text-gray-600">Hands-on training in the latest data analytics tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
