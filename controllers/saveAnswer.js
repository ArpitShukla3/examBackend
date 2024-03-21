import Answer from "../Schema/Answer.js";

export default async function saveAnswer(req, res) {
    try {
        const response = await Answer.deleteMany({student_id: req.body.userID, questionId: req.body.doc.questionId });
        const doc = await Answer({
            student_id: req.body.userID,
            questionId: req.body.doc.questionId,
            answer: req.body.doc.answer
        }).save();

        if (!doc) {
            return res.status(400).send("Error Saving the Document");
        }

        return res.status(200).json(doc);
    } catch (error) {
        console.error("Error deleting documents:", error);
        return res.status(500).send("Internal Server Error");
    }
}
