const express= require("express");
const app = express();
require("./db/db") 
const auth=require("./routes/auth")
const list=require("./routes/list")


app.use(express.json());


app.get("/",(req,res)=>{
    res.send("hello world this is new todo app");
});

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.listen(3000,()=>{
    console.log("server is running");
});