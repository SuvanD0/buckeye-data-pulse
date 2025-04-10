
import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/models/Resource';
import { v4 as uuidv4 } from 'uuid';

// Using 'any' type to bypass TypeScript checking
const supabaseAny = supabase as any;

// Events
export async function fetchEvents() {
  const { data, error } = await supabaseAny
    .from('events')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }

  return data;
}

export async function createEvent(event: any) {
  const { data, error } = await supabaseAny
    .from('events')
    .insert([event])
    .select();
  
  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }

  return data;
}

export async function updateEvent(id: string, event: any) {
  const { data, error } = await supabaseAny
    .from('events')
    .update(event)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }

  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabaseAny
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }

  return true;
}

// Resources
export async function fetchResources() {
  const { data, error } = await supabaseAny
    .from('resources')
    .select(`
      *,
      resource_type_id (id, name),
      resource_categories (
        category_id (id, name)
      )
    `);
  
  if (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }

  // Transform data to match the expected Resource interface
  const transformedData = data.map((item: any) => {
    const resourceType = item.resource_type_id?.name || 'other';
    const categoryObjects = item.resource_categories || [];
    const tags = categoryObjects.map((cat: any) => cat.category_id?.name).filter(Boolean);

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      type: resourceType,
      url: item.url || '',
      category: tags[0] || 'Other', // Use the first category as the main category
      tags: tags,
      dateAdded: new Date(item.created_at).toISOString().split('T')[0],
      featured: false // Default value
    } as Resource;
  });

  return transformedData;
}

export async function fetchResourceTypes() {
  const { data, error } = await supabaseAny
    .from('resource_types')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching resource types:', error);
    throw error;
  }

  return data;
}

export async function fetchCategories() {
  const { data, error } = await supabaseAny
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data;
}

export async function createResource(resource: Resource) {
  // First find or create the resource type
  const { data: resourceTypeData } = await supabaseAny
    .from('resource_types')
    .select('id')
    .eq('name', resource.type)
    .single();

  let resourceTypeId = resourceTypeData?.id;

  if (!resourceTypeId) {
    const { data } = await supabaseAny
      .from('resource_types')
      .insert({ name: resource.type })
      .select('id');
    resourceTypeId = data?.[0]?.id;
  }

  // Create the resource
  const { data: resourceData, error: resourceError } = await supabaseAny
    .from('resources')
    .insert({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      resource_type_id: resourceTypeId,
      difficulty_level: 'intermediate' // Default value
    })
    .select();
  
  if (resourceError) {
    console.error('Error creating resource:', resourceError);
    throw resourceError;
  }

  const resourceId = resourceData[0].id;

  // Handle categories
  const categories = [resource.category, ...resource.tags.filter(tag => tag !== resource.category)];
  
  for (const categoryName of categories) {
    // Find or create the category
    const { data: categoryData } = await supabaseAny
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single();

    let categoryId = categoryData?.id;

    if (!categoryId) {
      const { data } = await supabaseAny
        .from('categories')
        .insert({ name: categoryName })
        .select('id');
      categoryId = data?.[0]?.id;
    }

    // Create the resource-category relationship
    if (categoryId) {
      const { error: relationError } = await supabaseAny
        .from('resource_categories')
        .insert({
          resource_id: resourceId,
          category_id: categoryId
        });
      
      if (relationError) {
        console.error('Error creating resource-category relationship:', relationError);
      }
    }
  }

  return await fetchResources();
}

export async function updateResource(id: string, resource: Resource) {
  // Find or create the resource type
  const { data: resourceTypeData } = await supabaseAny
    .from('resource_types')
    .select('id')
    .eq('name', resource.type)
    .single();

  let resourceTypeId = resourceTypeData?.id;

  if (!resourceTypeId) {
    const { data } = await supabaseAny
      .from('resource_types')
      .insert({ name: resource.type })
      .select('id');
    resourceTypeId = data?.[0]?.id;
  }

  // Update the resource
  const { error: resourceError } = await supabaseAny
    .from('resources')
    .update({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      resource_type_id: resourceTypeId,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
  
  if (resourceError) {
    console.error('Error updating resource:', resourceError);
    throw resourceError;
  }

  // First delete all existing category relationships
  const { error: deleteError } = await supabaseAny
    .from('resource_categories')
    .delete()
    .eq('resource_id', id);
  
  if (deleteError) {
    console.error('Error deleting resource categories:', deleteError);
  }

  // Handle categories
  const categories = [resource.category, ...resource.tags.filter(tag => tag !== resource.category)];
  
  for (const categoryName of categories) {
    // Find or create the category
    const { data: categoryData } = await supabaseAny
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single();

    let categoryId = categoryData?.id;

    if (!categoryId) {
      const { data } = await supabaseAny
        .from('categories')
        .insert({ name: categoryName })
        .select('id');
      categoryId = data?.[0]?.id;
    }

    // Create the resource-category relationship
    if (categoryId) {
      const { error: relationError } = await supabaseAny
        .from('resource_categories')
        .insert({
          resource_id: id,
          category_id: categoryId
        });
      
      if (relationError) {
        console.error('Error creating resource-category relationship:', relationError);
      }
    }
  }

  return await fetchResources();
}

export async function deleteResource(id: string) {
  // Delete resource-category relationships
  const { error: relationError } = await supabaseAny
    .from('resource_categories')
    .delete()
    .eq('resource_id', id);
  
  if (relationError) {
    console.error('Error deleting resource relationships:', relationError);
  }

  // Delete the resource
  const { error } = await supabaseAny
    .from('resources')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }

  return true;
}

// User Roles
export async function getUserRole() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id)
    .single();
  
  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return data?.role;
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}
