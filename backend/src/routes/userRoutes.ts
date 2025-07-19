import express from "express"
import { authMiddleware } from "../middlewares/authMidlleware";
import { getConnections, getCurrentUser, getFeed, getRecievedRequests, update } from "../controllers/userController";

export const userRouter = express.Router();



userRouter.get("/feed", authMiddleware, getFeed);
userRouter.get("/connections", authMiddleware, getConnections);
userRouter.get("/requests-recieved", authMiddleware, getRecievedRequests);
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.post("/update", authMiddleware, update);



