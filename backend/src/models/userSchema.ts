import mongoose, { Document, Model } from "mongoose";

interface userProps extends Document{
  firstName:string,
  lastName?:string,
  email:string,
  password:string
  age:number,
  gender:string,
  imgUrl:string,
  skills:string[],
  about:string,
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
  },
  about:{
    type:String,
    default:"This about section we need slightly modify our user schema so thet we can have about field over here, and this will look good in profile section or page"
  }
},
{
  timestamps:true
}
);


export const User:Model<userProps> = mongoose.model<userProps>("User", userSchma);
