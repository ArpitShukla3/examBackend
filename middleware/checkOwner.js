import Exam from "../Schema/Exam.js";
export default async function checkOwner(req, res, next) {
  try {
    const { examID } = req.body.doc;
    const doc = await Exam.findById(examID );
    if (doc.createdBy.toString() !== req.body.userID.toString()) {
      return res.status(401).json({
        success: false,
        error: "Unauthorised access",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}
