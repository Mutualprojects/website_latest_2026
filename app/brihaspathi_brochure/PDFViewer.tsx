'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { 
    Download, 
    ZoomIn, 
    ZoomOut, 
    Maximize2, 
    Loader2,
    Printer,
    FileText,
    ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Set worker path - Ensure it uses the local worker we synced
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.5.4.296.min.js';

const PDFViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        const updateWidth = () => {
            if (scrollContainerRef.current) {
                // Responsive width calculation
                const padding = window.innerWidth < 768 ? 20 : 80;
                const width = scrollContainerRef.current.clientWidth - padding;
                setContainerWidth(Math.min(width, 1100)); // Optimal reading width
            }
        };

        const handleScroll = () => {
            if (scrollContainerRef.current) {
                setShowScrollTop(scrollContainerRef.current.scrollTop > 500);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        const scrollEl = scrollContainerRef.current;
        scrollEl?.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('resize', updateWidth);
            scrollEl?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f0f2f5] text-slate-900 font-sans selection:bg-blue-100">
            {/* Ultra-Responsive Pro Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3 shadow-sm no-print">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                            <FileText size={20} className="text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-sm md:text-lg font-bold tracking-tight text-slate-900 truncate">
                                Brihaspathi <span className="text-blue-600">Brochure</span>
                            </h1>
                            <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-slate-500 font-bold truncate">
                                {numPages ? `${numPages} Pages • Interactive View` : 'Loading...'}
                            </p>
                        </div>
                    </div>

                    {/* Toolbar - Optimized for Mobile */}
                    <div className="flex items-center gap-1 md:gap-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                        <div className="hidden sm:flex items-center px-1">
                            <button 
                                onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <span className="w-12 text-[11px] font-bold text-slate-700">
                                {Math.round(scale * 100)}%
                            </span>
                            <button 
                                onClick={() => setScale(prev => Math.min(prev + 0.1, 3.0))}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
                            >
                                <ZoomIn size={16} />
                            </button>
                        </div>

                        <div className="hidden sm:block w-px h-6 bg-slate-200 mx-1" />

                        <div className="flex gap-1">
                            <button 
                                onClick={toggleFullScreen}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
                                title="Fullscreen"
                            >
                                <Maximize2 size={16} />
                            </button>
                            <button 
                                onClick={() => window.print()}
                                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
                                title="Print"
                            >
                                <Printer size={16} />
                            </button>
                            <a 
                                href="/brochures/brihaspathi_brochure.pdf" 
                                download 
                                className="flex items-center gap-2 px-3 md:px-5 py-2 bg-slate-900 hover:bg-black text-white text-[11px] md:text-xs font-bold rounded-lg transition-all shadow-md"
                            >
                                <Download size={14} className="flex-shrink-0" />
                                <span className="hidden xs:inline">Download</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full Screen Scroll View Area */}
            <main 
                ref={scrollContainerRef}
                className="pt-16 h-screen overflow-y-auto custom-scroll flex flex-col items-center gap-6 md:gap-12 pb-12"
            >
                <div className="w-full flex justify-center pt-8 md:pt-12 px-4">
                    <Document
                        file="/brochures/brihaspathi_brochure.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center justify-center py-40">
                                <div className="relative">
                                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
                                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={18} />
                                </div>
                                <p className="mt-4 text-slate-400 text-xs font-medium tracking-widest uppercase">Initializing Brochure</p>
                            </div>
                        }
                    >
                        {numPages && Array.from(new Array(numPages), (el, index) => (
                            <motion.div
                                key={`page_${index + 1}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index < 3 ? index * 0.1 : 0 }}
                                className="mb-6 md:mb-12 relative group last:mb-0"
                            >
                                {/* Page Indicator */}
                                <div className="absolute -top-6 left-0 text-[9px] font-black tracking-widest text-slate-300 uppercase">
                                    Page {index + 1}
                                </div>
                                
                                <div className="shadow-[0_15px_60px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden border border-slate-200/60 bg-white ring-1 ring-black/5">
                                    <Page 
                                        pageNumber={index + 1} 
                                        scale={scale}
                                        width={containerWidth || undefined}
                                        className="pdf-page"
                                        renderAnnotationLayer={true}
                                        renderTextLayer={true}
                                        loading={
                                            <div 
                                                className="bg-white flex items-center justify-center" 
                                                style={{ 
                                                    width: containerWidth || 800, 
                                                    height: (containerWidth || 800) * 1.414 
                                                }}
                                            >
                                                <div className="w-6 h-6 border-2 border-slate-100 border-t-blue-400 rounded-full animate-spin" />
                                            </div>
                                        }
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </Document>
                </div>

                {/* Footer Info */}
                <div className="py-12 flex flex-col items-center gap-4 text-slate-400 no-print">
                    <div className="w-12 h-1 bg-slate-200 rounded-full" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Official Brihaspathi Portfolio</p>
                </div>
            </main>

            {/* Floating Action: Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white text-slate-900 rounded-full shadow-2xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors no-print"
                    >
                        <ChevronUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .pdf-page canvas {
                    margin: 0 auto !important;
                    display: block !important;
                    max-width: 100% !important;
                    height: auto !important;
                }
                .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: #f0f2f5;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 10px;
                    border: 2px solid #f0f2f5;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }
                
                @media (max-width: 640px) {
                    .pdf-page canvas {
                        width: 100% !important;
                    }
                }

                @media print {
                    header, button, .no-print {
                        display: none !important;
                    }
                    main {
                        padding-top: 0 !important;
                        height: auto !important;
                        overflow: visible !important;
                    }
                    .pdf-page {
                        box-shadow: none !important;
                        border: none !important;
                        margin-bottom: 0 !important;
                        page-break-after: always;
                    }
                }
            `}</style>
        </div>
    );
};

export default PDFViewer;
