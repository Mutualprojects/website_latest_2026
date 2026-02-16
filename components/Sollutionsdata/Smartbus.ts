// =======================
// TypeScript Data Models
// =======================

export interface SubPoint {
  title: string;
  description: string;
}

export interface Component {
  name: string;
  description: string;
}

export interface FeatureList {
  title: string;
  items: string[];
}

export interface Section {
  title: string;
  description?: string;
  subPoints?: SubPoint[];
  components?: Component[];
  featureLists?: FeatureList[];
  subsections?: Section[];
}

// =======================
// AI VMS Video Management System Data
// =======================

export const aiVmsData: Section = {
  title: "Revolutionizing Surveillance: AI-Powered Video Management System",
  subsections: [
    {
      title: "AI VMS Overview",
      subPoints: [
        {
          title: "Intelligent Threat Detection",
          description:
            "AI algorithms analyze video feeds in real-time to identify potential threats and anomalies.",
        },
        {
          title: "Scalable Video Storage",
          description:
            "Efficient cloud and on-premise storage solutions handle massive video data volumes securely.",
        },
        {
          title: "Seamless Integration",
          description:
            "Compatible with existing CCTV systems, IP cameras, and third-party security tools.",
        },
        {
          title: "User-Friendly Interface",
          description:
            "Intuitive dashboards and mobile apps enable easy access and control for operators.",
        },
        {
          title: "Advanced Analytics",
          description:
            "Leverages machine learning for object recognition, behavior analysis, and predictive insights.",
        },
      ],
    },
    {
      title: "What is AI VMS?",
      description:
        "An AI Video Management System (VMS) is a sophisticated platform that combines video surveillance with artificial intelligence to provide proactive security monitoring. It processes live and recorded footage for automated alerts, forensic search, and operational intelligence, reducing manual oversight and enhancing response times across industries like retail, transportation, and critical infrastructure.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "AI Video Analytics Engine",
          description:
            "Processes streams for face detection, license plate recognition, and intrusion alerts.",
        },
        {
          name: "Centralized Video Server",
          description:
            "Manages recording, streaming, and distribution of video feeds from multiple sources.",
        },
        {
          name: "Cloud Storage Integration",
          description:
            "Scalable storage with encryption and redundancy for long-term video archiving.",
        },
        {
          name: "Real-Time Alert System",
          description:
            "Sends notifications via email, SMS, or app for detected events.",
        },
        {
          name: "Forensic Search Tools",
          description:
            "Advanced querying by metadata, time, or AI-tagged events for quick retrieval.",
        },
        {
          name: "Mobile Access App",
          description:
            "Remote viewing and control from smartphones or tablets.",
        },
        {
          name: "API Gateway",
          description:
            "Enables integration with access control, alarms, and enterprise systems.",
        },
        {
          name: "Edge AI Processing",
          description:
            "On-device analytics to reduce bandwidth and latency in distributed setups.",
        },
        {
          name: "Reporting Dashboard",
          description:
            "Customizable reports on incidents, trends, and system performance.",
        },
        {
          name: "Compliance Audit Logs",
          description:
            "Tracks all access and actions for regulatory compliance (e.g., GDPR, HIPAA).",
        },
      ],
    },
    {
      title: "AI-Enhanced Surveillance Features",
      subPoints: [
        {
          title: "Object and Face Recognition",
          description:
            "Automatically identifies and tracks individuals or objects in crowded environments.",
        },
        {
          title: "Anomaly Detection",
          description:
            "Flags unusual behaviors like loitering, abandoned objects, or crowd surges.",
        },
        {
          title: "License Plate Recognition (ANPR)",
          description:
            "Captures and matches vehicle plates for access control and investigations.",
        },
        {
          title: "Heat Mapping",
          description:
            "Visualizes high-traffic areas for operational optimization.",
        },
        {
          title: "Predictive Analytics",
          description:
            "Forecasts potential risks based on historical patterns and trends.",
        },
        {
          title: "Multi-Camera Synchronization",
          description:
            "Correlates events across cameras for comprehensive incident reconstruction.",
        },
      ],
    },
    {
      title: "System Deployment and Management",
      subPoints: [
        {
          title: "Hybrid Deployment Options",
          description:
            "Supports on-premise, cloud, or hybrid models for flexibility.",
        },
        {
          title: "Scalable Architecture",
          description:
            "Handles from single-site to enterprise-wide deployments.",
        },
        {
          title: "User Role Management",
          description:
            "Granular permissions for operators, admins, and auditors.",
        },
        {
          title: "Automatic Firmware Updates",
          description:
            "Ensures cameras and devices stay current with security patches.",
        },
        {
          title: "Bandwidth Optimization",
          description:
            "Adaptive streaming reduces data usage without compromising quality.",
        },
        {
          title: "Backup and Redundancy",
          description:
            "Failover mechanisms ensure uninterrupted operation.",
        },
      ],
    },
    {
      title: "Security and Privacy Controls",
      description:
        "AI VMS prioritizes data protection with end-to-end encryption, anonymization tools, and audit trails to comply with global privacy standards.",
      featureLists: [
        {
          title: "Key Security Features",
          items: [
            "End-to-End Encryption",
            "Data Anonymization",
            "Access Logging",
            "Tamper Detection",
            "Secure Multi-Factor Authentication",
          ],
        },
      ],
    },
    {
      title: "Advanced Integration Capabilities",
      components: [
        {
          name: "IoT Device Support",
          description:
            "Integrates with sensors for environmental and access monitoring.",
        },
        {
          name: "Third-Party API Hooks",
          description:
            "Connects to CRM, HR, or emergency response systems.",
        },
        {
          name: "Virtual Reality Playback",
          description:
            "Immersive review of events using 360-degree footage.",
        },
        {
          name: "AI Model Customization",
          description:
            "Train models for site-specific threats or objects.",
        },
      ],
    },
    {
      title: "AI VMS Benefits",
      subPoints: [
        {
          title: "Proactive Risk Mitigation",
          description:
            "AI-driven alerts prevent incidents before escalation.",
        },
        {
          title: "Operational Cost Savings",
          description:
            "Reduces need for constant human monitoring.",
        },
        {
          title: "Enhanced Incident Response",
          description:
            "Faster resolution through intelligent search and evidence collection.",
        },
        {
          title: "Improved Compliance",
          description:
            "Automated logging and reporting streamline audits.",
        },
        {
          title: "Data-Driven Insights",
          description:
            "Analytics inform security strategies and resource allocation.",
        },
      ],
    },
  ],
};

