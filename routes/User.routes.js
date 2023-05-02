const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../models/User.model");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err)
            {
                console.log(err)
            }
            const user=UserModel({name,email,gender,password:hash});
            await user.save();
            res.send({"msg":"user is register"});
        })
    }catch(err){
        res.send({"err":err.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user)
        {
            bcrypt.compare(password,user.password).then((result)=>{
                if(result){
                    const token=jwt.sign({authorID:user._id,author:user.name},"masai");
                    res.send({"msg":"Login Successfull","token":token});
                }
                else{
                    res.send({"msg":"Wrong Password"})
                }
            })
        }
        else{
            res.send({"msg":"Wrong Credintial"})
        }
    }catch(err){
        res.send({"err":err.message})
    }
})
module.exports={userRouter}