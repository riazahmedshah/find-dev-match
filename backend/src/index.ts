import express from "express"
import { mainRouter } from "./routes/index";
import {connectDB} from "./config/db"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

const PORT = 1100;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use("/", mainRouter);

connectDB().then(() => {
  console.log("DataBase connected successfully!")
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!");
})

