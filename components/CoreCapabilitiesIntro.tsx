"use client";

const BRAND = "#07518a";

export default function CoreCapabilitiesIntro() {
  return (
    <header
      className="py-8 sm:py-10 md:py-14 px-4 sm:px-6 md:px-8"
      aria-label="Core Capabilities section header"
    >
      <div className="max-w-4xl mx-auto text-center min-w-0 w-full">
        {/* Pill */}
        <span
          className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] border mb-4 sm:mb-5 whitespace-nowrap"
          style={{
            color: BRAND,
            borderColor: "rgba(7, 81, 138, 0.35)",
            backgroundColor: "rgba(248, 250, 251, 0.9)",
          }}
        >
          Our Expertise
        </span>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 tracking-tight leading-tight break-words">
          Core Capabilities
        </h2>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Scroll to explore each capability — end-to-end technology solutions
          that secure, connect, and power mission-critical infrastructures.
        </p>
      </div>
    </header>
  );
}
