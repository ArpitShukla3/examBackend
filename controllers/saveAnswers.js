import Answer from "../Schema/Answer";

export default async function saveAnswers(req,res)
{
    try {
        const {studentID,answer,questionID}=req.body;
        const doc =new Answer({
        student_id:studentID,
        questionId:questionID,
        answer:answer
    })
   const result= await doc.save();
   
   res.json({success: true, data: result});
    } catch (error) {
        res.json({success: false, data: error.message});
    }
}