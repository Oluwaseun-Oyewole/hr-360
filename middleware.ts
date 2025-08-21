import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { apiAuthPrefix } from "./routes";

export default withAuth(
  async function middleware(req) {
    const { nextUrl } = req;
    const token = await getToken({ req });

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Allow auth pages to be accessed without token
    if (nextUrl.pathname.startsWith("/auth/")) {
      if (token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      try {
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }
    // For authenticated users accessing other protected routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log("token token - ", token?.accessToken);
        if (req.nextUrl.pathname.startsWith("/auth/")) {
          return true;
        }
        // For all other routes, require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
