/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/strapi/:path*",
        destination: "http://183.82.117.36:2334/:path*",
      },
      {
        source: "/cms-api/:path*",
        destination: "http://183.82.117.36:2334/:path*",
      },
      {
        source: "/backend-api/:path*",
        destination: "http://183.82.117.36:1337/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.ambitionbox.com",
      },
      {
        protocol: "https",
        hostname: "akam.cdn.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "www.glassdoor.com",
      },
      {
        protocol: "http",
        hostname: "183.82.117.36",
        port: "2334",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },

  transpilePackages: ["framer-motion", "motion", "@tanstack/react-query"],

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  productionBrowserSourceMaps: false,
};

export default nextConfig;