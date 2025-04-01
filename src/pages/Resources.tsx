
import { useState, useEffect } from 'react';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSubmissionForm from '@/components/resources/ResourceSubmissionForm';
import { resourcesData, categories, resourceTypes, getAllTags } from '@/data/resourcesData';
import { Resource } from '@/models/Resource';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X, PlusCircle, Grid } from 'lucide-react';

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>(resourcesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const allTags = getAllTags();

  // Filter resources based on search term and filters
  useEffect(() => {
    let filtered = resourcesData;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) || 
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(resource => selectedCategories.includes(resource.category));
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(resource => selectedTypes.includes(resource.type));
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(resource => 
        resource.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    setResources(filtered);
  }, [searchTerm, selectedCategories, selectedTypes, selectedTags]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-28 pb-16 bg-primary/5">
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
                      className="pl-10 pr-10 py-6 border-gray-200 rounded-lg shadow-sm focus:ring-primary focus:border-primary w-full text-base"
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
            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-6 bg-white rounded-lg shadow-sm">
                {/* Categories Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
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
                    {resourceTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
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
                    {allTags.map((tag) => (
                      <Badge 
                        key={tag}
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
            {resources.length > 0 ? (
              <>
                {/* Featured Resources First */}
                {resources.some(r => r.featured) && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {resources
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources
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
          </TabsContent>
          
          <TabsContent value="submit" className="mt-0">
            <ResourceSubmissionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