// =======================
// Solar EPC Data
// =======================

export const solarEpcData: Section = {
  title: "Sustainable Energy Revolution: Solar EPC Excellence",
  subsections: [
    {
      title: "Solar EPC Overview",
      subPoints: [
        {
          title: "End-to-End Project Delivery",
          description:
            "From feasibility studies to commissioning, ensuring seamless solar project execution.",
        },
        {
          title: "Cost-Effective Solutions",
          description:
            "Optimized designs minimize expenses while maximizing energy yield.",
        },
        {
          title: "Sustainable Practices",
          description:
            "Eco-friendly materials and processes reduce carbon footprint.",
        },
        {
          title: "Scalable Deployments",
          description:
            "Tailored for rooftop, ground-mount, or utility-scale installations.",
        },
        {
          title: "Performance Guarantee",
          description:
            "Long-term warranties on output and system reliability.",
        },
      ],
    },
    {
      title: "What is Solar EPC?",
      description:
        "Solar Engineering, Procurement, and Construction (EPC) is a comprehensive service model that handles the design, sourcing, and building of solar power plants. It streamlines project timelines, ensures quality control, and delivers turnkey solutions for residential, commercial, and industrial clients aiming for renewable energy adoption.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "Engineering Design",
          description:
            "Detailed site assessments, system modeling, and layout optimization using CAD and simulation tools.",
        },
        {
          name: "Procurement Management",
          description:
            "Sourcing high-quality PV modules, inverters, and mounting structures from certified suppliers.",
        },
        {
          name: "Construction Execution",
          description:
            "On-site installation, electrical wiring, and structural assembly by certified teams.",
        },
        {
          name: "Quality Assurance",
          description:
            "Rigorous testing and inspections at every phase for compliance and performance.",
        },
        {
          name: "Project Management Software",
          description:
            "Tools for scheduling, budgeting, and stakeholder communication.",
        },
        {
          name: "Grid Integration Services",
          description:
            "Synchronization with utility grids including metering and interconnection agreements.",
        },
        {
          name: "O&M Planning",
          description:
            "Post-commissioning maintenance strategies for sustained efficiency.",
        },
        {
          name: "Financial Modeling",
          description:
            "ROI calculations, incentive applications, and financing coordination.",
        },
        {
          name: "Environmental Impact Assessment",
          description:
            "Studies to ensure minimal ecological disruption.",
        },
        {
          name: "Training and Handover",
          description:
            "Operator training and documentation for smooth asset transition.",
        },
      ],
    },
    {
      title: "Engineering Phase Details",
      subPoints: [
        {
          title: "Site Survey and Analysis",
          description:
            "Solar irradiance mapping, soil testing, and shading assessments.",
        },
        {
          title: "System Sizing",
          description:
            "Load calculations and component selection for optimal energy production.",
        },
        {
          title: "Electrical Design",
          description:
            "DC/AC schematics, grounding, and protection systems.",
        },
        {
          title: "Structural Engineering",
          description:
            "Wind load simulations and foundation designs.",
        },
        {
          title: "Simulation and Modeling",
          description:
            "PV performance predictions using tools like PVSyst.",
        },
        {
          title: "Permitting Support",
          description:
            "Assistance with local regulations and approvals.",
        },
      ],
    },
    {
      title: "Procurement and Supply Chain",
      subPoints: [
        {
          title: "Vendor Qualification",
          description:
            "Tier-1 supplier selection based on reliability and cost.",
        },
        {
          title: "Bulk Purchasing",
          description:
            "Negotiated rates for economies of scale.",
        },
        {
          title: "Logistics Coordination",
          description:
            "Timely delivery and customs clearance management.",
        },
        {
          title: "Inventory Tracking",
          description:
            "Real-time monitoring to prevent delays.",
        },
        {
          title: "Quality Control Checks",
          description:
            "Pre-shipment inspections for defect-free materials.",
        },
        {
          title: "Risk Mitigation",
          description:
            "Contingency planning for supply disruptions.",
        },
      ],
    },
    {
      title: "Construction and Commissioning",
      description:
        "Expert teams handle civil works, electrical installations, and final testing to bring solar projects online efficiently.",
      featureLists: [
        {
          title: "Key Construction Milestones",
          items: [
            "Site Preparation",
            "Module Installation",
            "Inverter Setup",
            "Cable Laying",
            "Grid Tie-In",
            "Performance Testing",
          ],
        },
      ],
    },
    {
      title: "Advanced Solar Technologies",
      components: [
        {
          name: "Bifacial PV Modules",
          description:
            "Double-sided panels capturing reflected light for higher yields.",
        },
        {
          name: "Smart Inverters",
          description:
            "Grid-supportive devices with monitoring and optimization features.",
        },
        {
          name: "Tracker Systems",
          description:
            "Single or dual-axis mounts to follow the sun's path.",
        },
        {
          name: "Energy Storage Integration",
          description:
            "Battery systems for peak shaving and backup power.",
        },
      ],
    },
    {
      title: "Solar EPC Benefits",
      subPoints: [
        {
          title: "Turnkey Simplicity",
          description:
            "Single-point responsibility reduces client coordination efforts.",
        },
        {
          title: "Accelerated ROI",
          description:
            "Efficient execution shortens payback periods.",
        },
        {
          title: "Risk Reduction",
          description:
            "Expert handling minimizes delays and cost overruns.",
        },
        {
          title: "Sustainability Impact",
          description:
            "Promotes clean energy adoption with measurable CO2 savings.",
        },
        {
          title: "Customizable Solutions",
          description:
            "Adaptable to diverse project scales and requirements.",
        },
      ],
    },
  ],
};

