import React from 'react'
import { MdDisplaySettings } from 'react-icons/md'

const Update = ({display}) => {
  return (
    <div className='p-5 d-flex justify-content-center align-item-start flex-column update'>
     <h3>Update Your Task</h3>
     <input 
            type="text"
            className='u todo-inputs my-4 w-100 p-3'      
     />
     <textarea 
            className='u todo-inputs w-100 p-3'
     />
     <div className='d-flex justify-content-start'>
     <button className="btn btn-success my-4 w-10">
        Update
     </button>
     <button className="btn btn-danger my-4 w-10 mx-3"
       onClick={()=>{
        display("none")
       }}
       >
        Close
     </button>
     </div>
     
    </div>
  )
}

export default Update