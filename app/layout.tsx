import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import LayoutContent from "./LayoutContent";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brihaspathi technologies limited",
  description:
    "Brihaspathi Technologies Limited – Empowering a connected, secure, and sustainable future through innovative e-security, AI, IoT, renewable energy, and next-generation technology solutions since 2006.",

  verification: {
    google: "ck26sVHjxDLMzB7IVXvPc2VqP8RG0c94F9H1IADdVFE",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brihaspathi Technologies Limited",
  "alternateName": "Brihaspathi Tech",
  "url": "https://www.brihaspathi.com/",
  "logo": "https://www.brihaspathi.com/images/logo.png",
  "description": "Brihaspathi Technologies develops and delivers AI, security, surveillance, software, and smart infrastructure solutions to help organizations improve safety, automation, and digital operations.",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-98858-88835",
      "email": "info@brihaspathi.com",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Telugu", "Hindi"]
    }
  ],
  "sameAs": [
    "https://x.com/Brihaspathitec",
    "https://in.pinterest.com/brihaspathitechnologieslimited/",
    "https://www.instagram.com/brihaspathi_tech_official/",
    "https://www.facebook.com/BrihaspathiTechnology",
    "https://www.youtube.com/@brihaspathi",
    "https://www.linkedin.com/company/brihaspathi-technologies/"
  ]
};

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans text-gray-900 bg-white selection:bg-[#FCC012]/30 selection:text-[#0a6ab8] transition-colors duration-300">
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T7X6QFR6');
          `}
        </Script>

        {/* Google Tag Manager NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7X6QFR6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '508391946208866');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Facebook Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=508391946208866&ev=PageView&noscript=1"
          />
        </noscript>

        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
