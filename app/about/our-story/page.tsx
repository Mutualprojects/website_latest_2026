import HeroReveal from '@/components/ui/HeroReveal'
import React from 'react'

function page() {
  return (
    <div>

   <HeroReveal
        title="Our Journey Through Time"
        subtitle="From humble beginnings to industry leaders, discover the story behind our success and vision for the future."
        imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
        ctaText="Explore Our Timeline"
        ctaLink="#timeline"
        enableParallax={true}
        revealOnScroll={true}
        overlayOpacity={0.7}
        className="custom-hero-class"
      />


    </div>
  )
}

export default page
