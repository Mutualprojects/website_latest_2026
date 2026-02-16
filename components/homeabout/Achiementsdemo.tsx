import { ContainerScroll, CardSticky } from "@/components/homeabout/Card-stack"
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Cpu,
  Lightbulb,
  Factory,
  ShieldCheck,
  RefreshCcw,
  LucideIcon,
  Icon,
} from "lucide-react";
const BRAND = "#07518a";
import Secure from "../../app/images/sollutionimages/only-b-logo-white-2.png"
const rightimage_ai="/cyborg-robot-hand-uniform-background-3d-rendering.png"

type Phase = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};


/* ================= BRIHASPATI / BTL PHASES ================= */
const BTL_PHASES = [
  {
    id: "btl-1",
    title: "Future-Ready Engineering",
    icon: Cpu,
    description:
      "We design surveillance and digital infrastructure systems with a long-term vision. Our architectures are scalable, modular, and resilient—ensuring seamless evolution as technologies, regulations, and operational needs change.",
  },
  {
    id: "btl-2",
    title: "Innovation-Driven R&D",
    icon: Lightbulb,
    description:
      "Our in-house research teams continuously develop next-generation solutions, including AI-powered video analytics, COVID-19 safety devices, and solar-powered smart poles—driving meaningful, real-world impact.",
  },
  {
    id: "btl-3",
    title: "Make-in-India Manufacturing",
    icon: Factory,
    description:
      "As a fully integrated enterprise, we design and manufacture key components in-house. This enables quality control, faster deployment, cost efficiency, and direct contribution to India’s technological self-reliance.",
  },
  {
    id: "btl-4",
    title: "Mission-Critical Reliability",
    icon: ShieldCheck,
    description:
      "With over 2 million cameras deployed nationwide, our platforms operate in 24×7, high-availability environments, meeting stringent reliability and compliance standards.",
  },
  {
    id: "btl-5",
    title: "Lifecycle Partnership",
    icon: RefreshCcw,
    description:
      "Our engagement extends beyond deployment. We provide long-term support, upgrades, and continuous optimization—ensuring systems remain secure, relevant, and performant throughout their lifecycle.",
  },
];

