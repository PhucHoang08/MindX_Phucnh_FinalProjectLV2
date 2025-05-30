import React from 'react'
import Header from '../components/Header'
import CarouselSlide from '../components/home/Carousel'
import ReadyToWear from '../components/home/ReadyToWear'
import AllProducts from '../components/home/AllProducts'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='w-full pt-[90px] h-[3000px] bg-white'>
        <Header/>
        <CarouselSlide/>
        <ReadyToWear/>
        <AllProducts/>
        <Footer/>
    </div>
  )
}

export default Home
