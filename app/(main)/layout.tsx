import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";
import HoverFooter from "@/components/HoverFooter";
import BackToTopButton from "@/components/BackToTopButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ===== Header ===== */}
      <NavigationMenuDemo />

      <main className="min-h-[70vh]">
        {children}
      </main>

      <BackToTopButton />

      {/* ===== Footer ===== */}
      <HoverFooter />
    </>
  );
}
