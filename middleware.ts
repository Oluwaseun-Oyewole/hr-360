import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import {
  apiAuthPrefix,
  authRoutes,
  login_redirect,
  publicRoutes,
} from "./routes";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const { nextUrl } = req;
    const token = await getToken({ req });

    const isAuthenticated = !!token;
    const isApiRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoutes) {
      if (isAuthenticated) {
        return Response.redirect(new URL(login_redirect, nextUrl));
      } else {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
    }

    if (isAuthRoute) {
      if (isAuthenticated) {
        return Response.redirect(new URL(login_redirect, nextUrl));
      }
      return null;
    }

    if (!isAuthenticated && isPublicRoutes) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    if (!isAuthenticated && !isPublicRoutes) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    if (isAuthenticated && isPublicRoutes) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
  }
);

export const config = {
  matcher: ["/"],
};

// "/dashboard", "/api/auth", "/auth/login", "/auth/register"
