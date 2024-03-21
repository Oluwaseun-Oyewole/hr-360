import { mongoDBConnection } from "@/lib/mongodb";
import { DashboardModel } from "@/models/dashboard";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const resultsPerPage = Number(searchParams.get("resultsPerPage"))!;
  const page = Number(searchParams.get("page"))!;
  const skip = (page - 1) * resultsPerPage;
  await mongoDBConnection();
  try {
    const employees = await DashboardModel.find({})
      .limit(resultsPerPage)
      .skip(skip);
    const totalResults = await DashboardModel.countDocuments();
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
