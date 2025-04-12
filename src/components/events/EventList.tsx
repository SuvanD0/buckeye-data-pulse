import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/models/Event';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Reusable date/time formatting helpers (consider moving to src/lib/utils.ts)
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return 'Date TBD';
  try {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return 'Invalid Date';
  }
};

const formatTime = (dateString: string | undefined | null): string => {
  if (!dateString) return 'Time TBD';
  try {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  } catch (e) {
    return 'Invalid Time';
  }
};

interface EventListProps {
  filter?: 'upcoming' | 'past' | 'all'; // Control which events to display
  limit?: number; // Optional limit for homepage preview
}

const EventList: React.FC<EventListProps> = ({ filter = 'all', limit }) => {
  const { data: events = [], isLoading, error } = useQuery<Event[]>({ 
    queryKey: ['events', filter, limit], // Include filter/limit in queryKey
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error: dbError } = await query;
      
      if (dbError) {
        console.error('Error fetching events:', dbError);
        throw dbError;
      }
      return data || [];
    }
  });

  const filteredEvents = React.useMemo(() => {
    const now = new Date();
    return events.filter(event => {
      const startTime = new Date(event.start_time);
      const endTime = event.end_time ? new Date(event.end_time) : startTime; // Use start time if no end time
      
      if (filter === 'upcoming') {
        return endTime >= now; // Show if event end time is now or in the future
      }
      if (filter === 'past') {
        return endTime < now; // Show if event end time is in the past
      }
      return true; // 'all' includes everything
    });
  }, [events, filter]);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading events...</div>;
  }

  if (error) {
     return <div className="text-center py-8 text-red-500">Error loading events: {error.message}</div>;
  }

  if (filteredEvents.length === 0) {
    return <div className="text-center py-8 text-gray-500">No {filter !== 'all' ? filter : ''} events found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {filteredEvents.map((event) => (
        <Card key={event.id} className="group flex flex-col overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={event.image_url || 'https://via.placeholder.com/500x300.png?text=BDAA+Event'} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Potential Badge based on time */}
            {/* {new Date(event.start_time) > new Date() && 
              <Badge className="absolute top-3 left-3 bg-blue-500 text-white rounded-full">Upcoming</Badge>
            } */}
          </div>
          <CardContent className="p-6 flex flex-col flex-grow">
            <h3 className="font-montserrat font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <div className="space-y-2 mb-4 text-sm flex-grow">
              <div className="flex items-start text-gray-600">
                <Calendar size={14} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>{formatDate(event.start_time)}</span>
              </div>
              <div className="flex items-start text-gray-600">
                <Clock size={14} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  {formatTime(event.start_time)}
                  {event.end_time && event.end_time !== event.start_time && ` - ${formatTime(event.end_time)}`}
                </span>
              </div>
              {event.location && (
                <div className="flex items-start text-gray-600">
                  <MapPin size={14} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
              {/* Optionally show description snippet */}
              {/* {event.description && 
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{event.description}</p>
              } */}
            </div>
            <Button variant="outline" className="w-full mt-auto border-primary text-primary hover:bg-primary hover:text-white group rounded-md">
              View Details
              <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList; 