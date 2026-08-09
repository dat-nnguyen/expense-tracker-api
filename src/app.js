import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI & raw OpenAPI spec endpoints
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Root route redirect/health info
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Expense Tracker API',
        documentation: '/api-docs',
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error.',
    });
});

export default app;
