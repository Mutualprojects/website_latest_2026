import React from 'react'
import { NeonOrbs } from '../about/components/NeonOrbs'
import { ScrollXCarouselContainer } from '@/components/homeabout/scroll-x-carosel'
import MainBlog from './components/mainblog'

function page() {
  return (
    <div>


      <NeonOrbs/>
      <MainBlog/>
    </div>
  )
}

export default page