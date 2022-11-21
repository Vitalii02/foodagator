const jwt = require("jsonwebtoken");

exports.sessionChecker = (req, res, next) => {
  if (!req || req.authorization || !req.headers.authorization) {
    return res.status(403).json({ error: "The validation is failed" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  if (!token || !verify) {
    return res.status(403).json({ error: "Your token is invalid" });
  }
  next();
};
