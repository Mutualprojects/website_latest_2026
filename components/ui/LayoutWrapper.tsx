"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "../../app/components/Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  // Hide header on /super-admin and any nested routes
  const hideHeader = pathname === "/super-admin" || pathname.startsWith("/super-admin/");

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
