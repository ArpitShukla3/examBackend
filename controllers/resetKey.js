import Key from "../Schema/Key.js";

export default async function resetKey(req,res){
    //   console.log("req",req.body,"req");
      try {
        const {questionId} = req.body.doc;
        const response = await Key.deleteMany({questionId:questionId})
        return res.status(200).json({
            success: true,
            response:response
          });
    } catch (error) {
        return res.status(400).json({
            success: true,
            error:error.message,
          });
    }
}