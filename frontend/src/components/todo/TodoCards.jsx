import React from 'react'
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";


const TodoCards = ({title,body,id,delid,display}) => {
  return (
    <div className='todocard p-3'>
        <div>
            <h5 className='todocard-h'>{title}</h5>
            <p className='todocard-p'>{body.split("",77)}...</p>
        </div>
        <div className='d-flex justify-content-around p-1'>
            <div className='px-2 py-1 d-flex justify-content-center align-items-center card-icon-head'
              onClick={()=>{
                display("block");
              }}   
            >
            <GrDocumentUpdate className='card-icons'/>
               Update 
            </div>

            <div className='px-2 py-1 d-flex justify-content-center align-items-center card-icon-head text-danger'
                onClick={()=>{
                    delid(id)
                }}>
            <MdDelete className='card-icons del'/> Delete
            </div>
        </div>
    </div>
  )
}

export default TodoCards