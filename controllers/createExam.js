import Exam from "../Schema/Exam.js";
import crypto from "crypto"
export default async function createExam(req,res)
{
    let {Name,StartTime,endTime,TimeLimit}=req.body.doc;
    const hashKey = generate6DigitHashKey();
    if(!Name)
    {
      Name=hashKey;  
    }
    const doc=new Exam({
        Name:Name,
        createdBy:req.body.userID,
        hashID:hashKey,
        StartTime:StartTime,
        endTime:endTime,
        TimeLimit:TimeLimit
    })
    try {
        const exam_details = await doc.save();
        return res.json({
          success: true,
          exam_details: {
            details: exam_details ,
          },
          message: "Exam created successfully.",
        });
      } catch (error) {
        return res.json({
          success: false,
          error: error.toString(),
          message: "Error occurred while creating the exam.",
        });
      }
}

function generate6DigitHashKey() {
  const bytes = crypto.randomBytes(10);
  const hash = crypto.createHash("sha256").update(bytes).digest("base64");
  const key = hash.substring(0, 6);
  return key;
}

