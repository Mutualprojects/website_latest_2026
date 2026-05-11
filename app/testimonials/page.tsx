import { TestHero } from './TestHero'
import { Component } from './testimonial'
import TestimonialV2 from './testimonial-v2'

export default function TestimonialsPage() {
    return (
        <main className="bg-[#FDFDFD]">
            <TestHero />
            <div className="py-20">
                <TestimonialV2 />
            </div>
            <Component />
        </main>
    )
}
