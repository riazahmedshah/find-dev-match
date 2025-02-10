import express from "express"
import { authMiddleware, CustomRequest } from "../middlewares/authMidlleware";
import { ConnectionRequest } from "../models/connectionRequestSchema";

export const userRouter = express.Router();

userRouter.get("/connections",authMiddleware ,async(req:CustomRequest, res) => {
  const userId = req.decoded?._id

  try {
    const connections = await ConnectionRequest.find({
      $or:[
        {toUserId: userId,status:"accepted"},
        {fromUserId: userId,status:"accepted"},
      ] 
    }).populate("fromUserId", ["firstName", "lastName","gender","imgUrl","skills","age"]).populate("toUserId", ["firstName", "lastName","gender","imgUrl","skills","age"]);

    const data = connections.map((row) => {
      if(row.fromUserId._id.equals(userId)){
        return row.toUserId
      }
      else{
        return row.fromUserId
      }
      // row.fromUserId
    })

    if(!connections){
      throw new Error("No Connection found!")
    };
    if(connections.length < 1){
      res.json({message:"No Pending Requests!"})
    } else{
      res.json({data: data})
    }

  } catch (error) {
    (error instanceof Error) ? res.json({message: error.message}) : "UnknownError at GET /connections"
  }
});

userRouter.get("/requests-recieved", authMiddleware,async(req:CustomRequest, res) => {
  const userId = req.decoded?._id

  try {
    const recievedReq = await ConnectionRequest.find({
      toUserId: userId,
      status:"interested"
    }).populate("fromUserId", ["firstName", "lastName","gender","imgUrl","skills","age"]);

    if(!recievedReq){
      throw new Error("No Requests found!")
    };

    if(recievedReq.length < 1){
      res.json({message:"No Pending Requests!"})
    } else{
      res.json({message: recievedReq})
    }
  } catch (error) {
    (error instanceof Error) ? res.json({message: error.message}) : "UnknownError at GET /request-recieved" 
  }
});

