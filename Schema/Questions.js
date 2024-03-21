import mongoose from "mongoose";
const {Schema} = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: false
    },
    optionA:{
        type:String,
        required:true
    },
    optionB:{
        type:String,
        required:true
    },
    optionC:{
        type:String,
        required:true
    },
    optionD:{
        type:String,
        required:true
    },
    answerId: {
        type: Schema.Types.ObjectId,
        ref:'Answer',
        required: false
    },
    hashID:{
        type:String,
        required:true
    }
});

const Questions = mongoose.model("Questions", questionSchema);
export default Questions;