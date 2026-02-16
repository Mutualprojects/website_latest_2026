

"use client";
import React, { Suspense } from 'react'
import Testmonial from './Teastmonial'

function page() {
  return (
    <div>

      <Suspense>

        <Testmonial />

      </Suspense>



    </div>
  )
}

export default page