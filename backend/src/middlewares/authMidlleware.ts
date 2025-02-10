import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";


export interface CustomRequest extends Request {
  decoded?: { _id:  mongoose.Types.ObjectId; }; 
}

interface DecodedToken extends JwtPayload {
  _id: mongoose.Types.ObjectId;
}
 

export const authMiddleware = async(req:CustomRequest,res:Response,next:NextFunction) => {
  try {
    const {token} = req.cookies;
    if(!token){
      throw new Error("Not Authenticated");
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as DecodedToken;
    if(decoded && typeof decoded._id === "string"){
      req.decoded = { _id: decoded._id };
      next(); 
      }
      else{
        throw new Error("Not Authenticated User")
      }
  } catch (error) {
    if (error instanceof Error) {
      console.error("ERROR: "+error.message);
      res.json({msg:error.message})
    } else {
      console.error("An unknown error occurred");
    }
  }
}