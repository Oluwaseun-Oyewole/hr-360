import { mongoDBConnection } from "@/lib/mongodb";
import { sendOTPVerification } from "@/lib/otpVerification";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password, name, role, emailVerified, employmentType } =
    await req.json();
  await mongoDBConnection();
  try {
    const checkIfUserEmailExists = await User.findOne({ email });
    if (checkIfUserEmailExists) {
      return NextResponse.json(
        { message: "User Already Exist" },
        { status: 409 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (
        isEmptyOrSpaces(name) ||
        isEmptyOrSpaces(email) ||
        isEmptyOrSpaces(password) ||
        isEmptyOrSpaces(role) ||
        isEmptyOrSpaces(employmentType)
      ) {
        return NextResponse.json(
          {
            message: "Fields can't be empty",
            statusCode: 204,
          },
          { status: 204 }
        );
      } else {
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role,
          emailVerified,
          employmentType,
        });
        await sendOTPVerification({ _id: user._id, name, email });
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
