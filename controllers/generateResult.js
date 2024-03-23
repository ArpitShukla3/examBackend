import Exam from "../Schema/Exam.js";
import Key from "../Schema/Key.js";
import Student from "../Schema/Student.js";
import { ObjectId } from "mongodb";
import Answer from "../Schema/Answer.js";
import Marks from "../Schema/Marks.js";
import UserModel from "../Schema/UserModel.js";
import XLSX from "xlsx";
import nodemailer from "nodemailer";
import Questions from "../Schema/Questions.js";
export default async function generateResult(req, res) {
  try {
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // enforcing secure transfer
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      } ,
      tls: {
          rejectUnauthorized: false
      }
    });
    const { examID } = req.body;
    const exam = await Exam.findOne({ _id: examID });
    if (!exam || !exam.question || exam.question.length == 0) {
      return res.status(404).json({ message: "Exam not found" });
    }
    const questions = [...exam.question];
    let answers = [];
    for (const question of questions) {
      const answer = await Key.findOne({
        questionId: question,
        exam_id: examID,
      });
      answers.push(answer);
    }
    const agg = [
      {
        $match: {
          examsGiven: new ObjectId(examID),
        },
      },
      {
        $project: {
          _id: true,
          Clerk_id: true,
        },
      },
    ];
    const studentIdsGivenThisExam = await Student.aggregate(agg);
    let results = [];
    for (const student of studentIdsGivenThisExam) {
      let htmlContent = `<html><head><title>Exam Results</title></head><body>`;
      const student_clerk_id = student.Clerk_id;
      const studentId=await UserModel.findOne({Clerk_id:student_clerk_id})
      const submittedAnswers = await Answer.find({
        student_id: studentId._id,
      });
      // console.log(examID,studentId._id,submittedAnswers);
      // initialising transporter
      let score = 0;
      let positiveMarks = 0;
      let negativeMarks = 0;
      for (const submittedAnswer of submittedAnswers) {
        const correctAnswer = answers.find(
          (answer) =>
            answer.questionId.toString() ===
            submittedAnswer.questionId.toString()
        );
        const questionDetails = await Questions.findOne({ _id: submittedAnswer.questionId });
        if (correctAnswer) {
          if (submittedAnswer.answer === correctAnswer.answer) {
            positiveMarks++;
            score += 1; // Assuming each correct answer's marks are stored in the Key collection
          } else {
            negativeMarks--;
            score -= 1; // Deduct 1 mark for an incorrect answer
          }
        htmlContent += `
      <div>
        <h3>Question: ${questionDetails.question}</h3>
        ${questionDetails.image ? `<img src="${questionDetails.image}" alt="Question Image">` : ''}
        <p>Submitted Answer: ${submittedAnswer.answer}</p>
        <p>Correct Answer: ${correctAnswer.answer}</p>
      </div>
    `;
  }
  // console.log("bcvg","questionDetails","submittedAnswer",correctAnswer,"positiveMarks","negativeMarks");
      }
      htmlContent += `<br><h1>Your marks are ${score}</h1></body></html>`;
      const markEntry = new Marks({
        studentID: studentId._id, // Ensure you're using the ObjectId of the student
        examId: examID,
        marksObtained: score,
        positiveMarks: positiveMarks,
        negativeMarks: negativeMarks,
      });
      await markEntry.save(); // Save the document to the database
      sendEmail(transporter,htmlContent,"Scorecard",student_clerk_id,score);
      results.push({
        studentId: studentId._id,
        score: score,
        Clerk_id: student_clerk_id,
      });
    }
    let updatedResult = [];
    updatedResult = await Promise.all(
      results.map(async (result) => {
        const studentInfo = await UserModel.findOne(
          { Clerk_id: result.Clerk_id },
          "name email"
        );
        return {
          ...updatedResult,
          studentInfo: {
            name: studentInfo.name,
            email: studentInfo.email,
            score: result.score,
          },
        };
      })
    );
    generateExcelFromResults(updatedResult);
    const buffer = await generateExcelFromResults(updatedResult);

    // Set headers to inform the browser about the download
    res.setHeader("Content-Disposition", "attachment; filename=Results.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send the buffer as the response
    res.send(buffer);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

function generateExcelFromResults(updatedResult) {
  // Create a workbook object
  const workbook = XLSX.utils.book_new();

  // Convert updatedResult to a format suitable for the sheet
  const worksheetData = updatedResult.map((result) => ({
    Name: result.studentInfo.name,
    Email: result.studentInfo.email,
    Score: result.studentInfo.score,
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  // Define the file name
  const fileName = "Results.xlsx";

  // Write the workbook to a file
  XLSX.writeFile(workbook, fileName);

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
}

// Assuming updatedResult is available and populated
// generateExcelFromResults(updatedResult);
async function sendEmail(transporter,html,subject,studentClerkId,score)
{
  const studentInfo = await UserModel.findOne(
    { Clerk_id:studentClerkId},
    "name email"
  );
  const recipent = await UserModel.findOne({Clerk_id:studentClerkId});
  let mailOptions = {
    from: process.env.user, // Sender address
    to: recipent.email, // List of recipients
    subject: subject, // Subject line
    text: `Obtained marks ${score}`, // Plain text body
    html: html // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
});
}