
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, ListFilter, Edit, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminResourceForm from '@/components/admin/AdminResourceForm';
import { Resource } from '@/models/Resource';
import { resourcesData } from '@/data/resourcesData';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => {
    // In a real app, this would be an API call
    setResources(resourcesData);
  }, []);

  const handleAddResource = (newResource: Resource) => {
    // In a real app, this would be an API call
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    
    toast({
      title: "Resource added",
      description: "The resource has been successfully added.",
    });
    
    setIsEditing(false);
    setSelectedResource(null);
  };

  const handleUpdateResource = (updatedResource: Resource) => {
    // In a real app, this would be an API call
    const updatedResources = resources.map(resource => 
      resource.id === updatedResource.id ? updatedResource : resource
    );
    
    setResources(updatedResources);
    
    toast({
      title: "Resource updated",
      description: "The resource has been successfully updated.",
    });
    
    setIsEditing(false);
    setSelectedResource(null);
  };

  const handleDeleteResource = (id: string) => {
    // In a real app, this would be an API call
    const updatedResources = resources.filter(resource => resource.id !== id);
    setResources(updatedResources);
    
    toast({
      title: "Resource deleted",
      description: "The resource has been successfully deleted.",
    });
  };

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(resource);
    setIsEditing(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full mt-1">
                  <Shield size={14} /> Admin Access
                </span>
              )}
              {user && (
                <p className="text-sm text-gray-500 mt-1">
                  Logged in as: {user.email}
                </p>
              )}
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <ListFilter size={16} />
                Resources
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus size={16} />
                Add New
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(resource => (
                  <Card key={resource.id} className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">
                            {resource.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleEditResource(resource)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => handleDeleteResource(resource.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {resources.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No resources found</p>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedResource(null);
                      document.querySelector('[value="add"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}
                  >
                    Add Your First Resource
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="add" className="mt-6">
              <AdminResourceForm 
                onSubmit={isEditing ? handleUpdateResource : handleAddResource}
                initialData={selectedResource}
                isEditing={isEditing}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
