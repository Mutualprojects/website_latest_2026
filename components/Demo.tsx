import { FeatureSteps } from "@/components/feature-section"
import image1 from "./projects/1.jpg"
import image2 from './projects/2.jpg'
import image3 from './projects/3.jpg'

const features = [
  { 
    step: 'Step 1', 
    title: 'Government',
    content: 'CCTV monitoring that enhances city safety, traffic control, and public protection.', 
    image: image1 
  },
  { 
    step: 'Step 2',
    title: 'Banks',
    content: 'High-clarity surveillance to monitor vaults, counters, and customer areas flawlessly',
    image: image2,
  },
  { 
    step: 'Step 3',
    title: 'Industries',
    content: 'Surveillance that keeps an eye on operations, safety zones, and restricted areas',
    image:image3
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps 
        features={features}
        title="projects"
        autoPlayInterval={4000}
      
      />
  )
}