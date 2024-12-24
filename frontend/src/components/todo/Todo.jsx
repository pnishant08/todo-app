import React, { useState } from 'react';
import "./Todo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Update from './Update';

const Todo = () => {
  
  const [Inputs,setInputs]=useState({title:"",body:""});
  const [Array,setArray]=useState([]);

  const show=()=>{
         document.getElementById('textarea').style.display="block";
  };
  const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
  };
  const submit=()=>{
        // console.log(Inputs);
        if(Inputs.title===""||Inputs.body===""){
          toast.error("All fields are required")
        }else{
          setArray([...Array,Inputs]);
          setInputs({title:"",body:""})
          toast.success("Task added successfully")
        }
  }

  // console.log(Array);
  const del=(id)=>{
    const deletedTask = Array[id]?.title;
    // console.log(id);
    Array.splice(id,1);
    setArray([...Array]);
    toast.info(`Task ${deletedTask} deleted Successfully`)
    }

  const dis=(value)=>{
    console.log(value);
    document.getElementById("todo-update").style.display="block";
  }

  return (
    <>
    <div className='todo '>
      <ToastContainer/>
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
            <div className='d-flex flex-column todo-inputs-div w-50 my-4 p-2'>
               <input
                      type='text' 
                      name='title'
                      value={Inputs.title}
                      placeholder='TITLE' 
                      className=' my-2 p-2 todo-inputs' 
                      onClick={show}
                      onChange={change}
                />
                <textarea 
                      id='textarea'
                      name='body'
                      value={Inputs.body}
                      type='text' 
                      placeholder='BODY' 
                      className='my-2 p-2  body' 
                      style={{ display: 'none' }} // Initially hidden
                      onChange={change}
                />
            </div>
            <div className='w-50 d-flex justify-content-center'>
            <button className='home-btn w-25 todo-btn px-3 py-2'
                onClick={submit} >
               Add</button>
            </div>
        </div>
        <di className="todo-body">
              <div className="container-fluid">
                <div className="row ">
                      {Array &&
                       Array.map((item,index)=>(
                        <>
                       <div className="col-lg-3 col-10 mx-5 my-5 " key={index}>
                          <TodoCards title={item.title} 
                                     body={item.body} 
                                     id={index} 
                                     delid={ del}
                                     display={dis}
                                     />
                        </div>
                        </>
                       ))} 
                </div>
              </div>
        </di>
    </div>
    <div className="todo-update " id='todo-update'  style={{ display: 'none' }}>
      <div className="container update">
         <Update/>
      </div>
    </div>
    </>
    
  )
}

export default Todo