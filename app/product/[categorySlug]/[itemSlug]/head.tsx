export default function Head({ params }: { params: { categorySlug: string; itemSlug: string } }) {
  return (
    <link
      rel="canonical"
      href={`https://www.brihaspathi.com/product/${params.categorySlug}/${params.itemSlug}`}
    />
  );
}
