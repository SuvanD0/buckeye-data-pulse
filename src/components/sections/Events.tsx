
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  image_url: string;
}

const Events = () => {
  // Fetch events from Supabase
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      return data as Event[];
    }
  });

  // Display loading state
  if (isLoading) {
    return (
      <section id="events" className="section-padding bg-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Events & Workshops
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loading events...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="section-padding bg-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Events & Workshops
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for our upcoming workshops, speaker events, and case competitions. All events are open to OSU students interested in data analytics.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event) => (
              <Card key={event.id} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow rounded-lg">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={event.image_url || 'https://via.placeholder.com/500x300'} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary hover:bg-primary/90 rounded-full">
                    {event.status}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-bold text-xl mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-primary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2 text-primary" />
                      <span>{new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white group rounded-md">
                    Register
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No events currently scheduled. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
