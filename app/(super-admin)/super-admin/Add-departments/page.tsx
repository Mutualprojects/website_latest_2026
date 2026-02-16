"use client";

import React, { Suspense } from 'react'
import Department from './Depatment'

function page() {
  return (
    <div>
      <Suspense fallback={<div className="p-4">Loading departments...</div>}>
        <Department />
      </Suspense>
    </div>
  )
}

export default page