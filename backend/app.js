const express= require("express");
const app = express();
require("./db/db") 

app.get("/",(req,res)=>{
    res.send("hello world this is new todo app");
})

app.listen(1000,()=>{
    console.log("server is running");
});