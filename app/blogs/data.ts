// types/blog.ts  (or iccc-blog-data.ts)

import { StaticImageData } from "next/image";

export interface BlogSection {
  title: string;
  content: string;
  items?: string[];
  image?: StaticImageData; 
  banner_image?: StaticImageData;
  card_image?:StaticImageData
}

export interface ComparisonRow {
  parameter: string;
  traditional: string;
  icccBased: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  examples?: string[];
}

export interface UseCase {
  category: string;
  description: string;
  benefits: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {

  id: string;                    // Unique ID for each blog
  slug: string;
  title: string;
   card_image?:StaticImageData
  metaDescription: string;
  publishedDate: string;
  image?: StaticImageData; 
  banner_image?: StaticImageData;
  author: {
    name: string;
    role?: string;
  };
  readingTime: number;           // in minutes
  tags: string[];
  featuredImage?: StaticImageData;        // Add later when you have images
whatimage?:StaticImageData
  introduction: string;
  keyIntegrations: string[];
  philosophy: string;

  comparisonTable: ComparisonRow[];

  howItWorks: HowItWorksStep[];

  useCases: UseCase[];

  keyCapabilities: string[];

  whyImportant: string;

  faqs: FAQ[];

  conclusion: string;

  // Future expansion fields
  additionalSections?: BlogSection[];
  relatedPosts?: string[];       // array of other blog slugs
  seoKeywords?: string[];
}

// ==================== ALL BLOG POSTS ====================
import bannerimage_data_1 from './Access Granted.jpg.jpeg';
import main_image_data_1 from './motion-car-with-autonomous-self-driving-city-street-3d-render.jpg.jpeg';
import secondary_image_data_2 from './man-security-guard-is.jpg.jpeg';
import third_image_data from './ai-data-analysis-team.jpg.jpeg';
import card_images from './WhatsApp Image 2026-04-17 at 9.56.44 AM.jpeg'

export const blogPosts: BlogPost[] = [
  {
    id: "iccc-smart-cities-001",
    slug: "how-smart-cities-use-integrated-command-and-control-centers-iccc",
    banner_image: bannerimage_data_1,
    image: main_image_data_1,
    card_image:card_images,
    featuredImage: secondary_image_data_2,
    title: "How Smart Cities Use Integrated Command and Control Centers (ICCC)",
    metaDescription: "Learn how Integrated Command and Control Centers (ICCC) serve as the digital brain of smart cities with real-time monitoring, AI analytics, traffic management, and emergency response.",
    publishedDate: "2026-04-14",
    author: {
      name: "Smart Cities Insights",
      role: "Urban Technology Team"
    },
    readingTime: 12,
    tags: ["Smart Cities", "ICCC", "Urban Technology", "AI Surveillance", "Traffic Management", "Emergency Response"],

    introduction: "Integrated Command and Control Center (ICCC) is a single command and control system that includes data from different community services, such as CCTV surveillance, traffic signals, emergency services, transportation programs, public infrastructure, mobility monitoring systems and Internet of Things (IoT). It enables city officials to observe live situations, react to events more quickly, control traffic flow, identify public safety issues and plan their daily city operations based on data. The ICCC acts as the brain of a smart city where several departments function on one integrated platform.",

    keyIntegrations: [
      "City-wide CCTV surveillance systems",
      "AI-based video monitoring tools",
      "Traffic signal monitoring systems",
      "Public transport tracking systems",
      "Emergency response control systems",
      "IoT-based environmental sensors",
      "GIS mapping and live location tracking",
      "Public announcement and communication tools"
    ],

    philosophy: "One city → One monitoring brain → One coordinated response system. Instead of departments working separately, ICCC creates real-time coordination across city departments.",

    comparisonTable: [
      { parameter: "Department Communication", traditional: "Manual phone or radio communication", icccBased: "Real-time digital communication" },
      { parameter: "Incident Tracking", traditional: "Manual reporting", icccBased: "Automated incident alerts" },
      { parameter: "Data Availability", traditional: "Historical or delayed", icccBased: "Live real-time data" },
      { parameter: "Visibility", traditional: "Area-level monitoring", icccBased: "City-wide monitoring dashboard" },
      { parameter: "Decision Making", traditional: "Situation-based reaction", icccBased: "Data-based planning" },
      { parameter: "Coordination", traditional: "Department-wise working", icccBased: "Unified multi-department working" }
    ],

    howItWorks: [
      {
        step: 1,
        title: "Data Collection from Field Devices",
        description: "ICCC collects data from multiple sources across the city such as CCTV cameras, traffic signals, weather stations, pollution sensors, smart street lights, public transport trackers, and emergency call systems.",
        examples: [
          "CCTV cameras at roads, junctions, public places",
          "Traffic signals and traffic sensors",
          "Weather monitoring stations",
          "Pollution monitoring sensors",
          "Smart street lighting systems",
          "Public transport tracking devices",
          "Emergency call systems"
        ]
      },
      {
        step: 2,
        title: "Data Integration into One Platform",
        description: "The ICCC software platform receives data from all field devices and displays it on a centralized dashboard. This allows city operators to monitor multiple systems from one place instead of switching between different systems."
      },
      {
        step: 3,
        title: "AI & Analytics Processing",
        description: "AI-based systems analyze live video and sensor data to identify situations like crowd gathering, traffic congestion, accidents, suspicious movements, and unauthorized entries.",
        examples: [
          "Crowd gathering in restricted zones",
          "Traffic congestion build-up",
          "Accidents on highways or junctions",
          "Suspicious movement patterns",
          "Unauthorized entry into restricted areas"
        ]
      },
      {
        step: 4,
        title: "Incident Alert Generation",
        description: "Once an event is detected, the system generates real-time alert notifications, incident snapshot images, video evidence clips, and location mapping on the GIS dashboard."
      },
      {
        step: 5,
        title: "Command & Response Coordination",
        description: "The ICCC operator can instantly inform and coordinate with police, traffic, fire, ambulance, and municipal response teams from a single platform."
      }
    ],

    useCases: [
      {
        category: "Traffic Management and Road Safety",
        description: "Traffic congestion is one of the biggest problems in growing cities. ICCC helps by monitoring traffic movement live, detecting signal violations, tracking vehicle density, identifying accident locations instantly, and supporting traffic signal control decisions.",
        benefits: [
          "Monitoring traffic movement live",
          "Detecting signal violations",
          "Tracking vehicle density across roads",
          "Identifying accident locations instantly",
          "Supporting traffic signal control decisions",
          "Quick traffic diversion during peak hours or emergencies"
        ]
      },
      {
        category: "Public Safety and Law Enforcement",
        description: "Public safety teams use ICCC for monitoring sensitive areas, tracking suspicious activities, managing large public gatherings, festivals, rallies, or political events, and tracking missing persons or suspect vehicles.",
        benefits: [
          "Monitoring sensitive areas",
          "Tracking suspicious activities",
          "Managing large public gatherings, festivals, and rallies",
          "Tracking missing persons or suspect vehicles"
        ]
      },
      {
        category: "Disaster and Emergency Management",
        description: "During natural disasters or emergencies, ICCC becomes extremely important. It helps monitor flood-prone zones, track weather warnings, water levels, emergency vehicle movement, and coordinate rescue teams.",
        benefits: [
          "Monitor flood-prone zones and weather alerts",
          "Track water levels and emergency vehicle movement",
          "Coordinate rescue teams effectively"
        ]
      },
      {
        category: "Smart Infrastructure Monitoring",
        description: "ICCC is not limited to surveillance. It also monitors city infrastructure like smart street lighting, water pipelines, waste collection, power distribution, and public utility services.",
        benefits: [
          "Smart street lighting status",
          "Water pipeline monitoring",
          "Waste collection monitoring",
          "Power distribution monitoring",
          "Public utility service tracking",
          "Quick identification of service failures"
        ]
      }
    ],

    keyCapabilities: [
      "Centralized city monitoring dashboard",
      "Live surveillance and sensor data tracking",
      "AI-based incident detection",
      "GIS-based location visualization",
      "Multi-department coordination tools",
      "Evidence clip generation for incidents",
      "Historical data storage and reporting"
    ],

    whyImportant: "Cities are expanding rapidly. Population growth increases pressure on traffic systems, public safety, infrastructure management, and emergency response systems. Manual monitoring is no longer practical for large cities. ICCC helps cities shift toward data-driven governance where authorities can monitor, predict, and respond based on live data instead of delayed reports.",

    faqs: [
      {
        question: "What are the systems in an ICCC linked with?",
        answer: "Usually ICCC combine CCTV surveillance, AI/analytic capability, traffic systems, IoT sensors, emergency services, GIS mapping and communications."
      },
      {
        question: "What is the mechanism through which ICCC reduces emergency response time?",
        answer: "It keeps sending out real-time alerts and sends SMS to the relevant department so that there is no delay in response."
      },
      {
        question: "Is ICCC something which exists in metro cities only?",
        answer: "No. ICCC is being deployed in Tier-2 and Tier-3 cities to safeguard, manage traffic, and monitor disasters as well."
      },
      {
        question: "Can ICCC work with existing city CCTV infrastructure?",
        answer: "Yes. Most ICCC systems are designed to connect with existing IP camera networks, traffic systems, and sensor networks without replacing current infrastructure."
      },
      {
        question: "How does ICCC help during emergencies?",
        answer: "ICCC gives real-time visibility of ground situations. Authorities can track incidents live, dispatch emergency teams quickly, and coordinate response across multiple departments from one location."
      }
    ],

    conclusion: "Integrated command and control centers are transforming cities, amalgamating surveillance, traffic monitoring, emergency response and more onto one unified system. Centrally managed monitoring platforms aid cities in handling the increasingly complicated tasks of city operations with clearer visibility and quicker response. There is an increasing demand for smart infrastructure, and ICCC platforms are increasingly catching the attention of city planners.",

    additionalSections: [
    
      {
        title: "What is an Integrated Command and Control Center (ICCC)?",

        content: "An Integrated Command and Control Center is the digital nerve center of a smart city. It brings together multiple data sources and city services into a single monitoring and decision-making platform. Most of the time, different departments such as traffic police, city surveillance teams, disaster management units or fire brigades all work individually in traditional systems. ICCC overcomes this problem by integrating all systems within a single consolidated environment.",
        items: []
      }
    ],
    relatedPosts: [],
    seoKeywords: ["ICCC", "Smart Cities", "Command and Control Center", "Urban Technology", "AI Surveillance", "Traffic Management", "Emergency Response", "IoT Sensors", "GIS Mapping"]
  }
];