import express, { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { signupSchemaType } from "../types/signupTypes";
import { User } from "../models/userSchema";
import { signinSchemaType } from "../types/signinTypes";

export const authRouter = express.Router();

const USER_SAVE_DATA = ["skills","age"]


interface SignupResponse {
  message?: string;
  errors?: any
  Error?: string;
};


authRouter.post("/signup", async(req, res:Response<SignupResponse>) : Promise<void> => {
  // const body = req.body;
  const {success, error} = signupSchemaType.safeParse(req.body);

  if(!success){
    res.json({message:"Invalid Inputs", errors:error.errors});
  }
  else{
    try {
      const user = await User.findOne({
        email: req?.body.email
      });
      if(user){
        res.status(400).json({Error:"User alredy exist with this email"});
        // return;
        // throw new Error("User alredy exist with this email "+user.email);
      }
      else{
        const hashedPassword = await bcrypt.hash(req.body.password,5)
        const newUser = new User({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          email:req.body.email,
          password:hashedPassword,
          gender:req.body.gender,
          age:req.body.age,
          skills:req.body.skills,
          imgUrl:req.body.imgUrl
        });
        await newUser.save();
        const token = jwt.sign({_id:newUser._id}, process.env.JWT_SECRET as string,{expiresIn:"1h"})
        res.cookie("token",token, {expires: new Date(Date.now() + 1 * 3600000)});
        res.status(200).json({message:"User created successfully"});
      }
    
    } catch (error) {
        if(error instanceof Error){
          console.error(error.message);
          res.status(400).json({Error: error.message});
        }
        else{
          console.error("An Unknown error from /sign-up")
        }
    }
  }
});


authRouter.post("/signin", async(req, res) => {

  const {success,error} = signinSchemaType.safeParse(req.body);
  if(!success){
    res.status(400).json({mag:"invalid Inputs ", errors:error.errors})
  }
  else{
    try {
      const user = await User.findOne({
        email:req.body.email,
      });
  
      if(user){
        const isMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if(isMatch){
          const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET as string)
          res.cookie("token",token, {expires: new Date(Date.now() + 1 * 3600000)});
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
          res.json({msg:"Login successfully", userData});
        }
        else{
            throw new Error("Password is incorrect")
        }
      }
      else{
        res.json({msg:"User does not exist"})
      }
    } catch (error) {
        if(error instanceof Error){
          console.error(error.message);
          res.status(400).json("Sign-in failed " + error.message);
        }
        else{
          console.error("An Unknown error from /sign-in")
        }
    }
  }
});

authRouter.post("/logout" ,async(req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  }).json("successfully logout")
})
