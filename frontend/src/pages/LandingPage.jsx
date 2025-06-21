import React from 'react'
import Navbar from '../componenets/miniCompo/Navbar'
import Hero from '../componenets/miniCompo/Hero'
import TrustedBy from '../componenets/miniCompo/TrustedBy'
import Features from '../componenets/miniCompo/Features'
import CTA from '../componenets/miniCompo/CTA'
import Footer from '../componenets/miniCompo/Footer'


const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Navbar/>
      <Hero/>
      <TrustedBy/>
      <Features/>
      <CTA />
      <Footer/>
    </div>
  )
}

export default LandingPage