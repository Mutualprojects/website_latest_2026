import HeroParallaxNews from '@/components/About-parallel'
import MasonryGalleryPaginated from '@/components/MasonryGalleryPaginated'
import React from 'react'
import Recent from './Recent'
import InteractiveNewsChannels from '@/components/InteractiveNewsChannels'
import NewsSections from '../case-studies/Newssections'

function page() {
  return (
    <div className="bg-white">
      <HeroParallaxNews />
      <Recent />
        <NewsSections/>
      {/* <MasonryGalleryPaginated /> */}
    
    </div>
  )
}

export default page

export const metadata = {
  title: "News — Brihaspathi Technologies Limited",
  alternates: {
    canonical: "https://www.brihaspathi.com/news",
  },
};