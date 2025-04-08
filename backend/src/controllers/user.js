const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(409).json({ error: "Username already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ newUser });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({
      username: user.username,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
