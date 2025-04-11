const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.substring(7);

  try {
    console.log("Token recieved:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({ error: "Access denied. Invalid token." });
  }
};

module.exports = { authMiddleware };
