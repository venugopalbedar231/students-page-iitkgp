import { Router } from 'express';
import { login, logout } from '../controllers/authController';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', apiLimiter, login);
router.post('/logout', logout);

export default router;
