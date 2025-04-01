
import { Resource } from '@/models/Resource';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Video, FileText, Wrench, GraduationCap, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Video size={18} />;
      case 'article':
        return <FileText size={18} />;
      case 'ebook':
        return <BookOpen size={18} />;
      case 'tool':
        return <Wrench size={18} />;
      case 'course':
        return <GraduationCap size={18} />;
      default:
        return <Box size={18} />;
    }
  };

  return (
    <Card className={`h-full transition-all hover:shadow-md ${resource.featured ? 'border-l-4 border-l-primary' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              {getIcon()}
            </div>
            <Badge variant={resource.featured ? "default" : "outline"} className={resource.featured ? "bg-primary" : ""}>
              {resource.type}
            </Badge>
          </div>
          {resource.featured && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 mt-2">
        <div className="text-xs text-gray-500">
          Category: {resource.category}
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            View <ExternalLink size={14} className="ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
