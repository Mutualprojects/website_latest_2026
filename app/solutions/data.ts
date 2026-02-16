// app/solutions/data.ts

export interface SubPoint {
  title: string;
  description: string;
}

export interface Component {
  name: string;
  description: string;
  icon?: any; // Added to support component-level icons
}

export interface FeatureList {
  title: string;
  items: string[];
}

export interface Section {
  title: string;
  slug?: string;
  icon?: any;
  image?: any;
  mainimage?: any;
  mainbanner?: any;
  customComponent?: "HEADPHONE_SCROLL";
  description?: string;
  subPoints?: SubPoint[];
  components?: Component[];
  featureLists?: FeatureList[];
  subsections?: Section[];
}

/* ===================== ERP ICON IMPORTS ===================== */

import AgileGrowthIcon from "./Erp/erpicons/agile-growth.png";
import AiMachineLearningIcon from "./Erp/erpicons/ai-and-machine-learning.png";
import AnalyticsDashboardIcon from "./Erp/erpicons/analytics-dashboard.png";
import AssetManagementIcon from "./Erp/erpicons/asset-management.png";
import BlockchainTraceabilityIcon from "./Erp/erpicons/blockchain-for-traceability.png";
import CloudHybridIcon from "./Erp/erpicons/cloud-on-premise-or-hybrid.png";
import ComplianceAssuranceIcon from "./Erp/erpicons/compliance-assurance.png";
import ConstructionAddonIcon from "./Erp/erpicons/construction-add-on.png";
import CostReductionIcon from "./Erp/erpicons/cost-reduction.png";
import CrmIcon from "./Erp/erpicons/customer-relationship-management.png";
import FinanceModuleIcon from "./Erp/erpicons/finance-module.png";
import GlobalMultiCurrencyIcon from "./Erp/erpicons/global-multi-currency.png";
import HealthcareSuiteIcon from "./Erp/erpicons/healthcare-suite.png";
import HrManagementIcon from "./Erp/erpicons/human-resources-management.png";
import IntegrationMiddlewareIcon from "./Erp/erpicons/integration-middleware.png";
import IotIntegrationIcon from "./Erp/erpicons/iot-integration.png";
import LowCodeCustomizationIcon from "./Erp/erpicons/low-code-customization.png";
import ManufacturingModuleIcon from "./Erp/erpicons/manufacturing-module.png";
import MigrationServicesIcon from "./Erp/erpicons/migration-services.png";
import MultiTenantArchitectureIcon from "./Erp/erpicons/multi-tenant-architecture.png";
import ProcessEfficiencyIcon from "./Erp/erpicons/process-efficiency.png";
import RetailExtensionIcon from "./Erp/erpicons/retail-extension.png";
import ScalabilityFeaturesIcon from "./Erp/erpicons/scalability-features.png";
import SecurityFrameworkIcon from "./Erp/erpicons/security-framework.png";
import StrategicInsightsIcon from "./Erp/erpicons/strategic-insights.png";
import SupplyChainManagementIcon from "./Erp/erpicons/supply-chain-management.png";
import SustainabilityTrackingIcon from "./Erp/erpicons/sustainability-tracking.png";
import UserTrainingAcademyIcon from "./Erp/erpicons/user-training-academy.png";
import WorkflowAutomationEngineIcon from "./Erp/erpicons/workflow-automation-engine.png";




/* ===================== SOLAR EPC ICON IMPORTS ===================== */

import AcceleratedRoiIcon from "./Solar/solaricons/accelerated-roi.png";
import BifacialPvModulesIcon from "./Solar/solaricons/bifacial-pv-modules.png";
import BulkPurchasingIcon from "./Solar/solaricons/bulk-purchasing.png";
import ConstructionExecutionIcon from "./Solar/solaricons/construction-execution.png";
import CustomizableSolutionsIcon from "./Solar/solaricons/customizable-solutions.png";
import ElectricalDesignIcon from "./Solar/solaricons/electrical-design.png";
import EnergyStorageIntegrationIcon from "./Solar/solaricons/energy-storage-integration.png";
import EngineeringDesignIcon from "./Solar/solaricons/engineering-design.png";
import EnvironmentalImpactAssessmentIcon from "./Solar/solaricons/environmental-impact-assessment.png";
import FinancialModelingIcon from "./Solar/solaricons/financial-modeling.png";
import GridIntegrationServicesIcon from "./Solar/solaricons/grid-integration-services.png";
import InventoryTrackingIcon from "./Solar/solaricons/inventory-tracking.png";
import LogisticsCoordinationIcon from "./Solar/solaricons/logistics-coordination.png";
import OmPlanningIcon from "./Solar/solaricons/o-and-m-planning.png";
import PermittingSupportIcon from "./Solar/solaricons/permitting-support.png";
import ProcurementManagementIcon from "./Solar/solaricons/procurement-management.png";
import ProjectManagementSoftwareIcon from "./Solar/solaricons/project-management-software.png";
import QualityAssuranceIcon from "./Solar/solaricons/quality-assurance.png";
import QualityControlChecksIcon from "./Solar/solaricons/quality-control-checks.png";
import RiskMitigationIcon from "./Solar/solaricons/risk-mitigation.png";
import RiskReductionIcon from "./Solar/solaricons/risk-reduction.png";
import SimulationModelingIcon from "./Solar/solaricons/simulation-and-modeling.png";
import SiteSurveyAnalysisIcon from "./Solar/solaricons/site-survey-and-analysis.png";
import SmartInvertersIcon from "./Solar/solaricons/smart-inverters.png";
import StructuralEngineeringIcon from "./Solar/solaricons/structural-engineering.png";
import SustainabilityImpactIcon from "./Solar/solaricons/sustainability-impact.png";
import SystemSizingIcon from "./Solar/solaricons/system-sizing.png";
import TrackerSystemsIcon from "./Solar/solaricons/tracker-systems.png";
import TrainingHandoverIcon from "./Solar/solaricons/training-and-handover.png";
import TurnkeySimplicityIcon from "./Solar/solaricons/turnkey-simplicity.png";
import VendorQualificationIcon from "./Solar/solaricons/vendor-qualification.png";


// vms//
import Aivms_banner from './vsm_images/73170.jpg'
import vms_manin_image from './vsm_images/IMG_20231130_033658.jpg'



/* ===================== AI VMS ICON IMPORTS ===================== */

import AiVideoAnalyticsEngineIcon from "./vsm_images/vms_icons/vms-1-ai-video-analytics-engine.png";
import CentralizedVideoServerIcon from "./vsm_images/vms_icons/centralized-video-server.png";
import CloudStorageIntegrationIcon from "./vsm_images/vms_icons/cloud-storage-integration.png";
import RealTimeAlertSystemIcon from "./vsm_images/vms_icons/real-time-alert-system.png";
import ForensicSearchToolsIcon from "./vsm_images/vms_icons/forensic-search-tools.png";
import MobileAccessAppIcon from "./vsm_images/vms_icons/mobile-access-app.png";
import ApiGatewayIcon from "./vsm_images/vms_icons/api-gateway.png";
import EdgeAiProcessingIcon from "./vsm_images/vms_icons/edge-ai-processing.png";
import ReportingDashboardIcon from "./vsm_images/vms_icons/reporting-dashboard.png";
import ComplianceAuditLogsIcon from "./vsm_images/vms_icons/compliance-audit-logs.png";

import ObjectFaceRecognitionIcon from "./vsm_images/vms_icons/object-and-face-recognition.png";
import AnomalyDetectionIcon from "./vsm_images/vms_icons/anomaly-detection.png";
import LicensePlateRecognitionIcon from "./vsm_images/vms_icons/license-plate-recognition-anpr.png";
import HeatMappingIcon from "./vsm_images/vms_icons/heat-mapping.png";
import PredictiveAnalyticsIcon from "./vsm_images/vms_icons/predictive-analytics.png";
import MultiCameraSyncIcon from "./vsm_images/vms_icons/multi-camera-synchronization.png";

import HybridDeploymentIcon from "./vsm_images/vms_icons/hybrid-deployment-options.png";
import ScalableArchitectureIcon from "./vsm_images/vms_icons/scalable-architecture.png";
import UserRoleManagementIcon from "./vsm_images/vms_icons/user-role-management.png";
import FirmwareUpdatesIcon from "./vsm_images/vms_icons/automatic-firmware-updates.png";
import BandwidthOptimizationIcon from "./vsm_images/vms_icons/bandwidth-optimization.png";
import BackupRedundancyIcon from "./vsm_images/vms_icons/backup-and-redundancy.png";

import IoTDeviceSupportIcon from "./vsm_images/vms_icons/iot-device-support.png";
import ThirdPartyApiHooksIcon from "./vsm_images/vms_icons/third-party-api-hooks.png";
import VirtualRealityPlaybackIcon from "./vsm_images/vms_icons/virtual-reality-playback.png";
import AiModelCustomizationIcon from "./vsm_images/vms_icons/ai-model-customization.png";

import ProactiveRiskMitigationIcon from "./vsm_images/vms_icons/proactive-risk-mitigation.png";
import OperationalCostSavingsIcon from "./vsm_images/vms_icons/operational-cost-savings.png";
import EnhancedIncidentResponseIcon from "./vsm_images/vms_icons/enhanced-incident-response.png";
import ImprovedComplianceIcon from "./vsm_images/vms_icons/improved-compliance.png";
import DataDrivenInsightsIcon from "./vsm_images/vms_icons/data-driven-insights.png";


