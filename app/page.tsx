import Home from '@/components/Home'
import React from 'react'

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brihaspathi Technologies Limited",
  "url": "https://www.brihaspathi.com/",
  "logo": "https://www.brihaspathi.com/images/logo.png",
  "image": "https://www.brihaspathi.com/images/office.jpg",
  "description": "Brihaspathi Technologies develops and delivers AI, security, surveillance, software, and smart infrastructure solutions to help organizations improve safety, automation, and digital operations.",
  "telephone": "+91-98858-88835",
  "email": "info@brihaspathi.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shangrila Plaza, 501, #508-510, Park View Enclave, Banjara Hills, Hyderabad, Telangana 500034",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500034",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.425605 ",
    "longitude": "78.420238 "
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "18:30"
    }
  ],
  "priceRange": "$$",
  "sameAs": [
    "https://x.com/Brihaspathitec",
    "https://www.instagram.com/brihaspathi_tech_official/",
    "https://www.facebook.com/BrihaspathiTechnology",
    "https://www.linkedin.com/company/brihaspathi-technologies/"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Brihaspathi Technologies Limited",
  "url": "https://www.brihaspathi.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.brihaspathi.com/?s=Brihaspathi+Technologies+Limited"
    },
    "query-input": "required name=Brihaspathi+Technologies+Limited"
  }
};

function page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Home/>
    </div>
  )
}

export default page