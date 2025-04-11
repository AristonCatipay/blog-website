const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/user");
const { authMiddleware } = require("../middleware/authMiddleware");

// http://localhost:3000/api/users/register
router.post("/register", registerUser);

// http://localhost:3000/api/users/login
router.post("/login", loginUser);

// http://localhost:3000/api/users/me
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
