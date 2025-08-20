import { mongoDBConnection } from "@/lib/mongodb";
import { DashboardInterface, DashboardModel } from "@/models/dashboard";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  const resultsPerPage = 10;
  const { searchParams } = await new URL(req.url);
  const role = searchParams.get("role");
  const date = searchParams.get("date");
  const page = Number(searchParams.get("page"))!;
  const skip = page > 0 ? (page - 1) * resultsPerPage : 0;
  await mongoDBConnection();

  const filter: any = {};

  if (role) {
    filter.role = { $regex: role, $options: "i" };
  }

  if (date) {
    filter.createdAt = {
      $gte: new Date(date),
      $lt: new Date(date).setDate(new Date(date).getDate() + 1),
    };
  }

  try {
    const employees: DashboardInterface[] = await DashboardModel.find(filter)
      .limit(10)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalResults = await DashboardModel.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    return NextResponse.json(
      {
        message: "success",
        data: {
          employees,
          totalResults,
          totalPages,
          resultsPerPage,
          page,
        },
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "oops, something went wrong" },
      { status: 501 }
    );
  }
};
