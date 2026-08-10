"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info, X, Search, Grid3x3, ChevronDown } from "lucide-react";

interface Hotspot {
    id: string;
    label: string;
    description: string;
    category: "imaging" | "power" | "control" | "mobility";
    x: number;
    y: number;
}

const HOTSPOTS: Hotspot[] = [
    {
        id: "ptz-camera",
        label: "PTZ Surveillance Camera",
        description: "High-definition Pan-Tilt-Zoom camera providing 360-degree coverage and powerful optical zoom for detailed monitoring of distant activities.",
        category: "imaging",
        x: 55,
        y: 11
    },
    {
        id: "bullet-camera",
        label: "Fixed Bullet Camera",
        description: "Dedicated fixed-angle camera for continuous, uninterrupted recording of critical choke points or specific targeted areas.",
        category: "imaging",
        x: 65,
        y: 19
    },
    {
        id: "floodlights",
        label: "Four-Unit LED Floodlight Array",
        description: "High-intensity LED floodlights that illuminate the surrounding area, triggered automatically or scheduled for nighttime visibility.",
        category: "imaging",
        x: 35,
        y: 22
    },
    {
        id: "telescopic-mast",
        label: "Telescopic Mast",
        description: "Heavy-duty retractable mast that elevates the camera and lighting array for maximum vantage point and wide-area coverage.",
        category: "mobility",
        x: 59,
        y: 35
    },
    {
        id: "solar-array",
        label: "Solar PV Array",
        description: "High-efficiency solar panels that capture sunlight to charge the internal battery bank, ensuring 100% off-grid operation.",
        category: "power",
        x: 28,
        y: 53
    },
    {
        id: "control-cabinet",
        label: "Central Power & Control Cabinet",
        description: "Secure, weatherproof enclosure housing the intelligent energy management system, batteries, and edge AI processing units.",
        category: "control",
        x: 33,
        y: 74
    },
    {
        id: "mast-winch",
        label: "Manual Mast Winch",
        description: "Reliable manual winch system allowing operators to safely raise and lower the telescopic mast during deployment.",
        category: "mobility",
        x: 66,
        y: 65
    },
    {
        id: "internal-components",
        label: "Lithium Battery & Comm Module",
        description: "Deep-cycle lithium battery bank paired with a 4G/5G cellular modem for uninterrupted power and remote live video transmission.",
        category: "power",
        x: 52,
        y: 73
    },
    {
        id: "chassis",
        label: "Rugged Trailer Chassis",
        description: "Industrial-grade mobile trailer chassis designed to withstand harsh terrain and construction site environments.",
        category: "mobility",
        x: 65,
        y: 83
    },
    {
        id: "stabilizers",
        label: "Stabilizer Outrigger Jacks",
        description: "Adjustable leveling jacks that secure the trailer in place and prevent movement during high winds or uneven terrain.",
        category: "mobility",
        x: 39,
        y: 89
    },
    {
        id: "tow-hitch",
        label: "Adjustable Tow Hitch",
        description: "Standard tow hitch for easy transportation behind trucks or site vehicles, enabling rapid deployment in under 15 minutes.",
        category: "mobility",
        x: 88,
        y: 86
    }
];

const CATEGORIES = {
    imaging: { label: "Imaging", color: "from-red-500 to-pink-500", lightBg: "bg-red-50", badge: "text-red-700 bg-red-100" },
    power: { label: "Power Systems", color: "from-yellow-500 to-orange-500", lightBg: "bg-yellow-50", badge: "text-yellow-700 bg-yellow-100" },
    control: { label: "Control & AI", color: "from-purple-500 to-indigo-500", lightBg: "bg-purple-50", badge: "text-purple-700 bg-purple-100" },
    mobility: { label: "Mobility", color: "from-blue-500 to-cyan-500", lightBg: "bg-blue-50", badge: "text-blue-700 bg-blue-100" }
};

