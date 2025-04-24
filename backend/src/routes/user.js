const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
} = require("../controllers/user");
const { authMiddleware } = require("../middleware/authMiddleware");

// http://localhost:3000/api/users/register
router.post("/register", registerUser);

// http://localhost:3000/api/users/login
router.post("/login", loginUser);

// http://localhost:3000/api/users/me
router.get("/me", authMiddleware, getCurrentUser);

// http://localhost:3000/api/users/change-password
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
