require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Load models
require("./src/models/user");
require("./src/models/post");

// Routes
app.use("/api/posts", require("./src/routes/post"));
app.use("/api/users", require("./src/routes/user"));

// Connect to the MongoDB Cluster
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "blog_db",
    });
    console.info("Connected to the MongoDB Atlas.");

    app.listen(process.env.PORT, () => {
      console.info(`Listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(
      `Error connecting to the MongoDB or starting server: ${error.message}`
    );
  }
}

startServer();
