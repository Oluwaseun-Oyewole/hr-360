import { jwtService } from "@/lib/jwt/index";
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
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      //@ts-ignore
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
          if (!user) throw new Error("Invalid credentials");
          if (!user?.emailVerified) {
            throw new Error("EMAIL_NOT_VERIFIED");
          } else {
            //@ts-ignore
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    // for fire and forget functions that runs when specific actions occur
    // events are purely for side effects like logging, database updates, analytics etc.

    async signIn({ user, account, profile }) {
      // Runs AFTER successful sign-in
    },

    async signOut({ session, token }) {
      // Runs when user signs out
    },

    async createUser({ user }) {
      // Runs when a new user is created
    },
    async linkAccount({ user }) {
      // / Runs when an account is linked to a user
      // Good place to mark email as verified for OAuth providers
      await User.findOneAndUpdate(
        { _id: user.id },
        { emailVerified: new Date() },
        { new: true }
      );
    },
  },
  callbacks: {
    // these are synchronous functions that control authentication flow and they can be used to modify data
    async signIn({ user, account, email }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "github" || account?.provider === "google") {
        await mongoDBConnection();
        try {
          const existingUser = await User.findOne({
            email: user.email,
          });
          if (!existingUser) {
            await User.create({
              name: user?.name,
              email: user?.email,
              role: user?.role,
              emailVerified: new Date(),
              employmentType: user?.employmentType,
            });
            return true;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // this runs every time a JWT is created or accessed.
      // token: existing JWT token
      // user: user object (only available on sign-in)
      // account: account info (only available on sign-in)
      // trigger: what triggered this callback
      // session: session data (only with trigger: "update")

      if (account && user) {
        token.name = user.name;
        token.email = user.email;
        token.accountType = account.type;

        token.role = "";
        token.employmentType = "";

        const customUserToken = await jwtService.sign(
          { name: user?.name, email: user?.email },
          "24hrs"
        );

        token.accessToken = customUserToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
      }
      if (trigger === "update" && session?.name) {
        console.log("Session update triggered");
        token.role = session.role;
        token.employmentType = session.employmentType;
        token.name = session.name;
      }
      // TOKEN REFRESH: check if token needs refreshing
      if (token.accessTokenExpires && Date.now() > +token.accessTokenExpires) {
        // Refresh custom token
        const newToken = await jwtService.sign(
          {
            userId: token.id,
            email: token.email,
            role: token.role,
          },
          "24h"
        );
        token.accessToken = newToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
      }

      return { ...token, ...user };
    },
  },
};
