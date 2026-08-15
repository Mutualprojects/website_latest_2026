// ======================================================================
// SOFTWARE PRODUCTS DATA – FULL EXPORT WITH ICONS + BANNER IMAGES
// Visitor Management System • HRMS • Task Management System
// ======================================================================

/* ===================== ICON IMPORTS ===================== */

import accessControl from "@/app/products/proicons/Access Control & Security Integration.png";
import adminDashboard from "@/app/products/proicons/Admin Dashboard & Reports.png";
import approvalGranted from "@/app/products/proicons/Approval Granted.png";
import autoCheckout from "@/app/products/proicons/Auto Check-Out on Exit.png";
import blacklist from "@/app/products/proicons/Blacklist alerts.png";
import cctv from "@/app/products/proicons/CCTV & biometric integration.png";
import compliance from "@/app/products/proicons/Compliance & Data Security.png";
import contactless from "@/app/products/proicons/Contactless registration.png";
import corporate from "@/app/products/proicons/Corporate Offices.png";
import scalable from "@/app/products/proicons/Customizable & Scalable Solution.png";
import reports from "@/app/products/proicons/Daily _ Monthly reports.png";
import encryption from "@/app/products/proicons/Data encryption & secure cloud storage.png";
import support from "@/app/products/proicons/Dedicated Support Team.png";
import digitalCheckin from "@/app/products/proicons/Digital Check-In via QR_Kiosk.png";
import digitalVisitor from "@/app/products/proicons/Digital Visitor Check-In icons.png";
import emergency from "@/app/products/proicons/Emergency evacuation list.png";
import entryExit from "@/app/products/proicons/Entry & exit tracking.png";
import entryLogged from "@/app/products/proicons/Entry Logged & Monitored.png";
import escalation from "@/app/products/proicons/Escalation alerts.png";
import fastCheckin from "@/app/products/proicons/Faster Check-In Process.png";
import government from "@/app/products/proicons/Government Institutions.png";
import hospitals from "@/app/products/proicons/Hospitals.png";
import hostNotification from "@/app/products/proicons/Host Receives Instant Notification.png";
import idscan from "@/app/products/proicons/ID scan & photo capture.png";
import improvedSecurity from "@/app/products/proicons/Improved Security.png";
import badge from "@/app/products/proicons/Instant badge printing.png";
import smsEmail from "@/app/products/proicons/Instant SMS _ Email alerts.png";
import itparks from "@/app/products/proicons/IT Parks.png";
import liveTracking from "@/app/products/proicons/Live visitor tracking.png";
import manufacturing from "@/app/products/proicons/Manufacturing Units.png";
import multiAuth from "@/app/products/proicons/Multi-level authorization.png";
import cloud from "@/app/products/proicons/On-Premise & Cloud Deployment.png";
import oneClick from "@/app/products/proicons/One-click approval system.png";
import brand from "@/app/products/proicons/Professional Brand Image.png";
import qr from "@/app/products/proicons/QR code & OTP-based entry.png";
import quick from "@/app/products/proicons/Quick Implementation.png";
import realTime from "@/app/products/proicons/Real-Time Host Notification.png";
import reducedWork from "@/app/products/proicons/Reduced Front Desk Workload.png";
import residential from "@/app/products/proicons/Residential Communities.png";
import rfid from "@/app/products/proicons/RFID _ QR-based access.png";
import scalableMulti from "@/app/products/proicons/Scalable for Multi-Location Businesses.png";
import schools from "@/app/products/proicons/Schools & Colleges.png";
import integration from "@/app/products/proicons/Seamless Integration with CCTV & Access Control.png";
import tablet from "@/app/products/proicons/Self-service tablet_kiosk check-in.png";
import tempBadge from "@/app/products/proicons/Temporary visitor badges.png";
import vendor from "@/app/products/proicons/Vendor management tracking.png";
import history from "@/app/products/proicons/Visitor history logs.png";
import preregister from "@/app/products/proicons/Visitor Pre-Registers or Walks In.png";

/* ===================== BANNER IMAGES ===================== */

