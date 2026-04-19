import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from "../utils/Toast";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [isShow, setisShow] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    
    registerUser(data);
  };

  const registerUser = async (data) => {
    try{
      const res = await axiosClient.post("/auth/register", {
    username:data.username,
      email: data.email,
      password: data.password
    });
    if(res.data.success){
        showSuccess("Registered successfully !");
    }
    localStorage.setItem("token",res.data.token)
    
    setTimeout(() => {
        navigate("/dasboard")
    }, 1000);
    
    }catch(err){
        console.log(err.response)
      showError(err.response.data.message || "Something went wrong !")
    }
    
  }


  return (
    <>
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">

  <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

    {/* Heading */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-semibold text-white">Create Account</h2>
      <p className="text-sm text-gray-400 mt-1">Join and start collaborating</p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Username */}
      <div>
        <input
          placeholder="Username"
          {...register('username', { required: true })}
          className="w-full px-4 py-2 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.username && (
          <p className="text-red-400 text-sm mt-1">Username is required</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          placeholder="Email"
          {...register('email', {
            required: { value: true, message: "Email required!" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter valid email"
            }
          })}
          className="w-full px-4 py-2 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
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
      </div>{errors.password && <p className='text-red-400 text-sm m-1'>{errors.password.message}</p>}
          </div>

            <input type="submit" className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow-lg shadow-indigo-500/20" />


    </form>

    {/* Footer */}
    <p className="text-center text-sm text-gray-400 mt-6">
      Already have an account?{" "}
      <Link to="/login" className="text-indigo-400 hover:underline cursor-pointer">
        Login
      </Link>
    </p>

  </div>
</div>
      
        
              
    </>
  )
}

export default Register

