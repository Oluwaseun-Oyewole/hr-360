import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: string;
      email: string;
      name: string;
      isUpdated: boolean;
      accountType;
      employmentType: string;
      accessToken: string;
      refreshToken: string;
      verify: any;
      testingVerification;
      accessTokenExpires: number;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
    isUpdated: boolean;
    employmentType: string;
    accountType;
    accessToken: string;
    refreshToken: string;
    verify: any;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    isUpdated: boolean;
    employmentType: string;
    address: string;
    accessToken: string;
    refreshToken: string;
    verify: any;
    accessTokenExpires: number;
  }
}
