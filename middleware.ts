import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("running middleware");
  // const currentUser = request.cookies.get("currentUser")?.value;

  const currentUser = true;
  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth/login")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/auth/login", "/dashboard"],
};
