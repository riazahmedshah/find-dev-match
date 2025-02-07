import express from "express"
import { authMiddleware, CustomRequest } from "../middlewares/authMidlleware";
import { User } from "../models/userSchema";


export const profileRouter = express.Router();

profileRouter.get("/view", authMiddleware,async(req:CustomRequest, res) => {
  const {_id} = req.decoded || {};
  try {
    if(!_id){
      throw new Error("Invalid user Id "+_id)
    }
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user not found");
    }
    res.json({"User Details":user})
  } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
        res.status(400).json("Sign-in failed " + error.message);
      }
      else{
        console.error("An Unknown error from: GET /profile")
      }
  }
});