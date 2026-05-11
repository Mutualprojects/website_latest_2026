"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  Calendar,
  Building2,
  Maximize2,
  X,
} from "lucide-react";

const PDF_URL =
  "https://ik.imagekit.io/cbrrjodcw/brihaspathi-technology-brochure.pdf";

export default function BrochureViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-10">

        {/* Title */}
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-[#07518a]">
            Company Brochure
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Preview or download our official brochure
          </p>
        </div>

        {/* Toolbar */}
        <div className="max-w-6xl mx-auto bg-white border rounded-lg shadow-sm p-4 flex flex-wrap justify-between items-center gap-4">

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 size={16} color="#07518a" />
              Brihaspathi Technology
            </div>
            <div className="flex items-center gap-1">
              <FileText size={16} color="#07518a" />
              Brochure
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} color="#07518a" />
              Latest Edition
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 border rounded-md hover:bg-gray-100"
            >
              <Maximize2 size={16} />
            </button>

            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-2 px-4 py-2 text-white rounded-md text-sm font-medium"
              style={{ backgroundColor: "#07518a" }}
            >
              <Download size={16} />
              Download
            </a>
          </div>
        </div>

        {/* Viewer */}
        <div className="max-w-6xl mx-auto bg-white border rounded-lg shadow-sm mt-6 overflow-hidden">
          <iframe
            src={`${PDF_URL}#toolbar=1`}
            title="Brihaspathi Brochure"
            className="w-full h-[75vh]"
            loading="lazy"
          />
        </div>

      </div>

      {/* Fullscreen */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">

          <div
            className="flex justify-between items-center px-6 py-3 text-white"
            style={{ backgroundColor: "#07518a" }}
          >
            <span className="text-sm font-medium">
              Brihaspathi Technology – Brochure
            </span>

            <div className="flex gap-3">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 text-sm"
              >
                <Download size={14} />
                Download
              </a>

              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1 text-sm"
              >
                <X size={14} />
                Close
              </button>
            </div>
          </div>

          <iframe
            src={`${PDF_URL}#toolbar=1`}
            className="flex-1 w-full"
            title="Fullscreen Brochure"
          />
        </div>
      )}
    </>
  );
}