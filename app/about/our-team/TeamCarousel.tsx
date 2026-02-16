"use client";

import { useState, useEffect, useCallback, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Types
export type OrgPerson = {
  id: number;
  name: string;
  designation: string;
  bio: string;
  linkedin?: string;
  photo: string;
};

export type OrgGroup = {
  id: string;
  title: string;
  people: OrgPerson[];
};

// Data
const ORG_GROUPS: OrgGroup[] = [
  {
    id: "our-team",
    title: "Our Team",
    people: [
      {
        id: 1,
        name: "Madhu Kuppani",
        designation: "Chief Operating Officer – Retail Sales",
        bio: "Bringing over 25 years of banking experience, Mr. Madhu Kuppani serves as the Chief Operations Officer with a focus on Retail Sales. A Bachelor's degree holder in commerce, Mr. Kuppani has been a key asset for over a decade, with expertise in Retail Sales, Project Management, Financial Management, and Risk Management. Known for his exceptional communication and negotiation skills, he excels in building high-performance teams and nurturing top-tier sales talent. His leadership ensures a customer-centric approach, driving retail success and strengthening client relationships.",
        linkedin: "https://www.linkedin.com/in/madhu-kuppani-13161535b/",
        photo: "/teams/whatsapp-image-2025-10-07-12-17-36-pm.jpg",
      },
      {
        id: 2,
        name: "Saketh Addepalli",
        designation: "Chief Revenue Officer",
        bio: "Brings over 9 years of expertise in B2B sales, key account management, and market expansion, with a strong focus on the government sector. As Chief Revenue Officer at Brihaspathi Technologies Limited, he has been instrumental in driving over 100% year-on-year revenue growth for the past three years. Saketh has led high-performing teams across trade marketing, modern trade, and category management within the e-commerce space. He holds a PGDM in Marketing and Strategy from IIM Ranchi, where he also served as President of the Council for Student Affairs, demonstrating early leadership and strategic acumen",
        linkedin: "https://www.linkedin.com/in/sakethaddepalli/",
        photo: "/teams/Saketh.jpg",
      },
      {
        id: 3,
        name: "Pradeep Kumar",
        designation: "Chief Financial Officer",
        bio: "Chartered Accountant and Senior Finance Professional with over 15 years of experience across financial planning and analysis, business strategy, taxation, and corporate finance. Demonstrates expertise in budgeting, consolidation under Ind AS/IFRS, fund-raising, and financial governance. Skilled in leading cross-functional teams, driving process excellence, and ensuring statutory compliance. Adept at leveraging analytical insights to improve profitability, optimize cash flow, and strengthen internal controls. Committed to enabling sustainable growth and delivering long-term value through strategic financial leadership.",
        linkedin: "https://www.linkedin.com/",
        photo: "/teams/IMG_20251125_053029.jpg",
      },
      {
        id: 4,
        name: "Venu Gopal",
        designation: "Vice President-Sales and Marketing",
        bio: "With over 30 years of experience spanning engineering equipment, IT solutions, and multi-sector sales and marketing. With academic foundations in Engineering and Management, he brings a unique blend of technical insight and strategic business acumen to the boardroom.is a seasoned executive with over 30 years of experience spanning engineering equipment, IT solutions, and multi-sector sales and marketing. With academic foundations in Engineering and Management, he brings a unique blend of technical insight and strategic business acumen to the boardroom",
        linkedin: "https://www.linkedin.com/in/venugopal-gonuguntla-37a20a58/",
        photo: "/teams/venu-gopal.jpg",
      },
      {
        id: 5,
        name: "Mayuram Barooah",
        designation: "Senior Vice President - Business Development",
        bio: "Is a seasoned government account management professional with over 23 years of experience in government and corporate projects. He has led large-scale projects for the government and major corporates both in India and abroad, delivering long-term organizational relationships, strategic planning, operational governance, and stakeholder coordination with proven expertise in high-impact public and private sector initiatives.Hailing from Assam, he has a Bachelor of Engineering degree in Electronics from Nagpur University and is a Certified Project Management Professional  from Project Management Institute, USA.",
        linkedin: "https://www.linkedin.com/in/mayuram-barooah-1b040a31/",
        photo: "/teams/mayuram-barooah.jpg",
      },
      {
        id: 19,
        name: "Sasank",
        designation: "Financial Controller",
        bio: "A seasoned Chartered Accountant with over 12 years of comprehensive experience in all facets of finance, dedicated to driving financial excellence and strategic growth. Expertise spans across financial planning and analysis, auditing, taxation, risk management, and corporate finance. Proven track record of optimizing financial operations, enhancing profitability, and ensuring compliance with regulatory standards.",
        linkedin: "https://www.linkedin.com/in/ca-sasank-battu/",
        photo: "/teams/Sasank.png",
      },
      {
        id: 11,
        name: "Yeshwanth Reddy",
        designation: "Assistant Vice President - New Product Development",
        bio: "Bringing extensive leadership experience and a proven record in driving growth across technology and SaaS sectors. With expertise in end-to-end Product Development, Enterprise Solutions, and Business Strategy, he has successfully led innovation and operations in dynamic markets. Formerly the Enterprise Product Head at Asianet Satellite Communication Limited (Jan '24–Jan '25), Yeshwanth played a key role in scaling product portfolios and networks. As the founder of Simply5 Inc. and OpenWiFi, he brings entrepreneurial vision and technical depth to his role, driving our company's growth and industry leadership.",
        linkedin:
          "https://www.linkedin.com/in/theyeshreddy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        photo: "/teams/me.jpg",
      },
      {
        id: 7,
        name: "D. Bala Ravi Chandrudu",
        designation:
          "Vice President - Client Relation & Business Development (Govt. Sector)",
        bio: "With extensive experience in Client Relations and Business Development, he brings strategic vision and proven leadership to every partnership. His expertise lies in fostering long-term client relationships, identifying new growth opportunities, and delivering tailored business solutions that drive measurable success. Known for his professionalism, integrity, and results-oriented approach, he combines deep industry knowledge with a people-first mindset to create meaningful collaborations. His commitment to excellence and innovation continues to strengthen the company's position in the market while ensuring clients receive exceptional value and support at every stage of their journey",
        linkedin: "https://www.linkedin.com",
        photo: "/teams/whatsapp-image-2025-11-05-3-38-58-pm.jpg",
      },
      {
        id: 6,
        name: "Sandheep Kumar A",
        designation: "Vice President – Government Bodies",
        bio: "A passionate & results-driven professional with strong leadership, analytical, and communication skills. Highly organized, self-motivated,& committed to achieving excellence in every task. Experienced in project coordination, client relations, and team management. Known for integrity, adaptability, and a proactive approach toward problem-solving. Skilled in planning, execution, and collaboration with cross-functional teams. A fast learner who embraces new technologies and challenges with a positive attitude. Dedicated to continuous improvement, innovation, & delivering quality outcomes that align with organizational goals.",
        linkedin:
          "https://www.linkedin.com/in/sandheep-reddy-51431832a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        photo: "/teams/Sandeep.jpg",
      },
      {
        id: 8,
        name: "Arvind Durgam",
        designation: "Vice President – Projects",
        bio: "Security professional with 25 years of experience in CCTV and electronic security, including more than a decade supporting Smart and Safe City initiatives encompassing ANPR and traffic-enforcement analytics. Combines strong solution design expertise with hands-on execution across bids, deployments, and service delivery. Dedicated to stakeholder alignment, operational excellence, and reliable end-to-end lifecycle performance.",
        linkedin: "https://www.linkedin.com/in/durgam-aravind-kumar-22229744/",
        photo: "/teams/arvind-durgam.jpg",
      },
      {
        id: 9,
        name: "Rajendra Patil",
        designation: "Assistant Vice President - Sales",
        bio: "With 28+ years across sales and marketing. Leads West Region sales for Brihaspathi Technologies. Trusted for account development, channel stewardship, and consistent delivery against targets. Builds relationships, resolves challenges quickly, and advances customer value with practical execution and commitment to long-term partnerships.",
        linkedin: "https://www.linkedin.com/in/rajendra-patil-9ba11716/",
        photo: "/teams/rajendra-photo.jpg",
      },
      {
        id: 10,
        name: "Sagar Ambadas",
        designation: "Assistant Vice President – Projects",
        bio: "A committed and detail-oriented professional with 20 years of experience in project management, specializing in project planning and execution. Skilled in preparing detailed plan, schedule, monitoring deliverables, and planning manpower to ensure smooth project implementation. I believe that effective client coordination, regular progress meetings, and a clear understanding of customer needs are critical to successful project delivery. leading and mentor a team, managing their daily visit plans and coordination while motivating them to enhance productivity and achieve project goals. Committed to driving organizational growth through operational excellence, process optimization, and innovative problem-solving in dynamic and challenging environments",
        linkedin: "https://www.linkedin.com/in/ambadas-sagar-b890a8175/",
        photo: "/teams/Sagar.jpg",
      },
      {
        id: 13,
        name: "Ashish Bandabuche",
        designation: "Senior Purchase Manager",
        bio: "Optimizing procurement strategy, sourcing, and vendor performance. Negotiates value, quality, and timelines while managing risk and compliance. Collaborates with engineering and finance to balance cost, availability, and specifications. Implements process discipline and analytics that improve continuity, reduce total cost, and support reliable project delivery.",
        linkedin: "https://www.linkedin.com",
        photo: "/teams/ashish-bandabuche-sr-purchase-manager.jpg",
      },
      {
        id: 14,
        name: "Ramu",
        designation: "General Manager - Solar",
        bio: "Over 13 years of experience in the solar energy industry, specializing in tendering, operations management, procurement, and government client coordination. He has successfully led multiple solar installations, ensuring quality, compliance, and timely execution. With his strong technical background and project management expertise, Ramu plays a key role in driving the company's renewable energy initiatives and operational excellence.",
        linkedin: "https://www.linkedin.com/in/ramu-tata-55157782/",
        photo: "/teams/Ramu.jpg",
      },
      {
        id: 15,
        name: "G.Ganeswar",
        designation: "General Manager - New Product Development",
        bio: "With 12+ years of experience in technology and product development, he leads R&D initiatives in AI-driven video analytics, IoT, smart infrastructure, and solar-powered systems. His expertise spans diverse sectors including public safety, defense, education, and transportation, where he drives scalable and impactful solutions. Swamy is committed to transforming innovative ideas into practical technologies, contributing to Brihaspathi's mission of building a smarter and safer future",
        linkedin: "https://www.linkedin.com/in/ganeswar-gunisetty-74453816a/",
        photo: "/teams/ganesh-headshot.jpg",
      },
      {
        id: 12,
        name: "Reshal Melkar",
        designation: "HR Manager",
        bio: "With over 10 years of experience in the HR domain, Reshal brings expertise in managing end-to-end human resources operations, streamlining processes, and fostering employee engagement. Skilled in aligning HR strategies with organizational goals to ensure growth, compliance, and people-centric culture.",
        linkedin: "https://www.linkedin.com/in/reshal-melkar-89257a128/",
        photo: "/teams/reshal-hr-manager.jpg",
      },
      {
        id: 16,
        name: "KKNS Prasad",
        designation: "General Manager – Projects",
        bio: "With over a decade of experience in managing large-scale, multi-disciplinary projects, Mr. KKNS Prasad ensures timely, cost-effective, and high-quality delivery. Skilled in aligning project goals with organizational strategy and fostering collaboration, he drives innovation, sustainability, and long-term client value while building strong client relationships.",
        linkedin: "https://www.linkedin.com/in/kkns-prasad-617016102/",
        photo: "/teams/prasad-general-manager.jpg",
      },
      {
        id: 18,
        name: "Ponugoti Moses",
        designation: "General Manager – Sales",
        bio: "Over 8 years of experience helping grow our ELV and Solar solutions. They focus on expanding our market reach and creating sales and marketing strategies that meet both client needs and company goals. Building strong client relationships and delivering sustainable solutions are key parts of their role in supporting Brihaspathi Technologies' ongoing success in the technology and energy sectors.",
        linkedin: "https://www.linkedin.com/in/moses-ponugoti-575666190/",
        photo: "/teams/whatsapp-image-2025-10-07-11-44-22-am-1.jpg",
      },
      {
        id: 17,
        name: "Kiran Sanaboina",
        designation: "General Manager – Technical Support",
        bio: "With 15+ years of experience, I specialize in designing, deploying, and managing advanced electronic security systems. My expertise spans CCTV, access control, intrusion detection, fire alarms, and AI-powered integrated security solutions. I lead technical teams through full project lifecycles, ensuring scalable, reliable, and compliant deployments. Passionate about innovation, I focus on creating safer, smarter environments for businesses and communities.",
        linkedin: "https://www.linkedin.com/in/kiransanaboina/",
        photo: "/teams/kiran-general-manager.jpg",
      },
      {
        id: 20,
        name: "Sukesh kapparath",
        designation: "Accounts Manager",
        bio: "A highly dedicated Assistant Accounts Manager with 14+ years of experience in accounting and financial management. Proven expertise in team leadership, statutory compliance, payroll processing, and corporate reporting. Skilled in ERP systems such as Tally, SAP Business One, and Office 365, with strong capabilities in financial analysis, reconciliation, and audit coordination. Recognized for exceptional leadership, effective communication, and process optimization to ensure regulatory compliance. Committed to achieving organizational growth through operational excellence, accuracy, and innovative problem-solving in dynamic business environments.",
        linkedin: "https://in.linkedin.com/in/sukesh-kapparath-1b223653",
        photo: "/teams/sukesh-accounts-manager.jpg",
      },
      {
        id: 21,
        name: "Budida Rambabu",
        designation: "Accounts Manager",
        bio: "An Accounts Manager with over 12 years of experience in General Accounting and Financial Management. I hold an MBA in Finance and have developed a strong foundation in accounting operations, financial reporting, budgeting, and compliance.",
        linkedin: "https://www.linkedin.com/in/ram-babu-44a57a72/",
        photo: "/teams/accounts-team-photo-rambabu.jpg",
      },
      {
        id: 0,
        name: "Krishna Patel",
        designation: "Company Secretary",
        bio: "She is a dedicated and results-oriented Company Secretary with extensive experience in corporate governance, legal compliance, and administrative functions. Known for expertise in maintaining statutory records, organizing board and general meetings, and ensuring adherence to regulatory standards, Krishna brings value through meticulous compliance and strategic insight. With a proven track record in managing corporate affairs, coordinating with government bodies, and executing significant corporate changes, Krishna is instrumental in supporting leadership and optimizing organizational compliance",
        linkedin: "hwfwhfwhjf",
        photo: "/teams/2.jpg",
      },
      {
        id: 90,
        name: "Manisha Shadangi",
        designation: "Manager - Legal & CS",
        bio: "Governance and Compliance Professional with over 8.5 years of experience in corporate finance, legal and secretarial functions, fund-raising, and regulatory compliance. She has played a pivotal role in driving IPO readiness, mergers and acquisitions, and private equity and structured funding initiatives exceeding ₹800 crores. Her expertise spans corporate governance, NCD issuance, due diligence, ESG and CSR reporting, and stakeholder management. With a strong background in managing complex regulatory frameworks and strategic decision-making, she brings a results-driven approach to fostering financial discipline, governance excellence, and sustainable growth. Known for her analytical, leadership, and collaborative skills, she ensures transparency, compliance, and value creation across all organizational levels.",
        linkedin: "www.linkedin.com/in/manishashadangi",
        photo: "/teams/whatsapp-image-2025-10-14-11-35-20-am.jpg",
      },
      {
        id: 22,
        name: "Vikrant Singh",
        designation: "Brand Manager",
        bio: "With over a decade of experience in building and positioning brands, I lead the Brand & marketing vision at BTL as Brand Manager. Passionate about driving business growth through creativity and strategy, I specialize in digital marketing, brand storytelling, and audience engagement. Having completed an Executive Program in Digital Marketing, I blend data-driven insights with innovative campaigns to strengthen market presence and customer trust. My focus is on aligning marketing strategies with business goals to enhance brand value and drive long-term success in an evolving industry landscape",
        linkedin: "https://www.linkedin.com/in/vikrant-singh-parihar/",
        photo: "/teams/vikranth-brand-manager.jpg",
      },
      {
        id: 23,
        name: "Tejaswi Swarna",
        designation: "Executive Assistant",
        bio: "A seasoned administrative professional with over six years of experience delivering comprehensive executive support and ensuring smooth office operations. Skilled in calendar management, meeting coordination, travel planning, documentation, and handling confidential information with discretion. Recognized for strong organizational abilities, attention to detail, and effective communication across all levels of an organization. Adept at prioritizing multiple tasks, streamlining processes, and supporting senior leadership in fast-paced environments. Known for proactive problem-solving, efficient workflow management, and maintaining positive professional relationships with internal teams and external partners. Demonstrates consistent reliability, resourcefulness, and a commitment to operational excellence in all administrative function",
        linkedin: "https://www.linkedin.com/in/tejaswi-swarna-a19128359",
        photo: "/teams/3.jpg",
      },
      {
        id: 24,
        name: "Dikkala Srija",
        designation: "Key Accounts Manager",
        bio: "Meeting people and learning from different perspectives is something that excites me. Think of challenges as opportunities to turn ideas into action. Bringing energy and creativity, the goal is always to help and make a positive difference.",
        linkedin: "https://www.linkedin.com/in/srija-dikkala-623a2b19b/",
        photo: "/teams/whatsapp-image-2025-10-07-11-44-22-am-2.jpg",
      },
      {
        id: 25,
        name: "Majjari Hemanth",
        designation: "Key Accounts Manager",
        bio: "I spearhead institutional sales and direct high-value government partnerships. My approach combines the rigorous analytical training from my IIM Ranchi MBA with a unique perspective from my agricultural science background. I excel in high-pressure environments, demonstrated by my leadership in large-scale logistical operations and the successful deployment of sensitive technology projects. My core strengths lie in end-to-end project lifecycle management, strategic negotiation, and stakeholder alignment, consistently converting complex requirements into successful outcomes.",
        linkedin: "https://www.linkedin.com/in/majjari-hemanth-015901183/",
        photo: "/teams/hemanth-key-account-manager.jpg",
      },
      {
        id: 26,
        name: "Hazekaiah Graham",
        designation: "Key Accounts Manager",
        bio: "Entrusted with managing key client relationships, overseeing operational functions, and executing administrative responsibilities with precision. He holds an MBA in Marketing from the Indian Institute of Management, Ranchi, which equips him with a strategic and analytical approach to business challenges. Mr Laloo leverages expertise in strategic client relationship management, operational coordination, cross-functional leadership, marketing strategy, and data-driven decision-making. Additionally, his skills in process optimisation, stakeholder engagement, project execution, and financial analysis underpin his capacity to deliver effective business solutions.",
        linkedin: "https://www.linkedin.com/in/hazekaiah-laloo-782218200/",
        photo: "/teams/jack-key-account-manager.jpg",
      },
      {
        id: 27,
        name: "Arvind Kumar D",
        designation: "Key Accounts Manager",
        bio: "Majors in Marketing and Strategy, JRF Awardee, MA in Public Administration, B.Com. Interest in Information Technology, Public Speaking and Literature",
        linkedin: "https://www.linkedin.com/in/arvind-kumar-dongre-88bb6a187/",
        photo: "/teams/whatsapp-image-2025-09-25-11-14-32-03cf16cf.jpg",
      },
      {
        id: 29,
        name: "Soumya shakya",
        designation: "Key Accounts Manager",
        bio: "Leading institutional partnerships and large-scale deployments with a strong foundation in engineering, analytics, and strategic execution. MBA (Business Analytics), IIM Ranchi. Brings experience as an Assistant Manager in a public sector bank, supported by strong financial understanding, stakeholder coordination, and disciplined decision-making. Excels in high-pressure environments, translating complex requirements into seamless implementations, aligned teams, and measurable outcomes. Focused on long-term value creation across government and institutional engagements.",
        linkedin:
          "https://www.linkedin.com/in/soumya-shakya-8ba597128?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        photo: "/teams/1.jpg",
      },
    ],
  },
];

type CardPosition = "center" | "left-1" | "left-2" | "right-1" | "right-2" | "hidden";

const TeamCarousel = () => {
  const teamMembers = ORG_GROUPS[0].people;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  const minSwipeDistance = 50;

  const getCardPosition = (index: number): CardPosition => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;

    if (offset === 0) return "center";
    if (offset === 1) return "right-1";
    if (offset === 2) return "right-2";
    if (offset === teamMembers.length - 1) return "left-1";
    if (offset === teamMembers.length - 2) return "left-2";
    return "hidden";
  };

  const getCardTransform = (position: CardPosition): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: "absolute",
      transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };

    const transforms: Record<CardPosition, React.CSSProperties> = {
      center: {
        transform: "scale(1.1) translateZ(0)",
        zIndex: 40,
        opacity: 1,
        filter: "grayscale(0%)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
      "left-1": {
        transform: "translateX(-280px) scale(0.9) translateZ(-100px)",
        zIndex: 30,
        opacity: 0.9,
        filter: "grayscale(100%)",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
      },
      "left-2": {
        transform: "translateX(-500px) scale(0.8) translateZ(-300px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "grayscale(100%)",
        boxShadow: "0 15px 30px -12px rgba(0, 0, 0, 0.2)",
      },
      "right-1": {
        transform: "translateX(280px) scale(0.9) translateZ(-100px)",
        zIndex: 30,
        opacity: 0.9,
        filter: "grayscale(100%)",
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)",
      },
      "right-2": {
        transform: "translateX(500px) scale(0.8) translateZ(-300px)",
        zIndex: 20,
        opacity: 0.7,
        filter: "grayscale(100%)",
        boxShadow: "0 15px 30px -12px rgba(0, 0, 0, 0.2)",
      },
      hidden: {
        opacity: 0,
        pointerEvents: "none" as const,
        zIndex: 10,
        transform: "scale(0.7)",
      },
    };

    return { ...baseStyles, ...transforms[position] };
  };

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, teamMembers.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, teamMembers.length]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setShowFullBio(false);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setShowFullBio(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [autoPlay, handleNext]);

  const currentMember = teamMembers[currentIndex];

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden py-8 px-4"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Title with animated gradient */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <h1 className="text-7xl md:text-9xl font-black text-center uppercase tracking-tighter pointer-events-none z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(8, 42, 123, 0.35) 30%, rgba(255, 255, 255, 0) 76%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {ORG_GROUPS[0].title}
        </h1>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent"></div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 mt-8 mb-4"
      >
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">250+</div>
          <div className="text-sm text-gray-600">members</div>
        </div>
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">100+</div>
          <div className="text-sm text-gray-600">years combined experience</div>
        </div>
        <div className="text-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-900">15+</div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl h-[500px] mt-8 md:mt-12 perspective-1000">
        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-blue-900 flex items-center justify-center text-2xl font-bold shadow-2xl hover:bg-white transition-all border border-blue-200"
          aria-label="Previous team member"
        >
          ‹
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-blue-900 flex items-center justify-center text-2xl font-bold shadow-2xl hover:bg-white transition-all border border-blue-200"
          aria-label="Next team member"
        >
          ›
        </motion.button>

        {/* Carousel Track */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {teamMembers.map((member, index) => {
              const position = getCardPosition(index);
              const transformStyle = getCardTransform(position);

              if (position === "hidden") return null;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: transformStyle.opacity, 
                    scale: position === "center" ? 1.1 : 0.8,
                    x: transformStyle.transform?.toString().includes("translateX") 
                      ? parseFloat(transformStyle.transform.toString().match(/translateX\(([-\d.]+)px\)/)?.[1] || "0")
                      : 0,
                    z: transformStyle.zIndex
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="absolute w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer border-4 border-white"
                  style={transformStyle}
                  onClick={() => handleDotClick(index)}
                >
                  <div className="relative w-full h-full group">
                    {/* Image with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=082A7B&color=fff&size=256`;
                      }}
                    />
                    
                    {/* Overlay info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-sm text-blue-200 mb-3">{member.designation}</p>
                      <div className="flex items-center gap-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <FaLinkedin className="text-white text-lg" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Center card indicator */}
                    {position === "center" && (
                      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 animate-pulse z-30"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Member Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mt-12 px-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="md:flex">
              {/* Left side - Profile */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 mb-4">
                    <img
                      src={currentMember.photo}
                      alt={currentMember.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentMember.name.replace(' ', '+')}&background=fff&color=082A7B&size=256`;
                      }}
                    />
                  </div>
                  <motion.h2
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-center mb-2"
                  >
                    {currentMember.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 0.2 }}
                    className="text-blue-200 text-center text-sm font-medium mb-6"
                  >
                    {currentMember.designation}
                  </motion.p>
                  
                  {currentMember.linkedin && currentMember.linkedin !== "hwfwhfwhjf" && (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaLinkedin className="text-xl" />
                      <span>View LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right side - Bio */}
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <FaQuoteLeft className="text-blue-900 text-xl" />
                  <h3 className="text-lg font-semibold text-blue-900">Professional Profile</h3>
                  <FaQuoteRight className="text-blue-900 text-xl ml-auto" />
                </div>
                
                <div 
                  className={`text-gray-700 leading-relaxed ${!showFullBio ? 'max-h-48 overflow-hidden' : ''}`}
                >
                  <p>{currentMember.bio}</p>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-blue-900 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    {showFullBio ? 'Show Less' : 'Read Full Bio'}
                    <svg 
                      className={`w-4 h-4 transition-transform ${showFullBio ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    {currentIndex + 1} / {teamMembers.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl">
        {teamMembers.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-900 scale-125"
                : "bg-blue-900/20 hover:bg-blue-900/40"
            }`}
            aria-label={`Go to ${teamMembers[index].name}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Auto-rotate</span>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              autoPlay ? "bg-blue-900" : "bg-gray-300"
            }`}
            aria-label={autoPlay ? "Pause auto rotation" : "Start auto rotation"}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              animate={{ x: autoPlay ? 36 : 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </button>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span>‹</span>
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            Next
            <span>›</span>
          </motion.button>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-sm text-gray-500 space-y-1"
      >
        <p className="flex items-center justify-center gap-2">
          <span className="hidden md:inline">← →</span>
          <span>Use arrows, swipe, or click dots to navigate</span>
        </p>
        <p>Click on any team member card to select</p>
      </motion.div>
    </div>
  );
};

export default TeamCarousel;