export default function InteractiveDiagram() {
    const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
    const [showMobileList, setShowMobileList] = useState(false);
    const diagramRef = useRef<HTMLDivElement>(null);

    const filteredHotspots = HOTSPOTS.filter(hotspot => {
        const matchesSearch = hotspot.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotspot.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || hotspot.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveHotspot(null);
            }
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                const currentIndex = activeHotspot
                    ? filteredHotspots.findIndex(h => h.id === activeHotspot.id)
                    : -1;
                const nextIndex = e.key === "ArrowDown"
                    ? (currentIndex + 1) % filteredHotspots.length
                    : (currentIndex - 1 + filteredHotspots.length) % filteredHotspots.length;
                setActiveHotspot(filteredHotspots[nextIndex]);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeHotspot, filteredHotspots]);

    return (
        <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden antialiased">
            {/* Header */}
            <div className="relative border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-2 font-sans">
                                Spectra Mobile Solar CCTV
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed font-sans">
                                Explore every component of our advanced surveillance system. Click hotspots on the diagram or select from the component list to learn more.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                            {/* Search */}
                            <div className="relative flex-1 min-w-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search components..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white shadow-sm transition-all font-sans"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="relative group">
                                <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 bg-white shadow-sm font-sans">
                                    <Grid3x3 className="w-4 h-4" />
                                    <span>Categories</span>
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-slate-50 transition-colors font-sans ${!selectedCategory ? "text-cyan-600 font-semibold bg-cyan-50/50" : "text-slate-700"}`}
                                    >
                                        All Components
                                    </button>
                                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedCategory(key)}
                                            className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-slate-50 transition-colors border-l-2 font-sans ${selectedCategory === key ? "border-cyan-500 text-cyan-600 font-semibold bg-cyan-50/50" : "border-transparent text-slate-700"}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
                    {/* Diagram Section (Left Side - 50% Width, 100vh Height) */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-center justify-center">
                        <div
                            ref={diagramRef}
                            className="relative w-full h-[100vh] min-h-[500px] flex items-center justify-center group overflow-hidden"
                        >
                            <img
                                src="/mmr/solar-spectra-diagram.png"
                                alt="Mobile Solar CCTV Components Diagram"
                                className="w-full h-full object-contain filter drop-shadow-2xl"
                            />

                            {/* Animated Background Grid */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500"></div>
                            </div>

                            {/* Hotspots */}
                            {filteredHotspots.map((hotspot) => {
                                const isActive = activeHotspot?.id === hotspot.id;
                                const isHovered = hoveredHotspot === hotspot.id;
                                const catColor = CATEGORIES[hotspot.category].color;

                                return (
                                    <button
                                        key={hotspot.id}
                                        onClick={() => setActiveHotspot(isActive ? null : hotspot)}
                                        onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                                        onMouseLeave={() => setHoveredHotspot(null)}
                                        className="absolute group/hotspot transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 rounded-full"
                                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                        aria-label={`View details for ${hotspot.label}`}
                                    >
                                        <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                                            {/* Outer pulse ring */}
                                            <span className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive || isHovered ? 'bg-gradient-to-r ' + catColor + ' animate-pulse opacity-50' : 'bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse opacity-20 group-hover/hotspot:opacity-40'}`}></span>

                                            {/* Middle ring */}
                                            <span className={`absolute inset-1 rounded-full transition-all duration-300 backdrop-blur-sm ${isActive || isHovered ? 'bg-white/30' : 'bg-white/10'}`}></span>

                                            {/* Core dot */}
                                            <span className={`relative z-10 rounded-full w-4 h-4 sm:w-5 sm:h-5 shadow-lg transition-all duration-200 border-2 border-white ${isActive ? `bg-gradient-to-r ${catColor} scale-125 shadow-xl` : 'bg-gradient-to-r from-blue-500 to-cyan-500 group-hover/hotspot:scale-110'}`}></span>
                                        </div>

                                        {/* Tooltip on hover */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover/hotspot:opacity-100 group-hover/hotspot:visible transition-all pointer-events-none z-20">
                                            <div className="bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                                                {hotspot.label}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Results Count */}
                        {(searchTerm || selectedCategory) && (
                            <div className="mt-4 w-full text-sm text-slate-600 flex items-center justify-between">
                                <span>
                                    Showing <span className="font-semibold text-slate-900">{filteredHotspots.length}</span> of <span className="font-semibold text-slate-900">{HOTSPOTS.length}</span> components
                                </span>
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory(null);
                                    }}
                                    className="text-cyan-600 hover:text-cyan-700 font-medium"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Details Section (Right Side - 50% Width) */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="space-y-4">
                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setShowMobileList(!showMobileList)}
                                className="lg:hidden w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-medium text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-between"
                            >
                                <span>Component Details</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showMobileList ? "rotate-180" : ""}`} />
                            </button>

                            {/* Detail Panel */}
                            <div className={`${showMobileList ? "block" : "hidden"} lg:block`}>
                                {activeHotspot ? (
                                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 relative group/panel animate-in fade-in slide-in-from-right-4 duration-300">
                                        {/* Category Badge */}
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${CATEGORIES[activeHotspot.category].badge}`}>
                                                {CATEGORIES[activeHotspot.category].label}
                                            </span>
                                            <button
                                                onClick={() => setActiveHotspot(null)}
                                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
                                                aria-label="Close details"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CATEGORIES[activeHotspot.category].color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                            <Info size={24} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-tight">
                                            {activeHotspot.label}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                                            {activeHotspot.description}
                                        </p>

                                        {/* Navigation Buttons */}
                                        <div className="flex gap-2 pt-4 border-t border-slate-200">
                                            <button
                                                onClick={() => {
                                                    const currentIndex = filteredHotspots.findIndex(h => h.id === activeHotspot.id);
                                                    const prevIndex = (currentIndex - 1 + filteredHotspots.length) % filteredHotspots.length;
                                                    setActiveHotspot(filteredHotspots[prevIndex]);
                                                }}
                                                className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium py-2 px-3 rounded hover:bg-slate-100 transition-all"
                                            >
                                                ← Previous
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const currentIndex = filteredHotspots.findIndex(h => h.id === activeHotspot.id);
                                                    const nextIndex = (currentIndex + 1) % filteredHotspots.length;
                                                    setActiveHotspot(filteredHotspots[nextIndex]);
                                                }}
                                                className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium py-2 px-3 rounded hover:bg-slate-100 transition-all"
                                            >
                                                Next →
                                            </button>
                                        </div>

                                        {/* Hint Text */}
                                        <p className="text-xs text-slate-400 mt-4">
                                            Use arrow keys to navigate • Press Escape to close
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-8 border border-slate-200 border-dashed text-center h-full flex flex-col items-center justify-center min-h-[320px] sm:min-h-[400px]">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
                                            <Info className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <p className="text-sm text-slate-600 font-medium mb-2">
                                            Select a Component
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Click on pulsing hotspots on the diagram or use the component list below to explore the system.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Component List */}
                            <div className={`${showMobileList ? "block" : "hidden"} lg:block`}>
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-slate-900 px-2">All Components</h3>
                                    <div className="space-y-1 max-h-96 overflow-y-auto">
                                        {filteredHotspots.length > 0 ? (
                                            filteredHotspots.map((hotspot) => (
                                                <button
                                                    key={hotspot.id}
                                                    onClick={() => {
                                                        setActiveHotspot(hotspot);
                                                        setShowMobileList(false);
                                                    }}
                                                    onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                                                    onMouseLeave={() => setHoveredHotspot(null)}
                                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium border ${activeHotspot?.id === hotspot.id
                                                        ? 'bg-gradient-to-r ' + CATEGORIES[hotspot.category].color + ' text-white border-transparent shadow-md'
                                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${CATEGORIES[hotspot.category].color}`}></div>
                                                        {hotspot.label}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-3 py-8 text-center">
                                                <p className="text-sm text-slate-500">No components found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}