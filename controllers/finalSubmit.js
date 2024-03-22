import Student from "../Schema/Student.js";

export default async function finalSubmit(req,res)
{
    try {
    // console.log(req.body);
    const {examID,userID} = req.body;
    const doc =await Student.updateOne({Clerk_id:req.headers.authorization},{ $push: { SubmittedExams: examID }});
    // console.log(doc);
    return res.status(200).json({
        success:true,
        data:doc
    })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:true,
            error:error.message
        })
    }
}