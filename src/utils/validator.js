/**
 * Validates whether a given value is a valid email address format.
 *
 * @param {string} email - The email address string to validate.
 * @returns {boolean} `true` if the email string is valid, `false` otherwise.
 */
export function isValidEmail(email) {
    if (typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validates request payload fields for user registration.
 *
 * @param {Object} body - Request body containing user registration payload.
 * @param {string} [body.name] - User's name.
 * @param {string} [body.email] - User's email.
 * @param {string} [body.password] - User's password.
 * @returns {{ isValid: boolean, errors: Array<{ field: string, message: string }> }} Validation result object containing status boolean and array of field error objects.
 */
export function validateRegisterInput(body = {}) {
    const errors = [];

    if (typeof body?.name !== "string" || body.name.trim().length === 0)
        errors.push({ field: "name", message: "Name is required" });
    
    if (!isValidEmail(body?.email))
        errors.push({ field: "email", message: "Email is required" });
    
    if (typeof body?.password !== "string" || body.password.trim().length === 0)
        errors.push({ field: "password", message: "Password is required" });
    
    return { isValid: errors.length === 0, errors }; 
}

/**
 * Validates request payload fields for user login.
 *
 * @param {Object} body - Request body containing user login credentials.
 * @param {string} [body.email] - User's email.
 * @param {string} [body.password] - User's password.
 * @returns {{ isValid: boolean, errors: Array<{ field: string, message: string }> }} Validation result object containing status boolean and array of field error objects.
 */
export function validateLoginInput(body = {}) {
    const errors = [];

    if (!isValidEmail(body?.email))
        errors.push({ field: "email", message: "Email is required" });

    if (typeof body?.password !== "string" || body.password.trim().length === 0)
        errors.push({ field: "password", message: "Password is required" });

    return { isValid: errors.length === 0, errors }; 
}