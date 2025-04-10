
export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  image_url?: string;
  created_at: string;
  updated_at: string;
}
