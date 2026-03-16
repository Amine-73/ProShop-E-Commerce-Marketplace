import asyncHandler from 'express-async-handler';




export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check for token in Cookie OR in Authorization Header
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        try {
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 2. Use .findById(decoded.userId) or (decoded.id) 
            // depending on how you signed the token originally
            // req.user = await User.findById(decoded.userId || decoded.id).select('-password');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded);
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