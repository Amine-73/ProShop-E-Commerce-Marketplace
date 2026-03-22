// backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30s',
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 1000, // 30 days
  });
};

export default generateToken;