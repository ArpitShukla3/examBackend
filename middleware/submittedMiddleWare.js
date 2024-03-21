import Student from "../Schema/Student.js";
import {ObjectId} from 'mongodb';
export default async function submittedMiddleWare(req,res,next){
    try {
        console.log(req.body,req.headers.authorization);
        const {examID} =req.body.doc;
        const agg = [
            {
              '$match': {
                'Clerk_id': req.headers.authorization, 
                'SubmittedExams':new ObjectId( examID)
              }
            }
          ];
          const cursor = await Student.aggregate(agg);
          console.log(cursor);
          if(cursor)
          {
            return res.status(200).json({
                success:true,
                message:"Submitted exams cannot be  accessed again",
            })
          }
        next();
    } catch (error) {
        return res.status(401).json({
            success:true,
            error:error.message,
        })
    }
}