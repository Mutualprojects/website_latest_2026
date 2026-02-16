import React from "react";
import { ORG_GROUPS } from "@/app/about/our-team/org-groups";
import TeamGrid from "./TeamGrid";
import PageTransition from "./PageTransition";

function page() {
  return (
    <PageTransition>
      <TeamGrid group={ORG_GROUPS[0]} />
    </PageTransition>
  );
}

export default page