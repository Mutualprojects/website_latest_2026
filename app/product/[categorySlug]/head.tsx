export default function Head({ params }: { params: { categorySlug: string } }) {
  return (
    <link
      rel="canonical"
      href={`https://www.brihaspathi.com/product/${params.categorySlug}`}
    />
  );
}
