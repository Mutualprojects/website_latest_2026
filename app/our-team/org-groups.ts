// types (optional but recommended)
export type OrgPerson = {
  id: number;
  name: string;
  designation: string;
  bio: string;
  linkedin?: string;
  photo: string; // NOTE: using /teams/* as you requested
};

export type OrgGroup = {
  id: string;
  title: string;
  people: OrgPerson[];
};

// ✅ Converted data (same content) + photo paths moved to /teams/*
export const ORG_GROUPS: OrgGroup[] = [
  {
    id: "our-team",
    title: "Our Team",
    people: [
      {
        id: 1,
        name: "Madhu Kuppani",
        designation: "Chief Operating Officer – Retail Sales",
        bio: "Bringing over 25 years of banking experience, Mr. Madhu Kuppani serves as the Chief Operations Officer with a focus on Retail Sales. A Bachelor’s degree holder in commerce, Mr. Kuppani has been a key asset for over a decade, with expertise in Retail Sales, Project Management, Financial Management, and Risk Management. Known for his exceptional communication and negotiation skills, he excels in building high-performance teams and nurturing top-tier sales talent. His leadership ensures a customer-centric approach, driving retail success and strengthening client relationships.",
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
        id: 40,
        name: "S.K Nair",
        designation: "Vice President - Sales & Marketing -South Region",
        bio: "A seasoned IT professional with 30+ years of experience across leading organizations. Excels in driving business growth, building strategic partnerships, and delivering enterprise solutions. Currently leads sales strategy, expands market reach, and contributes to long-term organizational success through strong leadership.",
        linkedin: "https://www.linkedin.com/in/sknairpune?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        photo: "/sk_nair.jpg",
      },

      {
        id: 50,
        name: "Kiran Garag",
        designation: "Vice President - Sales & Marketing -West Region",
        bio: "A seasoned professional with 26+ years of experience in business growth, IT transformation, and strategic sales leadership across corporate and government sectors. Proven in driving revenue, building partnerships, and leading high-performing teams. Plays a key role in strengthening market presence and contributing to long-term organizational growth and success",
        linkedin: "https://www.linkedin.com/in/kirangarag?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        photo: "/Kiran_Garag.jpg",
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
        bio: "Bringing extensive leadership experience and a proven record in driving growth across technology and SaaS sectors. With expertise in end-to-end Product Development, Enterprise Solutions, and Business Strategy, he has successfully led innovation and operations in dynamic markets. Formerly the Enterprise Product Head at Asianet Satellite Communication Limited (Jan ’24–Jan ’25), Yeshwanth played a key role in scaling product portfolios and networks. As the founder of Simply5 Inc. and OpenWiFi, he brings entrepreneurial vision and technical depth to his role, driving our company’s growth and industry leadership.",
        linkedin:
          "https://www.linkedin.com/in/theyeshreddy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        photo: "/teams/yesh.jpeg",
      },
      {
        id: 7,
        name: "D. Bala Ravi Chandrudu",
        designation:
          "Vice President - Client Relation & Business Development (Govt. Sector)",
        bio: "With extensive experience in Client Relations and Business Development, he brings strategic vision and proven leadership to every partnership. His expertise lies in fostering long-term client relationships, identifying new growth opportunities, and delivering tailored business solutions that drive measurable success. Known for his professionalism, integrity, and results-oriented approach, he combines deep industry knowledge with a people-first mindset to create meaningful collaborations. His commitment to excellence and innovation continues to strengthen the company’s position in the market while ensuring clients receive exceptional value and support at every stage of their journey",
        linkedin: "https://www.linkedin.com",
        photo: "/WhatsApp Image 2026-04-21 at 4.01.43 PM (1).jpeg",
      },
      {
        id: 88,
        name: "Mallikarjuna",
        designation: "Strategic Consultant",
        bio: "With 35 years of service since 1991 in the Central Board of Indirect Taxes and Customs under the Ministry of Finance, experience spans Central Excise, Service Tax, Customs, and GST, including audits, compliance verification, import-export clearance, inspections, intelligence work, documentation, arrear recovery, and being awarded Best Officer five times.",
        linkedin: "https://www.linkedin.com",
        photo: "/teams/mallikarjuna.jpg",
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
        id: 95,
        name: "Suneel N J P",
        designation: "Software Head",
        bio: "With 20+ years in IT, he serves as Software Head, leading software teams in cloud-native development and AI-integrated enterprise solutions. His career spans hardware engineering, full-stack web development, and business analysis—enabling him to align technical execution with business strategy. He has delivered 100+ web projects and led major ERP modernizations using Agile and DevOps practices. Today, he focuses on implementing AI/ML capabilities, designing scalable microservices on cloud platforms, and mentoring engineers in modern practices. Committed to transforming complex challenges into intelligent, production-ready solutions, he drives the organization's mission to deliver secure, future-ready digital products that deliver measurable business impact.",
        linkedin:
          "https://www.linkedin.com/in/suneel-naga-jagadish-polamarasetty-95a576227?utm_source=share_via&utm_c…",
        photo: "/teams/suneel.jpg",
      },
      {
        id: 8,
        name: "Arvind Durgam",
        designation: "Vice President – Projects",
        bio: "Security professional with 25 years of experience in CCTV and electronic security, including more than a decade supporting Smart and Safe City initiatives encompassing ANPR and traffic-enforcement analytics. Combines strong solution design expertise with hands-on execution across bids, deployments, and service delivery. Dedicated to stakeholder alignment, operational excellence, and reliable end-to-end lifecycle performance.",
        linkedin: "https://www.linkedin.com/in/durgam-aravind-kumar-22229744/",
        photo: "/teams/arvind-durgam.jpg",
      },
      // {
      //   id: 9,
      //   name: "Rajendra Patil",
      //   designation: "Assistant Vice President - Sales",
      //   bio: "With 28+ years across sales and marketing. Leads West Region sales for Brihaspathi Technologies. Trusted for account development, channel stewardship, and consistent delivery against targets. Builds relationships, resolves challenges quickly, and advances customer value with practical execution and commitment to long-term partnerships.",
      //   linkedin: "https://www.linkedin.com/in/rajendra-patil-9ba11716/",
      //   photo: "/teams/rajendra-photo.jpg",
      // },
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
        bio: "Over 13 years of experience in the solar energy industry, specializing in tendering, operations management, procurement, and government client coordination. He has successfully led multiple solar installations, ensuring quality, compliance, and timely execution. With his strong technical background and project management expertise, Ramu plays a key role in driving the company’s renewable energy initiatives and operational excellence.",
        linkedin: "https://www.linkedin.com/in/ramu-tata-55157782/",
        photo: "/teams/Ramu.jpg",
      },
      {
        id: 15,
        name: "G.Ganeswar",
        designation: "General Manager - New Product Development",
        bio: "With 12+ years of experience in technology and product development, he leads R&D initiatives in AI-driven video analytics, IoT, smart infrastructure, and solar-powered systems. His expertise spans diverse sectors including public safety, defense, education, and transportation, where he drives scalable and impactful solutions. Swamy is committed to transforming innovative ideas into practical technologies, contributing to Brihaspathi’s mission of building a smarter and safer future",
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
        bio: "Over 8 years of experience helping grow our ELV and Solar solutions. They focus on expanding our market reach and creating sales and marketing strategies that meet both client needs and company goals. Building strong client relationships and delivering sustainable solutions are key parts of their role in supporting Brihaspathi Technologies’ ongoing success in the technology and energy sectors.",
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
      // {
      //   id: 28,
      //   name: "Praveen Malothu",
      //   designation: "Key Accounts Manager",
      //   bio: "Lead institutional sales and build long-term client partnerships by understanding their needs and delivering tailored solutions. With experience across sales, distribution, and market execution in FMCG and technology sectors, I take a pragmatic approach to solving challenges and driving value. I focus on fostering trust, collaboration, and efficiency while working closely with stakeholders to achieve shared goals. Committed to growth and excellence, I leverage every interaction as an opportunity to learn, adapt, and contribute to organizational success.",
      //   linkedin:
      //     "https://www.linkedin.com/in/praveen-malothu-bb380b1bb/?utm_source=share&utm_campaign=share_via&utm_…",
      //   photo: "/teams/Praveen.jpg",
      // },
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
