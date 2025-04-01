
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Introduction to Machine Learning Workshop",
      date: "October 15, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Enarson Classroom Building 100",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 2,
      title: "Data Visualization with Tableau",
      date: "October 22, 2023",
      time: "5:30 PM - 7:30 PM",
      location: "Mason Hall 240",
      category: "Training",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 3,
      title: "Fall Case Competition Kickoff",
      date: "November 5, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Fisher College of Business",
      category: "Competition",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
    }
  ];

  return (
    <section id="events" className="section-padding bg-gray-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-data-dots opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Events & Workshops
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for our upcoming workshops, speaker events, and case competitions. All events are open to OSU students interested in data analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-secondary hover:bg-secondary/90">
                  {event.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-2 text-primary group-hover:text-secondary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-secondary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2 text-secondary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-secondary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white group">
                  Register
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
