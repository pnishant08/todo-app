import React from 'react';
import "./signup.css";
import HeadingComp from './HeadingComp';

import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Signup = () => {
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
                />
              </div>

              {/* Submit Button */}
              <button className="btn-signup p-2 my-2">
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
