
import React, { useState } from 'react';
import signupImg from "../assets/signup.jpg"
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {

  // formdata
  const[values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:"",
    });
    const[error,setError]=useState("");
    const navigate=useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const changeHandler=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setValues({...values,[name]:value});
    }

    const submitHandler=async(e)=>{
      e.preventDefault();
      try{
        if(values.username==="" || values.email==="" ||
          values.password==="" || values.address==="" 
        ){
          setError("All fields are required")
        }
        else{
          const response=await axios.post(`${apiUrl}/api/v1/sign-up`,values);
          // const response=await axios.post("http://localhost:3000/api/v1/sign-up",values);

          toast.success(response.data.message);
          navigate('/login');

        }

      }catch(error){
        console.log(error);
      }

    }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl text-white font-bold mb-6">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Username</label>
              <input
                type="text"
                className="w-full p-3 text-gray-900 rounded-md"
                placeholder="Enter your username"
                name='username'
                required
                value={values.username}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 text-gray-900 rounded-md"
                placeholder="Enter your email"
                name='email'
                required
                value={values.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 text-gray-900 rounded-md"
                placeholder="Enter your password"
                name='password'
                required
                value={values.password}
                onChange={changeHandler}
              />
            </div>
            <div>
                <label className="block text-white text-sm mb-2">Address</label>
                <textarea name="address" id="" className="w-full p-3 text-gray-900 rounded-md"
                 placeholder="Enter your address"
                required
                value={values.address}
                onChange={changeHandler}
                 
                >
               
                </textarea>
            </div>
            <p className=' text-white'>{error}</p>
            <button onClick={submitHandler}
             className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
              Sign Up
            </button>

            <div className=' text-white flex gap-2 items-center justify-center'>
                <p>Are you Already Registered ?</p>
                <NavLink to='/login' className=" hover:underline text-blue-500">Login</NavLink>here
            </div>
          </form>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 relative">
        <img
          src={signupImg} 
          alt="Signup"
          className="object-cover h-64 md:h-full w-full"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-75 animate-fade"></div>
      </div>
    </div>
  );
};

export default Signup;
