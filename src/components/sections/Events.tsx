import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventList from '@/components/events/EventList';
import { Link } from 'react-router-dom';

// Helper function to format dates (can be moved to a utils file)
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

const Events = () => {
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

        <EventList filter="upcoming" limit={3} />

        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-md">
            <Link to="/events">
              View Full Calendar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
