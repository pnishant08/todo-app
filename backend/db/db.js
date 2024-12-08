const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.user;
const pass = encodeURIComponent(process.env.pass);

const conn =async ()=>{
    try{
        await mongoose.connect("mongodb+srv://pnishant0824:<pass>@todo-app.s7tof.mongodb.net/");
         console.log("db connected")
    }
    catch(error){
        console.log("connection fail",error.message);
    }
    }

conn();