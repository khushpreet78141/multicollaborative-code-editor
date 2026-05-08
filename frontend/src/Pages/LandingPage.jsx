
import React from 'react'
import Hero from '../components/Hero'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import Navbar from '../components/Navbar'
import Feature from '../components/Feature'
import HowItWorks from '../components/HowItWorks'
import UseCases from '../components/UseCases'
import Footer from '../components/Footer'
import Contact from '../components/Contact'

const LandingPage = () => {
  return (
    <div>

      <Navbar/>
      <Hero/>
      <Feature/>
      <HowItWorks/>
      <UseCases/>
      <Contact/>
      <Footer/>
    </div>
   

      
     
  )
}


export default LandingPage
