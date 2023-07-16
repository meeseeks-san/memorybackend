require("dotenv").config()
const express = require("express");
const server = express()
const Memory = require("./schema")
const mongoose = require("mongoose")
const cors = require("cors")
server.use(express.json())
server.use(cors())
mongoose.connect(process.env.MONGODB_URL)

const mongooseconnection = mongoose.connection;
mongooseconnection.on("open",()=>{
    console.log("db connected")
})



server.get('/getmemories',async(req,res)=>{
   const mem= await Memory.find({})
     res.send({
        data :mem
    })
})



server.post('/addmemory',async(req,res)=>{
    try{
        const {memoryTitle,memoryimageUrl} = req.body
        const newMemory = new Memory({
            memoryTitle : memoryTitle,
            memoryimageUrl
        })
    await  newMemory.save();
    res.send({
        message : "responded"
    })
    }catch(err){
        console.log({"error":err})
    }
})

server.delete('/deletememory',async(req,res)=>{
    const {id,title} = req.query;
    console.log(id)
    const result = await Memory.deleteOne({ _id: id });

      res.send({
         message :title + "has been deleted"
     })
 })

 server.get('/getsinglememory/:id',async(req,res)=>{
    const {id} = req.params; 
    console.log(req.params);
    const memory = await  Memory.findById({ _id: id });
      res.send({
         data :memory
     })
 })

 server.put('/editmemory',async(req,res)=>{
    const {id,title, imageUrl} =req.body
    const memory = await  Memory.findById({ _id: id });
        memory.memoryTitle = title;
        memory.memoryimageUrl = imageUrl || "insert.png";
        // Save the updated memory
        await memory.save();
        res.send({
            data: memory,
            message: title+ "was edited"
        })
 
  })

server.listen(3000,()=>{
    console.log("database connected")
})