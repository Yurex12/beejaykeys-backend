import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import cookieParser from 'cookie-parser';

dotenv.config();

import { connectDB } from './config/db';

import { errorHandler, notFound } from './middlewares/errorHandler';
import faqRoutes from './routes/faqRoutes';
import linkRoutes from './routes/linkRoutes';
import messageRoutes from './routes/messageRoutes';
import projectRoutes from './routes/projectRoutes';
import serviceRoutes from './routes/serviceRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import userRoutes from './routes/userRoutes';
import viewsRoutes from './routes/viewsRoutes';

const storage = multer.memoryStorage();
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb: any) => {
    console.log(req.file);
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const PORT = process.env.PORT || 9000;
const app = express();
// cors
app.use(
  cors({
    origin: process.env.WEBSITE_URI,
    credentials: true,
  })
);

app.use(express.json());
app.use(upload.single('image'));
app.use(cookieParser());

// Routes middleware
app.use('/api/users', userRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/stats', viewsRoutes);
app.use(notFound);
app.use(errorHandler);

// connect to the database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
