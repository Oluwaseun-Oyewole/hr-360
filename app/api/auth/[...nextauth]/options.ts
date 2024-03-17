import { mongoDBConnection } from "@/lib/mongodb";
import { User } from "@/models/users";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

type GenericObject<T = unknown> = T & {
  [key: string]: any;
};

async function refreshAccessToken(token: any) {
  try {
    const url =
      "https://www.googleapis.com/oauth2/v4/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        // refresh_token: token.refreshToken,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
      });
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// interface AuthPayload {
//   user: AuthUser;
//   accessToken: string;
//   accessTokenExpires: number;
//   refreshToken: string;
//   error?: string;
// }

// const refreshAccessToken = async (
//   payload: AuthPayload
// ): Promise<AuthPayload> => {
//   try {
//     const url = new URL("https://www.googleapis.com/oauth2/v4/token");
//     url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
//     url.searchParams.set("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
//     url.searchParams.set("grant_type", "refresh_token");
//     url.searchParams.set("refresh_token", payload.refreshToken);
//     url.searchParams.set("redirect_uri", "/");

//     const response = await fetch(url.toString(), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     console.log("responde", response);

//     const refreshToken = await response.json();

//     if (!response.ok) {
//       throw refreshToken;
//     }

//     // Give a 10 sec buffer
//     const now = new Date();
//     const accessTokenExpires = now.setSeconds(
//       now.getSeconds() + refreshToken.expires_in - 10
//     );

//     return {
//       ...payload,
//       accessToken: refreshToken.access_token,
//       accessTokenExpires,
//       refreshToken: refreshToken.refresh_token,
//     };
//   } catch (error) {
//     console.log("error from fetching tokens", error);
//     console.error(error);

//     return {
//       ...payload,
//       error: "RefreshAccessTokenError",
//     };
//   }
// };

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
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }
          if (!user?.emailVerified) {
            throw new Error("Please activate your email");
          } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw new Error("Incorrect Password");
            else {
              return user;
            }
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
  },
  events: {
    async linkAccount({ user }) {
      await User.findOneAndUpdate(
        { _id: user.id },
        { emailVerified: new Date() },
        { new: true }
      );
    },
  },
  callbacks: {
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

    async redirect({ url, baseUrl }) {
      return url;
    },
    // if you want to use the role in client component
    async session({ session, token, user }) {
      await mongoDBConnection();
      const existingUser = await User.findOne({
        email: session.user.email!,
      });
      if (session.user) {
        if (existingUser) {
          session.user.name = existingUser.name!;
          session.user.email = existingUser.email!;
          session.user.role = existingUser.role;
        } else {
          session.user.name = token.name!;
          session.user.email = token.email!;
          session.user.role = token.role;
        }
      }
      return session;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (account && user) {
        return {
          name: user.name,
          email: user.email,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          tokenType: account?.token_type,
          role: "",
          employmentType: "",
          accountType: account?.type,
          // expiredTokenTime: Date.now() < account.expires_at!,
        };
      }
      if (trigger === "update" && session?.name) {
        token.role = session.role;
        token.employmentType = session.employmentType;
        token.name = session.name;
      }
      // // Return previous token if the access token has not expired yet
      // if (token.accessTokenExpires > Date.now()) {
      //   console.log("token still valid");
      //   return token;
      // } else {
      //   console.log("trying refresh token");
      //   // Access token has expired, try to update it
      //   return refreshAccessToken(token);
      // }
      return token;
      // const accessToken = signJwt({ sub: token?.sub }, { expiresIn: "1s" })!;
      // const verify = verifyJwt(accessToken);
      // const refreshToken = signJwt(
      //   { accessToken: token?.accessToken },
      //   { expiresIn: "1d" }
      // );
      // const testingVerification = verifyJWT(accessToken);

      // token.testingVerification = testingVerification;
      // token.accessToken = accessToken!;
      // token.refreshToken = refreshToken!;
      // token.verify = verify;

      // Access token has expired, try to update it
      // return refreshAccessToken(token);
    },

    // async jwt(
    //   payload: AuthPayload,
    //   user: AuthUser,
    //   account: GenericObject
    // ): Promise<AuthPayload> {
    //   let res: AuthPayload;

    //   const now = Date.now();

    //   // Signing in
    //   if (account && user) {
    //     const accessToken = account.accessToken;
    //     const refreshToken = account.refreshToken;

    //     res = {
    //       accessToken,
    //       accessTokenExpires: account.accessTokenExpires,
    //       refreshToken,
    //       user,
    //     };
    //   } else if (now < payload.accessTokenExpires) {
    //     // Subsequent use of JWT, the user has been logged in before
    //     // access token has not expired yet
    //     console.log("access token has not expired");
    //     res = payload;
    //   } else {
    //     console.log("access token has expired");
    //     // access token has expired, try to update it
    //     res = await refreshAccessToken(payload);
    //   }

    //   return res;
    // },
  },
};
