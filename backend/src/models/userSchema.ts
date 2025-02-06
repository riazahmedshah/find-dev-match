import mongoose, { Document } from "mongoose";

interface userProps extends Document{
  firstName:string,
  lastName?:string,
  email:string,
  password:string
  age:number,
  gender:string,
  imgUrl:string,
  skills:string[]
}


const userSchma = new mongoose.Schema<userProps>({
  firstName:{
    type : String,
    required : [true, "First Name is required"],
    trim:true
  },
  lastName:{
    type: String,
    trim:true,
    required:false,
  },
  email:{
    type: String,
    required:[true, "email is required"],
    unique:[true, "try differen emial"]
  },
  password:{
    type: String,
    required:[true, "password is required"]
  },
  age:{
    type:Number,
    required:[true, "Age is required"]
  },
  gender:{
    type:String,
    required:[true,"Gender is required"]
  },
  imgUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSlAk7bALQZaai-ex01emy_DkduqngkaF8NA&s"
  },
  skills:{
    type:[String]
  }
},
{
  timestamps:true
}
);

export const User = mongoose.model("User", userSchma);
