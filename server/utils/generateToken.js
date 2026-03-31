// backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  // 1. Just sign and return the string
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // 🚩 Change '30s' to '30d' (30 seconds is too short!)
  });
};

export default generateToken;