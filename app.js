require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes");

app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Hello World" }));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.i9kd6ei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
