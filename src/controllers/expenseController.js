import * as expenseService from '../services/expenseService.js';

/**
 * Controller to create a new expense for the authenticated user.
 *
 * @param {import('express').Request} req - Express request object containing `req.user.userId` and `title`, `amount`, `category` in `req.body`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with created expense (201), missing fields error (400), or server error (500).
 */
export async function createExpense(req, res) {
    try {
        const userId = req.user.userId; // Extracted from JWT by authMiddleware
        const { title, amount, category } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: 'Title, amount, and category are required.' });
        }

        const expense = await expenseService.createExpense({ userId, title, amount, category });
        return res.status(201).json({ message: 'Expense created successfully.', data: expense });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create expense.', error: error.message });
    }
}

/**
 * Controller to fetch all expenses for the authenticated user, with optional category filtering.
 *
 * @param {import('express').Request} req - Express request object containing `req.user.userId` and optional `category` in `req.query`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with list of expenses (200) or server error (500).
 */
export async function getAllExpenses(req, res) {
    try {
        const userId = req.user.userId; // Extracted from JWT by authMiddleware
        const { category } = req.query;
        
        const expenses = await expenseService.getAllExpenses({ userId, category });
        return res.status(200).json({ message: 'Expenses fetched successfully.', data: expenses });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch expenses.', error: error.message });
    }
}

/**
 * Controller to fetch a specific expense by ID for the authenticated user.
 *
 * @param {import('express').Request} req - Express request object containing `req.user.userId` and `req.params.id`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with expense details (200), not found error (404), or server error (500).
 */
export async function getExpenseById(req, res) {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;
        
        const expense = await expenseService.getExpenseById({ userId, id: expenseId });
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        
        return res.status(200).json({ message: 'Expense fetched successfully.', data: expense });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch expense.', error: error.message });
    }
}

/**
 * Controller to update an existing expense for the authenticated user.
 *
 * @param {import('express').Request} req - Express request object containing `req.user.userId`, `req.params.id`, and updated fields in `req.body`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with updated expense (200), not found/unauthorized error (404), or server error (500).
 */
export async function updateExpense(req, res) {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;
        const { title, amount, category } = req.body;
        
        const updatedExpense = await expenseService.updateExpense({ userId, id: expenseId, title, amount, category });
        
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized to update.' });
        }
        
        return res.status(200).json({ message: 'Expense updated successfully.', data: updatedExpense });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update expense.', error: error.message });
    }
}

/**
 * Controller to delete an expense by ID for the authenticated user.
 *
 * @param {import('express').Request} req - Express request object containing `req.user.userId` and `req.params.id`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} HTTP response with deleted expense data (200), not found/unauthorized error (404), or server error (500).
 */
export async function deleteExpense(req, res) {
    try {
        const userId = req.user.userId;
        const expenseId = req.params.id;
        
        const deletedExpense = await expenseService.deleteExpense({ userId, id: expenseId });
        
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized to delete.' });
        }
        
        return res.status(200).json({ message: 'Expense deleted successfully.', data: deletedExpense });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete expense.', error: error.message });
    }
}