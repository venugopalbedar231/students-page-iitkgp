import { Router } from 'express';
import { getNotices, getNoticeById, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getNotices);
router.get('/:id', getNoticeById);

// Protected routes (Admin only)
router.post('/', authMiddleware, createNotice);
router.put('/:id', authMiddleware, updateNotice);
router.delete('/:id', authMiddleware, deleteNotice);

export default router;
