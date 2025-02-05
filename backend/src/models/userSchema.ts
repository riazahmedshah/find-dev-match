import mongoose from "mongoose";

interface userProps{
  firstName:string,
  lastName:string,
  email:string,
  password:string
  age:number,
  gender:string
}


const userSchma = new mongoose.Schema<userProps>({
  firstName:{
    type : String,
    required : true,
  },
  lastName:{
    type: String,
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  password:{
    type: String,
    required:true,
  },
  age:{
    type:Number,
    required:true,
  },
  gender:{
    type:String,
    required:true
  }
});

export const User = mongoose.model("User", userSchma);
