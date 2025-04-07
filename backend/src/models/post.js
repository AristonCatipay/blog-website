const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const db = mongoose.connection.useDb("blog_db");
const Post = db.model("Post", postSchema);

module.exports = Post;
