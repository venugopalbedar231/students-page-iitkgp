import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db';
import { generateAccessToken } from '../utils/jwt';
import { generateNumericOtp, hashOtp, verifyOtpHash } from '../utils/otp';
import { sendOtpEmail } from '../utils/emailService';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    if (!admin || !admin.passwordHash) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Compare password hash
    const isPasswordValid = await bcrypt.compare(String(password), admin.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Generate JWT access token
    const accessToken = generateAccessToken({
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
  } catch (error) {
    next(error);
  }
}

// Emails exempt from OTP requirement (instant login for testing)
const NO_OTP_EMAILS = [
  'techteam.tsgiitkgp@gmail.com'
];

export async function sendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    if (!admin || !admin.passwordHash) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(String(password), admin.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    // Bypass OTP for tester accounts
    if (NO_OTP_EMAILS.includes(cleanEmail)) {
      const accessToken = generateAccessToken({
        adminId: admin.id,
        email: admin.email,
      });

      res.status(200).json({
        success: true,
        bypassOtp: true,
        accessToken,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
        message: 'Login successful (OTP bypassed for test account)',
      });
      return;
    }

    // Generate 6-digit OTP code
    const otp = generateNumericOtp(6);
    const hashedOtp = await hashOtp(otp);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    // Save hashed OTP & expiration to database
    await prisma.admin.update({
      where: { email: cleanEmail },
      data: {
        otpHash: hashedOtp,
        otpExpiresAt,
      },
    });

    // Send OTP via email (or console log in dev mode)
    try {
      await sendOtpEmail(cleanEmail, otp);
    } catch (err) {
      console.warn(`[OTP] Email send skipped or failed:`, err);
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email address',
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ success: false, message: 'Email and OTP code are required' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    const admin = await prisma.admin.findUnique({
      where: { email: cleanEmail },
    });

    if (!admin) {
      res.status(401).json({ success: false, message: 'Admin not found' });
      return;
    }

    // Bypass check for testing accounts (accept any OTP code)
    if (NO_OTP_EMAILS.includes(cleanEmail)) {
      const accessToken = generateAccessToken({
        adminId: admin.id,
        email: admin.email,
      });

      res.status(200).json({
        success: true,
        message: 'OTP verified successfully (bypassed)',
        accessToken,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      });
      return;
    }

    if (!admin.otpHash || !admin.otpExpiresAt) {
      res.status(400).json({ success: false, message: 'No active OTP request found. Please request a new OTP.' });
      return;
    }

    // Check expiration
    if (new Date() > new Date(admin.otpExpiresAt)) {
      res.status(400).json({ success: false, message: 'OTP code has expired. Please request a new one.' });
      return;
    }

    // Compare OTP
    const isValid = await verifyOtpHash(cleanOtp, admin.otpHash);
    if (!isValid) {
      res.status(401).json({ success: false, message: 'Invalid OTP code. Please try again.' });
      return;
    }

    // Clear OTP details upon successful verification to prevent replay attacks
    await prisma.admin.update({
      where: { email: cleanEmail },
      data: {
        otpHash: null,
        otpExpiresAt: null,
      },
    });

    // Generate JWT access token
    const accessToken = generateAccessToken({
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
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}
