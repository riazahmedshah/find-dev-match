import { Response } from "express";
import { CustomRequest } from "../middlewares/authMidlleware";
import { findUserById, updateUser, userFeed } from "../repositories/UserRepository";
import { ResponseHandler } from "../utils/ResponseHandler";
import { acceptUserConnections, interestedUserConnections, userConnections } from "../repositories/ConnectionRepository";
import { updateUserSchema } from "../schemas/userSchema";

export const getFeed = async(req:CustomRequest,res:Response) => {
  const userId = req.decoded?._id
  const skip = Number(req.query.skip) || 1;
  let limit = Number(req.query.limit) || 10;

  limit = limit > 50 ? 50 : limit
  try {
    const connections = await userConnections(userId);
    const hideFromFeed = new Set();
    connections.forEach((req) => {
      hideFromFeed.add(req.fromUserId.toString());
      hideFromFeed.add(req.toUserId.toString());
    });
    const feed = await userFeed(hideFromFeed,userId,limit,skip);
    return ResponseHandler.json(res,feed)
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}

export const getConnections = async(req:CustomRequest, res:Response) => {
  const userId = req.decoded?._id
  try {
    const connections = await acceptUserConnections(userId);
    if(connections.length === 0){
      return ResponseHandler.notFound(res,"NO_ACCEPTED_CONNECTIONS_FOUND")
    }
    const data = connections.map((row)=>{
      if(row.fromUserId._id.equals(userId)){
        return row.toUserId;
      } else{
        return row.fromUserId;
      }
    });
    return ResponseHandler.json(res, data);
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}

export const getRecievedRequests = async (req:CustomRequest, res:Response) => {
  const userId = req.decoded?._id;
  try {
    const recievedReq = await interestedUserConnections(userId);

    if(recievedReq.length === 0){
      return ResponseHandler.json(res,{
        MESSAGE:"NO_PENDING_REQUESTS"
      });
   }
  return ResponseHandler.json(res,recievedReq);
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}

export const update = async (req:CustomRequest, res:Response) => {
  const userId = req.decoded?._id;
  const body = req.body
  const {success, data, error} = updateUserSchema.safeParse(body);
  if(!success){
    return ResponseHandler.zodError(res,error.errors);
  }
  try {
    const updatedUser = await updateUser(userId,data);
    if(!updatedUser){
      return ResponseHandler.notFound(res, "USER_NOT_FOUND_FOR_UPDATE");
    }
    return ResponseHandler.json(res,updatedUser)
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}

export const getCurrentUser = async (req:CustomRequest,res:Response) => {
  const userId = req.decoded?._id;
  try {
    const user = await findUserById(userId);
    if (!user) {
        return ResponseHandler.notFound(res, "USER_NOT_FOUND");
    }
    return ResponseHandler.json(res,user);
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}