import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
      setShowBackToTop(offset > 400);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Header */}
      <header className={cn(
        "fixed w-full left-0 z-40 transition-all duration-300", 
        scrolled || !isHomePage || isOpen ? "bg-white backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5",
        "top-0" // Adjusted now that OSU navbar is removed
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/img/White Text Logo.1.png" 
                  alt="BDAA Logo" 
                  className="h-12 w-auto transition-all duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation with Dropdown Menus */}
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    {isHomePage ? (
                      <a href="#about" className="nav-link">About</a>
                    ) : (
                      <Link to="/" className="nav-link">Home</Link>
                    )}
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              to="/resources"
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium text-white">
                                Resource Library
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                Explore our collection of data analytics resources, guides, and tools.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <a href="/resources?category=Tutorial" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Tutorials</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Step-by-step guides for data analytics skills
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="/resources?category=Workshop" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Workshops</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Past workshop materials and recordings
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="/resources?category=Career" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Career Resources</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Job search, resume and interview preparation
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Events</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li>
                          <a href={isHomePage ? "#events" : "/#events"} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Upcoming Events</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View our calendar of upcoming workshops and meetings
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="/events/past" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Past Events</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse recordings and materials from previous events
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="/events/submit" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Submit Event Idea</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Suggest a workshop or event for the club
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Get Involved</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li>
                          <a href="/team" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Join the Team</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Apply for leadership positions and committees
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="#partners" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Partner With Us</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Sponsorship and collaboration opportunities
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="#contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Contact</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Reach out to our team with questions
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/admin" className={navigationMenuTriggerStyle()}>
                      Admin
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/resources">Resources</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-md">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
              <button 
                className="text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden fixed inset-x-0 top-[56px] bottom-0 bg-white z-40 pt-4 px-4 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <nav className="flex flex-col space-y-4">
            {isHomePage ? (
              <>
                <a href="#about" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>About</a>
                <a href="#events" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Events</a>
                <a href="/team" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Team</a>
                <a href="#partners" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Partners</a>
                <a href="#contact" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Contact</a>
              </>
            ) : (
              <Link to="/" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
            )}
            
            {/* Mobile dropdowns - expanded by default */}
            <div className="border-t pt-2">
              <p className="font-medium px-3 py-2">Resources</p>
              <div className="pl-4 space-y-2">
                <Link to="/resources" className="block p-2 hover:bg-gray-50 rounded-md">All Resources</Link>
                <a href="/resources?category=Tutorial" className="block p-2 hover:bg-gray-50 rounded-md">Tutorials</a>
                <a href="/resources?category=Workshop" className="block p-2 hover:bg-gray-50 rounded-md">Workshops</a>
                <a href="/resources?category=Career" className="block p-2 hover:bg-gray-50 rounded-md">Career Resources</a>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium px-3 py-2">Events</p>
              <div className="pl-4 space-y-2">
                <a href={isHomePage ? "#events" : "/#events"} className="block p-2 hover:bg-gray-50 rounded-md">Upcoming Events</a>
                <a href="/events/past" className="block p-2 hover:bg-gray-50 rounded-md">Past Events</a>
                <a href="/events/submit" className="block p-2 hover:bg-gray-50 rounded-md">Submit Event Idea</a>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium px-3 py-2">Get Involved</p>
              <div className="pl-4 space-y-2">
                <a href="/team" className="block p-2 hover:bg-gray-50 rounded-md">Join the Team</a>
                <a href="#partners" className="block p-2 hover:bg-gray-50 rounded-md">Partner With Us</a>
                <a href="#contact" className="block p-2 hover:bg-gray-50 rounded-md">Contact</a>
              </div>
            </div>
            
            <Link to="/admin" className="text-lg font-medium p-3 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>Admin</Link>
            
            <div className="mt-6 space-y-4">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-md">
                <Link to="/resources" onClick={() => setIsOpen(false)}>Resources</Link>
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md">
                <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Header;
