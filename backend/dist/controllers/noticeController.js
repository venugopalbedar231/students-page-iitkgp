"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotices = getNotices;
exports.getNoticeById = getNoticeById;
exports.createNotice = createNotice;
exports.updateNotice = updateNotice;
exports.deleteNotice = deleteNotice;
const db_1 = require("../config/db");
async function getNotices(req, res, next) {
    try {
        const { category } = req.query;
        const where = category && typeof category === 'string' && category !== 'All'
            ? { category }
            : {};
        const notices = await db_1.prisma.notice.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({
            success: true,
            count: notices.length,
            data: notices,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getNoticeById(req, res, next) {
    try {
        const idStr = String(req.params.id);
        const noticeId = parseInt(idStr, 10);
        if (isNaN(noticeId)) {
            res.status(400).json({ success: false, message: 'Invalid notice ID' });
            return;
        }
        const notice = await db_1.prisma.notice.findUnique({
            where: { id: noticeId },
        });
        if (!notice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: notice,
        });
    }
    catch (error) {
        next(error);
    }
}
async function createNotice(req, res, next) {
    try {
        const { title, date, iso, desc, img, alt, account, category } = req.body;
        if (!title || !desc) {
            res.status(400).json({ success: false, message: 'Title and description are required' });
            return;
        }
        const newNotice = await db_1.prisma.notice.create({
            data: {
                title,
                date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                iso: iso || new Date().toISOString().split('T')[0],
                desc,
                img: img || '/news/nasha-mukt-bharat.jpg',
                alt: alt || title,
                account: account || 'inst',
                category: category || 'General',
            },
        });
        res.status(201).json({
            success: true,
            message: 'Notice created successfully',
            data: newNotice,
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateNotice(req, res, next) {
    try {
        const idStr = String(req.params.id);
        const noticeId = parseInt(idStr, 10);
        if (isNaN(noticeId)) {
            res.status(400).json({ success: false, message: 'Invalid notice ID' });
            return;
        }
        const existingNotice = await db_1.prisma.notice.findUnique({
            where: { id: noticeId },
        });
        if (!existingNotice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        const { title, date, iso, desc, img, alt, account, category } = req.body;
        const updatedNotice = await db_1.prisma.notice.update({
            where: { id: noticeId },
            data: {
                ...(title && { title }),
                ...(date && { date }),
                ...(iso && { iso }),
                ...(desc && { desc }),
                ...(img && { img }),
                ...(alt && { alt }),
                ...(account && { account }),
                ...(category && { category }),
            },
        });
        res.status(200).json({
            success: true,
            message: 'Notice updated successfully',
            data: updatedNotice,
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteNotice(req, res, next) {
    try {
        const idStr = String(req.params.id);
        const noticeId = parseInt(idStr, 10);
        if (isNaN(noticeId)) {
            res.status(400).json({ success: false, message: 'Invalid notice ID' });
            return;
        }
        const existingNotice = await db_1.prisma.notice.findUnique({
            where: { id: noticeId },
        });
        if (!existingNotice) {
            res.status(404).json({ success: false, message: 'Notice not found' });
            return;
        }
        await db_1.prisma.notice.delete({
            where: { id: noticeId },
        });
        res.status(200).json({
            success: true,
            message: 'Notice deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
}
