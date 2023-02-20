const express = require("express");
const {userModel} = require("../models/users.models")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register", async (req,res) =>{
    const {name,email,gender,pass,age,city} = req.body
        try{
            bcrypt.hash(pass, 5, async (err, hash)=>{
                if(err) res.send({"msg": "Something went wrong", "error" : err.message})
                else{
                    
                        const users = new userModel({name, email, gender, pass: hash, age, city})
                        await users.save()
                        res.send({"msg": "User has been registered"})
                    
                }
            });
          
        }catch(err){
            res.send({"msg": "User not registered", "error" : err.message})
        }
    
})


userRouter.post("/login", async (req,res) =>{
    const {email,pass}= req.body
    try{
      const user = await userModel.find({email})
      if(user.length > 0){
        bcrypt.compare(pass, user[0].pass, (err, result) =>{
          
            if(result){
                const token = jwt.sign({userID: user[0]._id},"masai")
                res.send({"msg": "Login Successful", "token": token})
            }
            else{
                res.send({"msg": "Wrong Credentials"})
            }
        });
        
      }else{
        res.send({"msg": "Wrong Credentials"})
      }
    }
    catch(err){
        res.send({"msg": "Something went wrong", "error" : err.message})
    }
   
})


module.exports = {
    userRouter
}

