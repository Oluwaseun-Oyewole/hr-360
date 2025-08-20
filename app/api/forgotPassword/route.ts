import { signJwt } from "@/lib/jwt";
import { compileResetPasswordTemplate, sendMail } from "@/lib/mail";
import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  await mongoDBConnection();
  try {
    const user = await User.findOne({ email });
    if (isEmptyOrSpaces(email)) {
      return NextResponse.json(
        {
          message: "Fields can't be empty",
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      const jwtUserId = signJwt({ id: user?.id });
      const resetPasswordURL = `${process.env.NEXTAUTH_URL}/auth/resetPassword/${jwtUserId}`;
      console.log("reset url", resetPasswordURL);
      const body = compileResetPasswordTemplate(user?.name, resetPasswordURL);

      await sendMail({
        to: email,
        subject: "Reset Password",
        body: body,
      });

      return NextResponse.json(
        { message: "Reset link was sent to your mail", statusCode: 200 },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 501 });
  }
};
