import express from "express"

export const userRouter = express.Router();

userRouter.get("/connections", async(req, res) => {
  res.json({msg:"Hello world"})
});

userRouter.get("/requests/recieved", async(req, res) => {
  res.json({msg:"Hello world"})
});

