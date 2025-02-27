import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import faqRoutes from './routes/faqRoutes';
import linkRoutes from './routes/linkRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import serviceRoutes from './routes/serviceRoutes';
import messageRoutes from './routes/messageRoutes';
import projectRoutes from './routes/projectRoutes';
import errorHandler from './middlewares/errorHandler';

const PORT = process.env.PORT || 9000;
const app = express();
app.use(express.json());

// cors
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Routes middleware
app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
app.use(errorHandler);

// connect to the database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
