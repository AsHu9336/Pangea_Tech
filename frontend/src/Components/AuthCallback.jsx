import React from 'react'

import { useLocation , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function AuthCallback() {

    const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/home"); // or any page you want
    } else {
      // If token is missing, maybe redirect to login or show an error
      navigate("/login");
    }
  }, [location, navigate]);


  return (
    <div>
        <h1 className='text-center text-3xl font-bold'>Redirecting...</h1>
        <p className='text-center text-lg'>If you are not redirected automatically, click <a href="/login" className='text-blue-500 underline'>here</a>.</p>
      
    </div>
  )
}
