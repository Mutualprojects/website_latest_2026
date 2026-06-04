import { servicesData, Service } from "../servicesdata";
import { notFound } from "next/navigation";
import { 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Target, 
  Users, 
  Zap, 
  BarChart3, 
  Cog, 
  Globe, 
  Leaf,
  Building2,
  Workflow,
  Shield,
  Lightbulb
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = servicesData.find(
    (item) => item.slug === params.slug
  );

  if (!service) return {};

  return {
    title: service.title,
    description: service.overview,
    alternates: {
      canonical: `https://www.brihaspathi.com/services/${params.slug}`
    }
  };
}
// Generate static params for all service slugs
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// TypeScript interface for props
interface PageProps {
  params: {
    slug: string;
  };
}
// Main page component
export default async function ServiceDetailPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const service: Service | undefined = servicesData.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-white to-[#fff5ed]">
        {/* Decorative Gradient Orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#07518a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* ================= LEFT CONTENT ================= */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-[#07518a]/10 px-4 py-1 text-sm font-semibold text-[#07518a]">
                Our Service
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#07518a]">
                {service.title}
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-700 leading-relaxed">
                {service.overview}
              </p>

              {/* CTA */}
         
            </div>

            {/* ================= RIGHT IMAGE ================= */}
            <div className="relative group">
              <div className="relative h-64 sm:h-80 lg:h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl">
                {service.mainimage ? (
                  <>
                    <Image
                      src={service.mainimage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                    Image Coming Soon
                  </div>
                )}

                {/* Floating Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl bg-white/90 backdrop-blur px-5 py-4 shadow-lg">
                    <h3 className="text-base font-semibold text-slate-900">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[#07518a]/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        
        {/* What We Do Section */}
        <section className="mb-16">
          <SectionHeader 
            icon={<Target className="w-6 h-6" />}
            title="What We Do"
          />
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 lg:p-10">
            <p className="text-slate-700 text-lg leading-relaxed">
              {service.whatWeDo}
            </p>
          </div>
        </section>

        {/* Key Features Grid */}
        {service.keyFeatures && service.keyFeatures.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Zap className="w-6 h-6" />}
              title="Key Features"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.keyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed pt-1.5">
                      {feature.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Our Process Section */}
        {service.ourProcesses && service.ourProcesses.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Workflow className="w-6 h-6" />}
              title="Our Process"
            />
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-200">
                {service.ourProcesses.map((process, index) => (
                  <div key={index} className="p-6 hover:bg-slate-50 transition-colors duration-150">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#07518a] to-[#05406e] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 leading-relaxed pt-1.5">
                        {process}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Competitive Advantage */}
        {service.competitiveAdvantage && service.competitiveAdvantage.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Award className="w-6 h-6" />}
              title="Competitive Advantage"
            />
            <div className="bg-gradient-to-br from-[#e8f0f8] to-orange-50 rounded-2xl border border-[#07518a]/20 p-8 lg:p-10">
              <ul className="space-y-4">
                {service.competitiveAdvantage.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#07518a] flex-shrink-0 mt-1" />
                    <span className="text-slate-700 leading-relaxed">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<TrendingUp className="w-6 h-6" />}
              title="Benefits"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-relaxed">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Examples & Case Studies */}
        {service.examples && service.examples.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Building2 className="w-6 h-6" />}
              title="Examples & Case Studies"
            />
            <div className="space-y-4">
              {service.examples.map((example, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:border-orange-300 transition-colors duration-200"
                >
                  <p className="text-slate-700 leading-relaxed">{example}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Metrics & ROI Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Metrics */}
          {service.metrics && service.metrics.length > 0 && (
            <section>
              <SectionHeader 
                icon={<BarChart3 className="w-6 h-6" />}
                title="Key Metrics"
              />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <ul className="space-y-3">
                  {service.metrics.map((metric, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-[#07518a] rounded-full"></div>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ROI Metrics */}
          {service.roiMetrics && service.roiMetrics.length > 0 && (
            <section>
              <SectionHeader 
                icon={<TrendingUp className="w-6 h-6" />}
                title="ROI Metrics"
              />
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 p-6">
                <ul className="space-y-3">
                  {service.roiMetrics.map((roi, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                      <TrendingUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
                      {roi}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Target Sectors */}
        {service.targetSectors && service.targetSectors.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Target className="w-6 h-6" />}
              title="Target Sectors"
            />
            <div className="flex flex-wrap gap-3">
              {service.targetSectors.map((sector, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200"
                >
                  {sector}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Technology Stack */}
        {service.technologyStack && service.technologyStack.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Cog className="w-6 h-6" />}
              title="Technology Stack"
            />
            <div className="bg-slate-900 rounded-2xl p-8 lg:p-10">
              <div className="flex flex-wrap gap-3">
                {service.technologyStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-sm font-mono hover:bg-slate-700 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Innovations */}
        {service.innovations && service.innovations.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Lightbulb className="w-6 h-6" />}
              title="Innovations"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {service.innovations.map((innovation, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-relaxed">{innovation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sustainability */}
        {service.sustainabilityAspects && service.sustainabilityAspects.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Leaf className="w-6 h-6" />}
              title="Sustainability"
            />
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-200 p-8 lg:p-10">
              <ul className="space-y-4">
                {service.sustainabilityAspects.map((aspect, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-700 leading-relaxed">{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Clients */}
        {service.clients && service.clients.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              icon={<Users className="w-6 h-6" />}
              title="Our Clients"
            />
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.clients.map((client, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium text-center hover:bg-slate-100 transition-colors duration-200"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Value Proposition - Final CTA Section */}
        <section className="bg-gradient-to-br from-[#07518a] via-[#05406e] to-[#07518a] rounded-3xl shadow-xl p-10 lg:p-16 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Value Proposition
            </h2>
            <p className="text-xl lg:text-2xl leading-relaxed text-blue-50">
              {service.valueProposition}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= REUSABLE UI COMPONENTS ================= */

function SectionHeader({ 
  icon, 
  title 
}: { 
  icon: React.ReactNode; 
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center w-10 h-10 bg-[#07518a] rounded-lg text-white">
        {icon}
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
        {title}
      </h2>
    </div>
  );
}