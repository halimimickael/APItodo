const {config} = require("../config/secret")
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};
