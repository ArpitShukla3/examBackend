import Key from "../Schema/Key.js"
export default async function saveKey(req,res){
    // console.log(req.body);
    try {
         await Key.deleteMany({questionId:req.body.doc.questionId})
        const doc = new Key({
            exam_id:req.body.doc.examID,
            questionId:req.body.doc.questionId,
            answer: req.body.doc.answer
        })
        const response =await doc.save();
        return res.status(200).json({
            success: true,
            message: "You nailed it",
          });
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: error.message,
          });
    }

}