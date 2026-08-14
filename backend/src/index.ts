import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import noticeRoutes from './routes/noticeRoutes';
import uploadRoutes from './routes/uploadRoutes';
import academicRoutes from './routes/academicRoutes';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// FRONTEND_URL — set this on Render to your Vercel URL.
// Falls back to CORS_ORIGIN (legacy) then localhost for local dev.
// Comma-separated list supported: "https://a.vercel.app,http://localhost:3000"
const allowedOrigins: string[] = (
  process.env.FRONTEND_URL ||
  process.env.CORS_ORIGIN ||
  'http://localhost:3000'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Render health-checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin "${origin}" not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Trust the first proxy (Render / Vercel edge) so rate-limiter & req.ip work correctly
app.set('trust proxy', 1);

// Handle CORS preflight OPTIONS BEFORE the rate limiter — otherwise the
// rate limiter can reject the OPTIONS request and the browser reports it as a CORS error.
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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
app.use('/api/academic', academicRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Allowed origins : ${allowedOrigins.join(', ')}`);
  console.log(`==================================================\n`);
});
