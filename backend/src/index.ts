import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import noticeRoutes from './routes/noticeRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse comma-separated allowed origins for CORS
// e.g. CORS_ORIGIN="https://your-app.vercel.app,http://localhost:3000"
const allowedOrigins: string[] = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Trust the first proxy (Render / Vercel edge) so rate-limiter & req.ip work correctly
app.set('trust proxy', 1);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, health-checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some((allowed) => origin === allowed || origin.endsWith(allowed.replace(/^https?:\/\//, '.')))) {
      return callback(null, true);
    }
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLimiter);

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'IIT Kharagpur Student Portal Backend is running',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Allowed origins: ${allowedOrigins.join(', ')}`);
  console.log(`==================================================\n`);
});

