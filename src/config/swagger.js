import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'A RESTful API for managing personal expenses, categories, and authentication built with Express and Prisma.',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT access token in the format: Bearer <token>',
                },
            },
            schemas: {
                RegisterInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'johndoe@example.com',
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'securepassword123',
                        },
                    },
                },
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'johndoe@example.com',
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'securepassword123',
                        },
                    },
                },
                ExpenseInput: {
                    type: 'object',
                    required: ['title', 'amount', 'category'],
                    properties: {
                        title: {
                            type: 'string',
                            example: 'Grocery Shopping',
                        },
                        amount: {
                            type: 'number',
                            format: 'float',
                            example: 45.50,
                        },
                        category: {
                            type: 'string',
                            example: 'Food',
                        },
                    },
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'johndoe@example.com' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                ExpenseResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        userId: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Grocery Shopping' },
                        amount: { type: 'string', example: '45.50' },
                        category: { type: 'string', example: 'Food' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'An error occurred.' },
                        error: { type: 'string', example: 'Detailed error trace if applicable.' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
