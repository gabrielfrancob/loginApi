const express = require("express");
const getUserById = require("../controllers/UserController");
const checkToken = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/:id", checkToken, getUserById);

module.exports = router;
