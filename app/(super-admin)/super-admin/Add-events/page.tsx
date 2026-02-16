"use client";


import React, { Suspense } from 'react'
import Event from '../Add-events/Events'

function page() {
  return (
    <div>

      <Suspense fallback={<div className="p-4">Loading departments...</div>}>
        <Event />
      </Suspense>
    </div>
  )
}

export default page