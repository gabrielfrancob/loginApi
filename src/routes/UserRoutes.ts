import express from "express";
import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";


export const userRoutes = express.Router();

userRoutes.get("/:id", AuthMiddleware.checkToken, UserController.getUserById);

