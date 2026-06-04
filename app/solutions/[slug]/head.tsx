export default function Head({ params }: { params: { slug: string } }) {
  const canonicalUrl = `https://www.brihaspathi.com/solutions/${params.slug}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
