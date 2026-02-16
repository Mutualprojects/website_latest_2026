// // app/layout.tsx
// import type { Metadata } from "next";
// import "./globals.css";
// import LayoutWrapper from "../components/ui/LayoutWrapper";

// export const metadata: Metadata = {
//   title: {
//     default:
//       "CCTV Installation, Biometric Attendance, Solar & ELV System Company in Hyderabad | Brihaspathi",
//     template: "%s | Brihaspathi Technologies Pvt Ltd",
//   },
//   description:
//     "Brihaspathi Technologies – Leading CCTV camera, biometric access control, solar power plant & ELV system integrator in Hyderabad, Telangana, India. 15+ years experience | 10,000+ installations | PAN India service.",
//   keywords:
//     "CCTV installation Hyderabad, biometric attendance system Hyderabad, solar power company India, ELV system integrator, security systems Hyderabad, access control system, Brihaspathi Technologies, CCTV dealers Hyderabad, solar panel installation Telangana, biometric dealers India, fire alarm system, GPS vehicle tracking",

//   // Open Graph / Facebook & LinkedIn
//   openGraph: {
//     title: "Brihaspathi Technologies – CCTV, Biometric, Solar & ELV Solutions India",
//     description: "Trusted by 10,000+ clients | 15+ Years Experience | Nationwide Presence | ISO Certified",
//     url: "https://www.brihaspathi.com",
//     siteName: "Brihaspathi Technologies Pvt Ltd",
//     images: [
//       {
//         url: "https://www.brihaspathi.com/og-image.jpg", // Upload 1200×630 image
//         width: 1200,
//         height: 630,
//         alt: "Brihaspathi Technologies – Leading Security & Solar Solutions Provider in India",
//       },
//     ],
//     locale: "en_IN",
//     type: "website",
//   },

//   // Twitter (X) Card
//   twitter: {
//     card: "summary_large_image",
//     title: "Brihaspathi Technologies – CCTV & Security Solutions India",
//     description: "Best CCTV Installation, Biometric & Solar System Company in Hyderabad",
//     images: ["https://www.brihaspathi.com/og-image.jpg"],
//     creator: "@brihaspathitech",
//   },

//   // Robots & Indexing
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },

//   // Canonical & Alternates
//   alternates: {
//     canonical: "https://www.brihaspathi.com",
//   },

//   // Google Search Console Verification (replace with your real code)
//   verification: {
//     google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
//   },

//   // Additional SEO Power
//   category: "technology",
//   classification: "Security Systems, Solar Energy, Biometric Solutions",
//   referrer: "origin-when-cross-origin",
//   creator: "Brihaspathi Technologies Pvt Ltd",
//   publisher: "Brihaspathi Technologies Pvt Ltd",
//   formatDetection: { telephone: true, email: true },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* === FULL ORGANIZATION + LOCAL BUSINESS SCHEMA (Google Gold) === */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Organization",
//               name: "Brihaspathi Technologies Pvt Ltd",
//               legalName: "Brihaspathi Technologies Private Limited",
//               url: "https://www.brihaspathi.com",
//               logo: "https://www.brihaspathi.com/highbtlogo%20white-%20tm.png",
//               foundingDate: "2006",
//               founders: [
//                 {
//                   "@type": "Person",
//                   name: "Mr. Rajasekhar",
//                 },
//               ],
//               description:
//                 "India's leading system integrator for CCTV surveillance, biometric access control, solar energy solutions, ELV systems, fire safety, GPS tracking and custom software development.",
//               address: {
//                 "@type": "PostalAddress",
//                 streetAddress: "7-1-621/109, Sai Manor Complex, Srinivasa Nagar West, SR Nagar",
//                 addressLocality: "Hyderabad",
//                 addressRegion: "Telangana",
//                 postalCode: "500038",
//                 addressCountry: "IN",
//               },
//               contactPoint: {
//                 "@type": "ContactPoint",
//                 telephone: "+91-9581234499",
//                 contactType: "Customer Service",
//                 email: "info@brihaspathi.com",
//                 availableLanguage: ["English", "Telugu", "Hindi"],
//               },
//               sameAs: [
//                 "https://www.facebook.com/brihaspathitechnologies",
//                 "https://www.linkedin.com/company/brihaspathi-technologies",
//                 "https://twitter.com/brihaspathitech",
//                 "https://www.instagram.com/brihaspathitechnologies",
//                 "https://www.youtube.com/@brihaspathitechnologies",
//               ],
//               areaServed: "India",
//               serviceType:
//                 "CCTV Installation, Biometric Attendance, Solar Power Plant, ELV Systems, Security Solutions",
//               hasOfferCatalog: {
//                 "@type": "OfferCatalog",
//                 name: "Security & Energy Solutions",
//                 itemListElement: [
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "CCTV Surveillance Systems",
//                     },
//                   },
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Biometric Access Control",
//                     },
//                   },
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Solar Power Solutions",
//                     },
//                   },
//                 ],
//               },
//             }),
//           }}
//         />
//       </head>

//       <body>
//         <LayoutWrapper>{children}</LayoutWrapper>
//       </body>
//     </html>
//   );
// }  


// // app/layout.tsx
// import "./globals.css";
// import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";

// import { Inter, Manrope } from "next/font/google";

// // ===== Font Setup =====
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const manrope = Manrope({
//   subsets: ["latin"],
//   variable: "--font-manrope",
//   weight: ["400", "600", "700", "800"],
//   display: "swap",
// });

// // ===== Metadata =====
// export const metadata = {
//   title: "SkyVolt | Powering India's Clean Energy Future",
//   description:
//     "SkyVolt Renewable Pvt. Ltd. – Driving India's solar revolution through smart EPC solutions and sustainable technology.",
// };

// // ===== Root Layout =====
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html
//       lang="en"
//       className={`${inter.variable} ${manrope.variable} scroll-smooth antialiased`}
//     >
      
//         <body
//         className="font-body text-gray-900 bg-white selection:bg-[#FCC012]/30 selection:text-[#0a6ab8] transition-colors duration-300"
//       >
//         {/* ===== Header Navigation ===== */}
//         <NavigationMenuDemo />

//         {/* ===== Main Content ===== */}
//         <main className="min-h-[70vh]">
//           {children}
//         </main>

//         {/* ===== Footer ===== */}
    
//       </body>
//     </html>
//   );
// }
import BackToTopButton from "@/components/BackToTopButton";
import "./globals.css";
import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import HoverFooter from "@/components/HoverFooter";

// ===== Font Setup – DM Sans for entire website =====
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Brihaspathi technologies limited",
  description:
    "Brihaspathi Technologies Limited – Empowering a connected, secure, and sustainable future through innovative e-security, AI, IoT, renewable energy, and next-generation technology solutions since 2006.",
};

// ===== Root Layout =====
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} scroll-smooth antialiased`}
    >
      <body className="font-sans text-gray-900 bg-white selection:bg-[#FCC012]/30 selection:text-[#0a6ab8] transition-colors duration-300">
        {/* ===== Header Navigation ===== */}
        <NavigationMenuDemo />

        <main className="min-h-[70vh] pt-14 md:pt-16">{children}



        </main>
       <BackToTopButton/>

        {/* ===== Footer ===== */}
        {/* Add footer here if needed */}

        <HoverFooter/>
      </body>
    </html>
  );
}
