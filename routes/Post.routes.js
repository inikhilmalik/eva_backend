const express=require("express");
const { PostModel } = require("../models/Post.model");

const postRouter=express.Router();

postRouter.post("/create",async(req,res)=>{
    try{
        const post=new PostModel(req.body);
        await post.save();
        res.send(post)
    }catch(err){
        res.send({"err":err.message});
    }
})

postRouter.get("/",async(req,res)=>{
    console.log("get",req.body)
    try{
        const post=await PostModel.find({authorID:req.body.authorID})
        res.send(post)
    }catch(err){
        res.send({"err":err.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID});
    try{
        if(req.body.authorID!=post.authorID)
        {
            res.send({"msg":"you are not authorized"});
        }
        else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body);
            res.send({"msg":"post is updated"});
        }
    }catch(err){
        res.send({"err":err.message})
    }
})
postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await PostModel.findOne({_id:postID});
    try{
        if(req.body.authorID!=post.authorID)
        {
            res.send({"msg":"you are not authorized"});
        }
        else{
            await PostModel.findByIdAndDelete({_id:postID});
            res.send({"msg":"post is deleted"});
        }
    }catch(err){
        res.send({"err":err.message})
    }
})

module.exports={postRouter};