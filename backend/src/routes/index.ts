import express from "express";
import { authRouter } from "./authRouter";
import { profileRouter } from "./profileRouter"

export const mainRouter = express.Router();


mainRouter.use("/auth",authRouter);
mainRouter.use("/profile",profileRouter);