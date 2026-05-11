import React from "react";
import TeamGrid from "./TeamGrid";
import PageTransition from "./PageTransition";

function page() {
  return (
    <PageTransition>
      <TeamGrid />
    </PageTransition>
  );
}

export default page