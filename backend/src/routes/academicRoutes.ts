import { Router } from 'express';
import {
  getAcademicResources,
  getAcademicResourceById,
  createAcademicResource,
  updateAcademicResource,
  deleteAcademicResource,
} from '../controllers/academicController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAcademicResources);
router.get('/:id', getAcademicResourceById);

// Protected routes (Admin only)
router.post('/', authMiddleware, createAcademicResource);
router.put('/:id', authMiddleware, updateAcademicResource);
router.delete('/:id', authMiddleware, deleteAcademicResource);

export default router;