// ai biometric 


/* ===================== SMART BIOMETRIC ICON IMPORTS ===================== */

import AccessControlInterfaceIcon from "./Accescontroll/Accescontrollicons/Access Control Interface.png";
import AgeEmotionEstimationIcon from "./Accescontroll/Accescontrollicons/Age and Emotion Estimation.png";
import AiProcessingUnitIcon from "./Accescontroll/Accescontrollicons/AI Processing Unit.png";
import AuditTrailLoggerIcon from "./Accescontroll/Accescontrollicons/Audit Trail Logger.png";
import BatteryBackupIcon from "./Accescontroll/Accescontrollicons/Battery Backup.png";
import BiometricScannerIcon from "./Accescontroll/Accescontrollicons/Biometric Scanner.png";
import BorderControlIntegrationIcon from "./Accescontroll/Accescontrollicons/Border Control Integration.png";
import CentralManagementServerIcon from "./Accescontroll/Accescontrollicons/Central Management Server.png";
import ComplianceCertificationsIcon from "./Accescontroll/Accescontrollicons/Compliance Certifications.png";
import DataPrivacyIcon from "./Accescontroll/Accescontrollicons/Data Privacy.png";
import DemographicAnalyticsIcon from "./Accescontroll/Accescontrollicons/Demographic Analytics.png";
import EdgeVsCloudProcessingIcon from "./Accescontroll/Accescontrollicons/Edge vs. Cloud Processing.png";
import ElevatedSecurityIcon from "./Accescontroll/Accescontrollicons/Elevated Security.png";
import EncryptionModuleIcon from "./Accescontroll/Accescontrollicons/Encryption Module.png";
import FacialRecognitionCameraIcon from "./Accescontroll/Accescontrollicons/Facial Recognition Camera.png";
import HealthcareAccessIcon from "./Accescontroll/Accescontrollicons/Healthcare Access.png";
import HybridAuthenticationIcon from "./Accescontroll/Accescontrollicons/Hybrid Authentication.png";
import IntegrationApiIcon from "./Accescontroll/Accescontrollicons/Integration API.png";
import LivenessDetectionIcon from "./Accescontroll/Accescontrollicons/Liveness Detection.png";
import MobileSdkIcon from "./Accescontroll/Accescontrollicons/Mobile SDK.png";
import MultiFaceDetectionIcon from "./Accescontroll/Accescontrollicons/Multi-Face Detection.png";
import OperationalEfficiencyIcon from "./Accescontroll/Accescontrollicons/Operational Efficiency.png";
import PoseAngleToleranceIcon from "./Accescontroll/Accescontrollicons/Pose and Angle Tolerance.png";
import RemoteManagementIcon from "./Accescontroll/Accescontrollicons/Remote Management.png";
import ScalabilityIcon from "./Accescontroll/Accescontrollicons/Scalability.png";
import ScalableEnrollmentIcon from "./Accescontroll/Accescontrollicons/Scalable Enrollment.png";
import SmartCityKiosksIcon from "./Accescontroll/Accescontrollicons/Smart City Kiosks.png";
import TimeAttendanceModuleIcon from "./Accescontroll/Accescontrollicons/Time and Attendance Module.png";
import UserConvenienceIcon from "./Accescontroll/Accescontrollicons/User Convenience.png";
import UserEnrollmentKioskIcon from "./Accescontroll/Accescontrollicons/User Enrollment Kiosk.png";
import WatchlistMatchingIcon from "./Accescontroll/Accescontrollicons/Watchlist Matching.png";




/* ===================== ICON IMPORTS ===================== */
import AiCctvSurveillanceIcon from "../../components/smart bus icons/AI CCTV Surveillance.png";
import BatterySupportEnergyStorageIcon from "../../components/smart bus icons/Battery Support & Energy Storage.png";
import BenefitsForOperatorsIcon from "../../components/smart bus icons/Benefits for Operators.png";
import BenefitsForPassengersIcon from "../../components/smart bus icons/Benefits for Passengers.png";
import BigDataAnalyticsIcon from "../../components/smart bus icons/Big Data Analytics.png";
import BreathAnalyzerSystemIcon from "../../components/smart bus icons/Breath Analyzer System.png";

import EmergencyBroadcastFeatureIcon from "../../components/smart bus icons/Emergency Broadcast Feature.png";
import FoamFireSuppressionSystemIcon from "../../components/smart bus icons/Foam Fire Suppression System.png";
import GpsTrackingIcon from "../../components/smart bus icons/GPS Tracking.png";

import LedSignageIcon from "../../components/smart bus icons/LED Signage.png";
import LedTvIcon from "../../components/smart bus icons/LED TV.png";

import PublicAddressSystemIcon from "../../components/smart bus icons/Public Address System.png";

import SmartTicketingForFutureIcon from "../../components/smart bus icons/Smart Ticketing (For Future).png";
import TechnologyIcon from "../../components/smart bus icons/Technology.png";
import WifiHotspotIcon from "../../components/smart bus icons/Wi-Fi Hotspot.png";
/* ===================== SMART BUS PICTURE IMPORTS ===================== */

import AlcoholDetectionForSaferBusOperationsPic from "./bussollutionimage/breth.png";

import CctvSurveillanceArchitectureDiagramPic from "../../components/smart bus pictures/CCTV Surveillance Architecture Diagram.png";
import CctvSurveillanceInBusesPic from "./bussollutionimage/Gemini_Generated_Image_o69vgho69vgho69v (1).png";
import DashboardSmartBusSolutionPic from "./bussollutionimage/smart bus web.jpg";

import EnhancedPassengerAccessFeaturesPic from "./bussollutionimage/dashobard.jpg";

import PeopleCountingAndOccupancyPic from "../../components/smart bus pictures/People Counting and Occupancy.png";
import ResultsOfSmartBusSolutionsPic from "../../components/smart bus pictures/Results of Smart Bus Solutions.png";

import SmartFeaturesForBusesPic from "./bussollutionimage/modern-city-street-scene-featuring-bus-driving.jpg";

import WifiHotspotInBusesPic from "../../components/smart bus pictures/WiFi Hotspot in Buses_ Enabling Smart, Connected Travel.png";
import Sb1Img from "./bussollutionimage/sb1.png";
import Sb2Img from "./bussollutionimage/sb2.png";
import Sb3Img from "./bussollutionimage/sb3.png";
import Sb4Img from "./bussollutionimage/sb4.png";
import Sb5Img from "./bussollutionimage/sb5.png";
import Sb6Img from "./bussollutionimage/sb6.png";

const solarepc="/image-6.jpg"
const erp="/image-8.jpg"
const face="/image-7.jpg"
const trafficEnforceme = "/image-5.jpg";
const smartClassroo = "/smartClassroomData%201.jpg";
const examinatio = "/examinationData%201.JPG";
const aiRoadDetecti = "/airoaddetection.png";
const electione = "/electioneeringData%201.jpg";




