import { mongoDBConnection } from "@/lib/mongodb";
import { DashboardInterface, DashboardModel } from "@/models/dashboard";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const resultsPerPage = 10;
  const { searchParams } = await new URL(req.url);
  const searchQuery = searchParams.get("searchQuery");
  const page = Number(searchParams.get("page"))!;
  //   const resultsPerPage = Number(searchParams.get("resultsPerPage"));
  const skip = (page - 1) * resultsPerPage;
  await mongoDBConnection();
  try {
    const employees: DashboardInterface[] = await DashboardModel.find({
      $or: [
        { role: { $regex: searchQuery, $options: "i" } },
        { employeeName: { $regex: searchQuery, $options: "i" } },
        { employmentType: { $regex: searchQuery, $options: "i" } },
        { status: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .limit(10)
      .skip(skip);

    const totalResults = await DashboardModel.countDocuments({
      $or: [
        { role: { $regex: searchQuery, $options: "i" } },
        { employeeName: { $regex: searchQuery, $options: "i" } },
        { employmentType: { $regex: searchQuery, $options: "i" } },
        { status: { $regex: searchQuery, $options: "i" } },
      ],
    });
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
