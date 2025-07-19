import { Response } from "express";

import { ResponseHandler } from "../utils/ResponseHandler";
import { CustomRequest } from "../middlewares/authMidlleware";
import { connectRequestTypes, reviewRequestTypes } from "../schemas/requestSchema";
import { createRequest, findRequest, reviewRequest } from "../repositories/ConnectionRepository";

export const sendConnectionRequest = async(req:CustomRequest,res:Response) => {
    const fromUserId = req.decoded?._id; 
    const {success, data, error} =  await connectRequestTypes.safeParseAsync(req.params);
    if(!success){
        return ResponseHandler.zodError(res, error.errors);
    }
    try {
        const existingReq = await findRequest(data.toUserId, fromUserId)
        if(existingReq){
            return ResponseHandler.json(res,{
                MESSAGE:"REQUEST_ALREADY_EXISTS"
            })
        }
        await createRequest(data, fromUserId) 
        return ResponseHandler.json(res,{
            MESSAGE:"COONECTION_REQUEST_SENDED!"
        })
    } catch (error) {
        return ResponseHandler.error(res,error)
    }
}

export const reviewConnectionRequest = async(req:CustomRequest,res:Response) => {
    const userId = req.decoded?._id;
    const {success, data, error} = reviewRequestTypes.safeParse(req.params);
    if(!success){
        return ResponseHandler.zodError(res, error.errors);
    };
    try {
        const findRequestAndUpdate = await reviewRequest(data,userId)
        if(!findRequestAndUpdate){
            return ResponseHandler.notFound(res,"REQUEST_NOT_FOUND!")
        }
        else{
            return ResponseHandler.json(res,{
                MESSAGE:`CONNECTION REQUEST ${data.status} SENDED TO ${findRequestAndUpdate}`
            })
        }
    } catch (error) {
        return ResponseHandler.error(res,error);
    }
}