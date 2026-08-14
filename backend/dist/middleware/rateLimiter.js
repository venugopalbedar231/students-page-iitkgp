"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.otpLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.otpLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP/Email to 5 OTP requests per 10 minutes
    message: {
        success: false,
        message: 'Too many OTP requests. Please try again after 10 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
});
