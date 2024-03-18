import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;
const exam=new Schema({
    Name:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
    },
    hashID:{
        type:String,
    },
    question:[{
        type:Schema.Types.ObjectId,
        ref:'Questions'
    }],
    endTime:{
        type:String,
    },
    StartTime:{
        type:String,
    },
    TimeLimit:{
        type:String,
    },
    Notification:[{
        type:Schema.Types.ObjectId,
        ref:"Notification"
    }]
});

 
const Exam=mongoose.model("Exam",exam);
export default Exam; 