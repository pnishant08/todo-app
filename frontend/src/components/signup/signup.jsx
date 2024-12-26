import React from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';
import {useState} from 'react';
import axios from "axios";
import {useNavigate}from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';


const Signup = () => {

  const history=useNavigate();

  const [Inputs, setInputs] = useState({
    "email":"",
    "username":"",
    "password":""
  });

  const change=(e)=>{
     const {name ,value}=e.target;
     setInputs({...Inputs,[name]:value});
  }

  const submit= async(e)=>{
     e.preventDefault();
     try {
      const response = await axios.post("http://localhost:3000/api/v1/register", Inputs);
      console.log(response); // Log the successful response
      alert(response.data.message); // Show success message to the user
      setInputs({
        "email": "",
        "username": "",
        "password": ""
      });
      history("/signin")
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error);
      alert(error.response ? error.response.data.message : 'An error occurred during registration.');
      setInputs({
        "email": "",
        "username": "",
        "password": ""
      });
    }
    
    //  console.log(Inputs);
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
                  onChange={change}
                  value={Inputs.email}
                />
              </div>

              {/* Username Field */}
              <div className="input-group my-2">
                <FaUser className="icon" />
                <input
                  className="form-input"
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                  onChange={change}
                  value={Inputs.username}
                />
              </div>

              {/* Password Field */}
              <div className="input-group my-2">
                <FaLock className="icon" />
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={change}
                  value={Inputs.password}
                />
              </div>

              {/* Submit Button */}
              <button className="btn-signup p-2 my-2"
                onClick={submit}
               >
                Sign Up
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className='col-lg-4 col-left column d-flex justify-content-center align-items-center'>
              <HeadingComp first="Create" second="Account Here!" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
