import { mongoDBConnection } from "@/lib/mongodb";
import { DashboardModel } from "@/models/dashboard";
import { isEmptyOrSpaces } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    employeeName,
    role,
    employmentType,
    status,
    checkIn,
    checkOut,
    overTime,
    email,
  } = await req.json();
  await mongoDBConnection();

  try {
    if (
      isEmptyOrSpaces(employeeName) ||
      isEmptyOrSpaces(role) ||
      isEmptyOrSpaces(employmentType) ||
      isEmptyOrSpaces(status) ||
      isEmptyOrSpaces(email)
    ) {
      return NextResponse.json(
        {
          message: "Fields cannot be empty",
        },
        { status: 400 }
      );
    }

    const employeeExist = await DashboardModel.findOne({ email });
    if (employeeExist) {
      return NextResponse.json(
        {
          message: "Employee already exist",
          statusCode: 409,
        },
        { status: 409 }
      );
    }

    await DashboardModel.create({
      employeeName,
      employmentType,
      role,
      status,
      checkIn,
      checkOut,
      overTime,
      email,
    });
    return NextResponse.json(
      { message: "New employee added" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error -- ", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
