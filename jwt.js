const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        // verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the decoded object
        req.user = decoded;
        next();
    } catch {
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

// Function to generate jwt token
// const generateToken = (userData) => {
//     // Generate a new JWT token using user data
//     return jwt.sign(userData, process.env.JWT_SECRET);
// }

// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

// module.exports = jwtAuthMiddleware

module.exports = { jwtAuthMiddleware, generateToken };