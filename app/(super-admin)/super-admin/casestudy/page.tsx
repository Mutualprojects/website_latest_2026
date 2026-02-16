"use client";

import React, { Suspense } from 'react'

import Addcasestudy from './Addcasestudy'
function page() {
  return (
    <div>


      <Suspense fallback={<div className="p-4">Loading departments...</div>}>

        <Addcasestudy />


      </Suspense>






    </div>
  )
}

export default page