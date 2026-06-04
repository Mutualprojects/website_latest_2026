export default function Head({ params }: { params: { sectorSlug: string } }) {
  return (
    <link
      rel="canonical"
      href={`https://www.brihaspathi.com/case-studies/${params.sectorSlug}`}
    />
  );
}
