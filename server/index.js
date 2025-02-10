import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./router/auth-router.js";
import workspaceRouter from "./router/workspace-router.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());



// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

// app.use(cors(corsOptions));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 



app.use("/api/auth", authRouter);
app.use("/api/workspace", workspaceRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT :  ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
