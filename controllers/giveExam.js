import Exam from "../Schema/Exam.js"
import Student from "../Schema/Student.js";
export default async function giveExam(req,res){
    try {
        const {hash} =req.body;
        const exam =await Exam.findOne({"hashID": hash});
        const questionDetails = await Exam.findById({_id:exam._id}).populate("question");
        // console.log(questionDetails._id);
        // return res.status(200).json({
        //     data:questionDetails
        // }) 
        const examsAttempted = await Student.findOne({Clerk_id:req.headers.authorization});
        if(!examsAttempted)
        {
            const newDoc= new Student({
                Clerk_id : req.headers.authorization,
            });
            await newDoc.save();
        }
        if(examsAttempted && examsAttempted.examsGiven && examsAttempted.examsGiven.length) 
        { examsAttempted.examsGiven.map((item,index)=>{
            if(item==hash)
            {
                return res.status(200).json({
                    data:questionDetails
                })  
            }
        })
        // console.log("Saving existing student")
        await Student.updateOne({Clerk_id:req.headers.authorization},{examsGiven:[questionDetails._id,...examsAttempted.examsGiven]})
       }
       else{
        // console.log("Saving new student",questionDetails._id)
        const data =await Student.updateOne({Clerk_id:req.headers.authorization},{examsGiven:[questionDetails._id]})
        // console.log("Details of new Studnet",data)
    }
        return res.status(200).json({
            data:questionDetails
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            exam:error.message
        })
    }
}