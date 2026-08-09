import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate JWT token from Authorization header.
 *
 * @param {import('express').Request} req - Express request object containing `authorization` header.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * @returns {Promise<import('express').Response>} HTTP response with unauthorized error (401) if token is invalid or missing.
 */
export async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized.'});
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized.'});
    }
};