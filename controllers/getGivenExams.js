import Student from "../Schema/Student.js";

export default async function getGivenExams(req,res)
{
try {
    const studentDetails = await Student.findOne({Clerk_id:req.headers.authorization}).populate("examsGiven");
return  res.status(200).json(studentDetails);
} catch (error) {
    return res.status(400).json({
        error:error.message
    })
}

}