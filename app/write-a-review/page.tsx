// // app/page.tsx or any parent component
// import PlaceReviewsComponent from './components/PlaceReviewsComponent';
// import SociableKitReviews from './components/SociableKitReviews';
// export default function Page() {
//   return (
//     // <PlaceReviewsComponent
//     //   placeId="ChIJ63LyU-6YyzsRqboLfDlPDp0"
//     //   apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'AIzaSyCXQg-HCTqAQhOaQy_bCQsPOoPkedcmcRA'}
//     //   className="my-custom-wrapper" // optional Tailwind classes
//     // />
//   );
//   // Custom embed ID + classes
// <SociableKitReviews 
//   embedId="25671028" 
//   className="max-w-4xl mx-auto my-8" 
// />
// } 
import React from 'react'
import SociableKitReviews from './components/SociableKitReviews'
import PlaceReviewsComponent from './components/PlaceReviewsComponent'
import { HeroScrollDemo } from './components/demo'
import BrihaspathiDeployments from '../about/BrihaspathiDeployments'
import BrihaspathiPresence from './components/Brihaspathipresence'



function page() {
  return (
    <div>
    <HeroScrollDemo/>
{/* <PlaceReviewsComponent
  placeId="ChIJ63LyU-6YyzsRqboLfDlPDp0"
  apiKey="AIzaSyCXQg-HCTqAQhOaQy_bCQsPOoPkedcmcRA"
/> */}
<BrihaspathiPresence/>
    </div>
  )
} 

export default page