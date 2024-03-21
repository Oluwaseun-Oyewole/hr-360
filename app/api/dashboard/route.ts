import { mongoDBConnection } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { DashboardModel } from "./../../../models/dashboard";

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
  function isStringEmptyOrWhitespace(str: string) {
    return str.trim() === "";
  }
  try {
    if (
      !employeeName ||
      !role ||
      !employmentType ||
      !status ||
      !checkIn ||
      !checkOut ||
      !overTime ||
      !email
    ) {
      return NextResponse.json(
        {
          message: "Fields cannot be empty",
        },
        { status: 400 }
      );
    }

    if (
      isStringEmptyOrWhitespace(employeeName)
      // ||

      // role.trim() === "" ||
      // employmentType.trim() === "" ||
      // status.trim() === "" ||
      // checkIn.trim() === "" ||
      // checkOut.trim() === "" ||
      // overTime.trim() === "" ||
      // email.trim() === ""
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
    console.log("error", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 }
    );
  }
};
