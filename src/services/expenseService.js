import prisma from '../config/db.js';

/**
 * Creates a new expense record for a user.
 *
 * @param {Object} params - Expense payload.
 * @param {number} params.userId - ID of the user creating the expense.
 * @param {string} params.title - Title or description of the expense.
 * @param {number|string} params.amount - Expense amount.
 * @param {string} params.category - Expense category.
 * @returns {Promise<Object>} Created expense record.
 */
export async function createExpense({ userId, title, amount, category }) {
    return await prisma.expense.create({
        data: {
            userId: Number(userId),
            title,
            amount,
            category,
        },
    });
}

/**
 * Retrieves all expenses belonging to a specific user, with optional category filtering.
 *
 * @param {Object} params - Query parameters.
 * @param {number} params.userId - ID of the user.
 * @param {string} [params.category] - Optional category filter.
 * @returns {Promise<Array<Object>>} Array of user expense records sorted by creation date (descending).
 */
export async function getAllExpenses({ userId, category }) {
    return await prisma.expense.findMany({
        where: {
            userId: Number(userId),
            ...(category && { category: { equals: category, mode: 'insensitive' } }),
        },
        orderBy: { createdAt: 'desc' },
    });
}

/**
 * Retrieves a single expense by ID for a specific user.
 *
 * @param {Object} params - Parameters object.
 * @param {number} params.userId - ID of the owning user.
 * @param {number} params.id - ID of the target expense.
 * @returns {Promise<Object|null>} Expense record if found, or null if not found.
 */
export async function getExpenseById({ userId, id }) {
    return await prisma.expense.findFirst({
        where: {
            id: Number(id),
            userId: Number(userId),
        },
    });
}

/**
 * Updates an existing expense record while verifying user ownership.
 *
 * @param {Object} params - Parameters object.
 * @param {number} params.userId - ID of the owning user.
 * @param {number} params.id - ID of the expense to update.
 * @param {string} [params.title] - Updated title.
 * @param {number|string} [params.amount] - Updated amount.
 * @param {string} [params.category] - Updated category.
 * @returns {Promise<Object|null>} Updated expense record or null if not found/unauthorized.
 */
export async function updateExpense({ userId, id, title, amount, category }) {
    const existingExpense = await getExpenseById({ userId, id });
    if (!existingExpense) {
        return null;
    }

    return await prisma.expense.update({
        where: { id: Number(id) },
        data: {
            ...(title !== undefined && { title }),
            ...(amount !== undefined && { amount }),
            ...(category !== undefined && { category }),
        },
    });
}

/**
 * Deletes an expense record by ID while verifying user ownership.
 *
 * @param {Object} params - Parameters object.
 * @param {number} params.userId - ID of the owning user.
 * @param {number} params.id - ID of the expense to delete.
 * @returns {Promise<Object|null>} Deleted expense record or null if not found/unauthorized.
 */
export async function deleteExpense({ userId, id }) {
    const existingExpense = await getExpenseById({ userId, id });
    if (!existingExpense) {
        return null;
    }

    return await prisma.expense.delete({
        where: { id: Number(id) },
    });
}