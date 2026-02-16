"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Users, Award } from 'lucide-react';

const BRAND: string = "#07518a";
const GRADIENT: string = "linear-gradient(135deg, #07518a 0%, #0a6ab8 100%)";
const IK_BASE: string = "https://ik.imagekit.io/waxuvuasch/Eventimages";

interface Event {
  title: string;
  description: string;
  images: string[];
  category: string;
}

const EVENTS: Event[] = [
  {
    title: "Independence Day Celebrations",
    description: "A proud moment celebrating the spirit of freedom and patriotism. The Brihaspathi family united to honor our nation through flag hoisting, cultural events, and heartfelt tributes.",
    images: [
      `${IK_BASE}/Independencday%20Celebrations/1.jpeg`,
      `${IK_BASE}/Independencday%20Celebrations/2.jpeg`,
      `${IK_BASE}/Independencday%20Celebrations/3.jpeg`,
    ],
    category: "National"
  },
  {
    title: "Conference Room Group Photos",
    description: "Moments from our internal meetings and brainstorming sessions — where ideas come alive and innovation takes shape.",
    images: [
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.05.jpeg`,
      `${IK_BASE}/Conference%20room%20Group%20photos/WhatsApp%20Image%202025-09-16%20at%2014.43.04.jpeg`,
    ],
    category: "Corporate"
  },
  {
    title: "Vinayaka Chaturthi Celebrations 2025",
    description: "Brihaspathi Technologies celebrated Ganesh Chaturthi with devotion, prayers, and festive togetherness.",
    images: [
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/1.jpeg`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/2.jpeg`,
      `${IK_BASE}/Vinayaka%20Chaturthi%20Celebrations%20-%202025/3.jpeg`,
    ],
    category: "Festival"
  },
  {
    title: "Health Campaign",
    description: "Promoting healthy living through awareness, fitness, and preventive care.",
    images: [
      `${IK_BASE}/Health%20Campign/1.jpg`,
      `${IK_BASE}/Health%20Campign/2.jpg`,
      `${IK_BASE}/Health%20Campign/3.jpg`,
      `${IK_BASE}/Health%20Campign/4.jpg`,
    ],
    category: "Wellness"
  },
  {
    title: "Mother's Day Celebration",
    description: "Celebrating the strength, love, and warmth of mothers with gratitude.",
    images: [
      `${IK_BASE}/Mother's%20day%20Celebration/1.jpeg`,
      `${IK_BASE}/Mother's%20day%20Celebration/2.jpeg`,
      `${IK_BASE}/Mother's%20day%20Celebration/3.jpeg`,
    ],
    category: "Special Day"
  },
  {
    title: "Awards",
    description: "Highlight moments from award ceremonies and recognitions.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Awards/1.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Awards/4.jpg",
      
      "https://ik.imagekit.io/tsuss6ulm/Awards/5.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Awards/2.jpg",
    ],
    category: "Achievement"
  },
  {
    title: "Father's Day",
    description: "Celebrating the role of fathers with special moments and tributes.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/3.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/7.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/5.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/4.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/6.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/1.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Father'sDay/2.jpeg",
    ],
    category: "Special Day"
  },
  {
    title: "Women's Day",
    description: "Honoring and celebrating women at Brihaspathi.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Womensday/4.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/6.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/3.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/5.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/2.jpeg",
      "https://ik.imagekit.io/tsuss6ulm/Womensday/1.jpeg",
    ],
    category: "Special Day"
  },
  {
    title: "Credai Expo",
    description: "Highlights from our participation at major expo events.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/4.jpg",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/2.jpg",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/3.jpg",
      
      "https://ik.imagekit.io/tsuss6ulm/EXPO/CredaiExpo/5.jpg",
    ],
    category: "Expo"
  },
  {
    title: "Delhi Expo",
    description: "Highlights from our participation at major Delhi expo.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/1.JPG",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/EXPO/DelhiExpo/3.JPG",
    ],
    category: "Expo"
  },
  {
    title: "Men's Day",
    description: "Capturing the essence of Men's Day celebration.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/3.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/5.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/4.JPG",
      "https://ik.imagekit.io/tsuss6ulm/New%20Compressed%20(zipped)%20Folder/6.JPG",
    ],
    category: "Special Day"
  },
  {
    title: "Diwali",
    description: "Diwali celebrations full of lights, joy, and festive spirit.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/D/3.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/4.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/2.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/6.JPG",
      "https://ik.imagekit.io/tsuss6ulm/D/3.JPG",
    ],
    category: "Festival"
  },
  {
    title: "Tree Plantation",
    description: "Brihaspathi's green initiative — planting trees and nurturing the environment together.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/67.jpg?updatedAt=1770960427608",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/68.jpg?updatedAt=1770960427566",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/32.jpg?updatedAt=1770960427535",
      "https://ik.imagekit.io/tsuss6ulm/Tree%20Plantation/35.jpg?updatedAt=1770960427498",
    ],
    category: "Initiative"
  },
  {
    title: "Wild Waters",
    description: "Team outing at Wild Waters — fun, bonding, and memorable moments.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/26.jpg",
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/20.jpg",
      "https://ik.imagekit.io/tsuss6ulm/wild%20waters/28.jpg",
    ],
    category: "Team"
  },
  {
    title: "BTL Gallery",
    description: "A glimpse into Brihaspathi's journey — cherished moments and memories from over the years.",
    images: [
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/20230329182143_IMG_8851.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/20230329182127_IMG_8850.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210406-WA0100.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210406-WA0087.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20210401-WA0101.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG_2388.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG_2387.JPG",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20170121-WA0035.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/IMG-20170121-WA0010.jpg",
      "https://ik.imagekit.io/tsuss6ulm/Old%20photos/WhatsApp%20Image%202026-02-13%20at%2011.49.02.jpeg",
    ],
    category: "Gallery"
  },
];