import visitorBanner from "@/app/products/banerimages/enhancing-business-connectivity-employee-engagement-talent-management-workforce-connectivity-icon.jpg";
import hrmsBanner from "@/app/products/banerimages/man-is-looking-screen-that-says-man.jpg";
import taskBanner from "@/app/products/banerimages/task.png";

/* ===================== TYPES ===================== */

export type DeploymentOption = "Cloud" | "On-Premise" | "Hybrid";

export interface IconItem {
   text: string;
   icon?: any;
}

export interface CoreModule {
   title: string;
   description: string;
   icon?: any;
   features: IconItem[] | string[];
}

export interface Product {
   name: string;
   slug: string;
   tagline: string;
   description: string;

   bannerImage: any;

   targetIndustries: IconItem[];
   keyBenefits: IconItem[];
   whyChooseUs: IconItem[];

   deploymentOptions: DeploymentOption[];

   coreModules: CoreModule[];

   howItWorks?: IconItem[];
   integrations?: string[];
}

/* =====================================================
   VISITOR MANAGEMENT SYSTEM
===================================================== */

export const visitorManagementSystem: Product = {

   name: "Visitor Management System",
   slug: "visitor-management-system",

   bannerImage: hrmsBanner,

   tagline: "Smart Digital Visitor Entry Solution for Modern Workspaces",

   description:
      "Protect your premises with our advanced Visitor Management System (VMS) that automates secure visitor entry and eliminates manual visitor logs.",

   targetIndustries: [
      { text: "Corporate Offices", icon: corporate },
      { text: "IT Parks", icon: itparks },
      { text: "Residential Communities", icon: residential },
      { text: "Hospitals", icon: hospitals },
      { text: "Schools & Colleges", icon: schools },
      { text: "Government Institutions", icon: government },
      { text: "Manufacturing Units", icon: manufacturing },
   ],

   keyBenefits: [
      { text: "Improved Security", icon: improvedSecurity },
      { text: "Faster Check-In Process", icon: fastCheckin },
      { text: "Reduced Front Desk Workload", icon: reducedWork },
      { text: "Professional Brand Image", icon: brand },
      { text: "Compliance & Data Security", icon: compliance },
      { text: "Scalable for Multi-Location Businesses", icon: scalableMulti },
   ],

   whyChooseUs: [
      { text: "Customizable & Scalable Solution", icon: scalable },
      { text: "On-Premise & Cloud Deployment", icon: cloud },
      { text: "Seamless Integration with CCTV & Access Control", icon: integration },
      { text: "Quick Implementation", icon: quick },
      { text: "Dedicated Support Team", icon: support },
   ],

   deploymentOptions: ["Cloud", "On-Premise"],

   coreModules: [

      {
         title: "Digital Visitor Check-In",
         icon: digitalVisitor,
         description: "Self-service visitor registration that minimizes waiting time.",
         features: [
            { text: "Self-service tablet or kiosk check-in", icon: tablet },
            { text: "QR code & OTP-based entry", icon: qr },
            { text: "ID scan & photo capture", icon: idscan },
            { text: "Instant badge printing", icon: badge },
            { text: "Contactless registration", icon: contactless },
         ],
      },

      {
         title: "Real-Time Host Notification",
         icon: realTime,
         description: "Instant alerts when visitors arrive.",
         features: [
            { text: "Instant SMS & Email alerts", icon: smsEmail },
            { text: "One-click approval system", icon: oneClick },
            { text: "Multi-level authorization", icon: multiAuth },
            { text: "Escalation alerts", icon: escalation },
         ],
      },

      {
         title: "Access Control & Security Integration",
         icon: accessControl,
         description: "High-security visitor access control.",
         features: [
            { text: "Temporary visitor badges", icon: tempBadge },
            { text: "RFID / QR-based access", icon: rfid },
            { text: "Entry & exit tracking", icon: entryExit },
            { text: "Blacklist alerts", icon: blacklist },
            { text: "CCTV & biometric integration", icon: cctv },
         ],
      },

      {
         title: "Admin Dashboard & Reports",
         icon: adminDashboard,
         description: "Centralized visitor monitoring dashboard.",
         features: [
            { text: "Live visitor tracking", icon: liveTracking },
            { text: "Visitor history logs", icon: history },
            { text: "Vendor management tracking", icon: vendor },
            { text: "Emergency evacuation list", icon: emergency },
            { text: "Daily & monthly reports", icon: reports },
            { text: "Secure cloud storage", icon: encryption },
         ],
      },

   ],

   howItWorks: [
      { text: "Visitor Pre-Registers or Walks In", icon: preregister },
      { text: "Digital Check-In via QR/Kiosk", icon: digitalCheckin },
      { text: "Host Receives Instant Notification", icon: hostNotification },
      { text: "Approval Granted", icon: approvalGranted },
      { text: "Entry Logged & Monitored", icon: entryLogged },
      { text: "Auto Check-Out on Exit", icon: autoCheckout },
   ],

   integrations: [
      "CCTV Systems",
      "Access Control Systems",
      "Biometric Devices",
      "WhatsApp Notifications",
   ],

};

