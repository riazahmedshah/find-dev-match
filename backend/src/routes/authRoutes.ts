import express from "express";
import { create, login } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/create", create);
authRouter.post("/login", login);