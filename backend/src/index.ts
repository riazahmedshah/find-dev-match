import express from "express"
import {connectDB} from "./config/db"
const app = express();

const PORT = 1100;

connectDB().then(() => {
  console.log("DataBase connected successfully!")
  app.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!");
})

