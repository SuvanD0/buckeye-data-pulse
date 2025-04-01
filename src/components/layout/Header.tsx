
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed w-full top-0 left-0 z-50 transition-all duration-300", 
      scrolled ? "bg-white backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-montserrat font-bold text-xl text-primary">BDAA</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a>
            <a href="#events" className="text-gray-700 hover:text-primary transition-colors">Events</a>
            <a href="#team" className="text-gray-700 hover:text-primary transition-colors">Team</a>
            <a href="#partners" className="text-gray-700 hover:text-primary transition-colors">Partners</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
              Resources
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-md">
              Join BDAA
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-4">
          <a href="#about" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>About</a>
          <a href="#events" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Events</a>
          <a href="#team" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Team</a>
          <a href="#partners" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Partners</a>
          <a href="#contact" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Contact</a>
          
          <div className="mt-6 space-y-4">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-md">
              Resources
            </Button>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md">
              Join BDAA
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
