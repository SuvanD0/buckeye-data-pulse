
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface QuickLink {
  label: string;
  description?: string;
  href: string;
  isExternal?: boolean;
}

interface QuickLinksProps {
  title?: string;
  links: QuickLink[];
  className?: string;
}

const QuickLinks = ({ title = "Quick Links", links, className = "" }: QuickLinksProps) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            {link.isExternal ? (
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                {link.label}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            ) : (
              <Link 
                to={link.href}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {link.label}
              </Link>
            )}
            {link.description && (
              <p className="text-sm text-gray-500 mt-1">{link.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
