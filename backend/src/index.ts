import express from "express"
import {connectDB} from "./config/db"
import { signupSchemaType } from "./types/signupTypes";
import { User } from "./models/userSchema";
import { signinSchemaType } from "./types/signinTypes";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { authMiddleware, CustomRequest } from "./middlewares/authMidlleware";
const app = express();

const PORT = 1100;
app.use(express.json());
app.use(cookieParser())

app.post("/signup", async(req, res) => {
  // const body = req.body;
  const {success, error} = signupSchemaType.safeParse(req.body);

  if(!success){
    res.send({msg:"Invalid Inputs", errors:error.errors});
  }
  else{
    try {
      const user = await User.findOne({
        email: req?.body.email
      });
      if(user){
        throw new Error("User alredy exist with this email "+user.email);
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
        res.status(200).json({msg:"User created successfully"});
      }
    
    } catch (error) {
        if(error instanceof Error){
          console.error(error.message);
          res.status(400).json("Sign-up failed " + error.message);
        }
        else{
          console.error("An Unknown error from /sign-up")
        }
    }
  }
});

app.post("/signin", async(req, res) => {

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
          res.json({msg:"Login successfully"});
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

app.get("/profile", authMiddleware,async(req:CustomRequest, res) => {
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


connectDB().then(() => {
  console.log("DataBase connected successfully!")
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!");
})

