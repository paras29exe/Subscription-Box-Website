import React from 'react'
import Hero from '../components/Homepage/Hero'
import HowItWorks from '../components/Homepage/HowItWorks'
import Testimonials from '../components/Homepage/Testimonials'
import FAQ from '../components/Homepage/FAQ'
import Genres from '../components/Homepage/Genre'


function Home() {
  return (
    <div className='flex flex-col gap-4 overflow-x-hidden '>
        <Hero />
        <Genres />
        <HowItWorks />
        <Testimonials />
        <FAQ />
    </div>
  )
}

export default Home