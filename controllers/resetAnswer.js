import Answer from "../Schema/Answer.js";

export default async function resetAnswer(req,res){
    try {
        const response = await Answer.deleteMany({student_id:req.body.userID,questionId:req.body.doc.questionId});
        return res.status(200).json({
            success:true,
            data:response
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            exam:error.message
        })
    }
   
}