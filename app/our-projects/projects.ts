// projects.ts

export interface Project {
  serialNo?: number;
  customer: string;
  scope: string;
  year: string;
  location?: string;
}

export interface YearlyProjects {
  year: string;
  projects: Project[];
}

export const cctvAndRelatedProjects: YearlyProjects[] = [
  {
    year: "2017-2018",
    projects: [
      {
        serialNo: 1,
        customer: "AP Market Yards - Kurnool District",
        scope: "Supply & Installation of CC Cameras in AP Market Yards in Adoni, Kurnool & Yemmiganur",
        year: "2017-18",
        location: "Kurnool District, Andhra Pradesh",
      },
      {
        serialNo: 2,
        customer: "BSNL - Telangana Assembly Election 2018",
        scope: "Supply, Installation, Integration and Commissioning of CCTV Wifi Cameras and Wifi router and Webcasting service at Counting Centers for Telangana State Assembly Elections 2018",
        year: "2018",
        location: "Hyderabad, Telangana",
      },
      {
        serialNo: 3,
        customer: "R&B - Telangana, Raj Bhavan PO",
        scope: "Supply and installing of CCTV System at Raj Bhavan Community hall and Staff quarters area and integrating to the existing control room in the P/o. Staff Quarters Raj Bhavan",
        year: "2018",
        location: "Somajiguda, Hyderabad",
      },
      {
        serialNo: 4,
        customer: "Nalsar University of Law",
        scope: "Supply, testing, commissioning and maintenance of IP based CCTV surveillance System",
        year: "2018",
        location: "Shameerpet, Hyderabad",
      },
      {
        serialNo: 5,
        customer: "Satavahana University",
        scope: "CCTV Surveillance System",
        year: "2018",
        location: "Karimnagar",
      },
      {
        serialNo: 6,
        customer: "Dr NTTPS Vijayawada",
        scope: "Procurement and Commissioning of CCTV cameras in around Dr.NTTPS",
        year: "2018",
        location: "Vijayawada, Andhra Pradesh",
      },
      {
        serialNo: 7,
        customer: "Andhra Pragathi Grameena Bank - HO Kadapa",
        scope: "Supply & Installation of CCTVs at APGB Branches",
        year: "2015-2019",
        location: "Kadapa, Andhra Pradesh",
      },
    ],
  },

  {
    year: "2019",
    projects: [
      {
        serialNo: 1,
        customer: "Prakasam District Collector PO",
        scope: "Installation of Cameras in Counting Centers",
        year: "2019",
        location: "Ongole, Andhra Pradesh",
      },
      {
        serialNo: 2,
        customer: "Office of the CEO, AP",
        scope: "Installation IP Cameras and Web Streaming in the Polling Station for AP Legislative Assembly and General Elections 2019",
        year: "2019",
        location: "Amaravathi, Andhra Pradesh",
      },
      {
        serialNo: 3,
        customer: "Assam and Commissioner & Secretary to the Govt. of Assam",
        scope: "Installation IP Cameras & Web Casting of Polling Stations for the Assam Lok Sabha Elections 2019",
        year: "2019",
        location: "Assam",
      },
      {
        serialNo: 4,
        customer: "Greater Hyderabad Municipal Corporation",
        scope: "Installation of 2MP IP Offline Cameras for Telangana State Lok Sabha Elections 2019 Counting Centers Under GHMC",
        year: "2019",
        location: "Hyderabad, Telangana",
      },
      {
        serialNo: 5,
        customer: "AP Agricultural Marketing Department",
        scope: "Supply, Installation and Commissioning of 262 Nos. New IP based CC Cameras including Maintenance of 688 Nos. of Cameras in various Market Yards",
        year: "2019",
        location: "Andhra Pradesh",
      },
    ],
  },

  {
    year: "2019-2020",
    projects: [
      {
        customer: "Kaziranga National Park",
        scope: "Installation of Automatic Sensor Based Vehicle Speed Regulatory System with Requisite Equipments at six specified animal corridor sections on NH-37 in Kaziranga National Park",
        year: "2019-2020",
        location: "Assam",
      },
      {
        customer: "CSIR - Centre for Cellular and Molecular Biology",
        scope: "Providing Surveillance Camera Facility at CSIR - CCMB Staff Quarters Colony",
        year: "2019-2020",
        location: "HMT Nagar, Nacharam Road, Hyderabad",
      },
    ],
  },

  {
    year: "2020",
    projects: [
      {
        customer: "Dr.YSR Aarogyasri Health Care Trust",
        scope: "Supply, installation, commissioning and maintenance of CCTV systems with Accessories to Network Hospitals under Dr.YSRAHCT",
        year: "2020",
        location: "Guntur, Andhra Pradesh",
      },
      {
        customer: "Visakhapatnam City Police Commissionarate",
        scope: "Supply, Installation & Maintenance of CCTV Surveillance Cameras at the strategic locations identified within the limits of Steel Plant PS under RINL-CSR initiative",
        year: "2020",
        location: "Visakhapatnam, Andhra Pradesh",
      },
    ],
  },

  {
    year: "2021",
    projects: [
      {
        customer: "Commissioner & Secretary to the Govt. of Assam, Election Department",
        scope: "Video Streaming commissioning for each location with PTZ IP cameras, Internet connectivity at SHQ, DHQ and Polling station, Cloud Storage, local storage, manpower, call centre facility, Network survey, dashboard, training, dry test run etc. for Polling Stations",
        year: "2021",
        location: "Assam",
      },
      {
        customer: "CEO, Assam and Commissioner & Secretary to the Govt. of Assam",
        scope: "Web Casting in the General Election to the Assam Legislative Assembly, 2021 for webcasting in Assam Assembly Bye-Election, 2021",
        year: "2021",
        location: "Assam",
      },
      {
        customer: "Srikalahastheeswara Swamy Vari Devasthanam",
        scope: "Supply and Installation of CC Cameras in the premises of main temple and sub temples",
        year: "2021",
      },
    ],
  },

  {
    year: "2022",
    projects: [
      {
        customer: "Agriculture Marketing, Government of Andhra Pradesh",
        scope: "Supply, fixing and Demonstration of Desktop Computers for Procurement centers at Multi Purpose Facilitation Centers (MPFCs)",
        year: "2022",
        location: "Andhra Pradesh",
      },
      {
        customer: "CEO, Assam and Commissioner & Secretary to the Govt. of Assam",
        scope: "Web Casting in the Assam Assembly Bye Election to 99 Majuli Assembly Constituency 2022",
        year: "2022",
        location: "Assam",
      },
      {
        customer: "APMSIDC PHC/UPHC Under NHM",
        scope: "Procure, supply, installation and commissioning of CC camera system with accessories in all public health facilities (PHCs and UPHCs)",
        year: "2022",
        location: "Andhra Pradesh",
      },
      {
        customer: "BSF Malda-1",
        scope: "SITC OF ELECTRONIC SURVEILLANCE CAMERAS EQPTS PROJECT WITH 5 YEARS CAMC",
        year: "2022-23",
      },
      {
        customer: "BSF Berhampore",
        scope: "SITC OF ELECTRONIC SURVEILLANCE CAMERAS EQPTS PROJECT WITH 5 YEAR CAMC",
        year: "2022-23",
      },
      {
        customer: "BSF Jailsalmer",
        scope: "SITC OF ELECTRONIC SURVEILLANCE EQUIPMENT PROJECT ON TURNKEY BASIS WITH CAMC",
        year: "2022-23",
      },
      {
        customer: "TATA Jojobera",
        scope: "DESIGN, ENGINEERING, MANUFACTURE, PRE-SHIPMENT TESTING, TRANSPORTATION AND DELIVERY OF CCTV SYSTEM WITH ALL REQUIRED ACCESSORIES TOGETHER WITH ALL SPARES FOR FGD SYSTEM AT JOJOBERA POWER PLANT",
        year: "2022-23",
        location: "Jharkhand, India",
      },
      {
        customer: "TATA Mundra",
        scope: "DESIGN, ENGINEERING, MANUFACTURE, PRE-SHIPMENT TESTING, TRANSPORTATION AND DELIVERY OF CCTV SYSTEM WITH ALL REQUIRED ACCESSORIES ALONG WITH MANDATORY SPARES FOR FGD PROJECT AT 5X830MW CGPL MUNDRA",
        year: "2022-23",
        location: "Gujarat, India",
      },
      {
        customer: "CSIR-CCMB",
        scope: "SITC of Surveillance Camera (CCTV) facility in LaCONES, Annexe-1 of CSIR-CCMB",
        year: "2022",
        location: "Attapur, Hyderabad",
      },
    ],
  },

  {
    year: "2023",
    projects: [
      {
        customer: "GHMC, Hyderabad",
        scope: "Web Casting in the Biennial Elections to Telangana State Legislative council for Mahabubnagar - Rangareddy - Hyderabad Teachers Constituency 2023",
        year: "2023",
        location: "Hyderabad, Telangana",
      },
      {
        customer: "Atomic Minerals Directorate for Exploration Research",
        scope: "Design, Supply, Installation, Testing & Commissioning of CCTV Surveillance system and Public address system",
        year: "2023",
      },
      {
        customer: "Bollaram Municipality",
        scope: "Installation of CC Cameras at Various Locations in Bollaram Municipality under SDF 2021-22",
        year: "2023",
        location: "Bollaram, Telangana",
      },
      {
        customer: "Telangana High Court",
        scope: "Installation of live streaming and video conferencing solution in 35 court halls of the High Court for the State of Telangana",
        year: "2023-24",
        location: "Telangana",
      },
      {
        customer: "AP Capital Region Development Authority",
        scope: "Supply and Installation of Additional security gadgets (Dome cameras, bullet cameras, PTZ cameras, NVR's, 65\" TV, 2D under vehicle surveillance system etc.) in the premises of AP High court",
        year: "2023-24",
        location: "Andhra Pradesh",
      },
      {
        customer: "Chief Electoral Officer, Assam",
        scope: "Live Web Casting for First Level Checking (FLC) in connection with General Election to Lok Sabha, 2024",
        year: "2023",
        location: "Assam",
      },
      {
        customer: "ITI Limited, Kolkata",
        scope: "Installation, Commissioning, and Monitoring of a GPS-based Vehicle Tracking System for the Assembly Election 2023",
        year: "2023",
      },
      {
        customer: "BSNL - Telangana Legislative Assembly Elections – 2023",
        scope: "Live streaming and recording of the polling at polling booths, CCTVs for counting centers and related Services",
        year: "2023",
        location: "Telangana",
      },
      {
        customer: "BSNL - Telangana Legislative Assembly Elections – 2023",
        scope: "Webcasting of check post and related services",
        year: "2023",
        location: "Telangana",
      },
    ],
  },

  {
    year: "2023-2024",
    projects: [
      {
        customer: "Andhra Pradesh State Beverages Corporation Limited",
        scope: "Providing services of vehicle tracking system (VTS) through Mobile Application for owned/hired/rented vehicles being used by the distilleries and Breweries during the transport of liquor/beer/Ethanol for a period of three years",
        year: "2023-24",
        location: "Andhra Pradesh",
      },
    ],
  },

  {
    year: "2024",
    projects: [
      {
        customer: "Chief Electoral Officer, Assam",
        scope: "Live Web Streaming work of IP Based Video Surveillance in the Polling Stations for General Elections in Assam – 2024",
        year: "2024",
        location: "Assam",
      },
      {
        customer: "Chief Electoral Officer, Mizoram",
        scope: "Webcasting for the General Election to the Lok Sabha, 2024 in the State of Mizoram",
        year: "2024",
        location: "Mizoram",
      },
      {
        customer: "ITI Limited, Kolkata",
        scope: "Installation, Commissioning, and Monitoring of a GPS-based Vehicle Tracking System for General Elections in Assam – 2024",
        year: "2024",
        location: "Assam",
      },
      {
        customer: "BSNL - Telangana General Elections to HoP (Lok Sabha), 2024",
        scope: "supply, installation and commissioning of IP Based Video surveillance system including Live streaming and recording of the polling event at all polling booths, CCTVs for counting centers, strong rooms, check posts and related Services",
        year: "2024",
        location: "Telangana",
      },
      {
        customer: "ITI Limited, Kolkata",
        scope: "Installation, Commissioning, and Monitoring of a GPS-based Vehicle Tracking System for Madhya Pradesh Lok Sabha Election 2024",
        year: "2024",
        location: "Madhya Pradesh",
      },
      {
        customer: "Chief Electoral Officer, Andhra Pradesh",
        scope: "Live Webcasting Streaming in the Polling Station & Check post for Lok Sabha and AP Legislative Assembly Elections 2024",
        year: "2024",
        location: "Andhra Pradesh",
      },
      {
        customer: "Chief Electoral Officer, Andhra Pradesh",
        scope: "Live Webcasting Streaming of PTZ Cameras mount on Flying Squad Team vehicles for Lok Sabha and AP Legislative Assembly Elections 2024",
        year: "2024",
        location: "Andhra Pradesh",
      },
      {
        customer: "ITI Limited, Chandigarh",
        scope: "Live Webcasting and Streaming of Events on Poll Day for the General Election to Lok Sabha 2024 in Himachal Pradesh",
        year: "2024",
        location: "Himachal Pradesh",
      },
      {
        customer: "Telecommunications Consultants India Ltd, New Delhi",
        scope: "Design, supply, installation, testing and commissioning of IP Based CCTV Surveillance System along with associated works at Operating Locations, AFS and LPG Plants under Tamil Nadu State Office- Lot 2",
        year: "2024-25",
        location: "Tamil Nadu",
      },
      {
        customer: "Chief Electoral Officer, Assam",
        scope: "Live Web Streaming in the Polling Station for Bye Elections in Assam – 2024",
        year: "2024",
        location: "Assam",
      },
    ],
  },

  {
    year: "2025",
    projects: [
      {
        customer: "EASTERN POWER DISTRIBUTION COMPANY OF A.P LIMITED",
        scope: "Design, Supply, Installation, Commissioning, Operation & Maintenance of Solar Mini Grid System 15 Nos of different capacities 7KW to 32KW, including control room & five years Comprehensive maintenance Contract to Turnkey basis for electrification of 654 Nos PVTG Households",
        year: "2025",
        location: "Andhra Pradesh",
      },
      {
        customer: "ITI - Assam Power Distribution Company Ltd",
        scope: "Implementation of On-Grid and Off-Grid Solar Power Plants at different PM-SHRI Schools Under Samagra Shiksha",
        year: "2025",
        location: "Assam",
      },
      {
        customer: "Telangana Board of Intermediate Education",
        scope: "Selection of System Integrator (SI) for Implementation of Integrated Command and Control Center (CCC) and Installation of CC Cameras in Intermediate Education",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Telangana Board of Intermediate Education (Additional Order)",
        scope: "Additional Work Order for Setup of Command Control Room in First Floor",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Telangana Board of Intermediate Education (Wifi CCTVs IPE Practical)",
        scope: "Installation of 4G Wi-fi CCTV cameras for IPE Practical 2025 Examinations",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Telangana Board of Intermediate Education (Wifi CCTVs IPE Theory)",
        scope: "Installation of 4G Wi-fi CCTV cameras for IPE Theory 2025 Examinations",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Telangana Board of Intermediate Education",
        scope: "Shifting of Command Control Centre, TGBIE from Ground Floor to First Floor",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Telangana Board of Intermediate Education (Wifi CCTVs IPE Theory supplementary)",
        scope: "Installation of 4G Wi-fi CCTV cameras for IPE Theory 2025 Examinations Supplementary",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "ITI - MEDA Nagpur",
        scope: "Survey, Design, Fabrication, Supply, Installation, Testing, Commissioning and Operation & Maintenance for a period of 5 years of total 544 KW Capacity Grid-Connected Solar PV Power Plant Under Roof-Top Net Metering at 272 Zilha Parishad Schools",
        year: "2025",
        location: "Maharashtra",
      },
      {
        customer: "Rajasthan Electronics and Instruments Limited",
        scope: "Survey Design Supply Erection Testing Commissioning and Comprehensive O and M for 25 years of 5 MW Grid Connected Rooftop Solar Photovoltaic Power Projects on State Government buildings/State Government undertaking building",
        year: "2025",
        location: "Rajasthan",
      },
      {
        customer: "SCCLtd, Kothagudem",
        scope: "Procurement of CC TV Cameras and Network Material",
        year: "2025",
        location: "Kothagudem, Telangana",
      },
      {
        customer: "Eduspark International Pvt Ltd",
        scope: "Implementation of CCTV Video Surveillance system for monitoring CET Exams across Maharashtra",
        year: "2025",
        location: "Maharashtra",
      },
      {
        customer: "ITI BSF Krishnagar 1",
        scope: "Selection of Project Implementation Agency (PIA) for Providing, installation, testing and commissioning of 25 KWp off Grid Solar Power Plant at 21 BOPs of 68, 82 and 107 Bn BSF",
        year: "2025",
        location: "Krishnanagar, West Bengal",
      },
      {
        customer: "ITI BSF Krishnagar 2",
        scope: "Selection of Project Implementation Agency (PIA) for Providing, installation, testing and commissioning of 25 KWp off Grid Solar Power Plant at 21 BOPs of 08 and 32 Bn BSF",
        year: "2025",
        location: "Krishnanagar, West Bengal",
      },
      {
        customer: "TCIL - MSRTC",
        scope: "Selection of Agency for Supply, Installation, Commissioning and Maintenance of IP based video surveillance solution and Integrated Command Control Center (ICCC) at MSRTC",
        year: "2025",
      },
      {
        customer: "NTA AISSEE Exams",
        scope: "CCTV Live Surveillance & Recording during SAINIK SCHOOL Entrance Examination conducted by National Testing Agency in 22 Cities in Madhya Pradesh State",
        year: "2025",
        location: "Madhya Pradesh",
      },
      {
        customer: "NTA NEET Exams",
        scope: "Provide CCTV Surveillance (Live Feed) & Recording during NEET (UG) 2025 Examination being conducted in Offline Mode by National Testing Agency",
        year: "2025",
      },
      {
        customer: "CCMB Hyderabad",
        scope: "Providing Surveilance Camera And Bio Metric Access Facility In Type-i Sq At Csir-ccmb Sq Colony And In Abhigyan Students Hostel",
        year: "2025",
        location: "Hyderabad",
      },
      {
        customer: "TGREDCO - TS Bus Stations Solar",
        scope: "Design, Supply, installation, testing and commissioning for aggregated capacity of 986.09KW grid connected Rooftop Solar PV power plants at 14 Nos. Bus Depots and 37 Nos Bus stations of Telangana State Road transport corporation under RESCO mode",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Kolkata Metro Railway",
        scope: "Upgradation of IP based CCTV Surveillance System for North South section (Blue line) of Metro Railway Kolkata",
        year: "2025",
        location: "Kolkata, West Bengal",
      },
      {
        customer: "Persons with Disabilities Welfare Department",
        scope: "Appointment of Agency for implementing an Integrated Aadhaar-Based Facial Recognition Biometric Attendance System in schools and workshops",
        year: "2025",
      },
      {
        customer: "AAI Visakhapatnam Airport",
        scope: "Design, Supply, Installation, Testing and Commissioning of Roof Top Grid Connected 15kWp Solar Photo Voltaic (PV) Power Plant at MSSR Building",
        year: "2025",
        location: "Visakhapatnam, Andhra Pradesh",
      },
      {
        customer: "DAE Irel (India) Limited",
        scope: "Design, Supply, Installation, Commissioning and Maintenance of Grid Connected Roof Top Solar Power Plant Service - 1389; 4; Self-owned",
        year: "2025",
      },
      {
        customer: "TCIL - IOCL Paradip Refinery",
        scope: "Design, Engineering, Supply, Installation, Testing & Commissioning of Surveillance IP CCTV System",
        year: "2025",
        location: "Paradip, Odisha",
      },
      {
        customer: "National Capital Region Transport Corporation Limited",
        scope: "Supply, Installation, Testing and Commissioning of CCTV System for coverage outside station premises at 25 stations of Delhi-Ghaziabad-Meerut Namo Bharat corridor",
        year: "2025",
      },
      {
        customer: "NREDCAP LTD APDISCOMs",
        scope: "EPC Contractors/Rooftop Solar (RTS) Vendors for Design, Engineering, Supply, Installation, Testing & Commissioning and O&M for 5 years of 17.86 MWp Grid Connected Rooftop Solar Plants for 8,929 SC & ST Consumers through Utility Led Aggregation (CAPEX) Mode under PM-Surya Ghar",
        year: "2025",
        location: "Andhra Pradesh",
      },
      {
        customer: "Bihar CEO",
        scope: "Selection of Agency for providing a Monitoring System (Live Web Streaming (Audio, Video, Record, Viewing CCTV & other Services)) for the General Election to Bihar Legislative Assembly, 2025",
        year: "2025",
        location: "Bihar",
      },
      {
        customer: "Mizoram Dampa AC Bye Election",
        scope: "Web Casting Implementing Agency for Webcasting to Bye Election to 2-Dampa (ST) AC of Mamit District",
        year: "2025",
        location: "Mizoram",
      },
      {
        customer: "Andhra Pradesh Capital Region Development Authority",
        scope: "Supply & installation of CCTV Cameras including O&M, comprehensive AMC for real time monitoring of construction activities @ Amaravati for the period of 1 year",
        year: "2025",
        location: "Amaravati, Andhra Pradesh",
      },
      {
        customer: "Karnataka High Court",
        scope: "Procurement of integrated Hardware (AV/VC Systems) to run VC Platform in Hybrid Mode and for Live streaming of Court Proceedings, as well as for implementation of Paper less work flow in the High Court of Karnataka and District & Taluka Courts",
        year: "2025",
        location: "Karnataka",
      },
      {
        customer: "Hyderabad Growth Corridor Limited",
        scope: "Integrated IP-Based CCTV Surveillance System at ORR Underpasses, Cyberabad Police Commissionerate Limits on Outer Ring Road",
        year: "2025",
        location: "Hyderabad, Telangana",
      },
      {
        customer: "KB - TGTS - TGBIE Display Tender",
        scope: "Procurement of Display Units for Junior Colleges across the Telangana State",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Panchayat Raj and Rural Employment",
        scope: "Providing a surveillance system (live webcasting streaming (audio, video, record, viewing, cctv & other services) at various locations (polling stations) across the state of telangana for the local bodies election -2025",
        year: "2025",
        location: "Telangana",
      },
      {
        customer: "Sarva Shiksha Abhiyan - KGBV",
        scope: "Procurement of Solar Water Heating System in Type III&IV KGBV Schools",
        year: "2025",
        location: "Andhra Pradesh",
      },
      {
        customer: "Assam FLC 2025",
        scope: "Web Casting Services for FLC of EVMs in connection with General Election to Assam Legislative Assembly, 2026",
        year: "2025",
        location: "Assam",
      },
      {
        customer: "Indian Rubber Materials Research Institute (IRMRI) - Solar",
        scope: "Installation of Rooftop solar system on Opex Model for around 8,700 sq.ft area",
        year: "2025",
        location: "Sricity",
      },
    ],
  },
  {
    year: "2026",
    projects: [
      {
        customer: "Telangana Municipal Elections 2026",
        scope: "Deployment of advanced surveillance and live-streaming camera systems across municipal locations to ensure a secure and transparent election process. The project includes real-time monitoring through ICCC, technical support, network management, and strict compliance with Election Commission guidelines.",
        year: "2026",
        location: "Telangana",
      },
      {
        customer: "Andhra Pradesh Capital Region Development Authority (APCRDA)",
        scope: "Implementation of high-resolution surveillance camera systems across CRDA regions to strengthen public safety and smart city infrastructure. The project includes installation, maintenance, centralized monitoring through ICCC, network integration, secure storage management, and real-time analytics for efficient surveillance operations.",
        year: "2026",
        location: "Andhra Pradesh",
      },
      {
        customer: "RailTel Corporation of India Limited",
        scope: "Deployment and integration of surveillance and network infrastructure to enhance secure communication and monitoring capabilities across railway zones. The project includes camera installation, network connectivity, centralized monitoring, and ongoing technical support.",
        year: "2026",
      },
      {
        customer: "Kolkata Metro",
        scope: "Installation and maintenance of advanced surveillance systems across metro stations and operational areas to enhance passenger safety and security. The project includes real-time monitoring, network management, storage solutions, and centralized control integration.",
        year: "2026",
        location: "Kolkata, West Bengal",
      },
      {
        customer: "Hyderabad Growth Corridor Limited (HGCL)",
        scope: "Implementation of advanced surveillance systems across multiple underpass locations to enhance public safety and traffic monitoring. The project includes the installation of high-resolution cameras, network connectivity, centralized monitoring through ICCC, storage management, and continuous technical support to ensure smooth and secure operations.",
        year: "2026",
        location: "Hyderabad, Telangana",
      },
    ],
  },
];

// Optional: Flat list of all projects
export const allProjects = cctvAndRelatedProjects.flatMap(
  (group) => group.projects
);

// Optional: Helper to get projects for a specific year
export function getProjectsByYear(searchYear: string): Project[] {
  const group = cctvAndRelatedProjects.find((g) => g.year === searchYear);
  return group?.projects ?? [];
}
