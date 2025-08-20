import { verifyJwt } from "@/lib/jwt";
import { mongoDBConnection } from "@/lib/mongodb";
import { sendOTPVerification } from "@/lib/otpVerification";
import { User } from "@/models/users";
import { COOKIES_KEYS } from "@/utils/constants";
import { isEmptyOrSpaces } from "@/utils/helper";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIES_KEYS.TOKEN);
  const decodedToken = verifyJwt(JSON.parse(token?.value as string));
  const email = decodedToken?.email;

  await mongoDBConnection();
  try {
    if (!decodedToken || !decodedToken.email) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const checkIfUserEmailExists = await User.findOne({ email });
    if (!checkIfUserEmailExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      if (isEmptyOrSpaces(email)) {
        return NextResponse.json(
          {
            message: "Fields can't be empty",
            statusCode: 400,
          },
          { status: 400 }
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