/* =====================================================
   HRMS SOFTWARE
===================================================== */

export const hrmsSoftware: Product = {

   name: "HRMS Software",
   slug: "hrms-software",

   bannerImage: visitorBanner,

   tagline: "Efficient Employee Attendance Tracking with Real-Time Alerts",

   description:
      "Cloud-based HRMS platform for attendance, payroll, compliance and employee management.",

   targetIndustries: [
      { text: "IT & Corporate Offices", icon: corporate },
      { text: "Manufacturing Units", icon: manufacturing },
      { text: "Hospitals", icon: hospitals },
      { text: "Educational Institutions", icon: schools },
   ],

   keyBenefits: [
      { text: "Eliminate manual attendance registers", icon: reducedWork },
      { text: "Prevent buddy punching", icon: improvedSecurity },
      { text: "Reduce payroll errors", icon: compliance },
   ],

   whyChooseUs: [
      { text: "Modern UI Dashboard", icon: adminDashboard },
      { text: "Fast Implementation", icon: quick },
      { text: "Enterprise Security", icon: compliance },
   ],

   deploymentOptions: ["Cloud"],

   coreModules: [],

};

/* =====================================================
   TASK MANAGEMENT SYSTEM
===================================================== */

export const taskManagementSystem: Product = {

   name: "Task Management System",
   slug: "task-management-system",

   bannerImage: taskBanner,

   tagline: "Smart Task Assignment & Project Monitoring",

   description:
      "Assign tasks, track progress and monitor deadlines with full project visibility.",

   targetIndustries: [
      { text: "IT Companies", icon: corporate },
      { text: "Startups", icon: quick },
   ],

   keyBenefits: [
      { text: "Improve employee accountability", icon: improvedSecurity },
      { text: "Increase productivity", icon: liveTracking },
   ],

   whyChooseUs: [
      { text: "Easy to Use", icon: quick },
      { text: "Secure Cloud Platform", icon: compliance },
   ],

   deploymentOptions: ["Cloud"],

   coreModules: [],

};

/* =====================================================
   SOLAR SPECTRA
===================================================== */

export const solarSpectra: Product = {
   name: "Solar Spectra",
   slug: "solar-spectra",
   bannerImage: "/mmr/solar-spectra-hero.png",
   tagline: "Portable Solar CCTV & Flood Light System (2-in-1)",
   description:
      "Smart surveillance and high-intensity illumination for off-grid and remote sites.",
   targetIndustries: [
      { text: "Construction Sites", icon: corporate },
      { text: "Industrial Facilities", icon: manufacturing },
      { text: "Remote & Off-Grid", icon: government },
   ],
   keyBenefits: [
      { text: "100% Solar Powered", icon: improvedSecurity },
      { text: "CCTV + Flood Light (2-in-1)", icon: fastCheckin },
   ],
   whyChooseUs: [
      { text: "Rapid Plug & Play Setup", icon: quick },
   ],
   deploymentOptions: ["Cloud"],
   coreModules: [],
};

/* =====================================================
   FINAL EXPORT
===================================================== */

export const products = {
   visitorManagement: visitorManagementSystem,
   hrms: hrmsSoftware,
   taskManagement: taskManagementSystem,
   solarSpectra: solarSpectra,
} as const;

export type ProductKey = keyof typeof products;