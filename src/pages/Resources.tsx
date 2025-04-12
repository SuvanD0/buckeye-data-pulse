
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResourceSubmissionForm from '@/components/resources/ResourceSubmissionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from 'sonner';
import { submitResource } from '@/services/resourceService';
import { useAuth } from '@/context/AuthContext';
import { fetchAllResourcesAndCategories } from '@/services/resourceService';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  category: string;
  tags: string[];
  dateAdded: string;
  featured: boolean;
  content?: string;
}

interface ResourceCategoriesProps {
  categories: string[] | null;
  selectedCategory: string;
  onSelect: (category: string) => void;
}

interface ResourceTypesProps {
  types: string[] | null;
  selectedType: string;
  onSelect: (type: string) => void;
}

interface TagCloudProps {
  tags: string[] | null;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmittingResource, setIsSubmittingResource] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const {
          resources: initialResources,
          categories: initialCategories,
          resourceTypes: initialTypes,
          allTags: initialAllTags,
        } = await fetchAllResourcesAndCategories();

        // Ensure all resources have a featured property
        const resourcesWithFeatured = initialResources.map(resource => ({
          ...resource,
          featured: resource.featured || false, // Set default to false if not present
        }));

        setResources(resourcesWithFeatured);
        setCategories(initialCategories as string[]);
        setTypes(initialTypes as string[]);
        setAllTags(initialAllTags as string[]);
      } catch (err: any) {
        console.error('Error fetching resources:', err);
        setError(err.message || 'Failed to load resources.');
        toast.error(`Failed to load resources: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredResources = resources.filter((resource) => {
    const categoryMatch =
      selectedCategory === 'all' || resource.category === selectedCategory;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const tagMatch =
      selectedTags.length === 0 || resource.tags.some((tag) => selectedTags.includes(tag));
    const searchMatch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && typeMatch && tagMatch && searchMatch;
  });

  const handleSubmit = async (resourceData: any) => {
    setIsSubmittingResource(true);
    try {
      if (!user) {
        toast.error("You must be logged in to submit a resource.");
        return false;
      }
      
      // Ensure user and user.id are valid before proceeding
      if (!user || !user.id) {
        console.error("User ID is missing or invalid.");
        toast.error("User authentication failed. Please log in again.");
        return false;
      }
      
      // Call the submitResource function
      await submitResource(resourceData, user.id);
      
      // Refresh resources after submission
      const { resources: updatedResources } = await fetchAllResourcesAndCategories();
      
      // Ensure all resources have a featured property
      const resourcesWithFeatured = updatedResources.map(resource => ({
        ...resource,
        featured: resource.featured || false, // Set default to false if not present
      }));
      
      setResources(resourcesWithFeatured);
      
      toast.success("Resource submitted successfully!");
      return true;
    } catch (error: any) {
      console.error("Error submitting resource:", error);
      toast.error(`Failed to submit resource: ${error.message}`);
      return false;
    } finally {
      setIsSubmittingResource(false);
    }
  };

  // Resource Categories component
  const ResourceCategories = ({ categories, selectedCategory, onSelect }: ResourceCategoriesProps) => {
    const categoryList = categories as string[];
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Categories</h3>
        <ScrollArea className="max-h-[calc(100vh-300px)]">
          <div className="space-y-1">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              className={`w-full justify-start text-sm ${selectedCategory === 'all' ? '' : 'text-gray-700'}`}
              onClick={() => onSelect('all')}
            >
              All Categories
            </Button>
            {categoryList.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                className={`w-full justify-start text-sm ${selectedCategory === category ? '' : 'text-gray-700'}`}
                onClick={() => onSelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  // Resource Types component
  const ResourceTypes = ({ types, selectedType, onSelect }: ResourceTypesProps) => {
    const typesList = types as string[];
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Resource Types</h3>
        <div className="space-y-1">
          <Button
            variant={selectedType === 'all' ? 'default' : 'ghost'}
            className={`w-full justify-start text-sm ${selectedType === 'all' ? '' : 'text-gray-700'}`}
            onClick={() => onSelect('all')}
          >
            All Types
          </Button>
          {typesList.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'ghost'}
              className={`w-full justify-start text-sm ${selectedType === type ? '' : 'text-gray-700'}`}
              onClick={() => onSelect(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  // Tags component
  const TagCloud = ({ tags, selectedTags, onTagToggle }: TagCloudProps) => {
    const tagList = tags as string[];
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedTags.includes(tag)
                  ? 'bg-primary hover:bg-primary/80'
                  : 'hover:bg-primary/10'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Resources for Data Analytics
              </h1>
              <p className="text-gray-600">
                Explore our curated collection of resources to enhance your
                data analytics skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <aside className="md:col-span-1">
                <div className="sticky top-28">
                  <div className="mb-6">
                    <Input
                      type="text"
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="bg-gray-50"
                    />
                  </div>

                  <ResourceCategories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={handleCategorySelect}
                  />

                  <ResourceTypes
                    types={types}
                    selectedType={selectedType}
                    onSelect={handleTypeSelect}
                  />

                  <TagCloud
                    tags={allTags}
                    selectedTags={selectedTags}
                    onTagToggle={handleTagToggle}
                  />
                </div>
              </aside>

              <div className="md:col-span-3">
                {loading ? (
                  <div className="text-center py-10">Loading resources...</div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">{error}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResources.map((resource) => (
                      <Card
                        key={resource.id}
                        className="overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <CardHeader>
                          <CardTitle className="line-clamp-2">
                            {resource.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-3 text-gray-600">
                            {resource.description}
                          </CardDescription>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="secondary">{resource.type}</Badge>
                            {resource.tags.map((tag) => (
                              <Badge key={tag}>{tag}</Badge>
                            ))}
                          </div>
                          <Button
                            asChild
                            variant="link"
                            className="mt-4"
                          >
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Learn More
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Submit a Resource
              </h2>
              <p className="text-gray-600 mb-6">
                Help us grow our collection by submitting your favorite data
                analytics resources.
              </p>
              <ResourceSubmissionForm onSubmit={handleSubmit} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
