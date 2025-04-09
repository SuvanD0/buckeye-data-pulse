
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
  items?: Array<{
    label: string;
    href?: string;
  }>;
}

const BreadcrumbNavigation = ({ items = [] }: BreadcrumbProps) => {
  const location = useLocation();
  
  // If no items are provided, generate them from the path
  const breadcrumbItems = items.length 
    ? items 
    : location.pathname.split('/')
        .filter(item => item)
        .map((item, index, array) => {
          const href = `/${array.slice(0, index + 1).join('/')}`;
          return {
            label: item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' '),
            href: index < array.length - 1 ? href : undefined
          };
        });

  // If we're still on homepage, don't show breadcrumbs
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={item.href || '#'}>{item.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNavigation;
