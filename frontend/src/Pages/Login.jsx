import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { showSuccess, showError } from "../utils/Toast";
const Login = () => {
  const [isShow, setisShow] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);  
    loginUser(data);
  };

  const loginUser = async (data) => {
    try{
      const res = await axiosClient.post("/auth/login", {

      email: data.email,
      password: data.password
    });

    localStorage.setItem("token",res.data.token)
    console.log(res);
    setTimeout(() => {
      navigate('/dasboard')
    }, 1000);
    
    }catch(err){
      console.log(err);
      showError(err.response.data.message || "Something went wrong")
    }
    

  }

  return (
    <>
      <div className='bg-[#020617] w-full  min-h-screen flex items-center justify-center'>
        
        <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Heading */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-semibold text-white">Login Account</h2>
      <p className="text-sm text-gray-400 mt-1">Join and start collaborating</p>
    </div>
          
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col primaryText space-y-4 p-7 '>

              {/*<input {...register('userName', { required: true })} className='border-2 border ' />
              {errors.userName && <p>user name is required.</p>}*/}
             <div > <input className="w-full px-4 py-2 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='enter email'{...register('email', {
                required: { value: true, message: "Email required !" }, pattern: {value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"enter valid email"}
              })}  />{errors.email && <p className='text-red-400 text-sm m-1'>{errors.email.message}</p> }
              </div>
              <div>
              <div className="relative">
  <input
    type={isShow ? "text" : "password"}
    placeholder="Enter password"
    {...register('password', {
      required: { value: true, message: "Password required!" }
    })}
    className="w-full px-4 py-2 pr-10 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  <button
    type="button"
    onClick={() => setisShow(prev => !prev)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {isShow ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
              {errors.password && <p className='text-red-400 text-sm m-1'>{errors.password.message}</p>}</div>

            <input type="submit" className=' border border-white/10 bg-indigo-600 text-white focus:outline-none rounded-lg p-2 hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition cursor-pointer' />
              
            </form>
            {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-indigo-400 hover:underline cursor-pointer">
                    Register Now
                  </Link>
                </p>

          </div>
        </div>
    </>
  )
}

export default Login
