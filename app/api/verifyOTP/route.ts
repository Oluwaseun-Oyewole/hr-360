import { mongoDBConnection } from "@/lib/mongodb";
import { OTP } from "@/models/otp";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, otpCode } = await req.json();
  await mongoDBConnection();

  try {
    const checkIfUserExist = await User.findOne({ email });
    const userId = checkIfUserExist?._id;
    const isVerified = !!checkIfUserExist?.emailVerified;
    if (!checkIfUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 409 });
    } else {
      if (isEmptyOrSpaces(otpCode)) {
        return NextResponse.json(
          { message: "Empty otp field is not allowed" },
          { status: 409 }
        );
      }
      const otpVerify = await OTP.find({ user: userId, otp: otpCode });
      if (otpVerify?.length <= 0) {
        if (isVerified) {
          return NextResponse.json(
            {
              message: "Account has already been activated. Please log in",
            },
            { status: 501 }
          );
        }
        return NextResponse.json(
          {
            message: "Invalid otp code. Check your inbox",
          },
          { status: 501 }
        );
      }
      const { expiresAt, otp, hashedOTP } = otpVerify[0];
      if (Date.now() < expiresAt) {
        const isValidOTP = await bcrypt.compare(otp, otpCode);
        if (otp !== otpCode) {
          return NextResponse.json(
            { message: "Invalid code passed. Check your inbox" },
            { status: 501 }
          );
        } else {
          await User.findOneAndUpdate({ email }, { emailVerified: Date.now() });
          await OTP.deleteMany({ user: userId });
          return NextResponse.json(
            { message: "Your account has been successfully activated " },
            { status: 200 }
          );
        }
      }
      await OTP.deleteMany({ user: userId });
      return NextResponse.json(
        { message: "Code has expired, Please request again" },
        { status: 501 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
