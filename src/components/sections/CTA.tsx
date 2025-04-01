
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Minimal Data Visualization Background */}
      <div className="absolute inset-0 bg-data-grid bg-[size:20px_20px] opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Data Analytics Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join BDAA today and gain access to workshops, networking opportunities, and resources to help you succeed in the world of data analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-primary hover:bg-white/90 px-6 py-6 text-lg rounded-md">
              Become a Member
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 text-lg rounded-md">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
