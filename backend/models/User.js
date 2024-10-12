const mongoose=require('mongoose');
const {Schema} =mongoose;

const Userschema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    aadharNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    isvoted:{
        type:Boolean,
        required:false,
        default:false
    },
})
const user=mongoose.model("User",Userschema);
module.exports=user