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
    answerId: {
        type: Schema.Types.ObjectId,
        ref:'Answer',
        required: false
    }
});

const Questions = mongoose.model("Questions", questionSchema);
export default Questions;