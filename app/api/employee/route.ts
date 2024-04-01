import { verifyJwt } from "@/lib/jwt";
import { mongoDBConnection } from "@/lib/mongodb";
import { DashboardModel } from "@/models/dashboard";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")!;
  const tokenWithoutBearer = token?.replace(/^Bearer\s+/i, "");
  const { searchParams } = await new URL(req.url);
  const resultsPerPage = Number(searchParams.get("resultsPerPage"))!;
  const page = Number(searchParams.get("page"))!;
  const skip = (page - 1) * resultsPerPage;
  // const token = await getToken({ req });
  const isTokenValid = verifyJwt(tokenWithoutBearer);
  await mongoDBConnection();

  if (!isTokenValid) {
    return NextResponse.json(
      { message: "Unauthorized users" },
      { status: 409 }
    );
  }

  try {
    const employees = await DashboardModel.find({})
      .limit(resultsPerPage)
      .skip(skip);
    const totalResults = await DashboardModel.countDocuments();
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const total = page > totalPages ? 0 : totalResults;
    return NextResponse.json(
      {
        message: "success",
        data: {
          employees,
          totalResults: page > totalPages ? total : totalResults,
          totalPages: page > totalPages ? 1 : totalPages,
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
