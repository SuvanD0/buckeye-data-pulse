
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-xl">B</span>
              </div>
              <span className="font-montserrat font-bold text-xl">BDAA</span>
            </div>
            <p className="text-sm opacity-80 max-w-xs">
              Big Data & Analytics Association at Ohio State University. Inspiring students to think analytically since 2014.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#events" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Events</a></li>
              <li><a href="#team" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Our Team</a></li>
              <li><a href="#partners" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Partners</a></li>
              <li><a href="#resources" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Join Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Become a Member</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Newsletter</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Career Resources</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">Workshop Materials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:bdaa@osu.edu" className="opacity-80 hover:opacity-100 hover:text-secondary transition-colors">bdaa@osu.edu</a>
              </li>
              <li className="opacity-80">
                The Ohio State University<br />
                Columbus, OH 43210
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Big Data & Analytics Association at Ohio State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
