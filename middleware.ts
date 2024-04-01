import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { isAuthenticate } from "./lib/auth.authenticate";
import { apiAuthPrefix } from "./routes";

export default withAuth(
  // `withAuth` augments your `req` with the user's token.
  async function middleware(req) {
    const { nextUrl } = req;
    const token = await getToken({ req });
    const isAuthenticated = await isAuthenticate(token?.accessToken!);

    // const access = token?.accessToken;
    // const secret_key = `${process.env.NEXTAUTH_SECRET}`;

    // if (!access && req.nextUrl.pathname.startsWith("/")) {
    //   return NextResponse.redirect(new URL("/auth/login", req.url));
    // } else if (access && req.nextUrl.pathname.startsWith("/dashboard")) {
    //   try {
    //     const secret = new TextEncoder().encode(secret_key);
    //     const decodedToken = await jwtVerify(access, secret);
    //     console.log("decoded tokens -- ", decodedToken);
    //     // const payload = decodedToken.payload;
    //     if (decodedToken) {
    //       return NextResponse.next();
    //     }
    //   } catch (error) {
    //     return NextResponse.redirect(new URL("/auth/login", req.url));
    //   }
    // } else {
    //   console.log("here");
    //   return NextResponse.redirect(new URL("/auth/login", req.url));
    // }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    if (isApiAuthRoute) return;

    if (!token && req.nextUrl.pathname.startsWith("/auth/login")) {
      return isAuthenticated
        ? NextResponse.redirect(new URL("/", req.nextUrl))
        : NextResponse.next();
    }
    return isAuthenticated
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
);

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/dashboard/:path*",
    "/api/auth//:path*",
  ],
};
