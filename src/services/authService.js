import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Registers a new user with a hashed password.
 *
 * @param {Object} params - User registration details.
 * @param {string} params.name - The full name of the user.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's plain text password.
 * @returns {Promise<Object>} The created user object (id, name, email, createdAt).
 * @throws {Error} If the email already exists.
 */
export async function registerUser({ name, email, password }) {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (existingUser) {
        throw new Error('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name, 
            email: normalizedEmail,
            password: hashedPassword,
        }, 

        select: { 
            id: true, 
            name: true, 
            email: true,
            createdAt: true,
        }, 
    });
    
    return user;
}

/**
 * Authenticates a user and generates a JWT token.
 *
 * @param {Object} params - User login credentials.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's plain text password.
 * @returns {Promise<Object>} User details (id, name, email) along with the JWT access token.
 * @throws {Error} If the user is not found or password invalid.
 */
export async function loginUser({ email, password }) {
    const normalizedEmail = email.toLowerCase().trim();
    
    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (!existingUser) {
        throw new Error('Invalid email or password');
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password);

    if (!comparePassword) {
        throw new Error(' Invalid email or password');
    }

    const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        token,
    }
}
