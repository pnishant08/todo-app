const router=require("express").Router();

const User=require("../models/user");
const List=require("../models/list");
const { request } = require("express");

//create task 
router.post("/addTask",async(req,res)=>{
    try{
        const {title,body,email}=req.body;
        const existingUser=await User.findOne({email});
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
router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {email}=req.body;
        const existingUser=await User.findOne({email});

        if(!existingUser){
           res.status(404).json({message:"User Not Found"});
        }

        const deleteTask= await List.findByIdAndDelete(req.params.id);

        if(!deleteTask){
            return res.status(404).json({message:"Task Not Found"});
        }
        
        res.status(200).json({message:"Task deleted successfully"})

    }catch(error){
        res.status(400).json("error",error)
        console.log("error",error);
    }
})

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