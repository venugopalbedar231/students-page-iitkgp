import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import upload from '../middleware/upload';
import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

const router = Router();

/**
 * POST /api/upload/image
 * Accepts a multipart/form-data field named "image".
 * Streams the buffer directly to Cloudinary (no temp files).
 * Returns the Cloudinary secure URL and public_id.
 */
router.post(
  '/image',
  authMiddleware,
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: 'No image file provided.' });
        return;
      }

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'notices',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error('Upload failed'));
            resolve(result);
          }
        );
        stream.end(req.file!.buffer);
      });

      res.status(200).json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (error: any) {
      // Pass multer/cloudinary errors through the error handler
      next(error);
    }
  }
);

export default router;
