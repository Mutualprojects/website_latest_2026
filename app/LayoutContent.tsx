"use client";

import { usePathname } from "next/navigation";
import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";
import HoverFooter from "@/components/HoverFooter";
import BackToTopButton from "@/components/BackToTopButton";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHrPage = pathname?.startsWith("/hr");

  if (isHrPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <NavigationMenuDemo />
      <main className="min-h-[70vh] pt-14 md:pt-16">{children}</main>
      <BackToTopButton />
      <HoverFooter />
    </>
  );
}
