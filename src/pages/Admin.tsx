import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, ListFilter, Edit, Trash2, Shield, BookOpen, CalendarPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminResourceForm from '@/components/admin/AdminResourceForm';
import EventForm from '@/components/admin/EventForm';
import { Resource } from '@/models/Resource';
import { useAuth } from '@/context/AuthContext';
import { fetchResources, createResource, updateResource, deleteResource, getUserRole } from '@/services/supabaseService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Admin = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, isAdmin, isLoading: authIsLoading } = useAuth();
  const queryClient = useQueryClient();

  // Fetch resources using React Query
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources
  });

  // Fetch user role
  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: getUserRole,
    enabled: !!user
  });

  // Mutations for resources
  const addResourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource added",
        description: "The resource has been successfully added to Supabase.",
      });
      setIsEditingResource(false);
      setSelectedResource(null);
    },
    onError: (error) => {
      toast({
        title: "Error adding resource",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updateResourceMutation = useMutation({
    mutationFn: ({ id, resource }: { id: string, resource: Resource }) => 
      updateResource(id, resource),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource updated",
        description: "The resource has been successfully updated in Supabase.",
      });
      setIsEditingResource(false);
      setSelectedResource(null);
    },
    onError: (error) => {
      toast({
        title: "Error updating resource",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteResourceMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource deleted",
        description: "The resource has been successfully deleted from Supabase.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting resource",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAddResource = (newResource: Resource) => {
    addResourceMutation.mutate(newResource);
  };

  const handleUpdateResource = (updatedResource: Resource) => {
    if (updatedResource.id) {
      updateResourceMutation.mutate({ 
        id: updatedResource.id, 
        resource: updatedResource 
      });
    }
  };

  const handleDeleteResource = (id: string) => {
    deleteResourceMutation.mutate(id);
  };

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(resource);
    setIsEditingResource(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isAdminUser = userRole === 'admin' || isAdmin;

  useEffect(() => {
    if (!isAdminUser && !resourcesLoading) {
      toast({ title: "Access Denied", description: "You do not have permission to view this page.", variant: "destructive" });
      navigate('/');
    }
  }, [isAdminUser, resourcesLoading, navigate, toast]);

  if (authIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Admin Access...
      </div>
    );
  }

  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              {isAdminUser && (
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

          <Tabs defaultValue="manage-resources" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="manage-resources" className="flex items-center gap-2">
                <BookOpen size={16} />
                Manage Resources
              </TabsTrigger>
              <TabsTrigger value="manage-events" className="flex items-center gap-2">
                <CalendarPlus size={16} />
                Manage Events
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage-resources" className="mt-6">
              {isEditingResource && (
                 <div className="mb-6 p-6 bg-white rounded-lg shadow-sm">
                   <h2 className="text-xl font-semibold mb-4">{isEditingResource ? 'Edit Resource' : 'Add New Resource'}</h2>
                   <AdminResourceForm 
                      onSubmit={isEditingResource ? handleUpdateResource : handleAddResource}
                      initialData={selectedResource}
                      isEditing={isEditingResource}
                    />
                    <Button variant="outline" size="sm" onClick={() => { setIsEditingResource(false); setSelectedResource(null); }} className="mt-4">
                      Cancel Edit
                    </Button>
                 </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Existing Resources</h2>
                {!isEditingResource && (
                  <Button size="sm" onClick={() => { setSelectedResource(null); setIsEditingResource(true); }}>
                    <Plus size={16} className="mr-1"/> Add Resource
                  </Button>
                )}
              </div>
              
              {resourcesLoading ? (
                <div className="text-center py-12"><p className="text-gray-500">Loading resources...</p></div>
              ) : resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map(resource => (
                    <Card key={resource.id} className="h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                         <div className="flex items-center gap-1 mb-4">
                            <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">
                              {resource.category}
                            </span>
                            <span className="text-xs px-2 py-1 bg-secondary/10 rounded-full text-secondary">
                              {resource.type}
                            </span>
                         </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 mt-auto">
                        <div className="flex justify-end items-center gap-2 w-full">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditResource(resource)}>
                              <Edit size={16} />
                            </Button>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteResource(resource.id)}>
                              <Trash2 size={16} />
                            </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No resources found.</p>
                  {!isEditingResource && (
                     <Button size="sm" onClick={() => { setSelectedResource(null); setIsEditingResource(true); }}>
                       <Plus size={16} className="mr-1"/> Add Your First Resource
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manage-events" className="mt-6">
               <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
               <EventForm 
                 onSuccess={() => {
                    toast({ title: "Event Added", description: "The event has been added successfully." });
                 }}
               />
              <div className="mt-8 p-4 border rounded-md bg-yellow-50 border-yellow-200 text-yellow-800">
                <p className="text-sm">Event listing and editing functionalities for this tab are under development.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
