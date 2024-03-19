import express from "express";
import createExam from "../controllers/createExam.js";
import addQuestions, { getAllQuestions } from "../controllers/addQuestions.js";
import accessExam from "../controllers/accessExam.js";
import middleware from "../middleware/check.js";
import { getAllExams } from "../controllers/examController.js";
import { getAllQues } from "../controllers/getAllQues.js";
import getGivenExams from "../controllers/getGivenExams.js";
import giveExam from "../controllers/giveExam.js";

const router =express.Router();
router.use(middleware);
router.post("/examCreate",createExam);
router.get("/myExamsCreated",getAllExams)
router.get("/myExamsGiven",getGivenExams);
router.post("/addQues",addQuestions);
router.get("/accessExam",accessExam);
router.get("/examDetails",getAllQuestions);
router.get("/allQues",getAllQues);
router.post("/giveExam",giveExam);
// router.get("/myExams",myExam);
const exam_routes=router;
export default exam_routes;