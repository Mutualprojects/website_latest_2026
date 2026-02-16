"use client";

import React, { Suspense } from 'react'

import LatestNewsPage from './Latest';


function page() {
  return (
    <div>
      <Suspense fallback={<div className="p-4">Loading departments..</div>} >



        <LatestNewsPage />
      </Suspense>




    </div>
  )
}

export default page