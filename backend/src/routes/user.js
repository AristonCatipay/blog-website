const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user");

// http://localhost:3000/api/users/register
router.post("/register", registerUser);

// http://localhost:3000/api/users/login
router.post("/login", loginUser);
module.exports = router;
