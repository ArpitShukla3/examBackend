import Key from "../Schema/Key.js";

export default async function getKeyForOne(req,res)
{
    // console.log("req",req.body,"req");
    try {
        const response = await Key.findOne({questionId:req.body.questionId,})
        return res.status(200).json({
            success: true,
            response:response,
            message: "You nailed it",
          });
    } catch (error) {
        return res.status(200).json({
            success: true,
            error:error.message,
            message: "You nailed it",
          });
    }
}