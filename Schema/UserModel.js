import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;
const user=new Schema({
    name:{
        type:"string",
        required:true,
    },
    Clerk_id:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:"string",
        required:true,
    },
});
const UserModel=mongoose.model("UserModel",user);
export default UserModel; 