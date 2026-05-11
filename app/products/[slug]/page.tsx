'use client';

import Image from 'next/image';
import { products, IconItem } from '../data';
import { notFound } from 'next/navigation';
import { ChevronDown, CheckCircle2, Shield, Layers, TrendingUp, Gauge } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Enhanced helper to render a list of items with LARGER icons
const renderIconList = (items: (string | IconItem)[] = []) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="flex items-start gap-5 group p-5 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#07518a]/5 to-transparent"
      >
        <div className="flex-shrink-0 mt-1">
          {typeof item === 'string' ? (
            <CheckCircle2 className="w-12 h-12 text-[#07518a] group-hover:scale-125 transition-transform duration-300" />
          ) : (
            item.icon && (
              <div className="w-12 h-12 relative">
                <Image src={item.icon} alt="" fill className="object-contain" />
              </div>
            )
          )}
        </div>
        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
          {typeof item === 'string' ? item : item.text}
        </span>
      </li>
    ))}
  </ul>
);

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = Object.values(products).find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50/40 to-white">
      {/* Hero Banner with Premium Design */}
      <div className="relative w-full overflow-hidden">
        {/* Full Height Hero */}
        <div className="relative h-[650px] w-full overflow-hidden">
          <Image
            src={product.bannerImage}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
          {/* Sophisticated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(7,81,138,.1)_25%,rgba(7,81,138,.1)_50%,transparent_50%,transparent_75%,rgba(7,81,138,.1)_75%,rgba(7,81,138,.1))] bg-[length:60px_60px]" />
          </div>

          {/* Hero Content */}
       <div className="absolute inset-0 flex items-center">

  {/* Blur + White Overlay */}
  <div className="absolute inset-0 backdrop-blur-[6px] bg-white/5"></div>

  {/* Content Container */}
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

    {/* Main Headline */}
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up">

      {product.name}

      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-200 to-white mt-3">
        Excellence Delivered
      </span>

    </h1>

    {/* Tagline */}
    <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mb-12 leading-relaxed font-light animate-fade-in-up animation-delay-100">

      {product.tagline}

    </p>

  </div>
