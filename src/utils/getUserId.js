const jwt = require("jsonwebtoken");

exports.getUserId = (authHeader) => {
  if (!authHeader) {
    throw new Error("No valid token");
  }
  const parts = authHeader.split(" "); // remove BEARER

  if (!Array.isArray(parts) || parts.length < 2) {
    throw new Error("No valid token");
  }

  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};
