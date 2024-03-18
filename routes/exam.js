import express from "express";
import createExam from "../controllers/createExam.js";
import addQuestions from "../controllers/addQuestions.js";
import accessExam from "../controllers/accessExam.js";
import middleware from "../middleware/check.js";
import { getAllExams } from "../controllers/examController.js";

const router =express.Router();
router.use(middleware);
router.post("/examCreate",createExam);
router.get("/myExamsCreated",getAllExams)
router.post("/addQues",addQuestions);
router.get("/accessExam",accessExam);
// router.get("/myExams",myExam);
const exam_routes=router;
export default exam_routes;