const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  getUserPosts,
} = require("../controllers/post");
const { authMiddleware } = require("../middleware/authMiddleware");

// http://localhost:3000/api/posts
router.post("/", authMiddleware, createPost);
// http://localhost:3000/api/posts
router.get("/", authMiddleware, getAllPosts);
// http://localhost:3000/api/posts/:id
router.get("/:id", authMiddleware, getPost);
// http://localhost:3000/api/posts/:id
router.delete("/:id", authMiddleware, deletePost);
// http://localhost:3000/api/posts/:id
router.put("/:id", authMiddleware, updatePost);
// http://localhost:3000/api/posts/user/me
router.get("/user/me", authMiddleware, getUserPosts);

module.exports = router;
