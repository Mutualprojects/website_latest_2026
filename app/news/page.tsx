import HeroParallaxNews from '@/components/About-parallel'
import MasonryGalleryPaginated from '@/components/MasonryGalleryPaginated'
import React from 'react'
import Recent from './Recent'
import InteractiveNewsChannels from '@/components/InteractiveNewsChannels'

function page() {
  return (
    <div className="bg-white">
      <HeroParallaxNews />
      <Recent />
      <MasonryGalleryPaginated />
    </div>
  )
}

export default page