import express from "express"
import { authMiddleware, CustomRequest } from "../middlewares/authMidlleware";
import { ConnectionRequest } from "../models/connectionRequestSchema";
import { User } from "../models/userSchema";

export const userRouter = express.Router();

const USER_SAVE_DATA = ["firstName", "lastName","gender","imgUrl","skills","age","about"]

userRouter.get("/connections",authMiddleware ,async(req:CustomRequest, res) => {
  const userId = req.decoded?._id

  try {
    const connections = await ConnectionRequest.find({
      $or:[
        {toUserId: userId,status:"accepted"},
        {fromUserId: userId,status:"accepted"},
      ] 
    }).populate("fromUserId", USER_SAVE_DATA).populate("toUserId", USER_SAVE_DATA);

    const data = connections.map((row) => {
      if(row.fromUserId._id.equals(userId)){
        return row.toUserId
      }
      else{
        return row.fromUserId
      }
    })

    if(!connections){
      throw new Error("No Connection found!")
    };
    if(connections.length < 1){
      res.json({message:"No Pending Requests!"})
    } else{
      res.json({data})
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
    }).populate("fromUserId", USER_SAVE_DATA);

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

userRouter.get("/feed", authMiddleware, async(req:CustomRequest,res) => {
    const userId = req.decoded?._id
    const skip = Number(req.query.skip) || 1;
    let limit = Number(req.query.limit) || 10;

  limit = limit > 50 ? 50 : limit
    try {
      const connections = await ConnectionRequest.find({
        $or: [
          {fromUserId: userId},
          {toUserId: userId}
        ]
      }).select("fromUserId toUserId");

      const hideFromFeed = new Set();

      connections.forEach((req) => {
        hideFromFeed.add(req.fromUserId.toString());
        hideFromFeed.add(req.toUserId.toString());
      });

      //console.log(hideFromFeed);

      const feed = await User.find({
        $and: [
          {_id: {$nin: Array.from(hideFromFeed)}},
          {_id: {$ne: userId}}
        ]
      }).select(USER_SAVE_DATA).skip(skip).limit(limit);

      res.json({data: feed});
    } catch (error) {
      (error instanceof Error) ? res.json({message: error.message}) : "UnknownError at GET /feed" 
    }

  
})

