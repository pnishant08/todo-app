import React from 'react';
import { useState } from "react";
import {useNavigate}from "react-router-dom";
import "./signup.css";
import HeadingComp from './HeadingComp';
import axios from "axios";
import { FaLock, FaEnvelope } from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import {authActions} from '../../store';

const Signin = () => {

  const dispatch=useDispatch();

  const history=useNavigate();

  const [Inputs,setInputs]=useState({
    email:"",
    password:"",
  });

  const change=(e)=>{
    const{name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  }

  const submit =async(e)=>{
      e.preventDefault();
      try {
          const response = await axios.post("http://localhost:3000/api/v1/login", Inputs);
          // console.log(response.data.user._id); // Log the successful response
           sessionStorage.setItem("id",response.data.user._id);
          //  console.log(sessionStorage.getItem("id"));
           dispatch(authActions.login());
          alert(response.data.message); // Show success message to the user
          setInputs({
            "email": "",
            "password": ""
          });
          history("/todo")
       } catch (error) {
         console.error("Error during registration:", error.response ? error.response.data : error);
         alert(error.response ? error.response.data.message : 'An error occurred during registration.');
         setInputs({
           "email": "",
           "password": ""
         });
    }
  };

  return (
       <div className='signup'>
         <div className="container">
           <div className="row">
             {/* Form Section */}
             <div className='col-lg-8 coloumn d-flex justify-content-center align-items-center'>
               <div className='d-flex flex-column w-50 p-4'>
                 {/* Email Field */}
                 <div className="input-group my-2">
                   <FaEnvelope className="icon" />
                   <input
                     className="form-input"
                     type="email"
                     name="email"
                     placeholder="Enter Your Email"
                     value={Inputs.email}
                     onChange={change}
                   />
                 </div>
   
                 {/* Username Field
                 <div className="input-group my-2">
                   <FaUser className="icon" />
                   <input
                     className="form-input"
                     type="text"
                     name="username"
                     placeholder="Enter Your Username"
                   />
                 </div> */}
   
                 {/* Password Field */}
                 <div className="input-group my-2">
                   <FaLock className="icon" />
                   <input
                     className="form-input"
                     type="password"
                     name="password"
                     placeholder="Enter Your Password"
                     value ={Inputs.password}
                     onChange={change}
                   />
                 </div>
   
                 {/* Submit Button */}
                 <button className="btn-signup p-2 my-2"onClick={submit}>
                   Sign In
                 </button>
               </div>
             </div>
   
             {/* Info Section */}
             <div className='col-lg-4 col-left column d-flex justify-content-center align-items-center'>
                 <HeadingComp first="Sign" second="In Here!" />
             </div>
           </div>
         </div>
       </div>
  )
}

export default Signin