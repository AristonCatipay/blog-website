const Post = require("../models/post");

const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    const post = await Post.create({
      title,
      description,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
