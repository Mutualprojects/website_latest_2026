"use client";

import React, { Suspense } from 'react'
import ProjectsPage from './ProjectsPage';


function page() {
  return (
    <div>
      <Suspense fallback={<div className="p-4">Loading departments...</div>}>


        <ProjectsPage/>

      </Suspense>





    </div>
  )
}

export default page