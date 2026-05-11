import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudiesBySector } from "../data";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  // ✅ unwrap params (REQUIRED in Next 16)
  const { sectorSlug } = await params;

  const studies = getCaseStudiesBySector(sectorSlug);

  if (!studies.length) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/case-studies"
          className="text-blue-600 mb-6 inline-block"
        >
          ← Back to all case studies
        </Link>

        <h1 className="text-3xl font-bold mb-10 capitalize">
          {studies[0].sector} Case Studies
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.sectorSlug}/${c.slug}`}
              className="bg-white rounded-lg border p-5 hover:shadow"
            >
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.company}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
