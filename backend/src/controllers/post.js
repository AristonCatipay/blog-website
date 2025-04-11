const Post = require("../models/post");
const User = require("../models/user");

const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    const post = await Post.create({
      title,
      description,
      author: req.user.userId,
    });

    const user = await User.findById(req.user.userId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById({ _id: id }).populate(
      "author",
      "username"
    );

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
    const post = await Post.findById({ _id: id });

    if (!post) {
      return res.status(400).json({ error: "No post found!" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post." });
    }

    await Post.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "The post has been removed." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById({ _id: id });

    if (!post) {
      return res.status(404).json({ error: "No post found!" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post." });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate("author", "username");

    res.status(200).json({
      message: "The post has been updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId }).populate(
      "author",
      "username"
    );
    res.status(200).json(posts);
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
  getUserPosts,
};
