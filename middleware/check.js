import Clerk from "@clerk/clerk-sdk-node";
import dotenv from "dotenv"
import UserModel from "../Schema/UserModel.js";
dotenv.config();
async function middleware(req,res,next)
{
    if (req.headers.authorization) {
      try {
        const data = await UserModel.findOne({Clerk_id:req.headers.authorization});
        if(!data)
        {
          return res.status(400).json({
            message:"Login first"
          })
        }
        req.body.userID=data._id;
        next();
      } catch (err) {
        return res.status(400).json({
          message:err.message
        })
      }
  }
}
export default middleware;