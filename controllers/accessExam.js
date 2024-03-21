import Exam from "../Schema/Exam.js";

export default async function accessExam(req,res){
    try {
        // console.log(req.query.key);
        const {key} =req.query;
        const exam =await Exam.findOne({"hashID": key});
        const questionDetails = await Exam.findById({_id:exam._id}).populate("question");
        return res.status(200).json({
            data:exam
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            exam:error.message
        })
    }
   
}