import { useState, useEffect } from 'react';
import { Resource } from '@/models/Resource';

interface UseResourceFiltersProps {
  initialResources: Resource[];
}

export const useResourceFilters = ({ initialResources }: UseResourceFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(initialResources);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = [...initialResources];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(term)))
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
        resource.tags && resource.tags.some(tag => selectedTags.includes(tag))
      );
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategories, selectedTypes, selectedTags, initialResources]);

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
    setShowFilters(false); // Also hide filters panel when clearing
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    toggleCategory,
    selectedTypes,
    toggleType,
    selectedTags,
    toggleTag,
    clearFilters,
    filteredResources,
    showFilters,
    setShowFilters,
  };
}; 