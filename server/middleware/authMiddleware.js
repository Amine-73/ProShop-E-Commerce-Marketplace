import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'; // 🚩 Make sure this says 'jwt'
import User from '../models/userModal.js';




export const protect = asyncHandler(async (req, res, next) => {
    let token=req.cookies.jwt;

    
    // 1. Check for token in Cookie OR in Authorization Header
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.userId || decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});