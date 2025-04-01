
import { Card, CardContent } from '@/components/ui/card';

const Partners = () => {
  // Sample partner logos (using placeholder logos)
  const partners = [
    { 
      id: 1, 
      name: "Microsoft", 
      logo: "https://via.placeholder.com/150x50?text=Microsoft" 
    },
    { 
      id: 2, 
      name: "IBM", 
      logo: "https://via.placeholder.com/150x50?text=IBM" 
    },
    { 
      id: 3, 
      name: "Deloitte", 
      logo: "https://via.placeholder.com/150x50?text=Deloitte" 
    },
    { 
      id: 4, 
      name: "Google", 
      logo: "https://via.placeholder.com/150x50?text=Google" 
    },
    { 
      id: 5, 
      name: "Amazon", 
      logo: "https://via.placeholder.com/150x50?text=Amazon" 
    },
    { 
      id: 6, 
      name: "Accenture", 
      logo: "https://via.placeholder.com/150x50?text=Accenture" 
    },
    { 
      id: 7, 
      name: "Tableau", 
      logo: "https://via.placeholder.com/150x50?text=Tableau" 
    },
    { 
      id: 8, 
      name: "Oracle", 
      logo: "https://via.placeholder.com/150x50?text=Oracle" 
    }
  ];

  return (
    <section id="partners" className="section-padding bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-data-dots opacity-10"></div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-medium text-sm mb-4">
            Industry Connections
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Partners
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            We collaborate with leading companies in the data and analytics industry to provide our members with valuable resources and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20 transition-colors">
              <CardContent className="p-6 flex items-center justify-center h-32">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-12 max-w-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/80">
            Interested in becoming a partner? <a href="#contact" className="text-secondary hover:underline">Contact us</a> to learn about our sponsorship opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
