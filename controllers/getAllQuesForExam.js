import Exam from "../Schema/Exam.js";

export async function getAllQuesForExam(req,res)
{
  try {
    const {key} =req.query;
    const questionDetails = await Exam.findById({_id:req.query.key}).populate("question");
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