
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const isResourcesPage = location.pathname === '/resources';

  return (
    <header className={cn(
      "fixed w-full top-0 left-0 z-50 transition-all duration-300", 
      scrolled || !isHomePage || isOpen ? "bg-white backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-montserrat font-bold text-xl text-primary">BDAA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isHomePage ? (
              <>
                <a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a>
                <a href="#events" className="text-gray-700 hover:text-primary transition-colors">Events</a>
                <a href="#team" className="text-gray-700 hover:text-primary transition-colors">Team</a>
                <a href="#partners" className="text-gray-700 hover:text-primary transition-colors">Partners</a>
                <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
              </>
            ) : (
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            )}
            <Link to="/resources" className="text-gray-700 hover:text-primary transition-colors">Resources</Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">Admin</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isResourcesPage && (
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/resources">Resources</Link>
              </Button>
            )}
            {isResourcesPage && (
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/">Back to Home</Link>
              </Button>
            )}
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-md">
              <Link to="/login">Sign In</Link>
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
        "md:hidden fixed inset-x-0 top-[59px] bottom-0 bg-white z-40 pt-4 px-4 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-4">
          {isHomePage ? (
            <>
              <a href="#about" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>About</a>
              <a href="#events" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Events</a>
              <a href="#team" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Team</a>
              <a href="#partners" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Partners</a>
              <a href="#contact" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Contact</a>
            </>
          ) : (
            <Link to="/" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
          )}
          <Link to="/resources" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Resources</Link>
          <Link to="/admin" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Admin</Link>
          
          <div className="mt-6 space-y-4">
            {!isResourcesPage && (
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/resources" onClick={() => setIsOpen(false)}>Resources</Link>
              </Button>
            )}
            {isResourcesPage && (
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/" onClick={() => setIsOpen(false)}>Back to Home</Link>
              </Button>
            )}
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md">
              <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
