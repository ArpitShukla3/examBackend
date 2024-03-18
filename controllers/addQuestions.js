import Exam from "../Schema/Exam.js";
import Questions from "../Schema/Questions.js";
export default async function addQuestions(req, res) {
  const  {examID, questions} = req.body;

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
      answer:""
    });
    try {
        const doc = await new_ques.save(); 
        exam_questions.push(doc._id);
    } catch (error) {
        console.log(error.message);
    }
  }

  try {
    await Exam.updateOne(
        { _id: examID },
        { $push: { question: { $each: exam_questions } } }
      );
  res.status(200).json({
    success: true,
    message: "Questions added",
    count: exam_questions.length
  });
} catch (error) {
    res.status(400).json({
        success: false,
        message: error.message,
      });
}
}