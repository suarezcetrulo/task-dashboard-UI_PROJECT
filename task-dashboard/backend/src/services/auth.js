const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'your_secret_key';  // Choose a strong secret key.

// Generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
}

// Middleware to protect routes
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = { generateToken, authenticate };
