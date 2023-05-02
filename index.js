const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { postRouter } = require("./routes/Post.routes");
const cors=require("cors");
const { auth } = require("./middlewares/Auth.middleware");
require("dotenv").config();

const app=express()
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage!!")
})

app.use("/users",userRouter);

app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to DB");
    }catch(err){
        console.log(err);
        console.log("cannot connect to DB");
    }

    console.log("server is running at port 8080")
})