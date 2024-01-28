// require("dotenv").config();
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { userRoutes } from "./routes/UserRoutes";
import { authRoutes } from "./routes/AuthRoutes";

dotenv.config();

const app = express();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

app.use(express.json());

app.get("/", (req: any, res: any) => res.json({ msg: "Hello World" }));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => {
    console.log(err);
  });

app.listen(3000);
