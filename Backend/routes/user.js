const { registerUser, loginUser } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

//Route to Login
router.post("/login", loginUser);

//Route to Signup
router.post("/signup", registerUser);

module.exports = router;
