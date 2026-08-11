"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumericOtp = generateNumericOtp;
exports.hashOtp = hashOtp;
exports.verifyOtpHash = verifyOtpHash;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
function generateNumericOtp(length = 6) {
    const digits = '0123456789';
    let otp = '';
    const randomBytes = crypto_1.default.randomBytes(length);
    for (let i = 0; i < length; i++) {
        otp += digits[randomBytes[i] % digits.length];
    }
    return otp;
}
async function hashOtp(otp) {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(otp, salt);
}
async function verifyOtpHash(otp, hash) {
    return bcryptjs_1.default.compare(otp, hash);
}
