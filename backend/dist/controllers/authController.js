"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const jwt_1 = require("../utils/jwt");
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
