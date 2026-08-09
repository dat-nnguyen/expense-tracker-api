import * as authService from '../services/authService.js';
import { validateRegisterInput, validateLoginInput } from '../utils/validator.js';

/**
 * Controller to handle user registration HTTP requests.
 *
 * @param {import('express').Request} req - Express request object containing `name`, `email`, and `password` in `req.body`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with success payload (201), validation errors (400), conflict error (409), or server error (500).
 */
export async function register(req, res) {
    try {
        const { isValid, errors } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid register inputs.', errors });
        } 
        const user = await authService.registerUser(req.body);
        return res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}   

/**
 * Controller to handle user authentication (login) HTTP requests.
 *
 * @param {import('express').Request} req - Express request object containing `email` and `password` in `req.body`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with user details and JWT token (200), validation errors (400), unauthorized error (401), or server error (500).
 */
export async function login(req, res) {
    try {
        const { isValid, errors } = validateLoginInput(req.body);

        if (!isValid) {
            return res.status(400).json({ message: 'Invalid login inputs.', errors });
        } 
        const result = await authService.loginUser(req.body);
        return res.status(200).json({ message: 'User logged in successfully.', data: result });
    } catch (error) {
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}