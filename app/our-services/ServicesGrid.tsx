"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { servicesData } from "./servicesdata";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  const router = useRouter();

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* ================= SECTION SUBHEAD (page header is above) ================= */}
      <div className="mb-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Technology solutions by category
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Explore our service offerings and find the right fit for your organization.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <button
            key={service.slug}
            onClick={() => router.push(`/our-services/${service.slug}`)}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none"
          >
            {/* ================= IMAGE ================= */}
            <div className="relative h-56 sm:h-60 lg:h-64 w-full overflow-hidden">
              {service.mainimage ? (
                <>
                  <Image
                    src={service.mainimage}
                    alt={service.title}
                    fill
                    priority={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                  Image Coming Soon
                </div>
              )}

              {/* Floating Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                  {service.title}
                </h2>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative flex flex-1 flex-col p-6">
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {service.description}
              </p>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#07518a] transition-all duration-300 group-hover:gap-3">
                <span>Explore Service</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Hover Accent */}
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#07518a] to-cyan-400 scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-left" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
