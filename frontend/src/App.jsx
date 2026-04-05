import { useState } from 'react'
import Login from './Pages/Login';
import './App.css';
import LandingPage from './Pages/LandingPage';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Register from './Pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoinRoom from './components/JoinRoom';
import Dashboard from './Pages/Dashboard';
import CreateRoom from './components/CreateRoom';
import RoomInterface from './Pages/RoomInterface';

function App() {
  
  return (
    <>
    <BrowserRouter>
   <ToastContainer
  position="top-right"
  newestOnTop
  pauseOnHover
/>
      <Routes>
     <Route path='/' element={<LandingPage/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/createRoom' element={<CreateRoom/>}/>
     <Route path='/joinRoom' element={<JoinRoom/>}/>
     <Route path='/dasboard' element={<Dashboard/>}/>   
     <Route path='/room/:roomId'  element={<RoomInterface/>}/>
</Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
