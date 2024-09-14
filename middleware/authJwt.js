require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

// Middleware function to authenticate the JWT token
const authenticateToken = async (req, res, next) => {
  let token = req.header("Authorization");
  // If no token is provided, send a 401 Unauthorized response
  if (!token)
    return res.status(401).send({ message: "Authentication Failed!" });

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return res
        .status(403)
        .send({ message: "Token is not valid! Please Login again!" });
    // If the token is valid, attach the decoded user information to the request object
    req.user = user;
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
