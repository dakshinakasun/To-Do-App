const express = require("express");
const AuthController = require("../controllers/authController");
const router = express.Router();

// Define a POST route for user registration and login
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
