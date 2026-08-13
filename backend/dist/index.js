"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const noticeRoutes_1 = __importDefault(require("./routes/noticeRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// FRONTEND_URL — set this on Render to your Vercel URL.
// Falls back to CORS_ORIGIN (legacy) then localhost for local dev.
// Comma-separated list supported: "https://a.vercel.app,http://localhost:3000"
const allowedOrigins = (process.env.FRONTEND_URL ||
    process.env.CORS_ORIGIN ||
    'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, curl, Render health-checks)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
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
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(rateLimiter_1.apiLimiter);
// Health check
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'IIT Kharagpur Student Portal Backend is running',
        environment: process.env.NODE_ENV || 'development',
    });
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/notices', noticeRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
// Error Handler
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Backend Server running on port ${PORT}`);
    console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Allowed origins : ${allowedOrigins.join(', ')}`);
    console.log(`==================================================\n`);
});