export const smartBusData: Section = {
  title: "Empowering Public Transport: The Next-Gen Smart Bus Experience",
  slug: "smart-bus-solution",
  customComponent: "HEADPHONE_SCROLL",
  mainimage: DashboardSmartBusSolutionPic,
  mainbanner: DashboardSmartBusSolutionPic,
  icon: TechnologyIcon,
  subsections: [
    {
      title: "Smart Bus Systems Overview",
      // image: ResultsOfSmartBusSolutionsPic,
      subPoints: [
        {
          title: "Safety Improvement",
          description: "Implementing smart technologies increases safety protocols for both passengers and drivers.",
        },
        {
          title: "Real-Time Tracking",
          description: "Real-time data enables effective tracking and communication with passengers, enhancing their travel experience.",
        },
        {
          title: "Operational Efficiency",
          description: "Integration of IoT enhances the operational efficiency of public transport systems, leading to better resource management.",
        },
        {
          title: "Enhanced Rider Experience",
          description: "Smart systems contribute to a more enjoyable and seamless travel experience for riders through improved services.",
        },
        {
          title: "IoT Integration",
          description: "Utilizing IoT, surveillance, and data technologies creates a more connected public transport system.",
        },
      ],
    },
    {
      title: "What is Smart Bus Solution?",
      description: "A Smart Bus Solution is an advanced transportation system that leverages technology to enhance safety, efficiency, and convenience in public or private bus services. It integrates GPS tracking, CCTV surveillance, driver behavior monitoring, and passenger tracking for real-time monitoring and management.",
      image: SmartFeaturesForBusesPic,
    },

    {
      title: "Driver Behaviour",
      components: [
        {
          name: "Driver Behaviour",
          description: "Monitors driver actions to improve safety and compliance.",
          icon: Sb1Img,
        },
        {
          name: "Drowsiness Detection",
          description: "Detects fatigue and alerts to prevent accidents.",
          icon: Sb2Img,
        },
        {
          name: "Harsh Braking & Acceleration",
          description: "Tracks aggressive driving events for safer operations.",
          icon: Sb3Img,
        },
        {
          name: "Overspeed Monitoring",
          description: "Alerts when the driver exceeds configured speed limits.",
          icon: Sb4Img,
        },
        {
          name: "Mobile Usage Detection",
          description: "Detects distraction from phone usage while driving.",
          icon: Sb5Img,
        },
        {
          name: "Compliance Reports",
          description: "Generates driver performance reports for training and audits.",
          icon: Sb6Img,
        },

      ],
    },

    {
      title: "Core Components",
      components: [
        {
          name: "AI CCTV Surveillance",
          description: "Smart cameras for real-time monitoring, threat detection, and enhanced security.",
          icon: AiCctvSurveillanceIcon,
        },
        {
          name: "GPS Tracking",
          description: "Live location updates for efficient route management and passenger convenience.",
          icon: GpsTrackingIcon,
        },
        {
          name: "LED Signage",
          description: "Screens showing routes, stops, alerts, and travel information.",
          icon: LedSignageIcon,
        },
        {
          name: "LED TV",
          description: "Dynamic advertising screens to generate revenue through targeted content.",
          icon: LedTvIcon,
        },
        {
          name: "Wi-Fi Hotspot",
          description: "Free internet access onboard to enhance passenger experience and connectivity.",
          icon: WifiHotspotIcon,
        },
        {
          name: "Public Address System",
          description: "Driver mic and internal speakers for announcements regarding stops or emergencies.",
          icon: PublicAddressSystemIcon,
        },
        {
          name: "Breath Analyzer System",
          description: "Prevents bus ignition if alcohol is detected in the driver's breath.",
          icon: BreathAnalyzerSystemIcon,
        },
        {
          name: "Foam Fire Suppression System",
          description: "Extinguishes flammable liquid fires by smothering them with cooling foam.",
          icon: FoamFireSuppressionSystemIcon,
        },
        {
          name: "Big Data Analytics",
          description: "Enables real-time analysis of routes, patterns, and vehicle performance.",
          icon: BigDataAnalyticsIcon,
        },
        {
          name: "Smart Ticketing",
          description: "Digital fare payments via cards or mobile apps, streamlining boarding.",
          icon: SmartTicketingForFutureIcon,
        },
      ],
    },
    {
      title: "CCTV Surveillance in Buses",
      image: CctvSurveillanceInBusesPic,
      mainimage: CctvSurveillanceArchitectureDiagramPic,
      subPoints: [
        {
          title: "AI-Based CCTV Cameras",
          description: "Strategically installed cameras cover entry points, seating areas, and the driver cabin.",
        },
        {
          title: "24/7 Recording",
          description: "Continuous recording ensures incidents are captured and reviewed when needed.",
        },
        {
          title: "Crime Deterrence",
          description: "Visible surveillance acts as a strong deterrent against criminal activities.",
        },
      ],
    },
    // {
    //   title: "Driver Monitoring with CCTV Technology",
    //   image: DriverBehaviorPic,
    //   subPoints: [
    //     {
    //       title: "Behavior Analytics",
    //       description: "Detects drowsiness, distraction, and mobile phone usage.",
    //     },
    //     {
    //       title: "Aggressive Driving Detection",
    //       description: "Identifies speeding, harsh braking, and unsafe maneuvers.",
    //     },
    //     {
    //       title: "Automated Alerts",
    //       description: "Instant notifications enable quick corrective action.",
    //     },
    //   ],
    // },
    {
      title: "Alcohol Detection for Safer Bus Operations",
      image: AlcoholDetectionForSaferBusOperationsPic,
      description: "Drivers must complete a breath test before ignition. If alcohol exceeds limits, the vehicle will not start.",
      icon: BreathAnalyzerSystemIcon,
      featureLists: [
        {
          title: "Key Hardware Features",
          items: ["IR Sensor", "Proximity Sensor", "IR Illuminator", "White Fill Light", "RGB Sensor"],
        },
      ],
    },
    {
      title: "Smart Passenger Features",
      image: EnhancedPassengerAccessFeaturesPic,
      components: [
        {
          name: "Automatic Passenger Counting (APC)",
          description: "Accurately tracks passenger flow using advanced sensors.",
          icon: PeopleCountingAndOccupancyPic,
        },
        {
          name: "Wi-Fi Connectivity",
          description: "Providing seamless high-speed internet for passengers.",
          icon: WifiHotspotInBusesPic,
        },
        {
          name: "Panic Buttons",
          description: "Instant alerts for emergencies triggered by drivers or passengers.",
          icon: EmergencyBroadcastFeatureIcon,
        },
      ],
    },
    // {
    //   title: "Smart Bus Solution Benefits",
    //   image: SmartBusSolutionBenefitsPic,
    //   subPoints: [
    //     {
    //       title: "Enhanced Safety and Security",
    //       description: "Advanced surveillance and emergency response systems protect passengers and staff.",
    //     },
    //     {
    //       title: "Improved Passenger Satisfaction",
    //       description: "Reliable schedules and modern amenities increase rider confidence.",
    //     },
    //     {
    //       title: "Cost Optimization",
    //       description: "Automation reduces operational costs and improves resource utilization.",
    //     },
    //   ],
    // },
  ],
};
// AI VMS Data
// export const aiVmsData: Section = {
//     mainimage: vms_manin_image,
//   mainbanner: Aivms_banner,
//   title: "Revolutionizing Surveillance: AI-Powered Video Management System",
//   slug: "ai-vms-video-management-system",
//   subsections: [
//     {
//       title: "AI VMS Overview",
//       subPoints: [
//         {
//           title: "Intelligent Threat Detection",
//           description:
//             "AI algorithms analyze video feeds in real-time to identify potential threats and anomalies.",
//         },
//         {
//           title: "Scalable Video Storage",
//           description:
//             "Efficient cloud and on-premise storage solutions handle massive video data volumes securely.",
//         },
//         {
//           title: "Seamless Integration",
//           description:
//             "Compatible with existing CCTV systems, IP cameras, and third-party security tools.",
//         },
//         {
//           title: "User-Friendly Interface",
//           description:
//             "Intuitive dashboards and mobile apps enable easy access and control for operators.",
//         },
//         {
//           title: "Advanced Analytics",
//           description:
//             "Leverages machine learning for object recognition, behavior analysis, and predictive insights.",
//         },
//       ],
//     },
//     {
//       title: "What is AI VMS?",
//       description:
//         "An AI Video Management System (VMS) is a sophisticated platform that combines video surveillance with artificial intelligence to provide proactive security monitoring. It processes live and recorded footage for automated alerts, forensic search, and operational intelligence, reducing manual oversight and enhancing response times across industries like retail, transportation, and critical infrastructure.",
//     },
//     {
//       title: "Core Components",
//       components: [
//         {
//           name: "AI Video Analytics Engine",
//           description:
//             "Processes streams for face detection, license plate recognition, and intrusion alerts.",
//         },
//         {
//           name: "Centralized Video Server",
//           description:
//             "Manages recording, streaming, and distribution of video feeds from multiple sources.",
//         },
//         {
//           name: "Cloud Storage Integration",
//           description:
//             "Scalable storage with encryption and redundancy for long-term video archiving.",
//         },
//         {
//           name: "Real-Time Alert System",
//           description:
//             "Sends notifications via email, SMS, or app for detected events.",
//         },
//         {
//           name: "Forensic Search Tools",
//           description:
//             "Advanced querying by metadata, time, or AI-tagged events for quick retrieval.",
//         },
//         {
//           name: "Mobile Access App",
//           description:
//             "Remote viewing and control from smartphones or tablets.",
//         },
//         {
//           name: "API Gateway",
//           description:
//             "Enables integration with access control, alarms, and enterprise systems.",
//         },
//         {
//           name: "Edge AI Processing",
//           description:
//             "On-device analytics to reduce bandwidth and latency in distributed setups.",
//         },
//         {
//           name: "Reporting Dashboard",
//           description:
//             "Customizable reports on incidents, trends, and system performance.",
//         },
//         {
//           name: "Compliance Audit Logs",
//           description:
//             "Tracks all access and actions for regulatory compliance (e.g., GDPR, HIPAA).",
//         },
//       ],
//     },
//     {
//       title: "AI-Enhanced Surveillance Features",
//       subPoints: [
//         {
//           title: "Object and Face Recognition",
//           description:
//             "Automatically identifies and tracks individuals or objects in crowded environments.",
//         },
//         {
//           title: "Anomaly Detection",
//           description:
//             "Flags unusual behaviors like loitering, abandoned objects, or crowd surges.",
//         },
//         {
//           title: "License Plate Recognition (ANPR)",
//           description:
//             "Captures and matches vehicle plates for access control and investigations.",
//         },
//         {
//           title: "Heat Mapping",
//           description:
//             "Visualizes high-traffic areas for operational optimization.",
//         },
//         {
//           title: "Predictive Analytics",
//           description:
//             "Forecasts potential risks based on historical patterns and trends.",
//         },
//         {
//           title: "Multi-Camera Synchronization",
//           description:
//             "Correlates events across cameras for comprehensive incident reconstruction.",
//         },
//       ],
//     },
//     {
//       title: "System Deployment and Management",
//       subPoints: [
//         {
//           title: "Hybrid Deployment Options",
//           description:
//             "Supports on-premise, cloud, or hybrid models for flexibility.",
//         },
//         {
//           title: "Scalable Architecture",
//           description:
//             "Handles from single-site to enterprise-wide deployments.",
//         },
//         {
//           title: "User Role Management",
//           description:
//             "Granular permissions for operators, admins, and auditors.",
//         },
//         {
//           title: "Automatic Firmware Updates",
//           description:
//             "Ensures cameras and devices stay current with security patches.",
//         },
//         {
//           title: "Bandwidth Optimization",
//           description:
//             "Adaptive streaming reduces data usage without compromising quality.",
//         },
//         {
//           title: "Backup and Redundancy",
//           description:
//             "Failover mechanisms ensure uninterrupted operation.",
//         },
//       ],
//     },
//     {
//       title: "Security and Privacy Controls",
//       description:
//         "AI VMS prioritizes data protection with end-to-end encryption, anonymization tools, and audit trails to comply with global privacy standards.",
//       featureLists: [
//         {
//           title: "Key Security Features",
//           items: [
//             "End-to-End Encryption",
//             "Data Anonymization",
//             "Access Logging",
//             "Tamper Detection",
//             "Secure Multi-Factor Authentication",
//           ],
//         },
//       ],
//     },
//     {
//       title: "Advanced Integration Capabilities",
//       components: [
//         {
//           name: "IoT Device Support",
//           description:
//             "Integrates with sensors for environmental and access monitoring.",
//         },
//         {
//           name: "Third-Party API Hooks",
//           description:
//             "Connects to CRM, HR, or emergency response systems.",
//         },
//         {
//           name: "Virtual Reality Playback",
//           description:
//             "Immersive review of events using 360-degree footage.",
//         },
//         {
//           name: "AI Model Customization",
//           description:
//             "Train models for site-specific threats or objects.",
//         },
//       ],
//     },
//     {
//       title: "AI VMS Benefits",
//       subPoints: [
//         {
//           title: "Proactive Risk Mitigation",
//           description:
//             "AI-driven alerts prevent incidents before escalation.",
//         },
//         {
//           title: "Operational Cost Savings",
//           description:
//             "Reduces need for constant human monitoring.",
//         },
//         {
//           title: "Enhanced Incident Response",
//           description:
//             "Faster resolution through intelligent search and evidence collection.",
//         },
//         {
//           title: "Improved Compliance",
//           description:
//             "Automated logging and reporting streamline audits.",
//         },
//         {
//           title: "Data-Driven Insights",
//           description:
//             "Analytics inform security strategies and resource allocation.",
//         },
//       ],
//     },
//   ],
// }; 

