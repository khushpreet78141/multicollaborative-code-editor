import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const setOpenLogin = () => {
    navigate('/login')
  }


  
  const goDashboard = async () => {
    try{
       const user = await axiosClient.get('auth/getUser');
      
       navigate('/dashboard');
    }catch(err){
      console.log(err);
      navigate('/login');
    }
 
  }
  

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">

      <div className="flex items-center justify-between px-6 md:px-16 py-4">

        {/* LOGO */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text cursor-pointer">
          CodeSync
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#howItWorks" className="hover:text-white transition">How it Works</a>
          <a href="#contactUs" className="hover:text-white transition">Contact Us</a>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition" onClick={setOpenLogin}>
            Login
          </button>

          <button onClick={goDashboard} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white shadow-md transition">
            Get Started
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 text-gray-300 space-y-4 backdrop-blur-xl bg-[#020617]/90 border-t border-white/10">

          <a href="#features" className="block hover:text-white">Features</a>
          <a href="#howItWorks" className="block hover:text-white">How it Works</a>
          <a href="#contactUs" className="block hover:text-white">Contact us</a>

          <div className="pt-4 flex flex-col gap-3">
            <button className="text-left hover:text-white">Login</button>
            <button onClick={goDashboard} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white">
              Get Started
            </button> 
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
