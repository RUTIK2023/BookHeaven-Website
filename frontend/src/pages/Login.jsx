import React from 'react';
import { useState } from 'react';
import loginImg from "../assets/signup.jpg"; // Replace with your login image
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {authActions} from "../store/auth";
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";

const Login = () => {

   // formdata
   const[values,setValues]=useState({
    
    email:"",
    password:"",
    
    });
    const[error,setError]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const apiUrl = import.meta.env.VITE_API_URL;

    const changeHandler=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setValues({...values,[name]:value});
    }

    const submitHandler=async(e)=>{
      e.preventDefault();
      try{
        if(  values.email==="" ||
          values.password==="" 
        ){
          setError("All fields are required")
        }
        else{
          const response=await axios.post(`${apiUrl}/api/v1/login`,values);
          // const response=await axios.post("http://localhost:3000/api/v1/sign-up",values);

          // console.log(response.data);

          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));

          localStorage.setItem("id",response.data.id);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("role",response.data.role);

          toast.success(response.data.message);
          navigate('/');

        }

      }catch(error){
        console.log(error.response.data.message);
      }
    }


  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl text-white font-bold mb-6">Login</h2>
          <form className="space-y-4">
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
            <button onClick={submitHandler} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
              Login
            </button>

            <div className='text-white flex gap-2 items-center justify-center'>
                <p>Don't have an account?</p>
                <NavLink to='/signup' className="hover:underline text-blue-500">Sign Up</NavLink> here
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 relative">
        <img
          src={loginImg} 
          alt="Login"
          className="object-cover h-64 md:h-full w-full"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-75 animate-fade"></div>
      </div>
    </div>
  );
};

export default Login;
