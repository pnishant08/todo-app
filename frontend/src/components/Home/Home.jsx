import React from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container d-flex justify-content-center align-items-center flex-column"> 
            <h1 className='text-center'>Every Task Matters, <br />Every Day Counts!</h1>
            <p>
                Imagine a life where you wake up every day with<br /> a clear plan, knowing exactly what needs to be done and when. </p>
            <button className='home-btn p-2'>
                Make Todo List
            </button>
        </div>
    </div>
  )
}

export default Home