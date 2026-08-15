export default function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <link
        rel="canonical"
        href={`https://www.brihaspathi.com/product/${params.slug}`}
      />
    </>
  );
}
