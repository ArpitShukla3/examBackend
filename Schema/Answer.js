import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;

const answer=new Schema({
    student_id:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref:"Questions",
        required: true
    },
    answer: {
        type: String,
        required: true,
        default:""
    }
});

const Answer=mongoose.model("Answer",answer);
export default Answer;