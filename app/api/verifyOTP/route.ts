import { verifyJwt } from "@/lib/jwt";
import { mongoDBConnection } from "@/lib/mongodb";
import { OTP } from "@/models/otp";
import { User } from "@/models/users";
import { COOKIES_KEYS } from "@/utils/constants";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email: userEmail, otpCode } = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES_KEYS.TOKEN);
  const decodedToken = verifyJwt(JSON.parse(token?.value as string));
  const email = decodedToken?.email || userEmail;
  await mongoDBConnection();

  if (!email) {
    return NextResponse.json(
      { message: "Authentication token missing" },
      { status: 401 }
    );
  }

  try {
    const checkIfUserExist = await User.findOne({ email });
    const userId = checkIfUserExist?._id;
    const isVerified = !!checkIfUserExist?.emailVerified;

    // if (!decodedToken || !decodedToken.email) {
    //   return NextResponse.json(
    //     { message: "Authentication token missing" },
    //     { status: 401 }
    //   );
    // }

    if (!checkIfUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      if (isVerified) {
        return NextResponse.json(
          { message: "Account already activated" },
          { status: 409 }
        );
      }
      if (isEmptyOrSpaces(otpCode)) {
        return NextResponse.json(
          { message: "Empty otp field is not allowed" },
          { status: 400 }
        );
      }
      const otpVerify = await OTP.find({ user: userId, otp: otpCode });
      if (otpVerify?.length <= 0) {
        return NextResponse.json(
          {
            message: "Invalid otp code.",
          },
          { status: 400 }
        );
      }

      const { expiresAt, otp, hashedOTP } = otpVerify[0];
      //@ts-ignore
      if (Date.now() < expiresAt) {
        const isValidOTP = await bcrypt.compare(otp, otpCode);
        if (otp !== otpCode) {
          return NextResponse.json(
            { message: "Invalid code passed." },
            { status: 501 }
          );
        } else {
          await User.findOneAndUpdate({ email }, { emailVerified: Date.now() });
          await OTP.deleteMany({ user: userId });
          return NextResponse.json(
            { message: "Your account has been successfully activated" },
            { status: 200 }
          );
        }
      }
      await OTP.deleteMany({ user: userId });
      return NextResponse.json(
        { message: "Code has expired, Please request again" },
        { status: 410 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