const EventsShowcase: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>('All');
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories: string[] = ['All', ...Array.from(new Set(EVENTS.map(e => e.category)))];

  const filteredEvents: Event[] = filter === 'All' 
    ? EVENTS 
    : EVENTS.filter(e => e.category === filter);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [filteredEvents]);

  const openLightbox = (event: Event, imageIndex: number): void => {
    setSelectedEvent(event);
    setSelectedImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = (): void => {
    setSelectedEvent(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (): void => {
    if (selectedEvent) {
      setSelectedImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (): void => {
    if (selectedEvent) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 " >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .event-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .event-card:hover .event-image {
          transform: scale(1.05);
        }

        .event-image {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-badge {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
        }

        .gradient-text {
          background: ${GRADIENT};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .aspect-ratio-box {
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .aspect-ratio-box {
            aspect-ratio: 16/10;
          }
        }

        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Hero Section */}
      {/* <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
              Our Journey Together
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Celebrating milestones, fostering connections, and building memories that define the Brihaspathi culture of excellence and unity.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: BRAND }} />
                <span>{EVENTS.length} Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" style={{ color: BRAND }} />
                <span>Team Celebrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: BRAND }} />
                <span>Excellence & Growth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section> */}

      {/* Filter Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === cat
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
              style={filter === cat ? { background: GRADIENT } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              ref={(el) => {
  sectionsRef.current[idx] = el;
}}

              className="event-card"
              style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                {/* Event Header Image */}
                <div 
                  className="aspect-ratio-box relative cursor-pointer bg-gray-200"
                  onClick={() => openLightbox(event, 0)}
                >
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="event-image w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-medium">Click to view gallery</p>
                  </div>
                  <span className="category-badge absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ color: BRAND }}>
                    {event.category}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {event.description}
                  </p>

                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-2 mt-auto">
                    {event.images.slice(0, 4).map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="aspect-ratio-box relative cursor-pointer rounded-lg overflow-hidden group"
                        onClick={() => openLightbox(event, imgIdx)}
                      >
                        <img
                          src={img}
                          alt={`${event.title} ${imgIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {imgIdx === 3 && event.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold text-lg">
                            +{event.images.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-ratio-box mb-4">
                <img
                  src={selectedEvent.images[selectedImageIndex]}
                  alt={selectedEvent.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{selectedEvent.description}</p>
                <p className="text-gray-400 text-sm">
                  {selectedImageIndex + 1} / {selectedEvent.images.length}
                </p>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 justify-center mt-6 overflow-x-auto pb-2">
                {selectedEvent.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      idx === selectedImageIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsShowcase;