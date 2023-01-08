const mongoose=require("mongoose");
const validator=require("validator")
const studentsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not a valid email id")
            }
        },
        unique:[true,"already pressent"]
    },
    phoneNumber:{   
        type:Number,
        minlength:10,
        maxlength:10,
        unique:[true,"already pressent"]
    }
})

module.exports=mongoose.model('students',studentsSchema)