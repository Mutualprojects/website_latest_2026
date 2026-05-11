'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2, FileText } from 'lucide-react';

// Dynamically import the PDF viewer with SSR disabled to avoid "DOMMatrix is not defined" error
const PDFViewer = dynamic(() => import('./PDFViewer'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-pulse" size={24} />
            </div>
            <p className="mt-6 text-gray-400 font-medium tracking-wide">Initializing secure document...</p>
        </div>
    )
});

export default function BrochurePage() {
    return <PDFViewer />;
}