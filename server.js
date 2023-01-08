const express=require("express");
const mongoose= require("mongoose");
const students=require("./model");
const app=express();
app.use(express.json())

mongoose.connect("mongodb+srv://aj:12345qwerty@cluster0.ks05wux.mongodb.net/?retryWrites=true&w=majority").
then(()=>{
    console.log("db connected")
}).catch(err =>console.log(err))

app.post("/students",async(req,res)=>{
    const {name,email,phoneNumber}=req.body;
    try{
    const newData=new students({name,email,phoneNumber});
    await newData.save();
    res.json(newData);
    }
    catch(err){
        console.log(err.message);
    }
})
app.get("/students",async(req,res)=>{
    try {
        res.json(await students.find())
    } catch (error) {
        console.log(error)
    }
})
app.get("/students/:name",async(req,res)=>{
    try {
        const data=await students.findOne({name:req.params.name});
        res.json(data);
    } catch (error) {
        console.log(error)
    }
})
app.patch("/students/:id",async(req,res)=>{
    const data=await students.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(data)
})

app.delete("/students/:id",async(req,res)=>{
    res.json(await students.findByIdAndDelete(req.params.id));
})
app.listen(3000,()=>console.log("listning"))