export const aiVmsData: Section = {
  mainimage: vms_manin_image,
  mainbanner: Aivms_banner,
  title: "Revolutionizing Surveillance: AI-Powered Video Management System",
  slug: "ai-vms-video-management-system",

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
      title: "Core Components",
      components: [
        {
          name: "AI Video Analytics Engine",
          description:
            "Processes streams for face detection, license plate recognition, and intrusion alerts.",
          icon: AiVideoAnalyticsEngineIcon,
        },
        {
          name: "Centralized Video Server",
          description:
            "Manages recording, streaming, and distribution of video feeds from multiple sources.",
          icon: CentralizedVideoServerIcon,
        },
        {
          name: "Cloud Storage Integration",
          description:
            "Scalable storage with encryption and redundancy for long-term video archiving.",
          icon: CloudStorageIntegrationIcon,
        },
        {
          name: "Real-Time Alert System",
          description:
            "Sends notifications via email, SMS, or app for detected events.",
          icon: RealTimeAlertSystemIcon,
        },
        {
          name: "Forensic Search Tools",
          description:
            "Advanced querying by metadata, time, or AI-tagged events for quick retrieval.",
          icon: ForensicSearchToolsIcon,
        },
        {
          name: "Mobile Access App",
          description:
            "Remote viewing and control from smartphones or tablets.",
          icon: MobileAccessAppIcon,
        },
        {
          name: "API Gateway",
          description:
            "Enables integration with access control, alarms, and enterprise systems.",
          icon: ApiGatewayIcon,
        },
        {
          name: "Edge AI Processing",
          description:
            "On-device analytics to reduce bandwidth and latency in distributed setups.",
          icon: EdgeAiProcessingIcon,
        },
        {
          name: "Reporting Dashboard",
          description:
            "Customizable reports on incidents, trends, and system performance.",
          icon: ReportingDashboardIcon,
        },
        {
          name: "Compliance Audit Logs",
          description:
            "Tracks all access and actions for regulatory compliance.",
          icon: ComplianceAuditLogsIcon,
        },
      ],
    },

    {
      title: "AI-Enhanced Surveillance Features",
      components: [
        {
          name: "Object and Face Recognition",
          description:
            "Automatically identifies and tracks individuals or objects in crowded environments.",
          icon: ObjectFaceRecognitionIcon,
        },
        {
          name: "Anomaly Detection",
          description:
            "Flags unusual behaviors like loitering, abandoned objects, or crowd surges.",
          icon: AnomalyDetectionIcon,
        },
        {
          name: "License Plate Recognition (ANPR)",
          description:
            "Captures and matches vehicle plates for access control and investigations.",
          icon: LicensePlateRecognitionIcon,
        },
        {
          name: "Heat Mapping",
          description:
            "Visualizes high-traffic areas for operational optimization.",
          icon: HeatMappingIcon,
        },
        {
          name: "Predictive Analytics",
          description:
            "Forecasts potential risks based on historical patterns and trends.",
          icon: PredictiveAnalyticsIcon,
        },
        {
          name: "Multi-Camera Synchronization",
          description:
            "Correlates events across cameras for comprehensive incident reconstruction.",
          icon: MultiCameraSyncIcon,
        },
      ],
    },

    {
      title: "System Deployment and Management",
      components: [
        {
          name: "Hybrid Deployment Options",
          description:
            "Supports on-premise, cloud, or hybrid models for flexibility.",
          icon: HybridDeploymentIcon,
        },
        {
          name: "Scalable Architecture",
          description:
            "Handles from single-site to enterprise-wide deployments.",
          icon: ScalableArchitectureIcon,
        },
        {
          name: "User Role Management",
          description:
            "Granular permissions for operators, admins, and auditors.",
          icon: UserRoleManagementIcon,
        },
        {
          name: "Automatic Firmware Updates",
          description:
            "Ensures cameras and devices stay current with security patches.",
          icon: FirmwareUpdatesIcon,
        },
        {
          name: "Bandwidth Optimization",
          description:
            "Adaptive streaming reduces data usage without compromising quality.",
          icon: BandwidthOptimizationIcon,
        },
        {
          name: "Backup and Redundancy",
          description:
            "Failover mechanisms ensure uninterrupted operation.",
          icon: BackupRedundancyIcon,
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
          icon: IoTDeviceSupportIcon,
        },
        {
          name: "Third-Party API Hooks",
          description:
            "Connects to CRM, HR, or emergency response systems.",
          icon: ThirdPartyApiHooksIcon,
        },
        {
          name: "Virtual Reality Playback",
          description:
            "Immersive review of events using 360-degree footage.",
          icon: VirtualRealityPlaybackIcon,
        },
        {
          name: "AI Model Customization",
          description:
            "Train models for site-specific threats or objects.",
          icon: AiModelCustomizationIcon,
        },
      ],
    },

    {
      title: "AI VMS Benefits",
      components: [
        {
          name: "Proactive Risk Mitigation",
          description:
            "AI-driven alerts prevent incidents before escalation.",
          icon: ProactiveRiskMitigationIcon,
        },
        {
          name: "Operational Cost Savings",
          description:
            "Reduces need for constant human monitoring.",
          icon: OperationalCostSavingsIcon,
        },
        {
          name: "Enhanced Incident Response",
          description:
            "Faster resolution through intelligent search and evidence collection.",
          icon: EnhancedIncidentResponseIcon,
        },
        {
          name: "Improved Compliance",
          description:
            "Automated logging and reporting streamline audits.",
          icon: ImprovedComplianceIcon,
        },
        {
          name: "Data-Driven Insights",
          description:
            "Analytics inform security strategies and resource allocation.",
          icon: DataDrivenInsightsIcon,
        },
      ],
    },
  ],
};


