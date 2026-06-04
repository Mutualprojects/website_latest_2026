export default function Head({ params }: { params: { slug: string } }) {
  const canonical = `https://www.brihaspathi.com/products/${params.slug}`;
  return <link rel="canonical" href={canonical} />;
}
