const jwt = require("jsonwebtoken");



const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  
    // Set JWT as an HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: false,
      secure: false,
      // sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  };

module.exports = generateToken;
