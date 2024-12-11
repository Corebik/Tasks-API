import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';

//* Routes
import { authRoutes, projectRoutes, taskRoutes } from './routes';

//? Swagger
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggertUiOptions } from './config/swagger';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS
app.use(cors(corsConfig));

// Logging
app.use(morgan('dev'));

// To Read Request Body
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', taskRoutes);

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggertUiOptions));

export default app;
