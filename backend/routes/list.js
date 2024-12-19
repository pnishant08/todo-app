const router=require("express").Router();

const User=require("../models/user");
const List=require("../models/list");
const { request } = require("express");

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

module.exports=router;