"use client";

import { usePathname } from "next/navigation";
import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";
import HoverFooter from "@/components/HoverFooter";
import BackToTopButton from "@/components/BackToTopButton";
import ChatButton from "@/components/ChatButton";
import CookieConsent from "@/components/CookieConsent";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHrPage = pathname?.startsWith("/hr");

  if (isHrPage) {
    return <main>{children}</main>;
  }

  // Generate dynamic BreadcrumbList Schema for all inner pages
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  let breadcrumbSchema = null;

  if (pathname && pathname !== "/" && !isHrPage) {
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.brihaspathi.com/"
      }
    ];

    let currentPath = "https://www.brihaspathi.com";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format segment name nicely (e.g. "software-products-services" -> "Software Products Services")
      let name = segment
        .split("-")
        .map(word => {
          const lower = word.toLowerCase();
          if (lower === "epc") return "EPC";
          if (lower === "vms") return "VMS";
          if (lower === "ai") return "AI";
          if (lower === "csr") return "CSR";
          if (lower === "cmd") return "CMD";
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": currentPath
      });
    });

    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  }

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <NavigationMenuDemo />
      <main className="min-h-[70vh] pt-14 md:pt-16">{children}</main>
      <BackToTopButton />
      <ChatButton />
      <CookieConsent />
      <HoverFooter />
    </>
  );
}
