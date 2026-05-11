import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
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
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
