// app/events/[slug]/page.tsx
import Image from "next/image";

export default async function EventDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const encodedSlug = encodeURIComponent(slug);
  const API_URL =
    "http://172.30.0.200:1334/api/events?" +
    `filters[slug][$eq]=${encodedSlug}&populate=*`;

  let res;
  try {
    res = await fetch(API_URL, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-red-600 text-2xl font-bold mb-2">❌ Connection Error</p>
          <p className="text-gray-600">Failed to connect to the API server</p>
        </div>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-red-600 text-2xl font-bold mb-2">❌ Failed to Load Event</p>
          <p className="text-gray-600">Status: {res.status}</p>
        </div>
      </div>
    );
  }

  const json = await res.json();
  const event = json?.data?.[0];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-3xl font-bold text-gray-800 mb-4">❌ Event Not Found</p>
          <p className="text-gray-600 mb-2">The event you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-500">Slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code></p>
          <a 
            href="/events" 
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Events
          </a>
        </div>
      </div>
    );
  }

  // Helper function to resolve image URLs
  const resolveUrl = (img: any) => {
    if (!img) return "/default-image.jpg";
    const url =
      img?.formats?.large?.url ||
      img?.formats?.medium?.url ||
      img?.formats?.small?.url ||
      img?.url;
    return url?.startsWith("http") ? url : `http://172.30.0.200:1334${url}`;
  };

  // Extract event data safely
  const eventData = event.attributes || event;
  const mainImage = eventData.mainImage?.data?.attributes || eventData.mainImage;
  const galleryImages = eventData.eventGallery?.data || eventData.eventGallery || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a 
            href="/events" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to Events
          </a>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="relative w-full h-[70vh] bg-gray-900">
        <Image
          src={resolveUrl(mainImage)}
          alt={eventData.eventTitle || "Event"}
          fill
          unoptimized
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-4">
              {eventData.eventType || "Event"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {eventData.eventTitle}
            </h1>
            {eventData.eventDate && (
              <p className="text-xl text-white/90 flex items-center gap-2">
                <span>📅</span>
                {eventData.eventDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Description Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            About This Event
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {eventData.eventDescription}
            </p>
          </div>
          
          {/* Event Meta Information */}
          <div className="mt-8 pt-6 border-t flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-500">Event Type</p>
                <p className="font-semibold">{eventData.eventType}</p>
              </div>
            </div>
            {eventData.eventDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">{eventData.eventDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GALLERY SECTION */}
        {galleryImages.length > 0 && (
          <div id="gallery" className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
              <span className="text-3xl">📸</span>
              Event Gallery
              <span className="text-sm font-normal text-gray-500 ml-auto">
                {galleryImages.length} {galleryImages.length === 1 ? 'photo' : 'photos'}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img: any, idx: number) => {
                const imgData = img.attributes || img;
                return (
                  <div
                    key={idx}
                    className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <Image
                      src={resolveUrl(imgData)}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Image number badge */}
                    <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Gallery Message */}
        {galleryImages.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">📸 No additional gallery images available</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <a 
            href="/events" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            ← Back to All Events
          </a>
        </div>
      </div>
    </div>
  );
}