import mongoose from "mongoose";
const {Schema}=mongoose;

const student = new Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // rollNo: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  Clerk_id:{
    type:String,
    required:true
},
  examsGiven: [{
    type: Schema.Types.ObjectId,
    ref:"Exam"
  }],
  SubmittedExams:[{
    type:Schema.Types.ObjectId,
    ref:"Exam"
  }]
  // notifications: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Notification",
  //   },
  // ],
});
const Student = mongoose.model("Students", student);
export default Student;