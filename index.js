const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
mongoose.set("strictQuery",true)

const {connection} = require("./db")
const {userRouter} = require("./routes/users.routes")
const {postRouter} = require("./routes/post.routes")
const {authenticate} = require("./middleware/authenticate.middleware")

require("dotenv").config()



app.get("/", (req,res)=>{
    res.send("HOME PAGE")
})


app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", postRouter)


app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    } catch(err){
        console.log(err.message)
    }
    console.log(`Server is listening at port ${process.env.port}`)
})