// Solar EPC Data
export const solarEpcData: Section = {
    mainimage: solarepc,
  mainbanner:solarepc,
  title: "Sustainable Energy Revolution: Solar EPC Excellence",
  slug: "solar-epc",

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
          icon: EngineeringDesignIcon,
        },
        {
          name: "Procurement Management",
          description:
            "Sourcing high-quality PV modules, inverters, and mounting structures from certified suppliers.",
          icon: ProcurementManagementIcon,
        },
        {
          name: "Construction Execution",
          description:
            "On-site installation, electrical wiring, and structural assembly by certified teams.",
          icon: ConstructionExecutionIcon,
        },
        {
          name: "Quality Assurance",
          description:
            "Rigorous testing and inspections at every phase for compliance and performance.",
          icon: QualityAssuranceIcon,
        },
        {
          name: "Project Management Software",
          description:
            "Tools for scheduling, budgeting, and stakeholder communication.",
          icon: ProjectManagementSoftwareIcon,
        },
        {
          name: "Grid Integration Services",
          description:
            "Synchronization with utility grids including metering and interconnection agreements.",
          icon: GridIntegrationServicesIcon,
        },
        {
          name: "O&M Planning",
          description:
            "Post-commissioning maintenance strategies for sustained efficiency.",
          icon: OmPlanningIcon,
        },
        {
          name: "Financial Modeling",
          description:
            "ROI calculations, incentive applications, and financing coordination.",
          icon: FinancialModelingIcon,
        },
        {
          name: "Environmental Impact Assessment",
          description:
            "Studies to ensure minimal ecological disruption.",
          icon: EnvironmentalImpactAssessmentIcon,
        },
        {
          name: "Training and Handover",
          description:
            "Operator training and documentation for smooth asset transition.",
          icon: TrainingHandoverIcon,
        },
      ],
    },

    {
      title: "Engineering Phase Details",
      components: [
        {
          name: "Site Survey and Analysis",
          description:
            "Solar irradiance mapping, soil testing, and shading assessments.",
          icon: SiteSurveyAnalysisIcon,
        },
        {
          name: "System Sizing",
          description:
            "Load calculations and component selection for optimal energy production.",
          icon: SystemSizingIcon,
        },
        {
          name: "Electrical Design",
          description:
            "DC/AC schematics, grounding, and protection systems.",
          icon: ElectricalDesignIcon,
        },
        {
          name: "Structural Engineering",
          description:
            "Wind load simulations and foundation designs.",
          icon: StructuralEngineeringIcon,
        },
        {
          name: "Simulation and Modeling",
          description:
            "PV performance predictions using tools like PVSyst.",
          icon: SimulationModelingIcon,
        },
        {
          name: "Permitting Support",
          description:
            "Assistance with local regulations and approvals.",
          icon: PermittingSupportIcon,
        },
      ],
    },

    {
      title: "Procurement and Supply Chain",
      components: [
        {
          name: "Vendor Qualification",
          description:
            "Tier-1 supplier selection based on reliability and cost.",
          icon: VendorQualificationIcon,
        },
        {
          name: "Bulk Purchasing",
          description:
            "Negotiated rates for economies of scale.",
          icon: BulkPurchasingIcon,
        },
        {
          name: "Logistics Coordination",
          description:
            "Timely delivery and customs clearance management.",
          icon: LogisticsCoordinationIcon,
        },
        {
          name: "Inventory Tracking",
          description:
            "Real-time monitoring to prevent delays.",
          icon: InventoryTrackingIcon,
        },
        {
          name: "Quality Control Checks",
          description:
            "Pre-shipment inspections for defect-free materials.",
          icon: QualityControlChecksIcon,
        },
        {
          name: "Risk Mitigation",
          description:
            "Contingency planning for supply disruptions.",
          icon: RiskMitigationIcon,
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
          icon: BifacialPvModulesIcon,
        },
        {
          name: "Smart Inverters",
          description:
            "Grid-supportive devices with monitoring and optimization features.",
          icon: SmartInvertersIcon,
        },
        {
          name: "Tracker Systems",
          description:
            "Single or dual-axis mounts to follow the sun's path.",
          icon: TrackerSystemsIcon,
        },
        {
          name: "Energy Storage Integration",
          description:
            "Battery systems for peak shaving and backup power.",
          icon: EnergyStorageIntegrationIcon,
        },
      ],
    },

    {
      title: "Solar EPC Benefits",
      components: [
        {
          name: "Turnkey Simplicity",
          description:
            "Single-point responsibility reduces client coordination efforts.",
          icon: TurnkeySimplicityIcon,
        },
        {
          name: "Accelerated ROI",
          description:
            "Efficient execution shortens payback periods.",
          icon: AcceleratedRoiIcon,
        },
        {
          name: "Risk Reduction",
          description:
            "Expert handling minimizes delays and cost overruns.",
          icon: RiskReductionIcon,
        },
        {
          name: "Sustainability Impact",
          description:
            "Promotes clean energy adoption with measurable CO₂ savings.",
          icon: SustainabilityImpactIcon,
        },
        {
          name: "Customizable Solutions",
          description:
            "Adaptable to diverse project scales and requirements.",
          icon: CustomizableSolutionsIcon,
        },
      ],
    },
  ],
};


// Smart Biometric Data
export const smartBiometricData: Section = {
    mainimage: face,
  mainbanner: face,
  title: "Aadhaar's secure biometric and face authentication for digital identity access",
  slug: "smart-biometric-facial-recognition",

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
          icon: FacialRecognitionCameraIcon,
        },
        {
          name: "Biometric Scanner",
          description:
            "Multi-sensor devices for fingerprint, iris, or palm vein capture.",
          icon: BiometricScannerIcon,
        },
        {
          name: "AI Processing Unit",
          description:
            "Onboard NPU for real-time matching against enrolled databases.",
          icon: AiProcessingUnitIcon,
        },
        {
          name: "Central Management Server",
          description:
            "Cloud or on-premise hub for enrollment, updates, and analytics.",
          icon: CentralManagementServerIcon,
        },
        {
          name: "Access Control Interface",
          description:
            "Integrates with doors, gates, or elevators for automated actions.",
          icon: AccessControlInterfaceIcon,
        },
        {
          name: "Mobile SDK",
          description:
            "Enables app-based biometric verification on smartphones.",
          icon: MobileSdkIcon,
        },
        {
          name: "Encryption Module",
          description:
            "Secures data transmission with AES-256 standards.",
          icon: EncryptionModuleIcon,
        },
        {
          name: "Audit Trail Logger",
          description:
            "Records all access events for compliance and forensics.",
          icon: AuditTrailLoggerIcon,
        },
        {
          name: "Integration API",
          description:
            "Connects to HR, security, or facility management systems.",
          icon: IntegrationApiIcon,
        },
        {
          name: "User Enrollment Kiosk",
          description:
            "Self-service stations for initial biometric registration.",
          icon: UserEnrollmentKioskIcon,
        },
      ],
    },

    {
      title: "Facial Recognition Features",
      components: [
        {
          name: "Liveness Detection",
          description:
            "Distinguishes real faces from photos or masks using 3D mapping.",
          icon: LivenessDetectionIcon,
        },
        {
          name: "Pose and Angle Tolerance",
          description:
            "Works with varying lighting, angles, and expressions.",
          icon: PoseAngleToleranceIcon,
        },
        {
          name: "Demographic Analytics",
          description:
            "Anonymized insights on footfall and demographics.",
          icon: DemographicAnalyticsIcon,
        },
        {
          name: "Watchlist Matching",
          description:
            "Alerts on persons of interest in real-time.",
          icon: WatchlistMatchingIcon,
        },
        {
          name: "Age and Emotion Estimation",
          description:
            "Additional layers for enhanced user experience.",
          icon: AgeEmotionEstimationIcon,
        },
        {
          name: "Multi-Face Detection",
          description:
            "Handles crowds by tracking multiple individuals simultaneously.",
          icon: MultiFaceDetectionIcon,
        },
      ],
    },

    {
      title: "Biometric Integration and Deployment",
      components: [
        {
          name: "Hybrid Authentication",
          description:
            "Fallback to PIN or RFID if biometrics fail.",
          icon: HybridAuthenticationIcon,
        },
        {
          name: "Scalable Enrollment",
          description:
            "Bulk import from existing databases for large organizations.",
          icon: ScalableEnrollmentIcon,
        },
        {
          name: "Remote Management",
          description:
            "Over-the-air updates and monitoring via dashboard.",
          icon: RemoteManagementIcon,
        },
        {
          name: "Edge vs. Cloud Processing",
          description:
            "Flexible deployment for offline or connected scenarios.",
          icon: EdgeVsCloudProcessingIcon,
        },
        {
          name: "Compliance Certifications",
          description:
            "Adheres to ISO, NIST, and regional privacy laws.",
          icon: ComplianceCertificationsIcon,
        },
        {
          name: "Battery Backup",
          description:
            "Ensures operation during power outages.",
          icon: BatteryBackupIcon,
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
          icon: TimeAttendanceModuleIcon,
        },
        {
          name: "Border Control Integration",
          description:
            "Speeds up e-gates at airports and checkpoints.",
          icon: BorderControlIntegrationIcon,
        },
        {
          name: "Smart City Kiosks",
          description:
            "Public access points for services like payments or info.",
          icon: SmartCityKiosksIcon,
        },
        {
          name: "Healthcare Access",
          description:
            "Patient and staff verification in medical facilities.",
          icon: HealthcareAccessIcon,
        },
      ],
    },

    {
      title: "Smart Biometric Benefits",
      components: [
        {
          name: "Elevated Security",
          description:
            "Unbreakable against lost credentials or impersonation.",
          icon: ElevatedSecurityIcon,
        },
        {
          name: "User Convenience",
          description:
            "Passwordless, instant access improves daily workflows.",
          icon: UserConvenienceIcon,
        },
        {
          name: "Operational Efficiency",
          description:
            "Reduces fraud and manual verification overhead.",
          icon: OperationalEfficiencyIcon,
        },
        {
          name: "Scalability",
          description:
            "Easily expands to new sites or users.",
          icon: ScalabilityIcon,
        },
        {
          name: "Data Privacy",
          description:
            "Minimizes personal data exposure through advanced encryption.",
          icon: DataPrivacyIcon,
        },
      ],
    },
  ],
};


