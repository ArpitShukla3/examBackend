import express from "express";
import { signup} from "../controllers/userController.js";

const router =express.Router();

router.post("/signup",signup);
const auth_route=router;
export default auth_route;