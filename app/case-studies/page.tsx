"use client";


import caseBannerImage from './10292.jpg'
import { getAllCaseStudies, getAllSectors } from "./data";
import CaseStudiesPage from "./setter";

export default function CaseStudyHome() {
  const allCaseStudies = getAllCaseStudies();
  const sectors = getAllSectors();

  return <CaseStudiesPage allCaseStudies={allCaseStudies} sectors={sectors} caseBannerImage={caseBannerImage} />;
}