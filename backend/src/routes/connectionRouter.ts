import express from "express";
import { authMiddleware, CustomRequest } from "../middlewares/authMidlleware";
import { connectRequestTypes, reviewRequestTypes } from "../types/connectionRequestTypes";
import { ConnectionRequest } from "../models/connectionRequestSchema";
import { User } from "../models/userSchema";
import zod from "zod"

export const connectionRouter = express.Router();


connectionRouter.post("/send/:status/:toUserId", authMiddleware ,async(req:CustomRequest,res) => {
    const fromUserId = req.decoded?._id;
    console.log("Received params:", req.params); 

    const {success, data} = connectRequestTypes.safeParse(req.params);

    try {
        const toUserId = data?.toUserId;
        const status = data?.status;
        if(!success){
            throw new Error("Invalid Inputs")
        }
        const user = await User.findById(toUserId);
        if(!user){
            throw new Error("user not found")
        }
        const existingReq = await ConnectionRequest.findOne({
            $or:[
                {toUserId,fromUserId},
                {toUserId:fromUserId, fromUserId:toUserId}
            ]
        });
        if(existingReq){
            throw new Error("Connect Request Already exist!")
        } else{

        }
            const requsest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });
            await requsest.save()
            res.json({message:"Connection Request Sended!"})
    } catch (error) {
        if(error instanceof zod.ZodError){
            res.json({ZodError:error})
        };
        if(error instanceof Error){
            res.json({Error: error.message})
        } else{
            res.json({message:"Unknown error from POST /send/:status/:fromuserId"})
        }
    }

})

connectionRouter.post("/review/:status/:requestId", authMiddleware, async(req:CustomRequest,res) => {
    const userId = req.decoded?._id;

    const {success, data} = reviewRequestTypes.safeParse(req.params);
    try {
        if(!success){
            throw new Error("Invalid Input types");
        };
        const status = data.status
        const requestId = data.requestId

        const findRequest = await ConnectionRequest.findOne({
            status: "intersted",
            toUserId: userId,
            requestId
        });

        res.json({Requests:findRequest});
    } catch (error) {
        if(error instanceof zod.ZodError){
            res.json({ZodError:error})
        };
        if(error instanceof Error){
            res.json({ErrorMessage: error})
        }
        else{
            res.json({ErrorMessage:"Unknown error at POST /review/:status/:requestId"})
        }
    }
})