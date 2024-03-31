import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema} = mongoose;

const studentMarkSchema = new Schema({
    studentID:{
        type: Schema.Types.ObjectId, // or any other type that suits your needs
        ref:"Student",
        required: true
    },
    Clerk_id:{
        type: String,
        required:true,
    },
    examId: {
        type: Schema.Types.ObjectId, // or any other type that suits your needs
        ref:"Exam",
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    positiveMarks: {
        type: Number,
        required: true
    },
    negativeMarks: {
        type: Number,
        required: true
    }
},
{timestamps:true});

const Marks = mongoose.model("Marks", studentMarkSchema);
export default Marks;