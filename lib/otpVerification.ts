import { compileOTPVerificationTemplate, sendMail } from "@/lib/mail";
import { OTP } from "@/models/otp";
import bcrypt from "bcryptjs";

export const sendOTPVerification = async ({
  _id,
  name,
  email,
}: {
  _id: number;
  name: string;
  email: string;
}) => {
  function generateOTP(): string {
    return Math.floor(1000 + Math.random() * 900000).toString();
  }
  const hashedOTP = await bcrypt.hash(generateOTP(), 10);
  const otp = await OTP.create({
    user: _id,
    otp: generateOTP(),
    hashedOTP,
    createdAt: Date.now(),
    expiresAt: Math.floor(Date.now() + 3600000),
  });

  // const jwtUserId = signJwt({ id: user?.id });
  // const activationURL = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  // const body = compileActivationTemplate(name, activationURL);

  const otpCode = otp?.otp;
  const body = compileOTPVerificationTemplate(name, otpCode);
  return await sendMail({
    to: email,
    subject: "Activate your account",
    body: body,
  });
};
