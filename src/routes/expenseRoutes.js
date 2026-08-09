import { Router } from 'express';
import * as expenseController from '../controllers/expenseController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

/**
 * Express router instance for expense management endpoints.
 * @type {import('express').Router}
 */
const router = Router();    

// Protect all expense routes with JWT authentication middleware
router.use(authenticateToken);

/**
 * @openapi
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseInput'
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/ExpenseResponse'
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Retrieve all expenses for the authenticated user
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter expenses by category (case-insensitive)
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expenses fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExpenseResponse'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.post("/", expenseController.createExpense);
router.get("/", expenseController.getAllExpenses);

/**
 * @openapi
 * /api/expenses/{id}:
 *   get:
 *     summary: Retrieve a single expense by ID
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the expense to retrieve
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense fetched successfully.
 *                 data:
 *                   $ref: '#/components/schemas/ExpenseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update an existing expense by ID
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Grocery Title
 *               amount:
 *                 type: number
 *                 example: 59.99
 *               category:
 *                 type: string
 *                 example: Food
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/ExpenseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found or unauthorized to update
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete an expense by ID
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully.
 *                 data:
 *                   $ref: '#/components/schemas/ExpenseResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found or unauthorized to delete
 *       500:
 *         description: Internal server error
 */
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

export default router;