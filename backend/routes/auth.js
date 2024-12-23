const router = require("express").Router();
const User = require("../models/user");
const bcrypt =require("bcrypt");


//SIGN UP
router.post("/register",async(req,res)=>{
    try{
        const{email,username,password}=req.body;
        
        if(!username||!email||!password){
            return res.status(400).json({message:'All fields are required'});
        }
        const existinguser =await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message:'User already exist'});
        }
        const salt=10;
        const hashedpassword=await bcrypt.hash(password,salt);

        const newuser= new User({
            username,
            email,
            password:hashedpassword
        });

        await newuser.save();
        res.status(201).json({
            message:'User register successfully',
            user:{
                id:newuser._id,
                username:newuser.username,
                email:newuser.email,
            },
        });
    }catch(error){
       console.log("error occured in register",error);
    }
})
//LOG IN

router.post("/login",async(req,res)=>{
    try{
       const {email,password}=req.body;
       if(!email||!password){
        return res.status(400).json({message:'All fields are required'});
       }
       const user=await User.findOne({email});
       if(!user){
         return res.status(400).json({message:'Invalid mail or password'});
       }

       const isMAtch=await bcrypt.compare(password,user.password);
       if(!isMAtch){
         return res.status(400).json({message:'Invalid email or password'});
       }
       //yha token ka use bhi aage karna hai abhi nhi kar rha hu

       const {passsword:userPassword,...others}=user._doc;
       res.status(200).json({others});


    }catch(error){
        console.log("error is ",error)
    }
})
module.exports = router;
