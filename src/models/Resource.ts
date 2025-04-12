
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'article' | 'ebook' | 'tool' | 'course' | 'other';
  url: string;
  tags: string[];
  dateAdded: string;
  featured: boolean; // Changed from optional to required
  content?: string;
  user_id?: string;
}
