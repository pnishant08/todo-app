const mongoose = require("mongoose");
require("dotenv").config();

const user=process.env.user;
const pass= process.env.pass;

const conn =async (req,res)=>{
    try{
        await mongoose
        .connect(`mongodb+srv://pnishant0824:something@todo-app.s7tof.mongodb.net/`)
        .then(()=>{
            console.log("DB connected !");
        })
    }
    catch(error){
        console.log("db not connected",error.message);
    }
    }

conn();


// const user = process.env.user;
// const pass = encodeURIComponent(process.env.PASS);

// const url =`mongodb+srv://${user}:${pass}@todo-app.s7tof.mongodb.net/`;

// mongoose.connect(url).then(() => 
//     console.log("Connected to db!"))
//     .catch((err) => console.log("Error in connecting db: ", err));