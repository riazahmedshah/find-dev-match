import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import { signinSchema, userSchema } from "../schemas/userSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { createUser, findUserByEmail } from "../repositories/UserRepository";

export const create = async (req:Request, res:Response) => {
  const body = req.body;
  const {success, data, error} = await userSchema.safeParseAsync(body);
  if(!success){
    return ResponseHandler.zodError(res, error.errors);
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await createUser({...data, password:hashedPassword});
    return ResponseHandler.created(res, {
      SUCCESS:true,
      MESSAGE:"USER_CREATED_SUCCESSFULLY"
    });
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}

export const login = async (req:Request, res:Response) => {
  const body = req.body;
  const {success, data, error} = signinSchema.safeParse(body);
  if(!success){
    return ResponseHandler.zodError(res, error.errors);
  }
  try {
    const user = await findUserByEmail(data.email);
    if(!user) return ResponseHandler.notFound(res, "USER_NOT_FOUND");
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if(isPasswordMatch){
      const token = jwt.sign(user,"secret",{expiresIn:"1hr"});
      return ResponseHandler.json(res,{token})
    } else{
      return ResponseHandler.json(res,{
        SUCCESS:false,
        MESSAGE:"INCORRECT_CREDENTIALS"
      })
    }
  } catch (error) {
    return ResponseHandler.error(res, error);
  }
}