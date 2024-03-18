import mongoose from "mongoose";
const {Schema}=mongoose;

const student = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  examsGiven: [{
    type: Schema.Types.ObjectId,
    ref:"Exam"
  }],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

const Students = mongoose.model("Students", student);
export default Students;