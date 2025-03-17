import express from "express"
import { mainRouter } from "./routes/index";
import {connectDB} from "./config/db"
import cookieParser from "cookie-parser"
import cors from "cors"
import {createServer} from "http"
import { socket } from "./utils/socket";
const app = express();

const PORT = 1100;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options('*', cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/", mainRouter);

const server = createServer(app);

socket(server);


connectDB().then(() => {
  console.log("DataBase connected successfully!")
  server.listen(PORT,() => {
    console.log(`Serever is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.error("DataBase Connection Failed!",err);
});

