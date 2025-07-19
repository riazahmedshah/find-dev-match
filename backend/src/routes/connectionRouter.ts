import express from "express";
import { authMiddleware } from "../middlewares/authMidlleware";
import { reviewConnectionRequest, sendConnectionRequest } from "../controllers/connectionController";

export const connectionRouter = express.Router();


connectionRouter.post("/send/:status/:toUserId", authMiddleware, sendConnectionRequest);

connectionRouter.patch("/review/:status/:requestId", authMiddleware, reviewConnectionRequest)