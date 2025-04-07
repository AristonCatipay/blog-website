require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/posts", require("./src/routes/post"));

// Connect to the MongoDB Cluster
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
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
