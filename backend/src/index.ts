import express from "express"
import {connectDB} from "./config/db"
import { signupSchemaType } from "./types/signupTypes";
import { User } from "./models/userSchema";
import { signinSchemaType } from "./types/signinTypes";
import bcrypt from "bcryptjs"
const app = express();

const PORT = 1100;
app.use(express.json());

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

        res.status(200).json({msg:"User created successfully",newUser});
      }
    
    } catch (error:any) {
        console.error(error.message);
        res.status(400).json("Sign-up failed " + error.message);
    }
  }
})

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
          res.json({msg:"Login successfully",user});
        }
        else{
            throw new Error("Password is incorrect")
        }
      }
      else{
        res.json({msg:"User does not exist"})
      }
    } catch (error:any) {
        console.error(error.message);
        res.status(400).json("Sign-in failed " + error.message);
    }
  }
})


connectDB().then(() => {
  console.log("DataBase connected successfully!")
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!");
})

