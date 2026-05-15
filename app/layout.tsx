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

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '508391946208866');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* NoScript Fallback */}
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