import { EVENTS_DATA } from '@/components/EventHeroParallax'
import { EventParallax } from '@/components/eventparallax'
import EventsShowcase from '@/components/Profesional'
import React from 'react'

function page() {
  return (
    <div className=''>

    <EventParallax
        events={EVENTS_DATA}
        sizes={{
          mobile: { w: "w-[12rem]", h: "h-44" },
          tablet: { w: "sm:w-[18rem]", h: "sm:h-72" },
          desktop: { w: "md:w-[20rem]", h: "md:h-[18rem]" },
          gap: { mobile: "space-x-6", desktop: "md:space-x-16" },
        }}
/>

<EventsShowcase/>

    </div>
  )
}

export default page