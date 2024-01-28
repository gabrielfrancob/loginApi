import express from "express";
import AuthController from "../controllers/AuthController";

// const express = require("express");
// const { loginUser, registerUser } = require("../controllers/AuthController");

export const authRoutes = express.Router();

authRoutes.post("/register", AuthController.registerUser);
authRoutes.post("/login", AuthController.loginUser);

