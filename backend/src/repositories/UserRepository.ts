import mongoose from "mongoose";
import { User } from "../models/userSchema";
import { createUserInput, updateUserInput } from "../schemas/userSchema";

const USER_SAVE_DATA = ["firstName", "lastName","gender","imgUrl","skills","age","about"]
type idType = mongoose.Types.ObjectId | undefined

export async function createUser(data:createUserInput){
  const user = await User.create({
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    password:data.password,
    gender:data.gender,
    age:data.age,
    skills:data.skills,
    imgUrl:data.profilePhoto,
    about:data.about,
  });
  return user
}

export async function findUserByEmail(email:string){
  const user = await User.findOne({
    email:email
  });
  return user
}

export async function userFeed(
  hideFromFeed:Set<unknown>,
  userId:idType,
  limit:number,
  skip:number
){
  const feed = await User.find({
    $and:[
      {
        _id:{$nin: Array.from(hideFromFeed)},
      },
      {
        _id:{$ne: userId}
      }
    ]
  })
  .select(USER_SAVE_DATA)
  .skip(skip)
  .limit(limit);

  return feed
}

export async function findUserById(userId:idType){
  const user = await User.findById(userId);
  return user
}

export async function updateUser(
  userId:idType,
  data:updateUserInput
){
  const user = await User.findByIdAndUpdate(userId,{
    firstName:data.firstName,
    lastName:data.lastName,
    age:data.age,
    about:data.about,
    gender:data.gender,
    skills:data.skills,
    imgUrl:data.profilePhoto

  },{returnDocument:"after"});
  return user;
}