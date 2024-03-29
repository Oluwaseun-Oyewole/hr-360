import { mongoDBConnection } from "@/lib/mongodb";
import { sendOTPVerification } from "@/lib/otpVerification";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  await mongoDBConnection();
  try {
    const checkIfUserEmailExists = await User.findOne({ email });
    if (!checkIfUserEmailExists) {
      return NextResponse.json({ message: "User not found" }, { status: 409 });
    } else {
      if (isEmptyOrSpaces(email)) {
        return NextResponse.json(
          {
            message: "Fields can't be empty",
            statusCode: 204,
          },
          { status: 204 }
        );
      } else {
        await sendOTPVerification({
          _id: checkIfUserEmailExists._id,
          name: checkIfUserEmailExists.name,
          email,
        });
        return NextResponse.json(
          {
            message: "An OTP has been sent to your mail",
            statusCode: 200,
          },
          { status: 201 }
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
