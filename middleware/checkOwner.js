import UserModel from "../Schema/UserModel.js";
import Exam from "../Schema/Exam.js"
export default async function checkOwner(req,res,next)
{
      try {
        console.log(req.body)
        const {examID} = req.body;
        const doc = await Exam.findById({_id:examID});
        console.log(doc)
        if(doc.createdBy==req.body.UserID)
        {
            // next();
            return res.status(200).json({
                success:true,
                data:"Hello"
            })
        }
        return res.status(401).json({
            success:false,
            error:"Unauthorised access"
        })
      } catch (err) {
        return res.status(400).json({
          message:err.message
        })
      }
  }