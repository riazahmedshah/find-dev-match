import express from "express"
import { mainRouter } from "./routes/index";
import {connectDB} from "./config/db"
import cookieParser from "cookie-parser"
const app = express();

const PORT = 1100;
app.use(express.json());
app.use(cookieParser())

app.use("/", mainRouter);

connectDB().then(() => {
  console.log("DataBase connected successfully!")
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!");
})

