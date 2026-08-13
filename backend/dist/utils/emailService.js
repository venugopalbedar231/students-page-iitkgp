"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = sendOtpEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendOtpEmail(email, otp) {
    // Print OTP to server terminal logs for dev / debugging mode
    console.log('\n==================================================');
    console.log(`[EMAIL OTP SERVICE]`);
    console.log(`To: ${email}`);
    console.log(`Subject: Your Admin Verification OTP Code`);
    console.log(`OTP Code: >>> ${otp} <<<`);
    console.log(`This code is valid for 10 minutes.`);
    console.log('==================================================\n');
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    // If SMTP configuration is provided in env, dispatch email via Nodemailer
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: SMTP_HOST,
                port: Number(SMTP_PORT) || 587,
                secure: Number(SMTP_PORT) === 465,
                auth: {
                    user: SMTP_USER,
                    pass: SMTP_PASS,
                },
            });
            const mailOptions = {
                from: SMTP_FROM || `"IIT Kharagpur Portal" <${SMTP_USER}>`,
                to: email,
                subject: `${otp} is your IIT KGP Portal Verification Code`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">IIT Kharagpur Student Portal</h2>
              <p style="margin: 4px 0 0 0; color: #ff7f00; font-weight: bold;">Admin Verification</p>
            </div>
            <div style="padding: 32px; background-color: #ffffff;">
              <p style="font-size: 16px; color: #333333;">Hello,</p>
              <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                You requested a One-Time Password (OTP) to log into the IIT Kharagpur Admin Portal.
              </p>
              <div style="margin: 32px 0; text-align: center;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #0f172a; background: #f1f5f9; padding: 12px 24px; border-radius: 6px; border: 1px dashed #cbd5e1; display: inline-block;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 14px; color: #666666;">
                This code is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.
              </p>
              <p style="font-size: 14px; color: #666666; margin-top: 24px;">
                If you did not request this OTP, please ignore this email.
              </p>
            </div>
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
              &copy; ${new Date().getFullYear()} IIT Kharagpur. All rights reserved.
            </div>
          </div>
        `,
            };
            await transporter.sendMail(mailOptions);
            console.log(`[EMAIL OTP SERVICE] Successfully sent email to ${email} via SMTP.`);
        }
        catch (error) {
            console.error(`[EMAIL OTP SERVICE] Failed to send email via SMTP:`, error);
        }
    }
}
