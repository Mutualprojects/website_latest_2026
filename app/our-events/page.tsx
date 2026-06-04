import EventParallaxDemo from '@/components/EventHeroParallax'
import EventsShowcase from '@/components/Professional'
import React from 'react'
import NewsSections from '../case-studies/Newssections'

function page() {
  return (
    <div className=''>

    <EventParallaxDemo />

<EventsShowcase/>
{/* <NewsSections/> */}
    </div>
  )
}

export default page