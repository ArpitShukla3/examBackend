import Answer from "../Schema/Answer.js";

export default async function getAnswerForOne(req,res)
{
    try {

        const response = await Answer.findOne({student_id:req.body.userID,questionId:req.body.questionId});
        if(!response)
        {
            return res.status(200).json({
                success:true,
                data:""
            });
        }
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