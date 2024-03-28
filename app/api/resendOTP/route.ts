import { mongoDBConnection } from "@/lib/mongodb";
import { sendOTPVerification } from "@/lib/otpVerification";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  await mongoDBConnection();
  try {
    if (isEmptyOrSpaces(email)) {
      return NextResponse.json(
        { message: "Email can not be empty", statusCode: 204 },
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
    sendOTPVerification({
      _id: checkIfUserExist._id,
      name: checkIfUserExist.name,
      email,
    });
    return NextResponse.json(
      { message: "An otp code has been sent to your account" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
