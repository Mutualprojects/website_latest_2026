"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, Tv } from "lucide-react";

const CHANNELS = [
  {
    name: "NDTV English",
    url: "https://www.ndtv.com/video/live/channel/ndtv24x7",
    color: "from-red-600 to-red-800",
    description: "Real-time updates from one of India's most trusted news networks.",
  },
  {
    name: "BBC World News",
    url: "https://www.bbc.com/news/world",
    color: "from-rose-700 to-rose-900",
    description: "International news and current affairs from the British perspective.",
  },
  {
    name: "CNN International",
    url: "https://edition.cnn.com/world",
    color: "from-red-500 to-red-700",
    description: "Global breaking news and detailed analysis from around the world.",
  },
  {
    name: "Al Jazeera English",
    url: "https://www.aljazeera.com/live",
    color: "from-amber-600 to-amber-800",
    description: "Comprehensive news coverage focusing on global South perspectives.",
  },
  {
    name: "Times Now",
    url: "https://www.timesnownews.com/live-tv",
    color: "from-blue-700 to-blue-900",
    description: "Leading English news channel in India for trending and breaking news.",
  },
  {
    name: "Reuters",
    url: "https://www.reuters.com/",
    color: "from-orange-600 to-orange-800",
    description: "Reliable global news and financial data from the world's newsroom.",
  },
];

export default function InteractiveNewsChannels() {
  return (
    <section className="py-20 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400"
            >
              Live Global Networks
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 text-lg"
            >
              Stay connected with the world through our curated selection of premium news broadcasters. 
              Real-time reporting, anytime, anywhere.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-sm font-medium"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            LIVE BROADCASTS
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative block p-6 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                    <Tv className="w-6 h-6 text-white" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                  {channel.name}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors">
                  {channel.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-600 group-hover:text-white transition-colors">
                  <span>Watch Live</span>
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
