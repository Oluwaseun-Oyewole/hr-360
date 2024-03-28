import { mongoDBConnection } from "@/lib/mongodb";
import { OTP } from "@/models/otp";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, otp } = await req.json();
  await mongoDBConnection();
  try {
    if (isEmptyOrSpaces(email) || isEmptyOrSpaces(otp)) {
      return NextResponse.json(
        { message: "Empty otp is not allowed", statusCode: 204 },
        { status: 204 }
      );
    }
    const checkIfUserExist = await User.findOne({ email });
    if (!checkIfUserExist) {
      NextResponse.json(
        { message: "User not found", statusCode: 404 },
        { status: 404 }
      );
    }
    const user = await User.findById({ _id: checkIfUserExist._id });
    if (user) {
      const otpVerify = await OTP.find({ user, otp });
      if (otpVerify.length <= 0) {
        return NextResponse.json(
          {
            message:
              "Account does not exist or has been verified already, sign up or log in",
          },
          { status: 501 }
        );
      } else {
        const { expiresAt, otp, hashedOTP } = otpVerify[0];
        if (Date.now() < expiresAt) {
          const isValidOTP = bcrypt.compare(otp, hashedOTP);
          if (!isValidOTP) {
            return NextResponse.json(
              { message: "Invalid code passed. Check your inbox" },
              { status: 501 }
            );
          } else {
            await User.findOneAndUpdate(
              { email },
              { emailVerified: Date.now() }
            );
            await OTP.deleteMany({ user });
            return NextResponse.json(
              { message: "Your account has been activated successfully" },
              { status: 200 }
            );
          }
        }
        await OTP.deleteMany({ user });
        return NextResponse.json(
          { message: "Code has expired, Please request again" },
          { status: 501 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