// ERP Software Data
export const erpSoftwareData: Section = {
  title: "Enterprise Transformation: Next-Gen ERP Software Systems",
  slug: "erp-software-system",
mainbanner:erp,
mainimage:erp,
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
          icon: FinanceModuleIcon,
        },
        {
          name: "Human Resources Management",
          description:
            "Recruitment, payroll, performance tracking, and employee self-service.",
          icon: HrManagementIcon,
        },
        {
          name: "Supply Chain Management",
          description:
            "Inventory, procurement, logistics, and vendor portals.",
          icon: SupplyChainManagementIcon,
        },
        {
          name: "Manufacturing Module",
          description:
            "Production planning, quality control, and shop floor management.",
          icon: ManufacturingModuleIcon,
        },
        {
          name: "Customer Relationship Management",
          description:
            "Sales pipelines, lead tracking, and customer analytics.",
          icon: CrmIcon,
        },
        {
          name: "Analytics Dashboard",
          description:
            "KPI visualizations and custom reports with drill-down capabilities.",
          icon: AnalyticsDashboardIcon,
        },
        {
          name: "Workflow Automation Engine",
          description:
            "Rule-based approvals and task routing.",
          icon: WorkflowAutomationEngineIcon,
        },
        {
          name: "Integration Middleware",
          description:
            "Connects with CRM, e-commerce, or third-party apps via APIs.",
          icon: IntegrationMiddlewareIcon,
        },
        {
          name: "Security Framework",
          description:
            "Role-based access, encryption, and audit compliance.",
          icon: SecurityFrameworkIcon,
        },
        {
          name: "Asset Management",
          description:
            "Tracking of fixed assets, maintenance scheduling, and depreciation.",
          icon: AssetManagementIcon,
        },
      ],
    },

    {
      title: "Deployment and Customization",
      components: [
        {
          name: "Cloud, On-Premise, or Hybrid",
          description:
            "Flexible hosting options based on data sovereignty needs.",
          icon: CloudHybridIcon,
        },
        {
          name: "Low-Code Customization",
          description:
            "Drag-and-drop tools for non-developers to tailor interfaces.",
          icon: LowCodeCustomizationIcon,
        },
        {
          name: "Migration Services",
          description:
            "Seamless data transfer from legacy systems.",
          icon: MigrationServicesIcon,
        },
        {
          name: "User Training Academy",
          description:
            "Onboarding programs and certification tracks.",
          icon: UserTrainingAcademyIcon,
        },
        {
          name: "Scalability Features",
          description:
            "Auto-scaling resources for peak loads.",
          icon: ScalabilityFeaturesIcon,
        },
        {
          name: "Multi-Tenant Architecture",
          description:
            "Isolated environments for subsidiaries or clients.",
          icon: MultiTenantArchitectureIcon,
        },
      ],
    },

    {
      title: "Advanced ERP Features",
      components: [
        {
          name: "AI and Machine Learning",
          description:
            "Forecasting, anomaly detection, and chatbot assistants.",
          icon: AiMachineLearningIcon,
        },
        {
          name: "IoT Integration",
          description:
            "Real-time data from sensors for inventory and production.",
          icon: IotIntegrationIcon,
        },
        {
          name: "Blockchain for Traceability",
          description:
            "Secure supply chain auditing and contract management.",
          icon: BlockchainTraceabilityIcon,
        },
        {
          name: "Sustainability Tracking",
          description:
            "Carbon footprint reporting and ESG compliance.",
          icon: SustainabilityTrackingIcon,
        },
        {
          name: "Global Multi-Currency",
          description:
            "Handles international operations with currency conversions.",
          icon: GlobalMultiCurrencyIcon,
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
          icon: RetailExtensionIcon,
        },
        {
          name: "Healthcare Suite",
          description:
            "Patient billing, compliance, and appointment scheduling.",
          icon: HealthcareSuiteIcon,
        },
        {
          name: "Construction Add-On",
          description:
            "Project costing, subcontractor management, and RFIs.",
          icon: ConstructionAddonIcon,
        },
      ],
    },

    {
      title: "ERP Software Benefits",
      components: [
        {
          name: "Process Efficiency",
          description:
            "Eliminates silos for faster operations and reduced errors.",
          icon: ProcessEfficiencyIcon,
        },
        {
          name: "Cost Reduction",
          description:
            "Automation cuts manual labor and overheads.",
          icon: CostReductionIcon,
        },
        {
          name: "Strategic Insights",
          description:
            "Real-time data empowers proactive business strategies.",
          icon: StrategicInsightsIcon,
        },
        {
          name: "Compliance Assurance",
          description:
            "Built-in controls for SOX, GDPR, and industry standards.",
          icon: ComplianceAssuranceIcon,
        },
        {
          name: "Agile Growth",
          description:
            "Supports expansion without proportional IT investments.",
          icon: AgileGrowthIcon,
        },
      ],
    },
  ],
};
// ────────────────────────────────────────────────
// AI ROAD DETECTION SOLUTION
// ────────────────────────────────────────────────
// ────────────────────────────────────────────────
// AI ROAD DETECTION SOLUTION
// ────────────────────────────────────────────────
export const aiRoadDetectionData: Section = {
  title: "AI Road Detection Solution",
  slug: "ai-road-detection-solution",
  mainbanner:aiRoadDetecti ,
  mainimage: aiRoadDetecti,
  subsections: [
    {
      title: "AI Road Detection Overview",
      subPoints: [
        {
          title: "Real-Time Damage Detection",
          description: "Automatically identifies potholes, cracks, and surface defects using AI-powered cameras.",
        },
        {
          title: "Proactive Maintenance",
          description: "Enables early intervention to prevent minor issues from becoming major hazards.",
        },
        {
          title: "GPS-Linked Reporting",
          description: "Every detected defect is geo-tagged for precise location-based action.",
        },
        {
          title: "Scalable Coverage",
          description: "Deployable on vehicles or fixed poles across cities, highways, and rural roads.",
        },
        {
          title: "Data-Driven Infrastructure Planning",
          description: "Provides analytics to prioritize repair budgets and improve road quality over time.",
        },
      ],
    },
    {
      title: "What is an AI Road Detection Solution?",
      description:
        "An AI-powered road monitoring system that uses computer vision and deep learning to automatically detect road damages, hazards, obstructions, and infrastructure defects in real time. It helps municipal corporations, highway authorities, and smart city projects reduce accident risks, optimize maintenance schedules, and extend road lifespan through predictive and preventive actions.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "AI-Enabled High-Resolution Cameras",
          description: "Rugged cameras with wide-angle and night-vision capabilities for continuous scanning.",
        },
        {
          name: "Edge Analytics Engine",
          description: "On-device AI processing for real-time detection with low latency.",
        },
        {
          name: "Hazard & Damage Detection Algorithms",
          description: "Trained models for potholes, cracks, debris, waterlogging, and sign damage.",
        },
        {
          name: "GPS & Mapping Module",
          description: "Precise geo-tagging and integration with GIS/mapping platforms.",
        },
        {
          name: "Central Monitoring Dashboard",
          description: "Web-based interface showing defect locations, severity, and trends.",
        },
        {
          name: "Automated Reporting Engine",
          description: "Generates prioritized repair lists, photos, and severity scores.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      components: [
        {
          name: "Mobile Vehicle-Mounted Systems",
          description: "Installed on patrol / maintenance vehicles for city-wide scanning.",
        },
        {
          name: "Fixed Road-Side / Pole Deployment",
          description: "Permanent installations at critical junctions and highways.",
        },
        {
          name: "Integration with Municipal Control Centers",
          description: "API/webhook connection to existing smart city or PWD platforms.",
        },
        {
          name: "Custom Severity Thresholds",
          description: "Configurable rules for what counts as critical vs. moderate damage.",
        },
        {
          name: "Scalable Multi-City Rollout",
          description: "Centralized backend supporting thousands of detection points.",
        },
      ],
    },
    {
      title: "Key Features",
      components: [
        {
          name: "Pothole & Crack Detection",
          description: "High-accuracy identification even in low-light or rainy conditions.",
        },
        {
          name: "Obstruction & Debris Alerts",
          description: "Detects fallen trees, garbage, or objects blocking lanes.",
        },
        {
          name: "Real-Time GPS Mapping",
          description: "Every defect pinned on interactive maps with photos & severity.",
        },
        {
          name: "Automated Work-Order Generation",
          description: "Creates repair tickets with location, images, and priority.",
        },
      ],
    },
    {
      title: "Key Implementation Phases",
      featureLists: [
        {
          title: "Implementation Steps",
          items: [
            "Site & route planning for mobile/fixed deployment",
            "Camera and edge device installation & calibration",
            "AI model training/fine-tuning on local road conditions",
            "Integration with municipal GIS / control center systems",
            "Pilot testing on selected roads / zones",
            "Full rollout, continuous monitoring & model improvement",
          ],
        },
      ],
    },
    {
      title: "Industry-Specific Modules",
      components: [
        {
          name: "Municipal Corporations",
          description: "Urban road maintenance & monsoon damage tracking.",
        },
        {
          name: "National & State Highway Authorities",
          description: "Long-distance corridor monitoring & preventive repairs.",
        },
        {
          name: "Smart City Projects",
          description: "Integrated with traffic, lighting, and drainage systems.",
        },
        {
          name: "Infrastructure & PWD Departments",
          description: "Budget planning and contractor performance tracking.",
        },
      ],
    },
    {
      title: "Benefits",
      components: [
        {
          name: "Faster Road Maintenance Response",
          description: "Immediate detection reduces repair time and cost escalation.",
        },
        {
          name: "Reduced Accident Risk",
          description: "Early removal of hazards prevents crashes and injuries.",
        },
        {
          name: "Data-Driven Infrastructure Planning",
          description: "Prioritized spending based on actual defect density & severity.",
        },
        {
          name: "Lower Long-Term Repair Costs",
          description: "Preventive action extends road life and reduces emergency fixes.",
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────
// ELECTIONEERING / ELECTION MONITORING SOLUTION
// ────────────────────────────────────────────────
export const electioneeringData: Section = {
  title: "Electioneering Solution",
  slug: "electioneering-solution",
  mainbanner: electione,
  mainimage: electione,
  subsections: [
    {
      title: "Election Monitoring Overview",
      subPoints: [
        {
          title: "Real-Time Booth Surveillance",
          description: "Live video feed from polling stations ensures transparency.",
        },
        {
          title: "Centralized Command & Control",
          description: "District / state-level monitoring of thousands of locations.",
        },
        {
          title: "Rapid Incident Response",
          description: "Instant alerts for disturbances, malpractice, or technical issues.",
        },
        {
          title: "Secure Evidence Archiving",
          description: "Tamper-proof storage of all footage for post-election audits.",
        },
        {
          title: "Scalable Nationwide Deployment",
          description: "Supports elections of any scale — local, state, or national.",
        },
      ],
    },
    {
      title: "What is an Electioneering Solution?",
      description:
        "A comprehensive, large-scale surveillance and command-center solution designed to ensure free, fair, and transparent elections. It deploys high-definition cameras, secure networking, mobile units, and centralized monitoring to prevent malpractice, enable real-time oversight, and provide verifiable digital evidence for electoral authorities and law enforcement.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "High-Definition CCTV Systems",
          description: "PTZ and fixed cameras covering polling booths and perimeter.",
        },
        {
          name: "Mobile Surveillance Units",
          description: "Vehicle-mounted systems for sensitive or remote booths.",
        },
        {
          name: "Central Command & Control Center",
          description: "Multi-screen dashboard for live oversight and coordination.",
        },
        {
          name: "Live Monitoring & Alert Dashboard",
          description: "Real-time event detection and escalation workflows.",
        },
        {
          name: "Secure Video Storage & Archiving",
          description: "Encrypted, redundant storage compliant with election guidelines.",
        },
        {
          name: "Secure Network Backbone",
          description: "Dedicated connectivity with failover and encryption.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      components: [
        {
          name: "Rapid Large-Scale Rollout",
          description: "Quick setup across thousands of polling stations.",
        },
        {
          name: "Temporary & Mobile Installations",
          description: "Plug-and-play for short-duration election periods.",
        },
        {
          name: "Integration with Election Commission Systems",
          description: "API links to voter lists, result portals, and incident reporting.",
        },
        {
          name: "Centralized District / State Monitoring",
          description: "Hierarchical control rooms from booth → district → state.",
        },
      ],
    },
    {
      title: "Key Features",
      components: [
        {
          name: "Live Booth Monitoring",
          description: "Continuous HD feed from inside and outside polling areas.",
        },
        {
          name: "Real-Time Incident Alerts",
          description: "Motion, crowd, or rule-violation triggers instant notifications.",
        },
        {
          name: "Secure & Tamper-Proof Storage",
          description: "Chain-of-custody compliant video archive.",
        },
        {
          name: "Remote Access for Authorized Personnel",
          description: "Secure web/mobile access for observers and officials.",
        },
      ],
    },
    {
      title: "Key Implementation Phases",
      featureLists: [
        {
          title: "Implementation Steps",
          items: [
            "Pre-election site survey and booth mapping",
            "Camera & network hardware installation",
            "Central control room setup & integration",
            "Pre-poll testing and mock drill",
            "Election-day 24×7 technical support & monitoring",
            "Post-election footage archiving & audit support",
          ],
        },
      ],
    },
    {
      title: "Applicable To",
      components: [
        {
          name: "National General Elections",
          description: "Country-wide deployment for parliamentary polls.",
        },
        {
          name: "State Assembly Elections",
          description: "State-level monitoring with regional control rooms.",
        },
        {
          name: "Local Body / Panchayat Elections",
          description: "Cost-effective solutions for village and municipal polls.",
        },
      ],
    },
    {
      title: "Benefits",
      components: [
        {
          name: "Enhanced Transparency",
          description: "Live visibility builds public trust in the electoral process.",
        },
        {
          name: "Reduced Malpractice Risk",
          description: "Visible surveillance deters booth capturing and irregularities.",
        },
        {
          name: "Faster Incident Resolution",
          description: "Real-time alerts enable immediate law-enforcement response.",
        },
        {
          name: "Verifiable Digital Evidence",
          description: "Court-admissible footage for post-election disputes.",
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────
// EXAMINATION / ANTI-MALPRACTICE SOLUTION
// ────────────────────────────────────────────────
export const examinationData: Section = {
  title: "Examination Solution",
  slug: "examination-solution",
  mainbanner: examinatio,
  mainimage: examinatio,
  subsections: [
    {
      title: "Secure Examination Monitoring Overview",
      subPoints: [
        {
          title: "Malpractice Prevention",
          description: "AI-powered detection of suspicious behavior during exams.",
        },
        {
          title: "Real-Time Remote Supervision",
          description: "Centralized monitoring of multiple exam centers simultaneously.",
        },
        {
          title: "Candidate Identity Verification",
          description: "Biometric + facial recognition to eliminate impersonation.",
        },
        {
          title: "Tamper-Proof Recording",
          description: "Full-session video archive for post-exam audits.",
        },
        {
          title: "Scalable Nationwide Coverage",
          description: "Used for school boards, competitive exams, and recruitment tests.",
        },
      ],
    },
    {
      title: "What is an Examination Solution?",
      description:
        "A secure digital examination monitoring and management system that uses AI surveillance, facial recognition, biometric verification, and centralized command centers to prevent malpractice, ensure candidate identity, enable real-time oversight, and maintain verifiable digital records. It is widely deployed for board exams, entrance tests, government recruitment, and professional certifications.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "AI Surveillance Cameras",
          description: "360° coverage with behavior and object detection analytics.",
        },
        {
          name: "Facial Recognition & Liveness Detection",
          description: "Pre-exam and continuous identity verification.",
        },
        {
          name: "Biometric Verification System",
          description: "Fingerprint / iris for additional authentication layers.",
        },
        {
          name: "Central Monitoring Dashboard",
          description: "Live view of all exam halls with intelligent alerts.",
        },
        {
          name: "Secure Video Storage",
          description: "Encrypted long-term archiving with audit trails.",
        },
        {
          name: "Incident & Malpractice Alert Engine",
          description: "Auto-flags whispering, phone usage, proxy candidates, etc.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      components: [
        {
          name: "Exam Center / Hall Installation",
          description: "Cameras and networking setup in schools & colleges.",
        },
        {
          name: "Large-Scale Nationwide Deployment",
          description: "Supports lakhs of candidates across thousands of centers.",
        },
        {
          name: "Integration with Exam Boards / Authorities",
          description: "Links to admit card, attendance, and result systems.",
        },
        {
          name: "Mobile & Web-Based Remote Monitoring",
          description: "Flyers / observers access live feeds securely.",
        },
      ],
    },
    {
      title: "Key Features",
      components: [
        {
          name: "Real-Time Malpractice Detection",
          description: "AI flags unauthorized material, talking, or abnormal behavior.",
        },
        {
          name: "Candidate Identity Verification",
          description: "Pre-exam facial + biometric match against admit card.",
        },
        {
          name: "Centralized Command Center Oversight",
          description: "State / national level monitoring with role-based access.",
        },
        {
          name: "Post-Exam Audit & Evidence Review",
          description: "Searchable video archive for investigation and appeals.",
        },
      ],
    },
    {
      title: "Key Implementation Phases",
      featureLists: [
        {
          title: "Implementation Steps",
          items: [
            "Exam center assessment & infrastructure readiness",
            "Camera, network & biometric device installation",
            "Candidate enrollment & biometric database creation",
            "Pre-exam mock testing & staff training",
            "Live monitoring during examination period",
            "Post-exam archiving, audit support & data handover",
          ],
        },
      ],
    },
    {
      title: "Industry-Specific Modules",
      components: [
        {
          name: "Universities & School Boards",
          description: "Board exams, semester tests, entrance examinations.",
        },
        {
          name: "Government Recruitment Boards",
          description: "SSC, UPSC, Banking, Railways, State PSC exams.",
        },
        {
          name: "Professional Certification Bodies",
          description: "CA, Medical, Engineering, IT certifications.",
        },
        {
          name: "Competitive Examination Authorities",
          description: "JEE, NEET, CLAT, CAT and similar large-scale tests.",
        },
      ],
    },
    {
      title: "Benefits",
      components: [
        {
          name: "Prevention of Exam Malpractice",
          description: "Strong deterrence and real-time intervention.",
        },
        {
          name: "Fair & Credible Evaluation",
          description: "Eliminates impersonation and cheating.",
        },
        {
          name: "Real-Time Supervision at Scale",
          description: "One control room oversees thousands of centers.",
        },
        {
          name: "Secure & Auditable Records",
          description: "Digital evidence protects integrity of results.",
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────
// SMART CLASSROOM SOLUTION
// ────────────────────────────────────────────────
export const smartClassroomData: Section = {
  title: "Smart Classroom Solution",
  slug: "smart-classroom-solution",
  mainbanner: smartClassroo,
  mainimage: smartClassroo,
  subsections: [
    {
      title: "Smart Classroom Overview",
      subPoints: [
        {
          title: "Interactive Learning Environment",
          description: "Transforms classrooms with touch-enabled displays and collaborative tools.",
        },
        {
          title: "Centralized Content Delivery",
          description: "Standardized curriculum access across all campuses via cloud platform.",
        },
        {
          title: "Hybrid & Remote Support",
          description: "Seamless blend of in-person, live, and recorded sessions.",
        },
        {
          title: "Real-Time Analytics",
          description: "Track engagement, performance, and teaching effectiveness.",
        },
        {
          title: "Secure & Scalable Infrastructure",
          description: "MPLS connectivity with centralized governance for multi-campus setups.",
        },
      ],
    },
    {
      title: "What is a Smart Classroom Solution?",
      description:
        "A Smart Classroom Solution is a technology-enabled learning environment that combines interactive display systems, centralized content platforms, secure networking, and learning management tools to deliver consistent, engaging, and measurable education experiences. It transforms traditional classrooms into connected digital ecosystems supporting in-person, remote, and blended learning models across institutions.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "Interactive Display Panels",
          description: "Advanced 4K touch-enabled smart boards for dynamic, collaborative teaching.",
        },
        {
          name: "Central Content Management System",
          description: "Cloud-based platform for storing, updating, and distributing standardized academic content.",
        },
        {
          name: "Learning Management System",
          description: "Platform for assignments, quizzes, attendance, grading, and performance tracking.",
        },
        {
          name: "MPLS Connectivity",
          description: "Secure, high-speed network interconnecting all institutions with centralized monitoring.",
        },
        {
          name: "Video Conferencing Integration",
          description: "Integrated platform for live classes, expert lectures, and cross-campus interaction.",
        },
        {
          name: "Analytics Dashboard",
          description: "Real-time monitoring of student engagement and learning outcomes.",
        },
        {
          name: "Security Framework",
          description: "Secure authentication, role-based access, and data protection.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      components: [
        {
          name: "Phased Implementation",
          description: "Site assessment, hardware installation, platform configuration, and faculty training.",
        },
        {
          name: "Hardware Installation",
          description: "Digitization of classrooms with interactive panels and connectivity setup.",
        },
        {
          name: "Central Platform Setup",
          description: "Configuration of CMS, LMS, and MPLS integration.",
        },
        {
          name: "Faculty Training",
          description: "Onboarding programs and ongoing support for educators.",
        },
        {
          name: "Scalability Features",
          description: "Easy expansion to new campuses or additional classrooms.",
        },
      ],
    },
    {
      title: "Advanced Features",
      components: [
        {
          name: "Multi-Touch Collaboration",
          description: "Real-time annotations, screen sharing, and wireless projection.",
        },
        {
          name: "Content Synchronization",
          description: "Cloud-based version control and automatic updates across locations.",
        },
        {
          name: "Remote Monitoring",
          description: "Live oversight of classrooms and teaching activities.",
        },
        {
          name: "Hybrid Learning Tools",
          description: "Support for live streaming, recordings, and interactive sessions.",
        },
      ],
    },
    {
      title: "Implementation Best Practices",
      description:
        "Phased rollouts with pilot classrooms ensure smooth adoption, minimal disruption, and high faculty engagement.",
      featureLists: [
        {
          title: "Key Implementation Phases",
          items: [
            "Site Assessment & Infrastructure Evaluation",
            "Hardware Installation & Classroom Digitization",
            "Central Platform Configuration (CMS & LMS)",
            "Secure MPLS Network Integration",
            "Faculty Training & Onboarding",
            "Go-Live Support & Continuous Optimization",
          ],
        },
      ],
    },
    {
      title: "Industry-Specific Modules",
      components: [
        {
          name: "Higher Education Institutions",
          description: "University-wide content governance and advanced performance analytics.",
        },
        {
          name: "Professional & Skill Development",
          description: "Multimedia training modules and remote certification programs.",
        },
        {
          name: "Government Educational Boards",
          description: "Uniform digital curriculum rollout across affiliated colleges.",
        },
        {
          name: "Corporate Training Centers",
          description: "Centralized employee training, evaluation, and compliance tracking.",
        },
      ],
    },
    {
      title: "Benefits",
      components: [
        {
          name: "Enhanced Engagement",
          description: "Interactive tools boost student participation and understanding.",
        },
        {
          name: "Standardized Delivery",
          description: "Consistent curriculum and quality across all campuses.",
        },
        {
          name: "Teaching Efficiency",
          description: "Reduced preparation time and improved collaboration for faculty.",
        },
        {
          name: "Hybrid Learning Support",
          description: "Seamless transition between in-person and remote education.",
        },
        {
          name: "Data-Driven Insights",
          description: "Real-time analytics for better academic decisions.",
        },
        {
          name: "Scalable & Secure",
          description: "Future-ready infrastructure with strong data protection.",
        },
      ],
    },
  ],
};

// ────────────────────────────────────────────────
// TRAFFIC ENFORCEMENT SOLUTION
// ────────────────────────────────────────────────
export const trafficEnforcementData: Section = {
  title: "Traffic Enforcement Solution",
  slug: "traffic-enforcement-solution",
  mainbanner: trafficEnforceme,
  mainimage: trafficEnforceme,
  subsections: [
    {
      title: "Traffic Enforcement Overview",
      subPoints: [
        {
          title: "AI-Powered Violation Detection",
          description: "Real-time identification of traffic rule breaches using advanced analytics.",
        },
        {
          title: "Automated Enforcement",
          description: "Generates e-challans with minimal human intervention.",
        },
        {
          title: "Centralized Monitoring",
          description: "Unified command center for city-wide oversight.",
        },
        {
          title: "Enhanced Road Safety",
          description: "Reduces violations through transparent and accurate enforcement.",
        },
        {
          title: "Data-Driven Insights",
          description: "Analytics for traffic planning and safety improvements.",
        },
      ],
    },
    {
      title: "What is a Traffic Enforcement Solution?",
      description:
        "An AI-driven surveillance and analytics platform that automatically identifies traffic violations using smart cameras and deep-learning algorithms, enabling automated challan generation and centralized monitoring. The system minimizes manual intervention while improving transparency and enforcement accuracy.",
    },
    {
      title: "Core Components",
      components: [
        {
          name: "AI-Enabled Traffic Surveillance Cameras",
          description: "High-resolution cameras with real-time video analytics.",
        },
        {
          name: "Automatic Number Plate Recognition (ANPR)",
          description: "Accurate vehicle identification and tracking.",
        },
        {
          name: "Helmet Detection Engine",
          description: "Detects helmet compliance for rider and pillion.",
        },
        {
          name: "Triple Riding Detection Module",
          description: "Identifies more than two riders on two-wheelers.",
        },
        {
          name: "Rider Behaviour Analysis Engine",
          description: "Detects rash driving, lane changes, and unsafe patterns.",
        },
        {
          name: "Central Command & Control Center",
          description: "Unified dashboard for live monitoring and control.",
        },
        {
          name: "E-Challan Integration System",
          description: "Automated violation processing and fine issuance.",
        },
        {
          name: "Real-Time Analytics Dashboard",
          description: "Visual insights into violations and traffic patterns.",
        },
      ],
    },
    {
      title: "Deployment and Customization",
      components: [
        {
          name: "City-Wide Junction Deployment",
          description: "Strategic camera placement at key intersections.",
        },
        {
          name: "Highway & Urban Integration",
          description: "Adaptable to highways, expressways, and city roads.",
        },
        {
          name: "Database Integration",
          description: "Links with police and transport department systems.",
        },
        {
          name: "Custom Violation Rules",
          description: "Configurable rules for local traffic regulations.",
        },
        {
          name: "Scalable Expansion",
          description: "Easy rollout across districts and states.",
        },
      ],
    },
    {
      title: "Features",
      components: [
        {
          name: "Triple Riding Detection",
          description: "Automatically captures violations with evidence and location.",
        },
        {
          name: "Helmet Detection",
          description: "Identifies non-compliance for rider and pillion.",
        },
        {
          name: "Rider Behaviour Analysis",
          description: "Flags rash driving, sudden maneuvers, and unsafe behavior.",
        },
        {
          name: "Automated Enforcement",
          description: "Real-time capture, ANPR identification, and challan generation.",
        },
      ],
    },
    {
      title: "Key Implementation",
      featureLists: [
        {
          title: "Key Implementation Phases",
          items: [
            "Strategic AI camera installation at junctions and highways",
            "Backend integration with traffic enforcement systems",
            "Control room setup for centralized monitoring",
            "AI model calibration for local traffic patterns",
            "Continuous monitoring and system optimization",
          ],
        },
      ],
    },
    {
      title: "Industry-Specific Modules",
      components: [
        {
          name: "Smart City Projects",
          description: "Integrated urban traffic management.",
        },
        {
          name: "Traffic Police Departments",
          description: "Tools for law enforcement teams.",
        },
        {
          name: "State Transport Authorities",
          description: "State-level violation and compliance tracking.",
        },
        {
          name: "Highway Management Authorities",
          description: "High-speed corridor monitoring.",
        },
      ],
    },
    {
      title: "Benefits",
      components: [
        {
          name: "Improved Road Safety",
          description: "Higher compliance through visible enforcement.",
        },
        {
          name: "Reduction in Violations",
          description: "Automated detection discourages rule-breaking.",
        },
        {
          name: "Transparent Enforcement",
          description: "Digital evidence and automated processes.",
        },
        {
          name: "Reduced Manual Workload",
          description: "Frees up police resources for other duties.",
        },
        {
          name: "Data-Driven Planning",
          description: "Insights for better traffic management.",
        },
      ],
    },
  ],
};
/* ===================== ALL SOLUTIONS ===================== */

export const allSolutions: Section[] = [
  smartBusData,
  aiVmsData,
  solarEpcData,
  smartBiometricData,
  erpSoftwareData,
  trafficEnforcementData,
  smartClassroomData,
  examinationData,
  aiRoadDetectionData,
  electioneeringData
];

/* ===================== HELPERS ===================== */

export function getSolution(slug: string): Section | null {
  return allSolutions.find((s) => s.slug === slug) ?? null;
}

export function getAllSolutionSlugs(): { params: { slug: string } }[] {
  return allSolutions
    .filter((s) => s.slug)
    .map((s) => ({ params: { slug: s.slug! } }));
}