import Exam from "../Schema/Exam.js";
import Questions from "../Schema/Questions.js";
export default async function addQuestions(req, res) {
  const  {hashID, questions} = req.body;
  
  if(!questions || questions.length <= 0) {
    return res.status(400).json({
      success: false,
      message: "Error occurred",
    });
  }
  
  const exam_questions = [];
  for (const element of questions) {
    const new_ques = new Questions({
      question: element.question,
      image: element.image,
      optionA: element.optionA,
      optionB: element.optionB,
      optionC: element.optionC,
      optionD:  element.optionD,
      hashID: hashID,
    });
    
    try {
        const doc = await new_ques.save(); 
        exam_questions.push(doc._id);
       
    } catch (error) {
      // console.log("req.body");
     return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  try {
  const response=  await Exam.updateOne(
        { hashID: hashID },
        { question: exam_questions}
      );
  res.status(200).json({
    success: true,
    message: "Questions added",
    count: exam_questions.length
  });
} catch (error) {
    return res.status(400).json({
        success: false,
        message: error.message,
      });
}
}
export async function getAllQuestions(req,res)
{
  try {
    const {examID} = req.query;
    const examOwnerDetails =   await Exam.findById(examID);
    if (req.body.userID.toString() !== examOwnerDetails.createdBy.toString()) {
      // console.log(examOwnerDetails.createdBy, req.body.userID);
      return res.status(401).json({
        success: false,
        message: "Not Authorized"
      });
    }
    const questionDetails = await Exam.findById({_id:examID}).populate("question");
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