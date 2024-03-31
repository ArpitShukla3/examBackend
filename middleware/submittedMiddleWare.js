import Student from "../Schema/Student.js";
import {ObjectId} from 'mongodb';
export default async function submittedMiddleWare(req,res,next){
    try {
         let examID="";
         if(req.body&&req.body.doc&&req.body.doc.examID)
         {
          examID= req.body.doc.examID
         }
         else if( req.headers.authorization)
         {
          examID= req.query.key;
         }
        const agg = [
            {
              '$match': {
                'Clerk_id': req.headers.authorization, 
                'SubmittedExams': new ObjectId(examID)
              }
            }
          ];
          const cursor = await Student.aggregate(agg);
          if(cursor.length!=0)
          {
            return res.status(400).json({
                success:true,
                message:"Submitted exams cannot be  accessed again",
            })
          }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:error.message,
        })
    }
}