//create exam -> done,
// modify exam
//add questions
//access exam
//save answers
//get marks
//upload key
import {ObjectId} from 'mongodb';
import Exam from '../Schema/Exam.js';
import UserModel from '../Schema/UserModel.js';
export async function getAllExams(req,res){
   try{ 
    const agg = [
  {
    '$match': {
      'createdBy': new ObjectId(req.body.userID)
    }
  }, {
    '$project': {
      'Name': 1, 
      'hashID': 1, 
      'endTime': 1, 
      'StartTime': 1, 
      'TimeLimit': 1
    }
  }
];
const result = await Exam.aggregate(agg);
return res.status(200).json({
    sucess:true,
    data:result
})}
catch(error)
{
    return res.status(400).json({
        sucess:false,
        error:error.message
    })}
}