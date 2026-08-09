# Expense Tracker API

A robust, production-ready RESTful backend API for managing personal expenses and tracking spending by category. Built with Node.js, Express, PostgreSQL, Prisma ORM, JWT authentication, and interactive Swagger UI documentation.

This project is built following the [roadmap.sh Expense Tracker API Project Spec](https://roadmap.sh/projects/expense-tracker-api).

---

## 🚀 Features

- **🔐 User Authentication**: Secure user registration and login with password hashing via `bcryptjs` and JSON Web Tokens (`jwt`).
- **💰 Expense Management**: Full CRUD capabilities for expense records (Create, Read, Update, Delete).
- **🏷️ Category Filtering**: Filter expenses by category using case-insensitive query parameters (`?category=Food`).
- **🛡️ Data Ownership & Protection**: Strict JWT authentication middleware ensuring users can only view, update, or delete their own expenses.
- **📚 Interactive API Documentation**: Embedded Swagger UI at `/api-docs` powered by OpenAPI 3.0 specifications.
- **⚡ Modern Tech Stack**: Built with ES Modules (`type: "module"`), Express 5, and Prisma 7 ORM with PostgreSQL.

---

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js v5](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma ORM v7](https://www.prisma.io/)
- **Authentication**: `jsonwebtoken` (JWT) & `bcryptjs`
- **Documentation**: `swagger-ui-express` & `swagger-jsdoc` (OpenAPI 3.0)
- **Environment**: `dotenv`

---

## 📁 Project Structure

```text
expense-tracker-api/
├── prisma/
│   ├── migrations/          # Database migration history
│   └── schema.prisma        # Prisma data models & relational schema
├── src/
│   ├── config/
│   │   ├── db.js            # Prisma client instance setup
│   │   └── swagger.js       # OpenAPI 3.0 / Swagger UI options & schemas
│   ├── controllers/
│   │   ├── authController.js    # Auth HTTP request handlers
│   │   └── expenseController.js # Expense HTTP request handlers
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication route definitions
│   │   └── expenseRoutes.js     # Expense route definitions
│   ├── services/
│   │   ├── authService.js       # Auth business logic & database queries
│   │   └── expenseService.js    # Expense business logic & database queries
│   ├── utils/
│   │   └── validator.js         # Input validation helpers
│   └── app.js               # Express application initialization & middleware
├── server.js                # Server entrypoint & HTTP listener
├── .env.example             # Template for required environment variables
├── package.json             # NPM dependencies & scripts
└── README.md                # Project documentation
```

---

## 🗄️ Database Schema

### `users` Table

| Field | Type | Attributes | Description |
| --- | --- | --- | --- |
| `id` | `Int` | `@id @default(autoincrement())` | Primary key |
| `name` | `VarChar(100)` | Required | User's full name |
| `email` | `VarChar(255)` | `@unique` | Unique user email address |
| `password` | `VarChar(255)` | Required | Bcrypt hashed password |
| `createdAt` | `DateTime` | `@default(now())` | Account creation timestamp |

### `expenses` Table

| Field | Type | Attributes | Description |
| --- | --- | --- | --- |
| `id` | `Int` | `@id @default(autoincrement())` | Primary key |
| `userId` | `Int` | Foreign Key -> `users.id` | Owner user ID (Cascades on delete) |
| `title` | `VarChar(150)` | Required | Expense title/description |
| `amount` | `Decimal(10,2)` | Required | Financial amount |
| `category` | `VarChar(50)` | Required | Category name (e.g., Food, Utilities) |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp |
| `updatedAt` | `DateTime` | `@updatedAt` | Last update timestamp |

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database server running locally or hosted remotely.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/dat-nnguyen/expense-tracker-api.git
cd expense-tracker-api
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your database credentials and secret key in `.env`:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/expense_db?schema=public"
JWT_SECRET="your_secure_jwt_secret_key_here"
PORT=5000
```

### 3. Run Database Migrations

Apply Prisma schema migrations to set up the PostgreSQL database tables:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 4. Start the Server

Development command (with hot-reloading via nodemon):

```bash
npm run dev
```

Production start command:

```bash
npm start
```

You should see confirmation output:

```text
=================================
🚀 Expense Tracker API running at: http://localhost:3000
📚 Swagger UI documentation at: http://localhost:3000/api-docs
=================================
```

---

## 📖 API Endpoints Summary

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & retrieve JWT token |

### Expense Routes (`/api/expenses`) — Requires `Authorization: Bearer <token>`

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/expenses` | Private | Create a new expense record |
| `GET` | `/api/expenses` | Private | List all expenses for user (supports `?category=Food`) |
| `GET` | `/api/expenses/:id` | Private | Get details of a specific expense by ID |
| `PUT` | `/api/expenses/:id` | Private | Update an expense record by ID |
| `DELETE` | `/api/expenses/:id` | Private | Delete an expense record by ID |

---

## 🧪 Interactive API Documentation & Testing

This project includes integrated **Swagger UI** for testing endpoints directly in your browser.

- **Swagger UI Interface**: `http://localhost:5000/api-docs`
- **Raw OpenAPI Spec**: `http://localhost:5000/api-docs.json`

### Testing Protected Routes in Swagger UI

1. Call `POST /api/auth/login` in Swagger UI with your user credentials.
2. Copy the returned `token` string from the JSON response.
3. Click the **Authorize** button at the top right of the Swagger UI interface.
4. Paste the token into the Value field and click **Authorize**.
5. You can now execute requests against all `/api/expenses` endpoints directly!

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
