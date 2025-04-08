const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

// http://localhost:3000/api/posts
router.post("/", createPost);
// http://localhost:3000/api/posts
router.get("/", getAllPosts);
// http://localhost:3000/api/posts/:id
router.get("/:id", getPost);
// http://localhost:3000/api/posts/:id
router.delete("/:id", deletePost);
// http://localhost:3000/api/posts/:id
router.put("/:id", updatePost);
module.exports = router;
