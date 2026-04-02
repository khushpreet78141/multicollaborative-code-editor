import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
    <Navbar/>
    <main className="pt-20">
        <Outlet/>
    </main>
    </div>
  )
}

export default MainLayout
