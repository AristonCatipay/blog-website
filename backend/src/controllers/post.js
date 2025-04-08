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

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById({ _id: id });

    if (!post) {
      return res.status(404).json({ error: "No post found!" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete({ _id: id });

    if (!post) {
      return res.status(400).json({ error: "No post found!" });
    }

    res.status(200).json({ message: "The post has been removed." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: "No post found!" });
    }

    res.status(200).json({
      message: "The post has been updated successfully!",
      post,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
};