</div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs font-semibold tracking-widest">SCROLL</span>
              <ChevronDown className="w-6 h-6 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-28">
        {/* Description Section */}
        <section className="space-y-6">
          <div className="inline-block">
            <div className="h-1.5 w-20 bg-gradient-to-r from-[#07518a] to-cyan-400 rounded-full" />
          </div>
          <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl font-light">
            {product.description}
          </p>
        </section>

        {/* Stats Section with Enhanced Interactivity */}
       

        {/* Target Industries & Key Benefits - with BIG icons */}
       <div className="flex flex-col gap-20">

  {/* Target Industries */}
  <section className="space-y-8">
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-10 bg-gradient-to-b from-[#07518a] to-cyan-400 rounded-full" />

        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Target Industries
        </h2>
      </div>

      <div className="h-1.5 w-16 bg-gradient-to-r from-[#07518a] to-transparent rounded-full" />
    </div>

    {renderIconList(product.targetIndustries)}
  </section>


  {/* Key Benefits */}
  <section className="space-y-8">
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-10 bg-gradient-to-b from-emerald-500 to-teal-400 rounded-full" />

        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Key Benefits
        </h2>
      </div>

      <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded-full" />
    </div>

    {renderIconList(product.keyBenefits)}
  </section>

</div>

        {/* Why Choose Us - Premium Cards with Enhanced Interactivity */}
        <section className="space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-10 bg-gradient-to-b from-purple-600 to-pink-400 rounded-full" />
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Why Choose Us</h2>
            </div>
            <div className="h-1.5 w-16 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(product.whyChooseUs || []).slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#07518a]/60 transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#07518a]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#07518a]/15 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <Shield className="w-10 h-10 text-[#07518a] group-hover:scale-125 transition-transform duration-300" />
                  <p className="font-semibold text-gray-900 text-lg group-hover:text-[#07518a] transition-colors duration-300">
                    {typeof item === 'string' ? item : item.text}
                  </p>
                  <div className="h-1 w-8 bg-gradient-to-r from-[#07518a] to-transparent rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Modules - Enhanced Grid with Better Interactivity */}
        {product.coreModules && product.coreModules.length > 0 && (
          <section className="space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-gradient-to-b from-orange-500 to-amber-400 rounded-full" />
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Core Modules</h2>
              </div>
              <div className="h-1.5 w-16 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {product.coreModules.map((module, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#07518a]/60 hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#07518a]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Premium Card Content */}
                  <div className="relative p-10 space-y-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                          {module.title}
                        </h3>
                        <div className="h-1.5 w-10 bg-gradient-to-r from-[#07518a] to-transparent rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                      </div>
                      {module.icon && (
                        <div className="flex-shrink-0 p-4 rounded-xl transition-all duration-300 group-hover:scale-110">
                          <Image
                            src={module.icon}
                            alt=""
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium">{module.description}</p>
                    <ul className="space-y-4">
                      {(module.features || []).map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                          <CheckCircle2 className="w-6 h-6 text-[#07518a] flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform duration-300" />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-300 font-medium">
                            {typeof feature === 'string' ? feature : feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#07518a]/60 to-cyan-400/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How It Works - Interactive Steps with Enhanced Design */}
        {product.howItWorks && product.howItWorks.length > 0 && (
          <section className="space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-gradient-to-b from-indigo-600 to-blue-400 rounded-full" />
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">How It Works</h2>
              </div>
              <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-transparent rounded-full" />
            </div>

            {/* Desktop View - Connected Steps */}
            <div className="hidden md:block relative py-8">
              <div className="absolute top-12 left-0 right-0 h-1.5 bg-gradient-to-r from-[#07518a] via-cyan-400 to-[#07518a]/30 transform" />
              <div className="grid grid-cols-6 gap-6 relative z-10">
                {product.howItWorks.map((step, idx) => (
                  <div key={idx} className="text-center">
                    <div className="group relative mb-6 flex justify-center">
                      <div className="absolute -inset-3 bg-gradient-to-r from-[#07518a] to-cyan-400 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-300 blur-lg" />
                      <div className="relative w-28 h-28 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-125 duration-300 border-4 border-white">
                        {step.icon && (
                          <Image
                            src={step.icon}
                            alt=""
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        )}
                        {!step.icon && (
                          <span className="text-white font-bold text-3xl">{idx + 1}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-base font-semibold text-gray-700 group-hover:text-[#07518a] transition-colors duration-300 mt-4">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View - Vertical Steps */}
            <div className="md:hidden space-y-8">
              {product.howItWorks.map((step, idx) => (
                <div key={idx} className="relative flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#07518a] to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg border-4 border-white hover:scale-110 transition-transform duration-300">
                      {idx + 1}
                    </div>
                    {idx < product.howItWorks!.length - 1 && (
                      <div className="w-1.5 h-16 bg-gradient-to-b from-[#07518a] to-transparent mt-3" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="font-semibold text-gray-900 text-lg">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Integrations - Enhanced Showcase */}
        {product.integrations && product.integrations.length > 0 && (
          <section className="space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-gradient-to-b from-teal-500 to-cyan-400 rounded-full" />
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Integrations</h2>
              </div>
              <div className="h-1.5 w-16 bg-gradient-to-r from-teal-500 to-transparent rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.integrations.map((integration, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#07518a]/60 hover:bg-gradient-to-br hover:from-slate-50 to-white transition-all duration-400 hover:shadow-xl hover:-translate-y-2 cursor-pointer text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#07518a]/8 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-400" />
                  <p className="relative font-bold text-gray-800 group-hover:text-[#07518a] transition-colors duration-300 text-lg tracking-tight">
                    {integration}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

        * {
          font-family: 'Inter', sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Space Grotesk', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.9s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-100 {
          animation-delay: 300ms;
        }

        .animation-delay-200 {
          animation-delay: 500ms;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f8fafc;
        }

        ::-webkit-scrollbar-thumb {
          background: #07518a;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #053d6a;
        }

        ::selection {
          background-color: #07518a;
          color: white;
        }

        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          h2 {
            font-size: 1.875rem;
          }
        }
      `}</style>
    </main>
  );
}