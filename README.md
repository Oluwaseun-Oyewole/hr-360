### HR360

#### Project Overview

Hr360 is a Fullstack dashboard that tracks and manages employee activities,payroll etc

#### Features:

```bash

Clean, responsive UI
Complete Authentication Flow
Progressive web app
Backend API

```

#### Technologies

```bash
React
NextJS
Tailwind
Typescript
NextAuth
Mongo
Mongoose
```

[Designer](https://www.behance.net/Barbaraani)
[Design](https://www.behance.net/gallery/189238867/HR-Dashboard-Concept-HR360)

[Hr360](https://hr-360-dashboard.vercel.app/)

![screenshot](<assets/Screenshot 2024-03-24 at 14.37.18.png>)
![screenshot](<assets/Screenshot 2024-03-24 at 14.37.45.png>)
![screenshot](<assets/Screenshot 2024-03-24 at 15.13.36.png>)
![screenshot](<assets/Screenshot 2024-03-24 at 14.38.00.png>)

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { isAuthenticate } from "./lib/auth.authenticate";

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

    // console.log("is authenticate -- ", isAuthenticated);
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // if (isApiAuthRoute) return;

    // if (!token && req.nextUrl.pathname.startsWith("/auth/login")) {
    //   console.log("api route -- ");
    //   return isAuthenticated
    //     ? NextResponse.redirect(new URL("/", req.nextUrl))
    //     : NextResponse.next();
    // }
    // return isAuthenticated
    //   ? NextResponse.next()
    //   : NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    return;

}
);

// export const config = {
// matcher: [],
// };