const WORK_PROJECTS = [
  {
    id: "work-project-3",
    title: "YCF DEV",
    services: ["Portfolio", "Partnership", "UI UX Design"],
    imageUrl:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "work-project-1",
    title: "Stridath Ecommerce",
    services: ["E-Commerce", "Branding", "UI UX Design", "Development"],
    imageUrl:
      "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "work-project-2",
    title: "Marketing Agency",
    services: ["Partnership", "UI UX Design", "Development"],
    imageUrl:
      "https://images.unsplash.com/photo-1683803055067-1ca1c17cb2b9?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export const ACHIEVEMENTS = [
  {
    id: "achievement-1",
    title: "20+",
    description: "years of excellence since 2006",
    bg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: "achievement-2",
    title: "2M+",
    description: "cameras installed nationwide",
    bg: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  },
  {
    id: "achievement-3",
    title: "2 Lakh+",
    description: "cameras deployed in General Elections",
    bg: "linear-gradient(135deg, #b45309, #f59e0b)",
  },
  {
    id: "achievement-4",
    title: "15K+",
    description: "clients across India",
    bg: "linear-gradient(135deg, #1d4ed8, #60a5fa)",
  },
  {
    id: "achievement-5",
    title: "65K+",
    description: "cameras installed for NEET exams",
    bg: "linear-gradient(135deg, #be123c, #fb7185)",
  },
  {
    id: "achievement-7",
    title: "750+ km",
    description: "border stretch under surveillance (BSF)",
    bg: "linear-gradient(135deg, #4f46e5, #818cf8)",
  },
  {
    id: "achievement-8",
    title: "1.3M+",
    description: "students monitored in exams (NEET, MHCET & more)",
    bg: "linear-gradient(135deg, #0d9488, #2dd4bf)",
  },
]

const Process = () => {
  return (
    <div className="w-full min-h-svh place-content-center bg-stone-50 px-6 text-stone-900 py-20 md:py-24 xl:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto grid w-full max-w-5xl md:grid-cols-2 md:gap-8 xl:gap-12">

        {/* LEFT */}
        <div className="left-0 top-0 md:sticky md:h-svh md:py-12">
          <h5 className="text-xs tracking-wide">Our Process</h5>

          <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight">
            The <span className="text-[#07518a]">Brihaspathi Edge</span>
          </h2>

          <p className="max-w-prose text-xl text-slate-600">
            Brihaspathi Technologies delivers future-proof engineering at national
            scale. We design and deploy scalable security and surveillance
            ecosystems that adapt to rapid technological shifts, ensuring
            long-term operational reliability and sustained ROI. Driven by an
            innovation-first culture, our in-house R&D teams pioneer solutions
            such as AI-enabled video intelligence, COVID-19 safety devices, and
            solar-powered smart poles. With over{" "}
            <strong>2 million cameras deployed nationwide</strong>, we manage
            some of the largest mission-critical security infrastructures in the
            world, delivering tailored solutions across Defense, Banking,
            Healthcare, Education, and Smart Cities.
          </p>

          <div className="mt-6 flex gap-6">
            <Image src={rightimage_ai} alt="AI Infra" width={500} height={150} />
            {/* <img src={Secure.src} alt="BTL Logo" width={80} height={80} className="" /> */}
          </div>
        </div>

        {/* RIGHT */}
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {BTL_PHASES.map((phase, index) => {
            const Icon = phase.icon;

            return (
              <CardSticky
                key={phase.id}
                index={index + 2}
                className="rounded-2xl border p-8 shadow-md backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${BRAND}10`,
                        color: BRAND,
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tighter">
                      {phase.title}
                    </h2>
                  </div>

                  <h3 className="text-2xl font-bold text-indigo-500">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                </div>

                <p className="mt-4 text-foreground">
                  {phase.description}
                </p>
              </CardSticky>
            );
          })}
        </ContainerScroll>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  return (
    <div className="container min-h-svh place-content-center bg-slate-900 p-12 text-stone-50">
      <div className="text-center">
        <h5 className="text-xs tracking-wide">Latest Projects</h5>
        <h2 className="mb-4 mt-1 text-4xl font-bold tracking-tight">
          Get a Glimpse of <span className="text-indigo-500">Our Work</span>
        </h2>
        <p className="mx-auto max-w-prose text-sm text-muted/80">
          From ecommerce to startup landing pages and singl/multi page websites,
          building fully responsive and functional website that showcase your
          product and your unique identity.
        </p>
      </div>
      <ContainerScroll className="min-h-[500vh] py-12">
        {WORK_PROJECTS.map((project, index) => (
          <CardSticky
            key={project.id}
            index={index}
            className="w-full overflow-hidden rounded-sm border border-x-indigo-900 border-y-indigo-500 bg-indigo-950"
            incrementY={60}
            incrementZ={5}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-1">
                {project.services.map((service) => (
                  <div
                    key={service}
                    className="flex rounded-xl bg-indigo-900 px-2 py-1"
                  >
                    <span className="text-xs tracking-tighter text-muted">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <img
              className="size-full object-cover"
              width="100%"
              height="100%"
              src={project.imageUrl}
            />
          </CardSticky>
        ))}
      </ContainerScroll>
    </div>
  )
}

const Achievements = () => {
  return (
    <section className="w-full bg-white px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="
            mx-auto flex w-full max-w-5xl flex-col-reverse gap-12
            lg:flex-row lg:justify-center
          "
        >
      {/* ================= LEFT CONTENT ================= */}
      <motion.div
        className="
          static w-full 
          lg:sticky lg:top-28 lg:max-w-[48%] lg:flex-1
          flex h-fit flex-col justify-center
        "
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        {/* Accent line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 h-[3px] rounded-full bg-[#07518a]"
        />

        {/* Overline */}
        <motion.h5
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#07518a]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Achievements
        </motion.h5>

        {/* Heading */}
        <motion.h2
          className="
            mb-6 max-w-2xl 
            text-3xl md:text-[2.6rem] lg:text-[2.8rem]
            font-extrabold leading-[1.15] tracking-tight text-black
          "
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Delivering{" "}
          <span className="relative inline-block text-[#07518a]">
            National-Scale
            <span className="absolute -bottom-2 left-0 h-[6px] w-full bg-[#07518a]/15" />
          </span>{" "}
          Surveillance &<br />
          Technology Solutions
        </motion.h2>

        {/* Body */}
        <motion.p
          className="
            max-w-xl 
            text-base leading-relaxed 
            text-black/70
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Since 2006, Brihaspathi Technologies has executed{" "}
          <span className="font-medium text-black">
            large-scale, mission-critical deployments
          </span>{" "}
          across elections, border security, transportation, education, and
          smart infrastructure.
          <br />
          <br />
          Our achievements represent long-standing trust from{" "}
          <span className="font-medium text-black">
            central and state governments, public institutions, and enterprises
          </span>
          , built on in-house innovation, manufacturing excellence, and
          reliability at scale.
        </motion.p>

        {/* Scroll hint (hidden on mobile) */}
        <motion.div
          className="
            mt-10 hidden 
            lg:flex items-center gap-2 
            text-xs uppercase tracking-widest text-black/40
          "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <span className="h-[1px] w-10 bg-black/30" />
        
        </motion.div>
      </motion.div>

      {/* ================= RIGHT CONTENT ================= */}
    <div className="w-full lg:max-w-[48%] lg:flex-1">
  <ContainerScroll className="min-h-[220vh] sm:min-h-[260vh] lg:min-h-[400vh] space-y-5 sm:space-y-7 lg:space-y-8 p-3 sm:p-4 text-center text-zinc-50">
    {ACHIEVEMENTS.map((achievement, index) => (
      <CardSticky
        key={achievement.id}
        incrementY={14} // smaller push on mobile (was 20)
        index={index + 2}
        className="
          mx-auto 
          flex
          h-52 w-[260px]
          sm:h-60 sm:w-[320px]
          md:h-64 md:w-[360px]
          lg:h-72 lg:w-[420px]
          flex-col justify-evenly
          rounded-2xl border border-current
          p-5 sm:p-6 lg:p-8
          shadow-md
        "
        style={{
          rotate: index >= 2 ? 0 : index + 1, // reduce rotation on mobile for better layout
          background: achievement.bg,
        }}
      >
        <h1 className="text-left text-4xl sm:text-5xl lg:text-6xl font-semibold opacity-85">
          {achievement.title}
        </h1>

        <div className="text-right">
          <h3
            className="
              max-w-[14ch] 
              text-wrap
              text-xl sm:text-2xl lg:text-4xl
              font-semibold capitalize tracking-tight
              leading-snug
            "
          >
            {achievement.description}
          </h3>
        </div>
      </CardSticky>
    ))}
  </ContainerScroll>
</div>

        </div>
      </div>
    </section>
  );
};
export { Process, Work, Achievements }
