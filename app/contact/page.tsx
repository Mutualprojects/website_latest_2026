import React from "react";
import ContactFormBrand from "./ContactFormBrand";
import BrihaspathiLocations from "./Brihaspathilocations";

export const metadata = {
  title: "Contact — Brihaspathi Technologies Limited",
  alternates: {
    canonical: "https://www.brihaspathi.com/contact",
  },
};

function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactFormBrand />
      <BrihaspathiLocations />
    </main>
  );
}

export default ContactPage;
