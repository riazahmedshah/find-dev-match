import mongoose from "mongoose";
import { ConnectionRequest } from "../models/connectionRequestSchema";
import { createConnectionInput, reviewRequestInput } from "../schemas/requestSchema";


const USER_SAVE_DATA = ["firstName", "lastName","gender","imgUrl","skills","age","about"]
type idType = mongoose.Types.ObjectId | undefined

export async function createRequest(
  data:createConnectionInput,
  fromUserId:idType
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
  fromUserId:idType
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
  toUserId:idType
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

export async function userConnections(
  userId:idType
){
  const connections = await ConnectionRequest.find({
    $or:[
      {
        toUserId:userId,
        fromUserId:userId
      }
    ]
  }).select("fromUserId toUserId");

  return connections;
}

export async function acceptUserConnections(
  userId:idType
) {
    const connections = await ConnectionRequest.find({
      $or:[
        {toUserId:userId,status:"accepted"},
        {fromUserId:userId,status:"accepted"},
      ]
    }).populate("fromUserId", USER_SAVE_DATA).populate("toUserId", USER_SAVE_DATA);;

    return connections;
}

export async function interestedUserConnections(userId:idType){
  const connections = await ConnectionRequest.find({
    toUserId:userId,
    status:"interested"
  }).populate("fromUserId",USER_SAVE_DATA);

  return connections;
}