import { useRef } from 'react';
import React, { useState } from 'react';
import "./Todo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Update from './Update';
// import { useDispatch } from 'react-redux';
// import { authActions } from '../../store';
import axios from 'axios';
import { useEffect } from 'react';


// let id=sessionStorage.getItem("id");

const Todo = () => {
  const hasErrorToastShown = useRef(false); // Track if the toast has been shown
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));
  const [Inputs,setInputs]=useState({title:"",body:""});
  const [Array,setArray]=useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(sessionStorage.getItem("id"));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for session changes
    const interval = setInterval(() => {
      const currentId = sessionStorage.getItem("id");
      if (currentId !== userId) {
        setUserId(currentId);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [userId]);


  const show=()=>{
         document.getElementById('textarea').style.display="block";
  };
  const change=(e)=>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
  };
  const submit=async()=>{
        // console.log(Inputs);
        if(Inputs.title===""||Inputs.body===""){
          toast.error("All fields are required")
        }else{
             if(userId){
              await axios.post("http://localhost:3000/api/v2/addTask",{
                title:Inputs.title,
                body:Inputs.body,
                id:userId,
                })
                .then((response)=>{
                  console.log(response)
                })
                // console.log(sessionStorage.getItem('id'));
                // console.log(Id);
                // setArray([...Array,Inputs]);
                setInputs({title:"",body:""})
                toast.success("Task added successfully")
             }
             else{
              console.log(userId);
              setArray([...Array,Inputs]);
              setInputs({title:"",body:""})
              toast.info("Task added successfully but Login First to save the data");
             }
        }
  }

  // console.log(Array);
  const del = async(id) => {
      if(id){
        try {
          console.log(id);
           const response = await axios.delete(`http://localhost:3000/api/v2/deleteTask/${id}`,
             {
               data:{id:userId}
             }
           );
           if (response.status === 200) {
               // Update your local state here
               const newArray = Array.filter((_, task) => task._id !== id);
               setArray(newArray);
               toast.success("Task deleted successfully");
           }
       } catch (error) {
           console.error("Error deleting task:", error);
           toast.error(error.response?.data?.message || "Error deleting task");
       }
      }
      else{
        toast.error("Deletion are not allowed");
      }
}

  const dis=(value)=>{
    console.log(value);
    document.getElementById("todo-update").style.display=value;
  }



  useEffect(() => {
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v2/getTask/${userId}`);
        if (response.data && response.data.list) {
          setArray(response.data.list);
          hasErrorToastShown.current = false; // Reset the error toast flag on success
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
  
        // Show toast only if it hasn't been shown
        if (!hasErrorToastShown.current) {
          toast.info("Signup or Login for better experience");
          hasErrorToastShown.current = true; // Set the flag to true
        }
      }
    };
  
    fetchTasks();
  }, [submit]);
  



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
                                     id={item._id} 
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
         <Update  display={dis}/>
      </div>
    </div>
    </>
    
  )
}

export default Todo