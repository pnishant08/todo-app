import React from 'react';
import "./Todo.css";

const Todo = () => {
  const show=()=>{
         document.getElementById('textarea').style.display="block";
  };

  return (
    <div className='todo '>
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
            <div className='d-flex flex-column todo-inputs-div w-50 my-4 p-2'>
               <input
                      type='text' 
                      placeholder='TITLE' 
                      className=' my-2 p-2 todo-inputs' 
                      onClick={show}
                />
                <textarea 
                      id='textarea'
                      type='text' 
                      placeholder='BODY' 
                      className='my-2 p-2  body' 
                      style={{ display: 'none' }} // Initially hidden
                />
            </div>
            <div className='w-50 d-flex justify-content-center'>
            <button className='home-btn w-25 todo-btn px-3 py-2'>Add</button>
            </div>
        </div>
    </div>
  )
}

export default Todo