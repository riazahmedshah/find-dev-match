import express from "express"
import { authMiddleware, CustomRequest } from "../middlewares/authMidlleware";
import { User } from "../models/userSchema";
import { updateProfileTypes } from "../types/updateProfileTypes";


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
    const userData = {
      userId:user._id,
      email: user.email,
      firstName: user.firstName,
      lastName:user.lastName,
      gender:user.gender,
      imgUrl:user.imgUrl,
      age:user.age,
      skills:user.skills
    }
    res.json({userData})
  } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
        res.status(400).json({"Sign-in failed ":error.message});
      }
      else{
        console.error("An Unknown error from: GET /profile")
      }
  }
});

profileRouter.put("/edit",authMiddleware, async(req:CustomRequest,res) => {
  const {_id} = req.decoded || {};

  const {success, error} = updateProfileTypes.safeParse(req.body);
  if(!success){
    res.status(400).json({mag:"invalid Inputs ", errors:error.errors})
  }
  else{
    try {
      if(!_id){
        throw new Error("Invalid user Id "+_id)
      }

      const UpdatedUser = await User.findByIdAndUpdate(_id,{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        age:req.body.age,
        skills:req.body.skills,
        imgUrl:req.body.imgUrl,
        about:req.body.about,
      },{returnDocument:"after"});
      res.json({mag:"User Updated Successfylly",UpdatedUser})
    } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
        res.status(400).json("Profile update failed " + error.message);
      }
      else{
        console.error("An Unknown error from: PATCH /profile/edit")
      }
    }
  }
})