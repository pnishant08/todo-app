const router=require("express").Router();

const User=require("../models/user");
const List=require("../models/list");
const { request } = require("express");

//create task 
router.post("/addTask",async(req,res)=>{
    try{
        const {title,body,id}=req.body;
        // console.log(id);
        const existingUser=await User.findById(id);
        if(existingUser){
            const list =new List({title,body,user:existingUser});
            await list.save().then(()=>res.status(200).json({list}));
            existingUser.list.push(list);
            existingUser.save();
        }
    }catch(error){
         console.log("error ",error);
    }
})

//update task
router.put("/updateTask/:id",async(req,res)=>{
    try{
       const {title,body,email}=req.body;
       // valid inputs dalo
       if(!title||!email||!body){
        return res.status(400).json({message:"All fields are required"});
       }
       
       // check karo user exist kar bhi rha hai ya nhi
       const existingUser=await User.findOne({email});
       if(!existingUser){
        return res.status(400).json({message:"User not found"});
       }

       //agar mile to update karo

       const updatedTask=await List.findByIdAndUpdate(
        req.params.id,
        {title,body},
        {new:true}
       );
       if(!updatedTask){
        return res.status(400).json({message:"Task Not Found"});
       }

       res.status(200).json({message:"Task Updated",updatedTask});
    }catch(error){
        console.log("error",error);
    }
})

//delete task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const userId = req.body.id; // Extract user ID from the request body
        const taskId = req.params.id; // Extract task ID from the URL params

        // Validate input
        if (!userId || !taskId) {
            return res.status(400).json({ message: "User ID and Task ID are required" });
        }

        // Update user to remove the task reference
        const existingUser = await User.findOneAndUpdate(
            { _id: userId }, // Query to find the user
            { $pull: { list: taskId } }, // Pull the task ID from the user's list
            { new: true } // Return the updated document
        );

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updated user:", existingUser);

        // Delete the task from the List collection
        const deleteTask = await List.findByIdAndDelete(taskId);

        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ error: error.message });
    }
});


// get task
router.get("/getTask/:id",async(req,res)=>{
    try{
        const list =await List.find({user:req.params.id}).sort({createdAt : -1}); 
        if(list.length !==0){
            res.status(200).json({list});
        }
        else{
            res.status(200).json({message:"No task"})
        }
    }catch(error){
        console.log("error",error);
    }
})

module.exports=router;