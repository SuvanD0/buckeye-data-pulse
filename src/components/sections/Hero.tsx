
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements - Data Visualization Inspired */}
      <div className="absolute inset-0 bg-hero-pattern opacity-70 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Animated Data Points */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <div className="absolute top-[20%] left-[30%] w-3 h-3 rounded-full bg-secondary animate-float"></div>
        <div className="absolute top-[15%] left-[70%] w-2 h-2 rounded-full bg-accent animate-pulse-light"></div>
        <div className="absolute top-[40%] left-[85%] w-3 h-3 rounded-full bg-primary animate-float"></div>
        <div className="absolute top-[60%] left-[20%] w-2 h-2 rounded-full bg-secondary animate-pulse-light"></div>
        <div className="absolute top-[75%] left-[40%] w-3 h-3 rounded-full bg-accent animate-float"></div>
        <div className="absolute top-[80%] left-[80%] w-2 h-2 rounded-full bg-primary animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary mb-4">
                Unleashing the Power of <span className="text-secondary">Data Analytics</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">
                The Big Data & Analytics Association at Ohio State connects students with the skills, resources, and opportunities they need to excel in the data-driven world.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg">
                Join BDAA
              </Button>
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-6 text-lg">
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
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="font-montserrat font-bold">50+</span>
                </div>
                <span className="ml-3 text-gray-700">Annual Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <span className="font-montserrat font-bold">20+</span>
                </div>
                <span className="ml-3 text-gray-700">Industry Partners</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 opacity-60">
              <div className="bg-primary/5 rounded-lg"></div>
              <div className="bg-secondary/5 rounded-lg"></div>
              <div className="bg-accent/5 rounded-lg"></div>
              <div className="bg-secondary/5 rounded-lg"></div>
              <div className="bg-accent/5 rounded-lg"></div>
              <div className="bg-primary/5 rounded-lg"></div>
              <div className="bg-accent/5 rounded-lg"></div>
              <div className="bg-primary/5 rounded-lg"></div>
              <div className="bg-secondary/5 rounded-lg"></div>
            </div>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-data-gradient opacity-10 animate-pulse"></div>
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/20 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold font-montserrat text-primary">
                  BDAA
                </div>
              </div>
              <div className="absolute top-1/4 right-0 w-16 h-16 bg-secondary/20 rounded-full backdrop-blur-sm animate-float"></div>
              <div className="absolute bottom-1/4 left-0 w-20 h-20 bg-accent/20 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
