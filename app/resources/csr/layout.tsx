import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR Initiatives",
  description:
    "Brihaspathi's Corporate Social Responsibility initiatives: Book Distribution (FY 2024–25), Vision Care Support, Educational Sponsorship, and Public Safety (FY 2025–26). Investing in education, healthcare, and community well-being.",
};

export default function CSRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
