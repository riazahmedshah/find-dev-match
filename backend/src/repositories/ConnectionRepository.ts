import mongoose from "mongoose";
import { ConnectionRequest } from "../models/connectionRequestSchema";
import { createConnectionInput, reviewRequestInput } from "../schemas/requestSchema";

export async function createRequest(
  data:createConnectionInput,
  fromUserId:mongoose.Types.ObjectId | undefined
){
  const request = await ConnectionRequest.create({
    toUserId:data.toUserId,
    fromUserId:fromUserId,
    status:data.status
  });

  return request
}

export async function findRequest(
  toUserId:string, 
  fromUserId:mongoose.Types.ObjectId | undefined
){
  const existingRequest = await ConnectionRequest.findOne({
    $or:[
      {toUserId,fromUserId},
      {
        toUserId:fromUserId,
        fromUserId:toUserId
      }
    ]
  });

  return existingRequest
}

export async function reviewRequest(
  data:reviewRequestInput,
  toUserId:mongoose.Types.ObjectId | undefined
){
  const findAndUpdate = await ConnectionRequest.findOneAndUpdate({
    _id:data.requestId,
    toUserId:toUserId,
    status:data.status
  },{
    status:data.status
  },{
    returnDocument:"after"
  });

  return findAndUpdate
}