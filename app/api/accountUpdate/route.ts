import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, name, role, employmentType } = await req.json();
  await mongoDBConnection();
  try {
    const checkIfUserEmailExists = await User.findOne({ email });
    if (checkIfUserEmailExists) {
      await User.findOneAndUpdate(
        { email: email },
        {
          role: role,
          name,
          employmentType: employmentType,
        }
      );
      return NextResponse.json(
        {
          message: "Account update successful ",
          status: 200,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Oops, something went wrong" },
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
