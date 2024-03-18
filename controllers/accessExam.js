import Exam from "../Schema/Exam.js";

export default async function accessExam(req,res){
    try {
        const {key} =req.query;
        const exam =await Exam.find({"hashID": key}).populate("question");
        return res.status(200).json({
            exma:exam
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            exam:error.message
        })
    }
   
}