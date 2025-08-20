import { verifyJwt } from "@/lib/jwt";
import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { jwtUserId, password } = await req.json();
  const payload = verifyJwt(jwtUserId);
  await mongoDBConnection();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (isEmptyOrSpaces(jwtUserId) || isEmptyOrSpaces(password)) {
      return NextResponse.json(
        {
          message: "Fields can't be empty",
          statusCode: 204,
        },
        { status: 204 }
      );
    }

    if (!payload)
      return NextResponse.json(
        { message: "User does not exit" },
        { status: 404 }
      );
    const user = await User.findById({ _id: payload.id });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exit" },
        { status: 404 }
      );
    }
    const result = await User.findOneAndUpdate(
      { _id: user.id },
      { password: hashedPassword },
      { new: true }
    );
    if (result)
      return NextResponse.json(
        { message: "Password update successful", statusCode: 200 },
        { status: 200 }
      );
    else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 501 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, Something went wrong" },
      { status: 501 }
    );
  }
};
