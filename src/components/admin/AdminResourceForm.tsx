
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { resourceTypes, categories } from '@/data/resourcesData';
import { Resource } from '@/models/Resource';
import { Link2, FileImage, Save, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define tabs for different types of embedded content
const EMBED_TYPES = {
  LINK: 'link',
  IMAGE: 'image',
  YOUTUBE: 'youtube',
};

interface AdminResourceFormProps {
  onSubmit: (resource: Resource) => void;
  initialData: Resource | null;
  isEditing: boolean;
}

const AdminResourceForm: React.FC<AdminResourceFormProps> = ({ onSubmit, initialData, isEditing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'video' | 'article' | 'ebook' | 'tool' | 'course' | 'other'>('article');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedType, setEmbedType] = useState(EMBED_TYPES.LINK);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      // If content exists (for edited resources), use it
      setContent(initialData.content || '');
      setUrl(initialData.url);
      setCategory(initialData.category);
      setType(initialData.type);
      setTags(initialData.tags.join(', '));
      setFeatured(initialData.featured || false);
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setContent('');
      setUrl('');
      setCategory('');
      setType('article');
      setTags('');
      setFeatured(false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resourceData: Resource = {
      id: initialData?.id || uuidv4(),
      title,
      description,
      content, // New blog-like content field
      category,
      type,
      url,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      dateAdded: initialData?.dateAdded || new Date().toISOString(),
      featured,
    };
    
    onSubmit(resourceData);
  };

  const insertEmbed = () => {
    if (!embedUrl.trim()) return;
    
    let markdownToInsert = '';
    
    switch (embedType) {
      case EMBED_TYPES.LINK:
        markdownToInsert = `[${embedUrl}](${embedUrl})`;
        break;
      case EMBED_TYPES.IMAGE:
        markdownToInsert = `![Image](${embedUrl})`;
        break;
      case EMBED_TYPES.YOUTUBE:
        // Extract YouTube video ID if it's a full URL
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = embedUrl.match(youtubeRegex);
        const videoId = match ? match[1] : embedUrl;
        
        // Create custom markdown for YouTube (will be rendered as iframe in preview)
        markdownToInsert = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        break;
    }
    
    setContent(prev => prev + '\n\n' + markdownToInsert + '\n\n');
    setEmbedUrl('');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? 'Edit Resource' : 'Add New Resource'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
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
              placeholder="Briefly describe this resource (shown in cards)"
              required
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Detailed Content</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
              </div>
            </div>
            
            {previewMode ? (
              <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                <ReactMarkdown>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <>
                <Textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write detailed content with Markdown support"
                  rows={12}
                  className="font-mono"
                />
                
                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="text-sm font-medium mb-2">Insert Content</div>
                  <Tabs defaultValue={EMBED_TYPES.LINK} onValueChange={(val) => setEmbedType(val as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value={EMBED_TYPES.LINK} className="flex items-center gap-1">
                        <Link2 size={14} /> Link
                      </TabsTrigger>
                      <TabsTrigger value={EMBED_TYPES.IMAGE} className="flex items-center gap-1">
                        <FileImage size={14} /> Image
                      </TabsTrigger>
                      <TabsTrigger value={EMBED_TYPES.YOUTUBE} className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg> YouTube
                      </TabsTrigger>
                    </TabsList>
                    <div className="flex mt-2">
                      <Input 
                        value={embedUrl}
                        onChange={(e) => setEmbedUrl(e.target.value)}
                        placeholder={
                          embedType === EMBED_TYPES.LINK 
                            ? "Paste URL" 
                            : embedType === EMBED_TYPES.IMAGE 
                              ? "Paste image URL" 
                              : "Paste YouTube URL or video ID"
                        }
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        onClick={insertEmbed}
                        className="ml-2"
                      >
                        Insert
                      </Button>
                    </div>
                  </Tabs>
                </div>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select value={type} onValueChange={(val: any) => setType(val)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
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
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="featured" 
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked as boolean)}
            />
            <Label 
              htmlFor="featured" 
              className="font-normal text-sm cursor-pointer"
            >
              Feature this resource on the resources page
            </Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              if (isEditing) {
                // Reset form to initial state if editing
                if (initialData) {
                  setTitle(initialData.title);
                  setDescription(initialData.description);
                  setContent(initialData.content || '');
                  setUrl(initialData.url);
                  setCategory(initialData.category);
                  setType(initialData.type);
                  setTags(initialData.tags.join(', '));
                  setFeatured(initialData.featured || false);
                }
              } else {
                // Clear form if adding new
                setTitle('');
                setDescription('');
                setContent('');
                setUrl('');
                setCategory('');
                setType('article');
                setTags('');
                setFeatured(false);
              }
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update' : 'Save'} Resource
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminResourceForm;
