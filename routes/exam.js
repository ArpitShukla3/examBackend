import express from "express";
import createExam from "../controllers/createExam.js";
import addQuestions, { getAllQuestions } from "../controllers/addQuestions.js";
import accessExam from "../controllers/accessExam.js";
import middleware from "../middleware/check.js";
import { getAllExams } from "../controllers/examController.js";
import { getAllQues } from "../controllers/getAllQues.js";
import getGivenExams from "../controllers/getGivenExams.js";
import giveExam from "../controllers/giveExam.js";
import saveAnswer from "../controllers/saveAnswer.js";
import resetAnswer from "../controllers/resetAnswer.js";
import getAnswerForOne from "../controllers/getAnswerForOne.js";
import finalSubmit from "../controllers/finalSubmit.js";
import submittedMiddleWare from "../middleware/submittedMiddleWare.js";
import checkOwner from "../middleware/checkOwner.js";
import saveKey from "../controllers/saveKey.js";
import resetKey from "../controllers/resetKey.js";
import getKeyForOne from "../controllers/getKeyForOne.js";
import generateResult from "../controllers/generateResult.js";

const router =express.Router();
router.use(middleware);
router.post("/examCreate",createExam); // create exam function
router.get("/myExamsCreated",getAllExams) // return exams created  by user
router.get("/myExamsGiven",getGivenExams); // return exams being given or given by user
router.post("/addQues",addQuestions); // adding question to exams
router.get("/accessExam",accessExam); // return question details for that exam
router.get("/examDetails",getAllQuestions); // Teacher access examDetails for modifications
router.get("/allQues",getAllQues);
router.post("/giveExam",giveExam);
//*** For the students while giving exam */
router.post("/saveAnswer",submittedMiddleWare,saveAnswer);
router.post("/resetAnswer",submittedMiddleWare,resetAnswer);
// *** For the teachers while uploading answerKey ***
router.post("/saveKey",checkOwner,saveKey);
router.post("/resetKey",checkOwner,resetKey);
router.post("/getKeyForOne",checkOwner,getKeyForOne);
router.post("/generateResult",checkOwner,generateResult)
// *** 
router.post("/getAnswerForOne",getAnswerForOne);
router.post("/finalSubmit",finalSubmit);
const exam_routes=router;
export default exam_routes;