// =======================
// Smart Biometric and Facial Recognition System Data
// =======================

export const smartBiometricData: Section = {
  title: "Secure Access Revolution: Smart Biometric and Facial Recognition",
  subsections: [
    {
      title: "Smart Biometric Overview",
      subPoints: [
        {
          title: "Touchless Authentication",
          description:
            "Eliminates physical contact for hygienic and convenient access control.",
        },
        {
          title: "High Accuracy Rates",
          description:
            "Advanced algorithms ensure low false positives and negatives.",
        },
        {
          title: "Multi-Modal Support",
          description:
            "Combines facial, fingerprint, iris, and voice for robust verification.",
        },
        {
          title: "Real-Time Processing",
          description:
            "Instant decisions with edge computing for low latency.",
        },
        {
          title: "Privacy-First Design",
          description:
            "Template-based storage protects sensitive biometric data.",
        },
      ],
    },
    {
      title: "What is Smart Biometric and Facial Recognition System?",
      description:
        "A Smart Biometric and Facial Recognition System uses AI-driven sensors to verify identities through unique physical or behavioral traits. It enables secure, frictionless access in environments like offices, airports, and smart cities, integrating with IoT for automated workflows and enhanced security.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "Facial Recognition Camera",
          description:
            "High-resolution sensors with liveness detection to prevent spoofing.",
        },
        {
          name: "Biometric Scanner",
          description:
            "Multi-sensor devices for fingerprint, iris, or palm vein capture.",
        },
        {
          name: "AI Processing Unit",
          description:
            "Onboard NPU for real-time matching against enrolled databases.",
        },
        {
          name: "Central Management Server",
          description:
            "Cloud or on-premise hub for enrollment, updates, and analytics.",
        },
        {
          name: "Access Control Interface",
          description:
            "Integrates with doors, gates, or elevators for automated actions.",
        },
        {
          name: "Mobile SDK",
          description:
            "Enables app-based biometric verification on smartphones.",
        },
        {
          name: "Encryption Module",
          description:
            "Secures data transmission with AES-256 standards.",
        },
        {
          name: "Audit Trail Logger",
          description:
            "Records all access events for compliance and forensics.",
        },
        {
          name: "Integration API",
          description:
            "Connects to HR, security, or facility management systems.",
        },
        {
          name: "User Enrollment Kiosk",
          description:
            "Self-service stations for initial biometric registration.",
        },
      ],
    },
    {
      title: "Facial Recognition Features",
      subPoints: [
        {
          title: "Liveness Detection",
          description:
            "Distinguishes real faces from photos or masks using 3D mapping.",
        },
        {
          title: "Pose and Angle Tolerance",
          description:
            "Works with varying lighting, angles, and expressions.",
        },
        {
          title: "Demographic Analytics",
          description:
            "Anonymized insights on footfall and demographics.",
        },
        {
          title: "Watchlist Matching",
          description:
            "Alerts on persons of interest in real-time.",
        },
        {
          title: "Age and Emotion Estimation",
          description:
            "Additional layers for enhanced user experience.",
        },
        {
          title: "Multi-Face Detection",
          description:
            "Handles crowds by tracking multiple individuals simultaneously.",
        },
      ],
    },
    {
      title: "Biometric Integration and Deployment",
      subPoints: [
        {
          title: "Hybrid Authentication",
          description:
            "Fallback to PIN or RFID if biometrics fail.",
        },
        {
          title: "Scalable Enrollment",
          description:
            "Bulk import from existing databases for large organizations.",
        },
        {
          title: "Remote Management",
          description:
            "Over-the-air updates and monitoring via dashboard.",
        },
        {
          title: "Edge vs. Cloud Processing",
          description:
            "Flexible deployment for offline or connected scenarios.",
        },
        {
          title: "Compliance Certifications",
          description:
            "Adheres to ISO, NIST, and regional privacy laws.",
        },
        {
          title: "Battery Backup",
          description:
            "Ensures operation during power outages.",
        },
      ],
    },
    {
      title: "Security Enhancements",
      description:
        "The system employs zero-knowledge proofs and federated learning to safeguard data without compromising functionality.",
      featureLists: [
        {
          title: "Key Security Protocols",
          items: [
            "Liveness Anti-Spoofing",
            "Biometric Template Hashing",
            "Secure Enclave Storage",
            "Anomaly-Based Alerts",
            "Revocable Credentials",
          ],
        },
      ],
    },
    {
      title: "Smart Applications",
      components: [
        {
          name: "Time and Attendance Module",
          description:
            "Automates payroll with accurate biometric clock-ins.",
        },
        {
          name: "Border Control Integration",
          description:
            "Speeds up e-gates at airports and checkpoints.",
        },
        {
          name: "Smart City Kiosks",
          description:
            "Public access points for services like payments or info.",
        },
        {
          name: "Healthcare Access",
          description:
            "Patient and staff verification in medical facilities.",
        },
      ],
    },
    {
      title: "Smart Biometric Benefits",
      subPoints: [
        {
          title: "Elevated Security",
          description:
            "Unbreakable against lost credentials or impersonation.",
        },
        {
          title: "User Convenience",
          description:
            "Passwordless, instant access improves daily workflows.",
        },
        {
          title: "Operational Efficiency",
          description:
            "Reduces fraud and manual verification overhead.",
        },
        {
          title: "Scalability",
          description:
            "Easily expands to new sites or users.",
        },
        {
          title: "Data Privacy",
          description:
            "Minimizes personal data exposure through advanced encryption.",
        },
      ],
    },
  ],
};

