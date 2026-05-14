import React from 'react'
import axiosClient from "../../axiosClient";
import { useState } from 'react';
import { showError } from '../utils/Toast';
import CircularProgress from '@mui/material/CircularProgress';
const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async()=>{
        try{
           setSubmitting(true);
            const res = await axiosClient.post('/contact/contactUs',{name,email,data:message});
            setName("");
            setEmail("");
            setMessage("");
          
        }catch(err){
            showError(err.response?.data?.message); 
        }finally{
          setSubmitting(false)
        }
    }

  return (
    <div id="contactUs" className="bg-black flex justify-center items-center py-16 px-4">
    <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-1">
      Contact Us
    </h2>

    <p className="text-zinc-400 mb-8">
      Have a question or want to connect? Send a message.
    </p>

    <div className="flex flex-col gap-6">

      {/* Name + Email */}
      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition"
        />

        <input
          type="email"
          placeholder="Enter Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition"
        />
      </div>

      {/* Message */}
      <textarea
        placeholder="Enter your Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition resize-none"
      />
      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-white text-black cursor-pointer font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 flex justify-center items-center"
      >
        {submitting ? (
          <CircularProgress size="24px" aria-label="Loading..." />
        ) : (
          "Send Message"
        )}
      </button>
    </div>
  </div>
</div>
  )
}

export default Contact
