import Exam from "../Schema/Exam.js";

export async function getAllQues(req,res)
{
  try {
    const {key} =req.query;
    const exam =await Exam.findOne({"hashID": key});
    const questionDetails = await Exam.findById({_id:exam._id}).populate("question");
    return res.status(200).json({
      data:questionDetails
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}