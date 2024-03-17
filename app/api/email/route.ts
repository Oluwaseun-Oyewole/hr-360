import { signJwt } from "@/lib/jwt";
import { compileActivationTemplate, sendMail } from "@/lib/mail";
import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, email, updateEmail } = await req.json();
  await mongoDBConnection();
  try {
    const checkIfUserEmailExists = await User.findOne({ email });
    if (checkIfUserEmailExists) {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          email: updateEmail,
          emailVerified: null,
        }
      );
      const jwtUserId = signJwt({ id: user?.id });
      const activationURL = `${process.env.NEXTAUTH_URL}/auth/activateEmail/${jwtUserId}`;
      const body = compileActivationTemplate(name, activationURL);

      await sendMail({
        to: updateEmail,
        subject: "verify your email update",
        body: body,
      });

      return NextResponse.json(
        {
          message: `Verification link has been sent to your mail`,
          status: 200,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong", status: 501 },
      { status: 501 }
    );
  }
};
