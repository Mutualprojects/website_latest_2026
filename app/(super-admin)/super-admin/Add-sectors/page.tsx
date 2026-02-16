"use client";

import React, { Suspense } from 'react'
import Addsectors from './Sector'

function page() {
  return (
    <div>

      <Suspense

        fallback={<div className="p-4">Loading departments...</div>}
      >
        <Addsectors
        />

      </Suspense>




    </div>
  )
}

export default page