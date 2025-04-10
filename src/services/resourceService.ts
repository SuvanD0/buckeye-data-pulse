
import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/models/Resource';

export async function fetchAllResourcesAndCategories() {
  // Fetch resources with their types and categories
  const { data: resourcesData, error: resourcesError } = await supabase
    .from('resources')
    .select(`
      *,
      resource_type_id (id, name),
      resource_categories (
        category_id (id, name)
      )
    `);
  
  if (resourcesError) {
    console.error('Error fetching resources:', resourcesError);
    throw resourcesError;
  }

  // Fetch all categories
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    throw categoriesError;
  }

  // Fetch all resource types
  const { data: typesData, error: typesError } = await supabase
    .from('resource_types')
    .select('*')
    .order('name');
  
  if (typesError) {
    console.error('Error fetching resource types:', typesError);
    throw typesError;
  }

  // Transform the resources data to match our model
  const resources = resourcesData.map((item: any) => {
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

  // Extract all unique tags across resources
  const allTags = Array.from(
    new Set(
      resources.flatMap(resource => resource.tags)
    )
  ).sort();

  // Get all categories
  const categories = categoriesData.map((cat: any) => cat.name);

  // Get all resource types
  const resourceTypes = typesData.map((type: any) => type.name);

  return {
    resources,
    categories,
    resourceTypes,
    allTags
  };
}

export async function submitResource(resource: Partial<Resource>) {
  try {
    // 1. Find or create resource type
    let resourceTypeId;
    const { data: existingType } = await supabase
      .from('resource_types')
      .select('id')
      .eq('name', resource.type)
      .single();
    
    if (existingType) {
      resourceTypeId = existingType.id;
    } else {
      const { data: newType } = await supabase
        .from('resource_types')
        .insert({ name: resource.type })
        .select('id');
      resourceTypeId = newType?.[0]?.id;
    }

    // 2. Create the resource
    const { data: newResource, error: resourceError } = await supabase
      .from('resources')
      .insert({
        title: resource.title,
        description: resource.description,
        url: resource.url,
        resource_type_id: resourceTypeId,
        difficulty_level: 'beginner' // Default
      })
      .select();
    
    if (resourceError) throw resourceError;
    
    const resourceId = newResource[0].id;
    
    // 3. Process tags (categories)
    if (resource.tags && resource.tags.length > 0) {
      for (const tag of resource.tags) {
        // Find or create the category
        let categoryId;
        const { data: existingCategory } = await supabase
          .from('categories')
          .select('id')
          .eq('name', tag)
          .single();
        
        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          const { data: newCategory } = await supabase
            .from('categories')
            .insert({ name: tag })
            .select('id');
          categoryId = newCategory?.[0]?.id;
        }
        
        // Create the resource-category relationship
        if (categoryId) {
          await supabase
            .from('resource_categories')
            .insert({
              resource_id: resourceId,
              category_id: categoryId
            });
        }
      }
    }
    
    return newResource[0];
  } catch (error) {
    console.error('Error submitting resource:', error);
    throw error;
  }
}
