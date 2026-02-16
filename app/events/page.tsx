// app/events/page.tsx
import React from 'react';
import EventCard from './components/EventCard';

// ⭐ Make it async to fetch data
export default async function Page() {
  // Fetch events from your Strapi API
  const API_URL = "http://172.30.0.200:1334/api/events?populate=*";
  
  let events = [];
  
  try {
    const res = await fetch(API_URL, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (res.ok) {
      const json = await res.json();
      const rawEvents = json?.data || [];
      
      // Transform data to match EventCard props
      events = rawEvents.map((event: any) => {
        const attrs = event.attributes || event;
        return {
          id: event.id,
          slug: attrs.slug,
          eventTitle: attrs.eventTitle,
          eventType: attrs.eventType,
          eventDate: attrs.eventDate,
          eventDescription: attrs.eventDescription,
          mainImage: attrs.mainImage?.data?.attributes || attrs.mainImage,
          eventGallery: attrs.eventGallery?.data?.map((img: any) => img.attributes) || attrs.eventGallery || [],
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and explore our upcoming and past events
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <EventCard key={event.id || event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">
              No events available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}