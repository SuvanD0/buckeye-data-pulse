
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceTypes, fetchCategories } from '@/services/supabaseService';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

interface ResourceSubmissionFormProps {
  onSubmit: (resource: any) => Promise<boolean>;
}

const ResourceSubmissionForm = ({ onSubmit }: ResourceSubmissionFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Fetch resource types
  const { data: resourceTypes = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ['resourceTypes'],
    queryFn: fetchResourceTypes
  });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please sign in to submit resources.",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login"
        }
      });
      return;
    }
    
    if (!title || !description || !url || !type) {
      toast.error("Missing Information", {
        description: "Please fill out all required fields."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process tags
      const tagList = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // If no specific category was selected but tags exist, use the first tag as category
      const finalCategory = category || (tagList.length > 0 ? tagList[0] : 'Other');
      
      const resourceData = {
        title,
        description,
        content,
        url,
        type,
        category: finalCategory,
        tags: tagList
      };
      
      const success = await onSubmit(resourceData);
      
      if (success) {
        toast.success("Resource Submitted", {
          description: "Thank you for contributing to our resource library!"
        });
        
        // Reset form
        setTitle('');
        setDescription('');
        setContent('');
        setUrl('');
        setCategory('');
        setType('');
        setTags('');
      }
    } catch (error: any) {
      console.error('Error in form submission:', error);
      toast.error(`Failed to submit resource: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Submit a Resource</CardTitle>
      </CardHeader>
      <CardContent>
        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start">
            <AlertCircle className="text-yellow-500 mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-800 font-medium">Authentication Required</p>
              <p className="text-yellow-700 text-sm mt-1">
                You need to <Link to="/login" className="underline font-medium">sign in</Link> to submit resources.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Resource Title</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of the resource"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe this resource"
              required
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Detailed Content (Optional)</Label>
            <Textarea 
              id="content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add more detailed information about this resource (optional)"
              rows={5}
            />
            <p className="text-sm text-gray-500">You can use this field to provide more comprehensive information about the resource</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  ) : (
                    categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingTypes ? (
                    <SelectItem value="loading" disabled>Loading resource types...</SelectItem>
                  ) : (
                    resourceTypes.map((type: any) => (
                      <SelectItem key={type.id} value={type.name} className="capitalize">
                        {type.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">Resource URL</Label>
            <Input 
              id="url" 
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input 
              id="tags" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., python, beginner, machine learning"
            />
            <p className="text-sm text-gray-500">Separate tags with commas</p>
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90" 
              disabled={isSubmitting || !user}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Resource"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResourceSubmissionForm;
