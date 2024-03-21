import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;

const answer=new Schema({
    exam_id:{
        type:Schema.Types.ObjectId,
        ref:"Exam",
        required:true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref:"Questions",
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Key=mongoose.model("Key",answer);
export default Key;