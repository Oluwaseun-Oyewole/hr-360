import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import { isEmptyOrSpaces } from "@/utils/helper";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile): any {
        return {
          ...profile,
          name: profile?.name ?? "",
          role: profile.role ?? "",
          employmentType: profile.employmentType ?? "",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        try {
          await mongoDBConnection();
          if (isEmptyOrSpaces(email) || isEmptyOrSpaces(password)) {
            throw new Error("Fill in your fields");
          }
          const user = await User.findOne({
            email,
          });
          if (!user || !user?.password) throw new Error("Invalid credentials");
          if (!user?.emailVerified)
            throw new Error("Please activate your email");
          else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw new Error("Invalid credentials");
            else return user;
          }
        } catch (error) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/login",
  //   error: "/auth/error",
  // },
  // events: {
  //   async linkAccount({ user }) {
  //     await User.findOneAndUpdate(
  //       { _id: user.id },
  //       { emailVerified: new Date() },
  //       { new: true }
  //     );
  //   },
  // },
  // callbacks: {
  //   async signIn({ user, account, email }) {
  //     if (account?.provider === "credentials") {
  //       return true;
  //     }
  //     if (account?.provider === "github" || account?.provider === "google") {
  //       await mongoDBConnection();
  //       try {
  //         const existingUser = await User.findOne({
  //           email: user.email,
  //         });
  //         if (!existingUser) {
  //           await User.create({
  //             name: user?.name,
  //             email: user?.email,
  //             role: user?.role,
  //             emailVerified: new Date(),
  //             employmentType: user?.employmentType,
  //           });
  //           return true;
  //         }
  //         return true;
  //       } catch (error) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   },

  // async redirect({ url, baseUrl }) {
  //   console.log("url", url);
  //   console.log("base url", baseUrl);

  //   const isRelativeUrl = url.startsWith("/");
  //   console.log("relative", isRelativeUrl);
  //   if (isRelativeUrl) {
  //     return `${baseUrl}${url}`;
  //   }
  //   const isSameOriginUrl = new URL(url).origin === baseUrl;
  //   const alreadyRedirected = url.includes("callbackUrl=");
  //   console.log("already", alreadyRedirected);

  //   if (isSameOriginUrl && alreadyRedirected) {
  //     const originalCallbackUrl = decodeURIComponent(
  //       url.split("callbackUrl=")[1]
  //     );
  //     return originalCallbackUrl;
  //   }

  //   if (isSameOriginUrl) {
  //     return url;
  //   }
  //   return baseUrl;
  // },

  // async jwt({ token, user, account, trigger, session }) {
  //   const userToken = await jwtService.sign(
  //     { name: user?.name, email: user?.email },
  //     "24hrs"
  //   );

  //   // const refreshToken = async (token: string) => {
  //   //   const decoded = verifyJwt(token);
  //   //   let accessToken;
  //   //   if (!decoded) {
  //   //     accessToken = await jwtService.sign(
  //   //       { name: user?.name, email: user?.email },
  //   //       "24h"
  //   //     );
  //   //   }
  //   //   return accessToken;
  //   // };

  //   if (account && user) {
  //     token.name = user.name;
  //     token.email = user.email;
  //     token.accessToken = userToken;
  //     token.accountType = account.type;
  //     // token.refreshToken = refreshToken(userToken);
  //     token.role = "";
  //     token.employmentType = "";
  //   }
  //   if (trigger === "update" && session?.name) {
  //     token.role = session.role;
  //     token.employmentType = session.employmentType;
  //     token.name = session.name;
  //   }
  //   // const v = verifyJWT(token?.accessToken);
  //   // console.log("vvvvv", v);
  //   // if (v.expired) {
  //   //   console.log("this token has expired");
  //   // }
  //   // // Return previous token if the access token has not expired yet
  //   // if (token.accessTokenExpires > Date.now()) {
  //   //   console.log("token still valid");s
  //   //   return token;
  //   // } else {
  //   //   console.log("trying refresh token");
  //   //   // Access token has expired, try to update it
  //   //   return refreshAccessToken(token);
  //   // }
  //   return { ...token, ...user };
  // },
  // async session({ session, token, user }) {
  //   await mongoDBConnection();

  //   const existingUser = await User.findOne({
  //     email: session.user.email!,
  //   });
  //   if (session.user) {
  //     if (existingUser) {
  //       session.user.name = existingUser.name!;
  //       session.user.email = existingUser.email!;
  //       session.user.role = existingUser.role;
  //       session.user.employmentType = existingUser.employmentType;
  //       session.user.accessToken = token.accessToken;
  //     } else {
  //       session.user.name = token.name!;
  //       session.user.email = token.email!;
  //       session.user.role = token.role;
  //       session.user.employmentType = token.employmentType;
  //       session.user.accessToken = token.accessToken;
  //     }
  //   }
  //   return session;
  // },
  // },
};
