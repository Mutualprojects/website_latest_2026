"use client";


import React, { Suspense } from 'react'
import Contactresponses from './Contactresponse'
function page() {
  return (
    <div>

      <Suspense fallback={<div className="p-4">Loading departments...</div>}>


        <Contactresponses />
      </Suspense>


    </div>
  )
}

export default page