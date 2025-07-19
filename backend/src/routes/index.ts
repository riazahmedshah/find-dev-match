import express from "express";

import { authRouter } from "./authRoutes";
import { userRouter } from "./userRoutes";
import { connectionRouter } from "./connectionRoutes";

export const mainRouter = express.Router();

mainRouter.use("/auth",authRouter);
mainRouter.use("/user",userRouter);
mainRouter.use("/request",connectionRouter);