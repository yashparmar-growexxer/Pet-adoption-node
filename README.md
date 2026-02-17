# Pet Adoption Management System - Backend

A production-ready backend API for managing pet adoptions built with Node.js, Express, and MongoDB.

## Features

- JWT Authentication
- Role-based Authorization (User/Admin)
- RESTful API endpoints
- Input validation
- Error handling middleware
- Secure password hashing with bcrypt
- MongoDB with Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If using Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Seed Admin User

Create an admin user:

```bash
npm run seed
```

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin123`

### 5. Run the Server

Development mode (with nodemon):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Pets

- `GET /api/pets` - Get all pets (with search, filter, pagination)
  - Query params: `page`, `limit`, `search`, `species`, `breed`, `age`, `status`
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets` - Create pet (admin only)
- `PUT /api/pets/:id` - Update pet (admin only)
- `DELETE /api/pets/:id` - Delete pet (admin only)

### Adoptions

- `POST /api/adoptions` - Create adoption application (user only)
- `GET /api/adoptions/my` - Get user's applications (user only)
- `GET /api/adoptions` - Get all applications (admin only)
- `PUT /api/adoptions/:id` - Update adoption status (admin only)

## Project Structure

```
node/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── petController.js     # Pet CRUD operations
│   └── adoptionController.js # Adoption management
├── middleware/
│   ├── auth.js              # JWT & role-based auth
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User model
│   ├── Pet.js               # Pet model
│   └── Adoption.js          # Adoption model
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── petRoutes.js         # Pet routes
│   └── adoptionRoutes.js    # Adoption routes
├── utils/
│   ├── generateToken.js     # JWT token generation
│   └── seedAdmin.js         # Admin user seeder
├── server.js                # Express app entry point
├── .env.example             # Environment variables template
└── package.json
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- CORS configuration
- Environment variables for sensitive data

## License

ISC


rlwy_oaci_mMGWq3AVqwxpb7MojUU5fzmC
rlwy_oacs_97be9ff3ffedb9c6951de9c3f536c043c7ecc292



mongo
lfOKtZMJBahuuJTXRxwfakXrhCoblEjj


mongodb://mongo:lfOKtZMJBahuuJTXRxwfakXrhCoblEjj@mainline.proxy.rlwy.net:22890