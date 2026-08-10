import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/hr/',
        '/super-admin/',
        '/login',
      ],
    },
    sitemap: 'https://www.brihaspathi.com/sitemap.xml',
  };
}
