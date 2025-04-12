
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { fetchEvents } from '@/services/supabaseEvents';
import { Event } from '@/models/Event';
import { formatDistanceToNow, format, parseISO } from 'date-fns';

interface EventListProps {
  filter?: 'upcoming' | 'past' | 'all';
  limit?: number;
}

const EventList = ({ filter = 'all', limit = 4 }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await fetchEvents();
        
        // Apply filtering if needed
        let filteredEvents = allEvents;
        const now = new Date();
        
        if (filter === 'upcoming') {
          filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.start_time);
            return eventDate >= now;
          });
        } else if (filter === 'past') {
          filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.start_time);
            return eventDate < now;
          });
        }
        
        // Apply limit
        filteredEvents = filteredEvents.slice(0, limit);
        
        setEvents(filteredEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [filter, limit]);

  const formatEventDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'h:mm a');
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No events {filter === 'upcoming' ? 'coming up' : filter === 'past' ? 'in the past' : ''} to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="h-full flex flex-col">
          {event.image_url && (
            <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
              <img 
                src={event.image_url} 
                alt={event.title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <CardHeader className="pb-2">
            <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              {formatEventDate(event.start_time)}
              {event.end_time && ' - ' + formatEventDate(event.end_time)}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <div className="flex items-start gap-1 mb-3">
              <Clock size={14} className="mt-1 text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">
                  {formatEventTime(event.start_time)}
                  {event.end_time && ' - ' + formatEventTime(event.end_time)}
                </span>
              </div>
            </div>
            
            {event.location && (
              <div className="flex items-start gap-1 mb-3">
                <MapPin size={14} className="mt-1 text-gray-500" />
                <span className="text-sm text-gray-600">{event.location}</span>
              </div>
            )}
            
            <p className="text-sm text-gray-600 line-clamp-3 mt-2">
              {event.description}
            </p>
          </CardContent>
          
          <CardFooter className="pt-2 border-t mt-auto">
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary">
              {parseISO(event.start_time) > new Date() ? 'Upcoming' : 'Past'}
            </Badge>
            <span className="text-xs text-gray-500 ml-auto">
              {formatDistanceToNow(parseISO(event.start_time), { addSuffix: true })}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
