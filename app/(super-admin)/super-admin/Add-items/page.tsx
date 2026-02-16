"use client";

import React, { Suspense } from 'react'
import Additems from './Add-items'

function page() {
  return (
    <div>
      <Suspense fallback={<div className="p-4">Loading departments...</div>}>

        <Additems />

      </Suspense>


    </div>
  )
}

export default page