// =======================
// ERP Software System Data
// =======================

export const erpSoftwareData: Section = {
  title: "Enterprise Transformation: Next-Gen ERP Software Systems",
  subsections: [
    {
      title: "ERP Software Overview",
      subPoints: [
        {
          title: "Integrated Business Processes",
          description:
            "Unifies finance, HR, supply chain, and operations in one platform.",
        },
        {
          title: "Cloud-Native Architecture",
          description:
            "Scalable, secure access from anywhere with automatic updates.",
        },
        {
          title: "AI-Driven Insights",
          description:
            "Predictive analytics for smarter decision-making.",
        },
        {
          title: "Customizable Workflows",
          description:
            "Adaptable modules to fit unique business needs.",
        },
        {
          title: "Mobile-First Design",
          description:
            "Apps for on-the-go management and approvals.",
        },
      ],
    },
    {
      title: "What is ERP Software System?",
      description:
        "Enterprise Resource Planning (ERP) software is a centralized digital backbone that automates and integrates core business functions. It provides real-time visibility, streamlines operations, and supports growth by connecting disparate systems into a cohesive ecosystem for mid-to-large enterprises.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "Finance Module",
          description:
            "Accounting, budgeting, invoicing, and financial reporting tools.",
        },
        {
          name: "Human Resources Management",
          description:
            "Recruitment, payroll, performance tracking, and employee self-service.",
        },
        {
          name: "Supply Chain Management",
          description:
            "Inventory, procurement, logistics, and vendor portals.",
        },
        {
          name: "Manufacturing Module",
          description:
            "Production planning, quality control, and shop floor management.",
        },
        {
          name: "Customer Relationship Management",
          description:
            "Sales pipelines, lead tracking, and customer analytics.",
        },
        {
          name: "Analytics Dashboard",
          description:
            "KPI visualizations and custom reports with drill-down capabilities.",
        },
        {
          name: "Workflow Automation Engine",
          description:
            "Rule-based approvals and task routing.",
        },
        {
          name: "Integration Middleware",
          description:
            "Connects with CRM, e-commerce, or third-party apps via APIs.",
        },
        {
          name: "Security Framework",
          description:
            "Role-based access, encryption, and audit compliance.",
        },
        {
          name: "Asset Management",
          description:
            "Tracking of fixed assets, maintenance scheduling, and depreciation.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      subPoints: [
        {
          title: "Cloud, On-Premise, or Hybrid",
          description:
            "Flexible hosting options based on data sovereignty needs.",
        },
        {
          title: "Low-Code Customization",
          description:
            "Drag-and-drop tools for non-developers to tailor interfaces.",
        },
        {
          title: "Migration Services",
          description:
            "Seamless data transfer from legacy systems.",
        },
        {
          title: "User Training Academy",
          description:
            "Onboarding programs and certification tracks.",
        },
        {
          title: "Scalability Features",
          description:
            "Auto-scaling resources for peak loads.",
        },
        {
          title: "Multi-Tenant Architecture",
          description:
            "Isolated environments for subsidiaries or clients.",
        },
      ],
    },
    {
      title: "Advanced ERP Features",
      subPoints: [
        {
          title: "AI and Machine Learning",
          description:
            "Forecasting, anomaly detection, and chatbot assistants.",
        },
        {
          title: "IoT Integration",
          description:
            "Real-time data from sensors for inventory and production.",
        },
        {
          title: "Blockchain for Traceability",
          description:
            "Secure supply chain auditing and contract management.",
        },
        {
          title: "Sustainability Tracking",
          description:
            "Carbon footprint reporting and ESG compliance.",
        },
        {
          title: "Global Multi-Currency",
          description:
            "Handles international operations with currency conversions.",
        },
        {
          title: "Mobile Notifications",
          description:
            "Push alerts for approvals and critical updates.",
        },
      ],
    },
    {
      title: "Implementation Best Practices",
      description:
        "Phased rollouts with pilot testing ensure minimal disruption and high adoption rates.",
      featureLists: [
        {
          title: "Key Implementation Phases",
          items: [
            "Discovery and Planning",
            "Configuration and Testing",
            "Data Migration",
            "User Training",
            "Go-Live Support",
            "Continuous Optimization",
          ],
        },
      ],
    },
    {
      title: "Industry-Specific Modules",
      components: [
        {
          name: "Retail Extension",
          description:
            "POS integration and omnichannel inventory sync.",
        },
        {
          name: "Healthcare Suite",
          description:
            "Patient billing, compliance, and appointment scheduling.",
        },
        {
          name: "Construction Add-On",
          description:
            "Project costing, subcontractor management, and RFIs.",
        },
        {
          name: "Professional Services",
          description:
            "Time tracking, billing, and resource allocation.",
        },
      ],
    },
    {
      title: "ERP Software Benefits",
      subPoints: [
        {
          title: "Process Efficiency",
          description:
            "Eliminates silos for faster operations and reduced errors.",
        },
        {
          title: "Cost Reduction",
          description:
            "Automation cuts manual labor and overheads.",
        },
        {
          title: "Strategic Insights",
          description:
            "Real-time data empowers proactive business strategies.",
        },
        {
          title: "Compliance Assurance",
          description:
            "Built-in controls for SOX, GDPR, and industry standards.",
        },
        {
          title: "Agile Growth",
          description:
            "Supports expansion without proportional IT investments.",
        },
      ],
    },
  ],
};