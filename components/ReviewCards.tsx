"use client";

import Image from "next/image";
import Link from "next/link";

type Review = {
  name: string;
  logo: string;
  rating: number;
  link: string;
};

const reviews: Review[] = [
  {
    name: "Glassdoor",
    logo: "/Reviews_Banners_Logos/Glassdoor.png", // ✅ public folder lo petti use cheyyi
    rating: 4.6,
    link: "https://www.glassdoor.co.in/Reviews/Brihaspathi-Technologies-Reviews-E1871367.htm",
  },
  {
    name: "Google",
    logo: "/Reviews_Banners_Logos/Google.png", // ✅ public folder lo petti use cheyyi
    rating: 4.5,
    link: "https://www.google.com/maps/place/Brihaspathi+Technologies+Limited/@17.4254372,78.4213108,384m/data=!3m1!1e3!4m18!1m9!3m8!1s0x3bcb98ee53f272eb:0x9d0e4f397c0bbaa9!2sBrihaspathi+Technologies+Limited!8m2!3d17.4256371!4d78.4201696!9m1!1b1!16s%2Fg%2F1tdzdfx0!3m7!1s0x3bcb98ee53f272eb:0x9d0e4f397c0bbaa9!8m2!3d17.4256371!4d78.4201696!9m1!1b1!16s%2Fg%2F1tdzdfx0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "AmbitionBox",
    logo: "/Reviews_Banners_Logos/Ambitionbox.png",
    rating: 4.5,
    link: "https://www.ambitionbox.com/reviews/brihaspathi-technologies-reviews",
  },
  {
    name: "Justdial",
    logo: "/Reviews_Banners_Logos/Justdail.png",
    rating: 4.2,
    link: "https://www.justdial.com/Hyderabad/Brihaspathi-Technologies-Pvt-Ltd-Above-Ratna-Deep-Super-Marketsrinagar-Colony-Banjara-Hills/040PXX40-XX40-100201154341-N7E2_BZDET",
  },
];

export default function ReviewCards() {
  return (
    <div className="flex gap-4 flex-wrap  ">
      {reviews.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          className="flex items-center gap-3 background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%); shadow-md rounded-2xl px-4 py-3 hover:shadow-lg transition-all border border-gray-100 "
        >
          {/* Logo */}
          <div className="w-10 h-10 relative">
            <Image
              src={item.logo}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 10vw"
              className="object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              {item.name}
            </span>

            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm font-medium text-gray-700">
                {item.rating}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}