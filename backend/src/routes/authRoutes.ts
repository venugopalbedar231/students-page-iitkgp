import { Router } from 'express';
import { login, logout, sendOtp, verifyOtp } from '../controllers/authController';
import { apiLimiter, otpLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', apiLimiter, login);
router.post('/send-otp', otpLimiter, sendOtp);
router.post('/verify-otp', apiLimiter, verifyOtp);
router.post('/logout', logout);

export default router;
