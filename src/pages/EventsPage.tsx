
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
              <p className="text-gray-600">Stay updated with our latest workshops, talks, and competitions.</p>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <EventList filter="all" limit={20} />
              </TabsContent>
              
              <TabsContent value="upcoming">
                <EventList filter="upcoming" limit={20} />
              </TabsContent>
              
              <TabsContent value="past">
                <EventList filter="past" limit={20} />
              </TabsContent>
            </Tabs>
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
