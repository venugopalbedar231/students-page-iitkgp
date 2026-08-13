"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.sendOtp = sendOtp;
exports.verifyOtp = verifyOtp;
exports.logout = logout;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const jwt_1 = require("../utils/jwt");
const otp_1 = require("../utils/otp");
const emailService_1 = require("../utils/emailService");
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }
        const cleanEmail = String(email).trim().toLowerCase();
        // Find admin by email
        const admin = await db_1.prisma.admin.findUnique({
            where: { email: cleanEmail },
        });
        if (!admin || !admin.passwordHash) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Compare password hash
        const isPasswordValid = await bcryptjs_1.default.compare(String(password), admin.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Generate JWT access token
        const accessToken = (0, jwt_1.generateAccessToken)({
            adminId: admin.id,
            email: admin.email,
        });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            accessToken,
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
async function sendOtp(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }
        const cleanEmail = String(email).trim().toLowerCase();
        const admin = await db_1.prisma.admin.findUnique({
            where: { email: cleanEmail },
        });
        if (!admin || !admin.passwordHash) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Verify password first (2-Factor Authentication)
        const isPasswordValid = await bcryptjs_1.default.compare(String(password), admin.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Generate 6-digit OTP code
        const otp = (0, otp_1.generateNumericOtp)(6);
        const hashedOtp = await (0, otp_1.hashOtp)(otp);
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes
        // Save hashed OTP & expiration to database
        await db_1.prisma.admin.update({
            where: { email: cleanEmail },
            data: {
                otpHash: hashedOtp,
                otpExpiresAt,
            },
        });
        // Send OTP via email (or console log in dev mode)
        await (0, emailService_1.sendOtpEmail)(cleanEmail, otp);
        res.status(200).json({
            success: true,
            message: 'OTP sent to your email address',
        });
    }
    catch (error) {
        next(error);
    }
}
async function verifyOtp(req, res, next) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({ success: false, message: 'Email and OTP code are required' });
            return;
        }
        const cleanEmail = String(email).trim().toLowerCase();
        const cleanOtp = String(otp).trim();
        const admin = await db_1.prisma.admin.findUnique({
            where: { email: cleanEmail },
        });
        if (!admin || !admin.otpHash || !admin.otpExpiresAt) {
            res.status(400).json({ success: false, message: 'No active OTP request found. Please request a new OTP.' });
            return;
        }
        // Check expiration
        if (new Date() > new Date(admin.otpExpiresAt)) {
            res.status(400).json({ success: false, message: 'OTP code has expired. Please request a new one.' });
            return;
        }
        // Compare OTP
        const isValid = await (0, otp_1.verifyOtpHash)(cleanOtp, admin.otpHash);
        if (!isValid) {
            res.status(401).json({ success: false, message: 'Invalid OTP code. Please try again.' });
            return;
        }
        // Clear OTP details upon successful verification to prevent replay attacks
        await db_1.prisma.admin.update({
            where: { email: cleanEmail },
            data: {
                otpHash: null,
                otpExpiresAt: null,
            },
        });
        // Generate JWT access token
        const accessToken = (0, jwt_1.generateAccessToken)({
            adminId: admin.id,
            email: admin.email,
        });
        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            accessToken,
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
async function logout(req, res, next) {
    try {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    }
    catch (error) {
        next(error);
    }
}
