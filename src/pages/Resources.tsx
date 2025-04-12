import { useState } from 'react';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSubmissionForm from '@/components/resources/ResourceSubmissionForm';
import { Resource } from '@/models/Resource';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X, PlusCircle, Grid, ChevronLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbNavigation from '@/components/navigation/Breadcrumb';
import QuickLinks from '@/components/navigation/QuickLinks';
import { useQuery } from '@tanstack/react-query';
import { fetchAllResourcesAndCategories, submitResource } from '@/services/resourceService';
import { useToast } from '@/hooks/use-toast';
import { useResourceFilters } from '@/hooks/useResourceFilters';
import { supabase } from '@/integrations/supabase/client';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Fetch resources using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['resourcesPage'],
    queryFn: fetchAllResourcesAndCategories
  });

  const resources = data?.resources || [];
  const categories = data?.categories || [];
  const resourceTypes = data?.resourceTypes || [];
  const allTags = data?.allTags || [];

  // Quick links data
  const quickLinks = [
    {
      label: "Data Analytics Workshop Materials",
      href: "/resources?category=Workshop",
      description: "Access slides and code from past workshops"
    },
    {
      label: "Career Preparation Resources",
      href: "/resources?category=Career",
      description: "Resume templates, interview guides, and job boards"
    },
    {
      label: "OSU Data Labs",
      href: "https://tdai.osu.edu/data-labs/",
      isExternal: true,
      description: "University-wide data analytics labs and equipment"
    },
    {
      label: "Submit a Resource",
      href: "#",
      description: "Share a helpful resource with the BDAA community"
    },
  ];

  const { filteredResources } = useResourceFilters({ initialResources: resources });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(item => item !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedTags([]);
    setSearchTerm('');
  };

  const handleResourceSubmit = async (resourceData: Partial<Resource>) => {
    try {
      // Get the current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError);
        toast({
          title: "Authentication Required",
          description: "You must be logged in to submit a resource.",
          variant: "destructive"
        });
        // TODO: Optionally redirect to login page
        // navigate('/login');
        return false; // Indicate submission failed
      }

      // ---> Add logging here
      console.log('Submitting resource for user:', user.id);

      // Pass user.id to submitResource
      await submitResource(resourceData, user.id);

      toast({
        title: "Resource Submitted",
        description: "Your resource has been submitted successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error submitting resource:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your resource. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-28 pb-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600">Loading resources...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-28 pb-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-red-600">Error loading resources. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-28 pb-16 bg-primary/5">
        <BreadcrumbNavigation items={[{ label: 'Resources' }]} />
        
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our collection of data analytics resources, guides, and tools to enhance your skills and knowledge.
            </p>
            
            <Tabs defaultValue="browse" className="w-full max-w-xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <Grid size={18} />
                  Browse Resources
                </TabsTrigger>
                <TabsTrigger value="submit" className="flex items-center gap-2">
                  <PlusCircle size={18} />
                  Submit Resource
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="mt-0">
                {/* Search and Filter Controls */}
                <div className="relative w-full max-w-xl mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-10 border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary w-full text-base"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <Filter size={18} />
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                    
                    {(selectedCategories.length > 0 || selectedTypes.length > 0 || selectedTags.length > 0) && (
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        className="text-primary hover:text-primary/80"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="submit">
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-4">
                    Have a valuable resource to share with the BDAA community? Submit it below, and our team will review it for inclusion in our resource library.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Active filters - only show on browse tab */}
            <div id="active-filters">
              {(selectedCategories.length > 0 || selectedTypes.length > 0 || selectedTags.length > 0) && (
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {selectedCategories.map(category => (
                    <Badge 
                      key={`cat-${category}`}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-1 bg-white"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <X size={14} className="cursor-pointer" />
                    </Badge>
                  ))}
                  
                  {selectedTypes.map(type => (
                    <Badge 
                      key={`type-${type}`}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-1 bg-white"
                      onClick={() => toggleType(type)}
                    >
                      {type}
                      <X size={14} className="cursor-pointer" />
                    </Badge>
                  ))}
                  
                  {selectedTags.map(tag => (
                    <Badge 
                      key={`tag-${tag}`}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-1 bg-white"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      <X size={14} className="cursor-pointer" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="browse" className="w-full">
          <TabsContent value="browse" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {/* Filters Panel */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-6 bg-white rounded-lg shadow-sm">
                    {/* Categories Filter */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Categories</h3>
                      <div className="space-y-2">
                        {/* Fix type issues with categories mapping */}
                        {(categories as string[]).map((category) => (
                          <div key={`cat-filter-${category}`} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`cat-${category}`} 
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Resource Types Filter */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Resource Types</h3>
                      <div className="space-y-2">
                        {/* Fix type issues with resourceTypes mapping */}
                        {(resourceTypes as string[]).map((type) => (
                          <div key={`type-filter-${type}`} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={() => toggleType(type)}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm capitalize cursor-pointer">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tags Filter */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Popular Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {/* Fix type issues with allTags mapping */}
                        {(allTags as string[]).map((tag) => (
                          <Badge 
                            key={`tag-filter-${tag}`}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-primary' : ''}`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Resources Grid */}
                {filteredResources.length > 0 ? (
                  <>
                    {/* Featured Resources First */}
                    {filteredResources.some(r => r.featured) && (
                      <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredResources
                            .filter(r => r.featured)
                            .map(resource => (
                              <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* All Other Resources */}
                    <div>
                      <h2 className="text-2xl font-bold mb-6">All Resources</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredResources
                          .filter(r => !r.featured)
                          .map(resource => (
                            <ResourceCard key={resource.id} resource={resource} />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Sidebar with Quick Links */}
              <div className="lg:col-span-1 space-y-6">
                <QuickLinks links={quickLinks} />
                
                <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Join BDAA</h3>
                  <p className="text-sm mb-4">
                    Get access to exclusive resources, workshops, and networking opportunities by becoming a member.
                  </p>
                  <Button className="w-full">
                    Become a Member
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="submit" className="mt-0">
            <ResourceSubmissionForm onSubmit={handleResourceSubmit} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
