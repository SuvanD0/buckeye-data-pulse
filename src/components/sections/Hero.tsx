import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation for the data visualization canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create nodes
    const nodeCount = 40;
    const nodes: {x: number, y: number, radius: number, vx: number, vy: number, color: string}[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `rgba(234, 56, 76, ${Math.random() * 0.5 + 0.25})`
      });
    }
    
    // Animate nodes
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(234, 56, 76, 0.15)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Data Visualization Background */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary"></div>
      
      {/* Floating Data Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-float"></div>
        <div className="absolute top-[60%] right-[8%] w-24 h-24 bg-gradient-to-tr from-primary/30 to-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[30%] right-[25%] w-12 h-12 bg-gradient-to-bl from-primary/20 to-primary/5 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 bg-gradient-to-tr from-primary/25 to-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
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
            {/* Graph Image */}
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <img 
                src="/img/bdaa-mascot-growth.png"
                alt="BDAA Mascot Climbing Growth Chart"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
