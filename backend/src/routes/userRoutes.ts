import express from "express";
import { create } from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/create", create);