import express from "express";
// import { authRouter } from "./authRouter";
import { profileRouter } from "./profileRouter"
import { connectionRouter } from "./connectionRouter";
import { userRouter } from "./userRouter";

export const mainRouter = express.Router();


// mainRouter.use("/auth",authRouter);
mainRouter.use("/profile",profileRouter);
mainRouter.use("/request",connectionRouter);
mainRouter.use("/user",userRouter);