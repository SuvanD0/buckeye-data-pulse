
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Minimal Data Visualization Background */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <div className="absolute inset-0 bg-data-grid bg-[size:30px_30px] opacity-70 z-0 animate-grid-flow"></div>
      
      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>
      
      {/* Dynamic Data Points */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-primary/10 animate-data-pulse"></div>
        <div className="absolute top-[60%] left-[80%] w-32 h-32 rounded-full bg-secondary/10 animate-data-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[75%] left-[25%] w-16 h-16 rounded-full bg-accent/10 animate-data-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-900 mb-4">
                Unleashing <span className="text-primary">Data</span> Analytics
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                The Big Data & Analytics Association at Ohio State connects students with the skills, resources, and opportunities they need to excel.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg rounded-md">
                Join BDAA
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-6 py-6 text-lg rounded-md">
                Upcoming Events
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-montserrat font-bold">500+</span>
                </div>
                <span className="ml-3 text-gray-700">Active Members</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-montserrat font-bold">50+</span>
                </div>
                <span className="ml-3 text-gray-700">Annual Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-montserrat font-bold">20+</span>
                </div>
                <span className="ml-3 text-gray-700">Industry Partners</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            {/* Data Visualization Element */}
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-white border-4 border-primary/20"></div>
              
              {/* Data Points */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const x = 50 + 46 * Math.cos(angle);
                  const y = 50 + 46 * Math.sin(angle);
                  return (
                    <div 
                      key={i} 
                      className="absolute w-2 h-2 bg-primary rounded-full transform -translate-x-1 -translate-y-1"
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`,
                        opacity: 0.7 + (i % 3) * 0.1,
                        animation: `data-pulse ${3 + i % 3}s infinite ease-in-out`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Data Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {[...Array(6)].map((_, i) => {
                  const startAngle = (i / 6) * Math.PI * 2;
                  const endAngle = ((i + 3) / 6) * Math.PI * 2;
                  const startX = 50 + 40 * Math.cos(startAngle);
                  const startY = 50 + 40 * Math.sin(startAngle);
                  const endX = 50 + 40 * Math.cos(endAngle);
                  const endY = 50 + 40 * Math.sin(endAngle);
                  return (
                    <line 
                      key={i} 
                      x1={startX} 
                      y1={startY} 
                      x2={endX} 
                      y2={endY} 
                      stroke="#ea384c" 
                      strokeWidth="0.5" 
                      opacity="0.3" 
                    />
                  );
                })}
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold font-montserrat text-primary">
                  BDAA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
