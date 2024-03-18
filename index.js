import express from "express";
import dotenv from "dotenv";
import ConnectMongo from "./databaseCannection/connectMongoDb.js";
import auth_route from "./routes/userRoute.js";
import  bodyParser  from 'body-parser';
import cors from 'cors'
import exam_routes from "./routes/exam.js";
import { Webhook } from 'svix';
ConnectMongo();
dotenv.config();
const app =express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth",auth_route);
app.use("/exam",exam_routes);
app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})