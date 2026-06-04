// app/solutions/page.tsx

import Link from "next/link";
import Image from "next/image";
import { allSolutions } from "./data";
//import AIBusSolutionScroll from "@/components/AIBusSolutionScroll";

export const metadata = {
  title: "Solutions - Our Innovative Offerings",
  description:
    "Explore our range of smart solutions for transportation, security, energy, biometrics, and enterprise management.",
  alternates: {
    canonical: "https://www.brihaspathi.com/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#07518a] mb-6">
          Our Solutions
        </h1>
        <div className="h-1.5 w-32 bg-white/80 mx-auto rounded-full mb-6" />
        <p className="text-lg md:text-xl text-black/90 max-w-3xl mx-auto leading-relaxed">
          Discover cutting-edge solutions designed to transform industries
          with AI, IoT, and sustainable technologies.
        </p>
      </div>

      {/* CARDS SECTION */}
      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSolutions.map((solution, index) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-2">
                {/* Card Image Header */}
                {solution.mainbanner && (
                  <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                    <Image
                      src={solution.mainbanner}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Icon Overlay */}
                    {solution.icon && (
                      <div className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                        <Image
                          src={solution.icon}
                          alt={`${solution.title} icon`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-[#07518a]/10 rounded-full mb-3">
                      <span className="text-sm font-bold text-[#07518a]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#07518a] transition-colors">
                    {solution.title}
                  </h2>

                  {solution.description && (
                    <p className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed">
                      {solution.description}
                    </p>
                  )}

                  {/* CTA Button */}
                  <div className="inline-flex items-center gap-2 text-[#07518a] font-bold group-hover:gap-4 transition-all">
                    Learn More
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Accent Border */}
                <div className="h-1 w-0 bg-gradient-to-r from-[#07518a] to-[#064a7d] group-hover:w-full transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-br from-[#07518a] to-[#053d6b] py-16 px-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss how our solutions can help you achieve your goals.
          </p>
          <button className="inline-flex items-center gap-3 bg-white text-[#07518a] px-8 py-4 rounded-full font-bold text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}