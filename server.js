import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 Expense Tracker API running at: http://localhost:${PORT}`);
    console.log(`📚 Swagger UI documentation at: http://localhost:${PORT}/api-docs`);
    console.log(`=================================`);
});
