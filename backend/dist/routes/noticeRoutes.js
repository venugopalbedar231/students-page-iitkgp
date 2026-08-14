"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticeController_1 = require("../controllers/noticeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/', noticeController_1.getNotices);
router.get('/:id', noticeController_1.getNoticeById);
// Protected routes (Admin only)
router.post('/', authMiddleware_1.authMiddleware, noticeController_1.createNotice);
router.put('/:id', authMiddleware_1.authMiddleware, noticeController_1.updateNotice);
router.delete('/:id', authMiddleware_1.authMiddleware, noticeController_1.deleteNotice);
exports.default = router;
