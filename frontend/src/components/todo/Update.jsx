import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Update = ({ display, update, refreshTask }) => {
  const [updatedTask, setUpdatedTask] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);  // Add a loading state

  useEffect(() => {
    if (update) {
      setUpdatedTask(update);
    }
  }, [update]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async () => {
    if (update.user) {
      setLoading(true);  // Set loading state to true when starting the request
      try {
        console.log("update ke liye jo id ja rha hai",update._id)
        console.log("update user id",update.user)
        const response = await axios.put(`http://localhost:3000/api/v2/updateTask/${update._id}`, updatedTask);
        alert(response.data.message);  // Show success message using response
        refreshTask(updatedTask);
        display('none'); // Close the update form after successful update
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("An error occurred while updating the task.");  // Improved error handling
      } finally {
        setLoading(false);  // Set loading state back to false
      }
    } else {
      toast.error("Login first for updation");
    }
  };

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input
        name='title'
        value={updatedTask.title}
        onChange={handleUpdateChange}
        type="text"
        className='u todo-inputs my-4 w-100 p-3'
      />
      <textarea
        name='body'
        value={updatedTask.body}
        onChange={handleUpdateChange}
        className='u todo-inputs w-100 p-3'
      />
      <div className='d-flex justify-content-start'>
        <button 
          className="btn btn-success my-4 w-10"
          onClick={submit}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button 
          className="btn btn-danger my-4 w-10 mx-3"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Update;
