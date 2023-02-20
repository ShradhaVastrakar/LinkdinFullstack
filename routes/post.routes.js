const express = require("express");
const {postModel} = require("../models/post.models")

const postRouter = express.Router()


postRouter.get("/", async (req,res) =>{
    const query = req.query
    const posts = await postModel.find(query)
    res.send(posts)
})


postRouter.post("/create", async (req,res) =>{
    const payload = req.body
    const post = new postModel(payload)
    await post.save()
    res.send({"msg": "Post Created"})
})

postRouter.get("/top" , async (req,res) =>{
    const user = await postModel.find().sort({comments:-1}).limit(1)
    res.send(user)
})

postRouter.patch("/update/:id", async (req,res) =>{
    //verify token
    const ID = req.params.id
    const payload = req.body
    try{
   await postModel.findByIdAndUpdate({_id:ID}, payload)
   res.send({"msg": "Updated the post"})
    }
    catch(err){
        res.send({ "msg": "Posts cannot be Updated", "error": err.message})
    }
    
})

postRouter.delete("/delete/:id", async (req,res) =>{
    const postID = req.params.id
    await postModel.findByIdAndDelete({_id:postID})
    res.send({"msg": `Note with id ${postID} has been deleted`})
})

module.exports={
    postRouter
}
