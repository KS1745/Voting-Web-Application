const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
  //Extract the JWT token from the request header

  const token = req.headers.authorization.split(" ")[1]; // Split on a space

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate JWT token
const generateToken = (userData) => {
  //Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
