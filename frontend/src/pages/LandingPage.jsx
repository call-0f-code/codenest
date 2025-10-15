import React from 'react'
import Navbar from '../components/miniCompo/Navbar'
import Hero from '../components/miniCompo/Hero'
import TrustedBy from '../components/miniCompo/TrustedBy'
import Features from '../components/miniCompo/Features'
import CTA from '../components/miniCompo/CTA'
import Footer from '../components/miniCompo/Footer'


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