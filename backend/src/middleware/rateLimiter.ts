import rateLimit from 'express-rate-limit';

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP/Email to 5 OTP requests per 10 minutes
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again after 10 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
