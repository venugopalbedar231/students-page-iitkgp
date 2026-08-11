"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = sendOtpEmail;
async function sendOtpEmail(email, otp) {
    console.log('\n==================================================');
    console.log(`[EMAIL OTP SERVICE]`);
    console.log(`To: ${email}`);
    console.log(`Subject: Your Admin Verification OTP Code`);
    console.log(`OTP Code: >>> ${otp} <<<`);
    console.log(`This code is valid for 10 minutes.`);
    console.log('==================================================\n');
}
