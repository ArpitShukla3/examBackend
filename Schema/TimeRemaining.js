import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;

const time=new Schema({
    exam_id:{
        type:Schema.Types.ObjectId,
        ref:"Exam"
    },
    StudnetId: {
        type: Schema.Types.ObjectId,
        ref:"Student",
        required: true
    },
    LeftTime: {
        type: Number,
        required: true
    }
});

const TimeRemaining=mongoose.model("TimeRemaining",time);
export default TimeRemaining;