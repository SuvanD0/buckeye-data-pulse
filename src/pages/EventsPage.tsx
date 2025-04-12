import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventList from '@/components/events/EventList';

const EventsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
              <p className="text-gray-600">Stay updated with our latest workshops, talks, and competitions.</p>
            </div>

            <EventList filter="all" />
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage; 