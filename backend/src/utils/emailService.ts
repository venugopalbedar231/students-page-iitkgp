export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  console.log('\n==================================================');
  console.log(`[EMAIL OTP SERVICE]`);
  console.log(`To: ${email}`);
  console.log(`Subject: Your Admin Verification OTP Code`);
  console.log(`OTP Code: >>> ${otp} <<<`);
  console.log(`This code is valid for 10 minutes.`);
  console.log('==================================================\n');
}
