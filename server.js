import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { initializeSocket } from './config/socket.js';
import authRoutes from './routes/authRoutes.js';
import petRoutes from './routes/petRoutes.js';
import adoptionRoutes from './routes/adoptionRoutes.js';
import speciesRoutes from './routes/speciesRoutes.js';

dotenv.config();

connectDB();

const app = express();
const server = createServer(app);

// Initialize Socket.io
initializeSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/species', speciesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pet Adoption Management API' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

