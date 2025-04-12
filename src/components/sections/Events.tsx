
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { fetchEvents } from '@/services/supabaseEvents';
import { Event } from '@/models/Event';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUpcomingEvents = async () => {
      try {
        setLoading(true);
        const allEvents = await fetchEvents();
        
        // Filter to only show upcoming events and limit to 3
        const now = new Date();
        const upcomingEvents = allEvents
          .filter(event => new Date(event.start_time) >= now)
          .slice(0, 3);
        
        setEvents(upcomingEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    getUpcomingEvents();
  }, []);

  const formatEventDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-600">
            Join us for our upcoming workshops, speaker events, and case competitions. 
            All events are open to OSU students interested in data analytics.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading events...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  {event.image_url && (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-primary mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm font-medium">
                        {formatEventDate(event.start_time)}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>
                    {event.location && (
                      <p className="text-gray-500 text-xs mb-4">
                        <span className="font-semibold">Location:</span> {event.location}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-8">
            <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild>
            <Link to="/events">View All Events</Link>
          </Button>
          <Link 
            to="https://forms.gle/7QYtgGXMXYfj7TRHA" 
            className="ml-4 text-primary hover:text-primary/80 text-sm inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suggest a workshop or event for the club
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
