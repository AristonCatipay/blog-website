const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../controllers/post");

// http://localhost:3000/api/posts
router.post("/", createPost);
// http://localhost:3000/api/posts
router.get("/", getAllPosts);

module.exports = router;
